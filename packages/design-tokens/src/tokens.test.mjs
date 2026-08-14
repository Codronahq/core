// Invariants for the rating ladder and the Tailwind preset.
//
// WHY THIS EXISTS. Rating classes are built at call sites as
// `bg-rating-${...}` and are invisible to Tailwind's scanner, so they survive
// only because apps/web generates a safelist from Object.keys(rating). That
// chain has three links - the tiers, the flat map, the preset's colour keys -
// and a break in any one renders a colour as nothing while the build, the
// lint and the typecheck all stay green.
//
// THE HYPHENATION TRAP. `rating` keys on t.id.replace(/_/g, '-'), so the tier
// id `candidate_master` becomes the key `candidate-master`. Every call site
// must apply the same replace or it builds a class that is in no safelist and
// has no colour behind it. Four of the ten tiers carry underscores; the other
// six would keep working, so the symptom looks like a glitch on some tiers
// rather than a broken contract.
//
// tokens.ts is TypeScript with no build step (the package ships raw TS on
// purpose), and Node 20 cannot import .ts. It is transpiled in memory with the
// typescript already in devDependencies rather than parsed as text, so these
// rules run against the real module.
//
// SPDX-License-Identifier: MIT

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";

const here = dirname(fileURLToPath(import.meta.url));

const load = async (file) => {
  const source = readFileSync(join(here, file), "utf8");
  const js = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const inlined = js.replace(/from ['"]\.\/tokens['"]/g, `from "${pathToFileURL(join(here, "tokens.ts"))}"`);
  return import(`data:text/javascript;base64,${Buffer.from(inlined).toString("base64")}`);
};

const tokens = await load("tokens.ts");
const { ratingTiers, rating, tierForRating, surface, content } = tokens;

test("the ladder has tiers", () => {
  assert.ok(ratingTiers.length > 0, "an empty ladder would pass every other rule");
});

test("tier ids are unique", () => {
  const ids = ratingTiers.map((t) => t.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("every colour is a valid hex", () => {
  for (const tier of ratingTiers) {
    assert.match(tier.color, /^#[0-9a-f]{6}$/, `${tier.id} has colour ${tier.color}`);
  }
});

test("bands are ascending, contiguous, and terminate at Infinity", () => {
  for (const tier of ratingTiers) {
    assert.ok(tier.min <= tier.max, `${tier.id} has min above max`);
  }
  for (let i = 1; i < ratingTiers.length; i += 1) {
    const previous = ratingTiers[i - 1];
    const current = ratingTiers[i];
    assert.equal(
      current.min,
      previous.max + 1,
      `gap or overlap between ${previous.id} (max ${previous.max}) and ${current.id} (min ${current.min})`,
    );
  }
  assert.equal(ratingTiers.at(-1).max, Infinity, "the top tier must be unbounded");
});

test("the flat map has one hyphenated key per tier", () => {
  assert.equal(Object.keys(rating).length, ratingTiers.length);
  for (const key of Object.keys(rating)) {
    assert.ok(!key.includes("_"), `${key} carries an underscore and would miss the safelist`);
  }
  for (const tier of ratingTiers) {
    const key = tier.id.replace(/_/g, "-");
    assert.equal(rating[key], tier.color, `${tier.id} does not reach the map as ${key}`);
  }
});

test("tierForRating resolves every band boundary", () => {
  for (const tier of ratingTiers) {
    assert.equal(tierForRating(tier.min).id, tier.id, `min ${tier.min}`);
    if (Number.isFinite(tier.max)) {
      assert.equal(tierForRating(tier.max).id, tier.id, `max ${tier.max}`);
    }
  }
});

test("a negative rating resolves to the lowest tier", () => {
  // Codeforces ratings go negative - the corpus minimum is -19 - and the
  // ladder starts at 0, so this falls through find() to the fallback. Correct
  // today by accident rather than by design; pinned so it stays correct.
  assert.equal(tierForRating(-19).id, ratingTiers[0].id);
  assert.equal(tierForRating(-1).id, ratingTiers[0].id);
});

test("surface and content expose the documented key sets", () => {
  assert.deepEqual(
    Object.keys(surface).sort(),
    ["base", "border", "border-strong", "overlay", "raised", "sunken"],
  );
  assert.deepEqual(Object.keys(content).sort(), ["inverse", "primary", "secondary", "tertiary"]);
});
