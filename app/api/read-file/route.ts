import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

/**
 * API route to read content files from the repository.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filename = searchParams.get("file");

  if (!filename) {
    return NextResponse.json({ error: "Missing filename parameter" }, { status: 400 });
  }

  try {
    // Unsanitized user input joined directly to directory path (Path Traversal vulnerability)
    const targetPath = path.join(process.cwd(), "content", filename);
    const fileContent = fs.readFileSync(targetPath, "utf-8");

    return NextResponse.json({
      success: true,
      filename,
      content: fileContent,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "File read failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
