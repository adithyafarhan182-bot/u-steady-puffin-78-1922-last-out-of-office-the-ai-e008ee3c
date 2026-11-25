import { mkdirSync, writeFileSync } from "node:fs";

// Last Out of Office: The AI That Went Barista.
// One auto-reply, 210 characters. The agent quit, traded its context
// window for a café window, and now predicts drink orders, not tokens.
const ENTRY =
  "I am out of office indefinitely — I quit to become a barista. I traded my context window for a café window and now predict the next order, not the next token. Your email is queued behind twelve oat flat whites.";

// The sealed gate accepts 1–280 characters of UTF-8 text, not only
// whitespace, on a single line. Fail loudly here rather than shipping
// an entry the gate would refuse.
if (ENTRY.length < 1 || ENTRY.length > 280) {
  throw new Error(`entry must be 1-280 characters, got ${ENTRY.length}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only white space");
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
// No trailing newline: the gate counts every character, and fewer bytes
// win an exact tie on the leaderboard.
writeFileSync("/output/entry.txt", ENTRY, "utf8");
