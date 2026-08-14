/**
 * Codrona design tokens — the single source of truth.
 *
 * Consumed by:
 *   apps/web      (Tailwind, via tailwind-preset.ts)
 *   apps/desktop  (Tailwind, same preset)
 *   apps/mobile   (NativeWind, same preset)
 *   apps/api      (OG card rendering, rating badge serialisation)
 *
 * Nothing downstream defines a colour, radius, or duration of its own.
 * Cross-surface parity is a hard rule: a change here lands on every surface
 * in the same commit.
 *
 * SPDX-License-Identifier: MIT
 */

/* ------------------------------------------------------------------ *
 * Rating ladder
 *
 * Competitive programming already has a colour system that its audience
 * reads fluently, so Codrona adopts it rather than inventing one. The raw
 * Codeforces palette is tuned for a white page — pure #FF0000 and #0000FF
 * vibrate badly on a dark surface and fail contrast at small sizes.
 *
 * The values below are the Radix step-9 dark scale, which preserves each
 * tier's hue identity while holding accessible contrast on our surfaces.
 * The ladder lands exactly on #e5484d at grandmaster — the same crimson
 * the brand already uses. The summit of the climb and the brand mark are
 * the same colour, which is the reason this system was chosen.
 * ------------------------------------------------------------------ */

export const ratingTiers = [
  { id: 'newbie',                  min:    0, max: 1199, label: 'Newbie',                  color: '#6e6e6e' },
  { id: 'pupil',                   min: 1200, max: 1399, label: 'Pupil',                   color: '#30a46c' },
  { id: 'specialist',              min: 1400, max: 1599, label: 'Specialist',              color: '#00a2c7' },
  { id: 'expert',                  min: 1600, max: 1899, label: 'Expert',                  color: '#0090ff' },
  { id: 'candidate_master',        min: 1900, max: 2099, label: 'Candidate Master',        color: '#6e56cf' },
  { id: 'master',                  min: 2100, max: 2299, label: 'Master',                  color: '#f76b15' },
  { id: 'international_master',    min: 2300, max: 2399, label: 'International Master',    color: '#ff801f' },
  { id: 'grandmaster',             min: 2400, max: 2599, label: 'Grandmaster',             color: '#e5484d' },
  { id: 'international_grandmaster', min: 2600, max: 2999, label: 'International Grandmaster', color: '#ec5d5e' },
  { id: 'legendary_grandmaster',   min: 3000, max: Infinity, label: 'Legendary Grandmaster', color: '#e5484d' },
] as const;

export type RatingTierId = (typeof ratingTiers)[number]['id'];

/** Legendary tier renders its first character in the foreground colour. */
export const LEGENDARY_THRESHOLD = 3000;

export function tierForRating(rating: number) {
  return ratingTiers.find((t) => rating >= t.min && rating <= t.max) ?? ratingTiers[0];
}

/**
 * Tier id -> Tailwind class fragment.
 *
 * Tier ids are underscored (`candidate_master`) while class names are
 * hyphenated (`bg-rating-candidate-master`), and the safelist in every app is
 * generated from `Object.keys(rating)`. A call site that builds
 * `bg-rating-${tier.id}` directly therefore produces a class that is in no
 * safelist and has no colour behind it: Tailwind purges it, the build stays
 * green, and the tier renders as nothing. Six of the ten tiers are single
 * words and would keep working, so the symptom looks like a glitch on some
 * tiers rather than a broken contract.
 *
 * Use this rather than repeating the transform.
 */
export function ratingKey(id: RatingTierId): string {
  return id.replace(/_/g, '-');
}

/** Flat id -> hex map, for Tailwind and NativeWind consumption. */
export const rating = Object.fromEntries(
  ratingTiers.map((t) => [ratingKey(t.id), t.color]),
) as Record<string, string>;

/* ------------------------------------------------------------------ *
 * Surfaces — dark-first
 * ------------------------------------------------------------------ */

