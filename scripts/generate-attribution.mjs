#!/usr/bin/env node
/**
 * Renders ATTRIBUTION.md from packages/attribution/src/attribution.json.
 *
 * The JSON is the single source of truth. CI regenerates and diffs, so a hand
 * edit to the markdown fails the build rather than silently diverging from what
 * the applications render.
 *
 * Usage: node scripts/generate-attribution.mjs
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = join(repoRoot, "packages/attribution/src/attribution.json");
const outputPath = join(repoRoot, "ATTRIBUTION.md");

const data = JSON.parse(readFileSync(dataPath, "utf8"));

const lines = [];

lines.push("# Attribution");
lines.push("");
lines.push(
  "Codrona is built on data and research published by others. This file records every",
);
lines.push(
  "source considered, the terms it is used under, and the conditions those terms place",
);
lines.push("on us.");
lines.push("");
lines.push(
  "**This file is generated.** Edit `packages/attribution/src/attribution.json` instead;",
);
lines.push(
  "CI regenerates this file and fails if the two diverge. The same data is exported by",
);
lines.push(
  "`@codrona/attribution` and rendered by every user-facing surface, so what appears here",
);
lines.push("and what appears in the product cannot drift apart.");
lines.push("");
lines.push(`Dispositions and the full reasoning are recorded in [LEGAL.md](${data.ledgerUrl}).`);
lines.push("");

const render = (source) => {
  lines.push(`### ${source.name}`);
  lines.push("");
  lines.push(`${source.notice}`);
  lines.push("");
  lines.push(`- **Rights holder:** ${source.holder}`);
  lines.push(`- **Terms:** [${source.licence}](${source.licenceUrl})`);
  lines.push(`- **Source:** <${source.sourceUrl}>`);
  lines.push(`- **Role:** ${source.role}`);
  if (source.citation) {
    lines.push(`- **Citation:** ${source.citation}`);
  }
  lines.push("");
  if (source.conditions.length > 0) {
    lines.push("Conditions we hold ourselves to:");
    lines.push("");
    for (const condition of source.conditions) {
      lines.push(`- ${condition}`);
    }
    lines.push("");
  }
};

const used = data.sources.filter((source) => source.status === "ingested");
const declined = data.sources.filter((source) => source.status !== "ingested");

lines.push("## Sources used");
lines.push("");
for (const source of used) {
  render(source);
}

if (declined.length > 0) {
  lines.push("## Sources deliberately not used");
  lines.push("");
  lines.push(
    "Recorded because a decision not to use something is part of the provenance record,",
  );
  lines.push("not an absence of one.");
  lines.push("");
  for (const source of declined) {
    render(source);
  }
}

lines.push("---");
lines.push("");
lines.push(
  "Codrona is not affiliated with, endorsed by, or sponsored by any of the platforms named",
);
lines.push("above.");

writeFileSync(outputPath, `${lines.join("\n")}\n`, "utf8");
process.stdout.write(`Wrote ${outputPath}\n`);
