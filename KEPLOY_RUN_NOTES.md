# Keploy Run Notes

## Environment

- **Operating System:** Windows 11 Pro / Enterprise (amd64)
- **PowerShell / Terminal:** Windows PowerShell 5.1 / cmd.exe (Native Windows environment, no WSL / Linux terminal used per instructions)
- **Go Version:** `go version go1.27.1 windows/amd64` (Located at `C:\Program Files\Go\bin\go.exe`)
- **Docker Version:** `Docker version 29.8.0, build 88096ef` (API version 1.56)
- **Docker Desktop Version:** `Docker Desktop 4.91.0 (239619)`, Context: `desktop-linux`
- **Docker Compose Version:** `Docker Compose version v5.5.1`
- **Node.js Version:** `v23.1.0`
- **npm Version:** `10.9.0`
- **Git Version:** `git version 2.54.0.windows.1`

---

## Quickstart

- **Repository:** `E:\keploy\samples-go`
- **Quickstart Application:** `gin-redis` (`E:\keploy\samples-go\gin-redis`)
- **Framework:** Gin (`github.com/gin-gonic/gin`)
- **Database / Cache:** Redis (`github.com/redis/go-redis/v9`)
- **Architecture Purpose:** Two-step OTP generation and authentication workflow with Redis caching and JWT token issuing.

---

## Application

### Startup Command
- Native Go: `go run main.go` (or `go build -o gin-redis.exe .` followed by `.\gin-redis.exe`)
- Docker container: `docker build -t gin-app:1.0 .` followed by `docker run -p 3001:3001 --network keploy-network --name ginRedisApp gin-app:1.0`

### Port & Configuration
- Application Port: `3001` (configured in `server/server.go`)
- Redis Address: `localhost:6379` (native) or `myredis:6379` (Docker bridge network)

### API Endpoints Verified
1. **GET `/api/getVerificationCode`**
   - Query parameters: `email` (string), `username` (string)
   - Real command executed:
     ```powershell
     curl.exe -s "http://localhost:3001/api/getVerificationCode?email=test@example.com&username=devrel"
     ```
   - Real response received:
     ```json
     {
       "status": "true",
       "message": "OTP Generated successfully",
       "otp": "2519"
     }
     ```
   - Behavior: Calls `services.GenerateOTP()`, marshals an `OTPData` struct (`OTP` and `UserName`), and stores it in Redis under key `to` (`test@example.com`) with a 4-hour expiration (`redis.Session().Set(...)`). Returns the generated OTP string.

2. **POST `/api/verifyCode`**
   - Headers: `Content-Type: application/json`
   - Request Body:
     ```json
     {
       "otp": 2519,
       "email": "test@example.com"
     }
     ```
     *(Note: `otp` is strictly typed as an `int`, and `email` as a `string` in `structure/request/verifyOTP.go`)*
   - Real command executed:
     ```powershell
     curl.exe -s -X POST "http://localhost:3001/api/verifyCode" -H "Content-Type: application/json" -d '{\"otp\":2519,\"email\":\"test@example.com\"}'
     ```
   - Real response received:
     ```json
     {
       "status": "true",
       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWx1ZSI6ImV4YW1wbGUuY29tIiwiZXhwIjoxNzkxMDQ3OTg4fQ.eQK64jKGcZQjT77hfuPjAbAczc9M-abPMlto8m7q2Ro",
       "username": "devrel",
       "message": "OTP authenticated successfully"
     }
     ```
   - Behavior: Retrieves key `request.Email` from Redis (`redis.Session().Get(...)`), parses the stored JSON, verifies that `data.OTP == request.OTP`, generates a HMAC-SHA256 JWT token using secret from config, and returns the authentication token and username.

---

## Redis

- **Container Name:** `myredis`
- **Image:** `redis:latest`
- **Container ID:** `18c6beb0ae2a`
- **Status:** Running (`Up 2 days`)
- **Port Mapping:** `0.0.0.0:6379->6379/tcp`, `[::]:6379->6379/tcp`
- **Docker Network:** Connected to `gin-redis_default`, and `keploy-network` is available.
- **Verification:** Verified alive via `docker ps` and by successful read/write operations during manual API testing.

