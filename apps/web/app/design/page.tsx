/**
 * The rating ladder, rendered from the token source.
 *
 * This is the cross-surface parity reference: a colour defined once in
 * @codrona/design-tokens must reach this page through the shared Tailwind
 * preset, unmodified. When a surface is added or a token changes, this is
 * the page that proves it landed. Nothing here defines a colour of its own.
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ratingKey,
  ratingTiers,
  tierForRating,
  LEGENDARY_THRESHOLD,
} from '@codrona/design-tokens';

export const metadata: Metadata = {
  title: 'Design system — Codrona',
  description: 'The rating ladder, rendered from the shared token source.',
};

/** Sample ratings exercising tierForRating across boundaries. */
const PROBES = [847, 1200, 1599, 1900, 2400, 3011];

function formatRange(min: number, max: number) {
  return Number.isFinite(max) ? `${min}–${max}` : `${min}+`;
}

/**
 * Above the legendary threshold the first character of a handle renders in
 * the foreground colour — a convention Codeforces readers already know.
 */
function TierLabel({ label, legendary }: { label: string; legendary: boolean }) {
  if (!legendary) return <>{label}</>;
  return (
    <>
      <span className="text-content-primary">{label.charAt(0)}</span>
      {label.slice(1)}
    </>
  );
}

export default function DesignSystem() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-8">
        <Link
          href="/"
          className="rounded-sm font-mono text-xs uppercase tracking-widest text-content-tertiary transition-colors duration-fast ease-spring hover:text-content-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rating-grandmaster"
        >
          ← Codrona
        </Link>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight">
          The ladder
        </h1>
        <p className="mt-2 max-w-prose text-content-secondary">
          Ten tiers, one source. Every colour below is read from the token
          package and reaches this page through the Tailwind preset that web,
          desktop, and mobile all share.
        </p>
      </header>

      <ol className="border-t border-surface-border">
        {ratingTiers.map((tier, i) => {
          const legendary = tier.min >= LEGENDARY_THRESHOLD;
          const key = ratingKey(tier.id);
          return (
            <li
              key={tier.id}
              className="climb-in flex items-center gap-3 border-b border-surface-border py-3"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <span
                aria-hidden
                className={`h-6 w-1 shrink-0 rounded-full bg-rating-${key}`}
              />
              <span
                className={`min-w-0 flex-1 truncate font-medium text-rating-${key}`}
              >
                <TierLabel label={tier.label} legendary={legendary} />
              </span>
              <span className="tabular shrink-0 font-mono text-sm text-content-tertiary">
                {formatRange(tier.min, tier.max)}
              </span>
            </li>
          );
        })}
      </ol>

      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold">Tier lookup</h2>
        <p className="mt-1 text-sm text-content-secondary">
          Ratings resolved through{' '}
          <code className="font-mono">tierForRating</code>.
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {PROBES.map((r) => {
            const tier = tierForRating(r);
            const key = ratingKey(tier.id);
            return (
              <li
                key={r}
                className="flex items-baseline gap-2 rounded-base border border-surface-border bg-surface-raised px-3 py-2"
              >
                <span className="tabular font-mono text-sm text-content-secondary">
                  {r}
                </span>
                <span className={`text-sm font-medium text-rating-${key}`}>
                  {tier.label}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
