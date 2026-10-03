# Keploy Go + Gin + Redis Tutorial & Documentation Platform

A single-page, developer-focused documentation website and technical tutorial for recording, mocking, and replaying automated API tests using **Keploy v2** with **Go (Gin framework)** and **Redis**.

Built as part of the **Keploy DevRel Candidate Assignment**.

---

## 🎯 Assignment Objective

The goal of this assignment is to:
1. Select an authentic Go quickstart from Keploy's official resources (`samples-go/gin-redis`).
2. Run and verify the application and backing dependencies (Redis) locally.
3. Attempt to record real API traffic and replay test cases using the Keploy CLI.
4. Capture notes and observations from the actual environment in `KEPLOY_RUN_NOTES.md`.
5. Build a documentation website using **Next.js (App Router)**, **MDX**, **TypeScript**, and **Tailwind CSS**.
6. Provide an intuitive developer experience with dark/light mode, responsive layout, copyable terminal blocks, an interactive architecture diagram, and a table of contents.
7. Prepare the project for public GitHub release and Vercel deployment.

---

## 💻 Tech Stack

- **Documentation Website:**
  - **Framework:** [Next.js 14 (App Router)](https://nextjs.org/)
  - **Content Format:** [MDX](https://mdxjs.com/) via `@next-mdx-remote/rsc`
  - **Language:** TypeScript 5
  - **Styling:** Tailwind CSS with custom typography and dark/light mode
  - **Icons:** [Lucide React](https://lucide.dev/)
  - **Deployment Target:** Vercel (zero-config static prerendering)

- **Application Under Test:**
  - **Language:** Go 1.27.1 (`go1.27.1 windows/amd64`)
  - **Web Framework:** [Gin Web Framework](https://github.com/gin-gonic/gin)
  - **Datastore / Cache:** [Redis](https://redis.io/) (`redis:latest` via Docker Desktop)
  - **Test & Mocking Engine:** [Keploy v2](https://keploy.io)

---

## 📂 Project Structure

```
E:\keploy\
├── app/
│   ├── globals.css              # Custom styling, typography, and theme variables
│   ├── layout.tsx               # Root HTML layout with SEO metadata & OpenGraph
│   └── page.tsx                 # Server Component rendering tutorial.mdx
├── components/
│   ├── ArchitectureDiagram.tsx  # Interactive Record vs Replay SVG diagram
│   ├── Callout.tsx              # Semantic callouts (info, tip, warning, error, success)
│   ├── CodeBlock.tsx            # Syntax-highlighted code container with copy button
│   ├── CommandBlock.tsx         # Terminal command container with prompt and copy button
│   ├── CopyButton.tsx           # Interactive clipboard copy button with checkmark feedback
│   ├── DocsLayout.tsx           # 3-column responsive documentation layout with mobile drawer
│   ├── Header.tsx               # Sticky header with Keploy branding and quick links
│   ├── InfoCard.tsx             # Card grid for environment and stack specifications
│   ├── Sidebar.tsx              # Left navigation sidebar
│   ├── Step.tsx                 # Numbered step wrapper for instructional flows
│   ├── TableOfContents.tsx      # Right sticky "On This Page" TOC with active scroll tracking
│   ├── ThemeToggle.tsx          # Light / Dark theme switcher with persistence
│   ├── Tip.tsx                  # Convenience wrapper for tip callout
│   └── Warning.tsx              # Convenience wrapper for warning callout
├── content/
│   └── tutorial.mdx             # Primary documentation content in MDX
├── samples-go/
│   └── gin-redis/               # Official Go + Gin + Redis sample codebase
├── ASSIGNMENT_CHECKLIST.md      # Itemized status of all assignment requirements
├── KEPLOY_RUN_NOTES.md          # Real environment run notes and technical findings
├── package.json                 # Project dependencies and npm scripts
├── postcss.config.js            # PostCSS configuration for Tailwind
├── tailwind.config.js           # Tailwind CSS configuration and brand tokens
├── tsconfig.json                # TypeScript compiler configuration
└── README.md                    # Project documentation
```

---

## 🚀 Local Development

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ (tested on Node v23.1.0)
- [npm](https://www.npmjs.com/) v9+ (tested on npm 10.9.0)
- [Docker Desktop](https://www.docker.com/) (running with Linux containers)
- [Go](https://go.dev/) 1.20+ (tested with Go 1.27.1)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Validation
```bash
# Typecheck
npm run typecheck

# Production build
npm run build

# Start production server
npm start -- -p 3000
```

---

## 🧪 Keploy Quickstart & Real Execution Experience

The selected quickstart is `samples-go/gin-redis`, an OTP generation and authentication API backed by Redis.

### 1. Start Redis in Docker
```powershell
docker run -p 6379:6379 -d --name myredis redis
```

### 2. Run and Verify the Go Application
Start the service natively on port 3001:
```powershell
cd samples-go/gin-redis
go run main.go
```

Verify the two API endpoints:
```powershell
# 1. Generate OTP
curl.exe -s "http://localhost:3001/api/getVerificationCode?email=test@example.com&username=devrel"
# Response: {"status":"true","message":"OTP Generated successfully","otp":"2519"}

# 2. Verify OTP (using returned OTP)
curl.exe -s -X POST "http://localhost:3001/api/verifyCode" `
  -H "Content-Type: application/json" `
  -d '{\"otp\":2519,\"email\":\"test@example.com\"}'
# Response: {"status":"true","token":"eyJhbGci...","username":"devrel","message":"OTP authenticated successfully"}
```

### 3. Keploy CLI Recording & Testing Commands
```powershell
# Record mode
keploy record -c "go run main.go"

# Test replay mode
keploy test -c "go run main.go" --delay 10
```

---

## 🔒 Windows Security Note (Factual Disclosure)

Per strict DevRel integrity rules, we report the actual environment status:
- When installing the Keploy Windows binary via official channels, Windows Defender flagged `C:\Users\<user>\.keploy\bin\keploy.exe` as `Trojan:Win32/Gracing.I` (`DidThreatExecute: False`).
- As instructed, **no antivirus exclusions were made, Windows Defender was not disabled, and no unofficial binaries were downloaded**.
- The issue is documented in `KEPLOY_RUN_NOTES.md` and highlighted inside the tutorial with manual steps for users to review in **Windows Security > Protection History**.

---

## 🚢 Vercel Deployment Guide

This project is built using standard Next.js App Router static prerendering and requires **zero server-side environment secrets**.

To deploy to Vercel:

1. **Commit and Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "feat: complete Keploy DevRel Candidate documentation website"
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Log in to your [Vercel Dashboard](https://vercel.com).
   - Click **Add New Project** &rarr; **Import Git Repository**.
   - Select your newly pushed GitHub repository.
   - Vercel automatically detects Next.js:
     - **Framework Preset:** `Next.js`
     - **Build Command:** `npm run build`
     - **Output Directory:** `.next`
     - **Install Command:** `npm install`
   - Click **Deploy**.
   - Once deployment finishes, Vercel will provide your live URL (e.g., `https://keploy-go-gin-redis-tutorial.vercel.app`).

---

## 📋 Assignment Checklist Summary

See [`ASSIGNMENT_CHECKLIST.md`](./ASSIGNMENT_CHECKLIST.md) for full itemized tracking.

- [x] Go quickstart selected (`samples-go/gin-redis`)
- [x] Go quickstart executed & verified with live curl calls
- [x] Redis configured and running via Docker
- [x] Authentic run notes documented (`KEPLOY_RUN_NOTES.md`)
- [x] Next.js 14 App Router project implemented
- [x] MDX tutorial created (`content/tutorial.mdx`)
- [x] Reusable documentation components (`Callout`, `Tip`, `Warning`, `Step`, `CodeBlock`, `CommandBlock`, `InfoCard`, `ArchitectureDiagram`)
- [x] Light / Dark mode toggle with local storage persistence
- [x] Copy code buttons with immediate checkmark feedback
- [x] Interactive architecture diagram (Record vs Replay modes)
- [x] Production build passes (`npm run build`)
- [x] TypeScript checks pass (`npm run typecheck`)
- [x] Browser verification completed via automated subagent
- [x] GitHub published (`https://github.com/atharv9003/keploy`)

---

## 👤 Author

- **Candidate:** DevRel Candidate
- **GitHub:** [atharv9003](https://github.com/atharv9003)
- **Repository:** [https://github.com/atharv9003/keploy](https://github.com/atharv9003/keploy)