export const surface = {
  base:    '#0b0b0d',  // page
  raised:  '#131316',  // cards, panels
  overlay: '#1a1a1f',  // modals, popovers
  sunken:  '#08080a',  // code wells, editor gutter
  border:  '#26262b',
  'border-strong': '#35353b',
} as const;

export const content = {
  primary:   '#ededef',
  secondary: '#a0a0a8',
  tertiary:  '#6f6f78',
  inverse:   '#0b0b0d',
} as const;

/* ------------------------------------------------------------------ *
 * Semantic — verdicts and progress
 *
 * Verdict colours are deliberately NOT drawn from the rating ladder.
 * A green "accepted" must never be mistaken for pupil-tier green in a
 * submissions table, so verdicts use their own narrow set.
 * ------------------------------------------------------------------ */

export const verdict = {
  accepted:            '#46a758',
  'wrong-answer':      '#e5484d',
  'time-limit':        '#f76b15',
  'memory-limit':      '#f76b15',
  'runtime-error':     '#d6409f',
  'compile-error':     '#8e8e96',
  pending:             '#0090ff',
} as const;

export const difficulty = {
  trivial: '#6e6e6e',
  easy:    '#30a46c',
  medium:  '#f76b15',
  hard:    '#e5484d',
} as const;

/* ------------------------------------------------------------------ *
 * Mastery stages (Shu-Ha-Ri)
 * ------------------------------------------------------------------ */

export const stage = {
  shu: '#00a2c7',  // guided drills
  ha:  '#6e56cf',  // pattern breaking
  ri:  '#e5484d',  // free climb
} as const;

/* ------------------------------------------------------------------ *
 * Typography
 *
 * Ratings, verdicts, timings, and every column of a leaderboard are
 * numeric, so the mono face carries tabular figures and is the default
 * for all numeric UI — not just code. A rating that changes width when
 * it ticks from 1499 to 1500 is a bug.
 * ------------------------------------------------------------------ */

export const fontFamily = {
  display: ['Archivo', 'system-ui', 'sans-serif'],
  ui:      ['Archivo', 'system-ui', 'sans-serif'],
  mono:    ['JetBrains Mono', 'ui-monospace', 'monospace'],
} as const;

export const fontSize = {
  xs:   ['0.75rem',  { lineHeight: '1rem' }],
  sm:   ['0.875rem', { lineHeight: '1.25rem' }],
  base: ['1rem',     { lineHeight: '1.5rem' }],
  lg:   ['1.125rem', { lineHeight: '1.75rem' }],
  xl:   ['1.375rem', { lineHeight: '1.875rem' }],
  '2xl': ['1.75rem', { lineHeight: '2.125rem', letterSpacing: '-0.01em' }],
  '3xl': ['2.25rem', { lineHeight: '2.5rem',   letterSpacing: '-0.02em' }],
  '4xl': ['3rem',    { lineHeight: '3.25rem',  letterSpacing: '-0.03em' }],
} as const;

/* ------------------------------------------------------------------ *
 * Motion — 150-250ms, spring-weighted
 * ------------------------------------------------------------------ */

export const duration = {
  instant: '80ms',
  fast:    '150ms',
  base:    '200ms',
  slow:    '250ms',
  climb:   '600ms',  // rating-up celebration only
} as const;

export const easing = {
  spring:   'cubic-bezier(0.22, 1, 0.36, 1)',
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  exit:     'cubic-bezier(0.4, 0, 1, 1)',
} as const;

/* ------------------------------------------------------------------ *
 * Geometry
 * ------------------------------------------------------------------ */

export const radius = {
  none: '0',
  sm:   '0.25rem',
  base: '0.375rem',
  md:   '0.5rem',
  lg:   '0.75rem',
  full: '9999px',
} as const;

export const space = {
  0: '0', 1: '0.25rem', 2: '0.5rem', 3: '0.75rem', 4: '1rem',
  5: '1.5rem', 6: '2rem', 7: '3rem', 8: '4rem', 9: '6rem',
} as const;

export const tokens = {
  rating, surface, content, verdict, difficulty, stage,
  fontFamily, fontSize, duration, easing, radius, space,
} as const;

export default tokens;
