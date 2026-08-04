/**
 * The public front door.
 *
 * Deliberately carries no metrics, counts, or claims about data that has not
 * been ingested yet (codrona.md §14, honesty protocol). Nothing here can
 * drift from Canonical Numbers because nothing here is a number.
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import Link from 'next/link';
import { ratingTiers } from '@codrona/design-tokens';

const PILLARS = [
  {
    title: 'It works out where you are',
    body: 'A skill model reads your solved history across judges to find what you can do, what you cannot do yet, and which topics are quietly weak.',
  },
  {
    title: 'It picks what comes next',
    body: 'Not a copied sheet. Problems chosen at the edge of your ability and ordered toward a target rating or an assessment date, adjusted as you go.',
  },
  {
    title: 'It coaches rather than answers',
    body: 'When a submission fails it runs your code, finds where the reasoning broke, and asks until you see it. During a live contest it declines to help at all.',
  },
];

/** The ladder, compressed to a single rule. The one flourish on the page. */
function LadderRule() {
  return (
    <div
      aria-hidden
      className="mt-6 flex h-1 w-full max-w-sm overflow-hidden rounded-full"
    >
      {ratingTiers.map((tier) => (
        <span
          key={tier.id}
          className={`flex-1 bg-rating-${tier.id.replace(/_/g, '-')}`}
        />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-9">
      <header>
        <p className="font-mono text-xs uppercase tracking-widest text-content-tertiary">
          In development · built in the open
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight">
          Codrona
        </h1>
        <p className="mt-2 font-mono text-sm text-rating-grandmaster">
          Strictly increasing.
        </p>
        <LadderRule />
        <p className="mt-6 max-w-prose text-lg text-content-secondary">
          An adaptive coach for competitive programming. It learns what you can
          solve, hands you the problem just past that edge, and teaches you
          through the ones you get wrong.
        </p>
      </header>

      <section className="mt-9 grid gap-5 sm:grid-cols-3">
        {PILLARS.map((pillar) => (
          <article key={pillar.title}>
            <h2 className="font-display text-base font-semibold">
              {pillar.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-content-secondary">
              {pillar.body}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-9 rounded-md border border-surface-border bg-surface-raised p-5">
        <h2 className="font-display text-base font-semibold">Where it stands</h2>
        <p className="mt-2 max-w-prose text-sm leading-relaxed text-content-secondary">
          Codrona is being built in public and is not usable yet. The source is
          open, the roadmap is a checklist anyone can read, and the work happens
          commit by commit rather than behind a launch date.
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <a
            href="https://github.com/codronahq"
            className="rounded-sm text-content-primary underline decoration-surface-border-strong underline-offset-4 transition-colors duration-fast ease-spring hover:decoration-content-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rating-grandmaster"
          >
            Read the source
          </a>
          <Link
            href="/design"
            className="rounded-sm text-content-secondary underline decoration-surface-border underline-offset-4 transition-colors duration-fast ease-spring hover:text-content-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rating-grandmaster"
          >
            Design system
          </Link>
        </div>
      </section>

      <footer className="mt-9 border-t border-surface-border pt-4 text-sm text-content-tertiary">
        Built by{' '}
        <a
          href="https://github.com/ayushgupta07xx"
          className="rounded-sm text-content-secondary underline decoration-surface-border underline-offset-4 transition-colors duration-fast ease-spring hover:text-content-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rating-grandmaster"
        >
          Ayush Gupta
        </a>
      </footer>
    </main>
  );
}
