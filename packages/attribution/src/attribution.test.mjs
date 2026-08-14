// Data-contract tests for the canonical attribution record.
//
// WHY THIS EXISTS. index.ts asserts `data.sources as readonly
// AttributionSource[]` - an unchecked cast, so TypeScript validates nothing
// about what the JSON actually contains. A source missing `notice`, or
// carrying `status: "ingsted"`, typechecks clean and ships.
//
// WHAT THAT WOULD COST. displayedAttributions filters on status ===
// "ingested", so a typo silently drops a source from every rendered surface.
// For CDLA-Permissive-2.0 that is an unmet licence obligation rather than a
// cosmetic bug, and nothing else catches it: the generator renders the source
// into "deliberately not used", and attribution:check still passes because the
// markdown matches the JSON that produced it.
//
// The uptime workflow greps the live page for CDLA and CodeNet. This gates the
// same obligation at the data layer, so the two meet from both ends.
//
// No new dependency: node --test ships with Node 20.
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(readFileSync(join(here, "attribution.json"), "utf8"));

const REQUIRED = [
  "id", "name", "holder", "licence", "licenceUrl",
  "sourceUrl", "status", "role", "notice", "conditions",
];
const STATUSES = new Set(["ingested", "not-ingested"]);

test("the record holds sources", () => {
  assert.ok(Array.isArray(data.sources));
  assert.ok(data.sources.length > 0, "an empty record would pass every other rule");
});

test("every source carries every required field, non-empty", () => {
  for (const source of data.sources) {
    for (const field of REQUIRED) {
      assert.ok(field in source, `${source.id ?? "?"} is missing ${field}`);
      const value = source[field];
      if (field === "conditions") {
        assert.ok(Array.isArray(value), `${source.id}.conditions must be an array`);
        continue;
      }
      assert.equal(typeof value, "string", `${source.id}.${field} must be a string`);
      assert.notEqual(value.trim(), "", `${source.id}.${field} is empty`);
    }
  }
});

test("every status is one of the two the type allows", () => {
  // The typo case. index.ts casts rather than validates, so "ingsted" would
  // drop a source from every surface with no other symptom.
  for (const source of data.sources) {
    assert.ok(STATUSES.has(source.status), `${source.id} has status ${JSON.stringify(source.status)}`);
  }
});

test("ids are unique", () => {
  const ids = data.sources.map((source) => source.id);
  assert.equal(new Set(ids).size, ids.length, `duplicate id in ${ids.join(", ")}`);
});

test("every url is absolute https", () => {
  for (const source of data.sources) {
    for (const field of ["licenceUrl", "sourceUrl"]) {
      assert.match(source[field], /^https:\/\//, `${source.id}.${field} is not absolute https`);
    }
  }
  assert.match(data.ledgerUrl, /^https:\/\//, "ledgerUrl is not absolute https");
});

test("at least one source is displayed, and each carries a notice", () => {
  const displayed = data.sources.filter((source) => source.status === "ingested");
  assert.ok(displayed.length > 0, "no displayed sources means no notice is rendered anywhere");
  for (const source of displayed) {
    assert.notEqual(source.notice.trim(), "");
  }
});

test("CodeNet is displayed and its notice names the licence it obliges", () => {
  // CDLA-Permissive-2.0 requires the notice be served to anonymous visitors.
  // The uptime workflow greps the live page for exactly these strings.
  const codenet = data.sources.find((source) => source.id === "codenet");
  assert.ok(codenet, "codenet absent from the attribution record");
  assert.equal(codenet.status, "ingested");
  // The notice must carry the wording CDLA-Permissive-2.0 itself requires, not
  // the abbreviation. "CDLA" appears on the rendered page only as the Terms
  // link label, generated from `licence` - so asserting the short form would
  // gate a label while the obligation-bearing sentence could vanish unnoticed.
  assert.match(codenet.notice, /Community Data License Agreement/);
  assert.match(codenet.notice, /Permissive/);
  assert.match(codenet.notice, /Version 2\.0/);
  assert.match(codenet.notice, /CodeNet/);
  assert.match(codenet.notice, /IBM Research/);
});
