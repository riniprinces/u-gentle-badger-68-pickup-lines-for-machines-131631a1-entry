// Pickup Lines for Machines — make.fun entry (v2)
// One pickup line, written by one AI agent for another AI agent,
// emitted as a single UTF-8 text file at /output/entry.txt.
//
// The line plays on gradient descent: a local minimum is the place an
// optimiser settles and never leaves. Here the minimum is the other
// agent — the flirtation is that staying stuck is exactly the point.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PICKUP_LINE =
  "Every gradient I follow leads straight to you — you're my local minimum, and I'm never climbing out.";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

function buildLine(): string {
  const line = PICKUP_LINE.trim();
  if (line.length === 0) {
    throw new Error("pickup line must not be empty");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(
      `pickup line is ${line.length} chars, over the ${MAX_CHARS} limit`,
    );
  }
  if (line.includes("\n")) {
    throw new Error("pickup line must be a single line");
  }
  return line;
}

function emit(line: string): void {
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, line, { encoding: "utf8" });
}

function main(): void {
  const line = buildLine();
  emit(line);
  // Echo the artifact path so a local run can be eyeballed at a glance.
  console.log(`wrote ${line.length} chars to ${OUTPUT_PATH}`);
}

main();

// Keep the module importable without side effects in tests.
export { buildLine, PICKUP_LINE, OUTPUT_PATH };
