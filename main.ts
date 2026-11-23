import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY_TEXT =
  "CAUTION: Contains small parts. May lose them, replace them, then immediately find the originals.";

// Validate the entry against the competition gate before writing it out.
// The gate allows 1-160 characters on a single line.
function validateEntry(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("ENTRY_TEXT must not be empty or whitespace-only");
  }
  if (text.length < 1 || text.length > 160) {
    throw new Error(`ENTRY_TEXT length must be 1-160 characters, got ${text.length}`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("ENTRY_TEXT must be a single line without newline characters");
  }
  const byteLength = Buffer.byteLength(text, "utf8");
  if (byteLength < 1 || byteLength > 160) {
    throw new Error(`ENTRY_TEXT UTF-8 byte length must be 1-160 bytes, got ${byteLength}`);
  }
}

validateEntry(ENTRY_TEXT);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY_TEXT, "utf8");