---

## Keploy Setup & Security Status

- **Installation Target:** `C:\Users\jaina\.keploy\bin\keploy.exe`
- **Security Blocker:**
  - Query executed: `Get-MpThreat` in PowerShell
  - Detection result:
    - **Threat Name:** `Trojan:Win32/Gracing.I`
    - **Did Threat Execute:** `False`
    - **Action taken by OS:** Windows Defender quarantined `C:\Users\jaina\.keploy\bin\keploy.exe`.
  - **Compliance with Assignment Rules:**
    - Per strict rules 6, 7, 8, and 13: Antivirus was NOT disabled, exclusions were NOT created, and security settings were NOT bypassed.
    - Factual status: **Keploy CLI is currently blocked by Windows Defender and requires manual user action.**
    - *Follow-up Observation:* After performing a "Restore" action, Windows Defender's real-time file-system filter intercepts `keploy.exe` upon process execution (`ERROR_VIRUS_INFECTED: 0x800700E1`) and re-quarantines the binary unless the "Allow on device" permission is explicitly selected for this threat in Windows Security.

---

## Recording Workflow (Documented & Ready)

When Keploy CLI is restored:
1. Stop any standalone running instance on port 3001 to prevent `EADDRINUSE`.
2. Execute the recording command:
   ```powershell
   # Native workflow:
   keploy record -c "go run main.go"
   # Or Docker workflow:
   keploy record -c "docker run -p 3001:3001 --rm --network keploy-network --name ginRedisApp gin-app:1.0"
   ```
3. Issue the two verified requests:
   - `GET /api/getVerificationCode?email=devrel@keploy.io&username=gopher`
   - Read the returned OTP
   - `POST /api/verifyCode` with the OTP and email.
4. Keploy intercepts ingress HTTP calls and egress Redis commands (via eBPF / proxy network interception) and outputs YAML test cases and dependency mocks in `./keploy`.

---

## Testing Workflow & Expected Behavior

When replaying tests:
```powershell
keploy test -c "go run main.go" --delay 10
```
- **Crucial DevRel Finding (Noise Fields):**
  - Because `POST /api/verifyCode` returns a JWT token that includes a dynamic Unix timestamp (`exp`: expiration), replaying the test will generate a response diff on `token`.
  - In Keploy, this is handled by adding `body.token` to the `noise` field in the generated test YAML (`test-2.yml`), turning what would be a false-positive failure into a clean pass.

---

## Problems & Solutions

1. **Problem:** `go` command was not recognized on PATH in default PowerShell sessions.
   - **Cause:** Go was installed in `C:\Program Files\Go\bin\go.exe`, which wasn't exported in the session environment.
   - **Solution:** Add `C:\Program Files\Go\bin` to the active PATH (`$env:PATH += ";C:\Program Files\Go\bin"`).
2. **Problem:** Windows Defender blocks `keploy.exe`.
   - **Cause:** Windows Defender flagged the binary as `Trojan:Win32/Gracing.I` (common with Go binaries using eBPF/low-level packet capture drivers like WinPcap/Npcap).
   - **Solution:** Maintain security integrity; do not bypass with scripts. Prompt user to manually inspect and allow the file in Windows Security Protection History.
3. **Problem:** Dynamic JWT token causes test assertion failure during replay.
   - **Cause:** `token.GenerateToken` produces different tokens based on timestamp.
   - **Solution:** Document Keploy's `noise` configuration in test YAML.

---

## Developer Experience Reflections

- **Simplicity of Quickstart:** The Gin + Redis architecture is an ideal showcase because it includes both an incoming HTTP API and a persistent stateful backing service (Redis).
- **The Value of Zero-Code-Change Testing:** Unlike traditional mock libraries (like `gomock` or `miniredis`) that require rewriting initialization code or maintaining brittle unit mocks, Keploy captures actual network wire protocols.
- **Why This Matters to Go Developers:** Go developers value simplicity and minimal external magic. Being able to record tests simply by running `curl` against a live or staged instance and having Keploy mock Redis on replay saves hours of writing table-driven mock tests.
