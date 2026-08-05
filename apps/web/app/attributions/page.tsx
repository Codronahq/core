/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Rendered entirely from @codrona/attribution. Nothing on this page is written
 * by hand, so it cannot drift from ATTRIBUTION.md or from the other surfaces.
 */
import type { Metadata } from 'next';
import type { AttributionSource } from '@codrona/attribution';
import {
  attributionCitations,
  attributionLedgerUrl,
  attributionSources,
} from '@codrona/attribution';

export const metadata: Metadata = {
  title: 'Attributions — Codrona',
  description:
    'The data sources Codrona is built on, the terms they are used under, and the conditions those terms place on us.',
};

const used = attributionSources.filter((source) => source.status === 'ingested');
const declined = attributionSources.filter(
  (source) => source.status !== 'ingested',
);

function SourceCard({ source }: { source: AttributionSource }) {
  return (
    <article className="rounded-lg border border-surface-border bg-surface-raised p-6">
      <h3 className="font-display text-lg text-content-primary">{source.name}</h3>

      <p className="mt-3 text-sm leading-relaxed text-content-secondary">
        {source.notice}
      </p>

      <dl className="mt-5 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-[auto_1fr]">
        <dt className="text-content-tertiary">Rights holder</dt>
        <dd className="text-content-secondary">{source.holder}</dd>

        <dt className="text-content-tertiary">Terms</dt>
        <dd>
          <a
            className="text-content-secondary underline underline-offset-4 hover:text-content-primary"
            href={source.licenceUrl}
            rel="noreferrer"
            target="_blank"
          >
            {source.licence}
          </a>
        </dd>

        <dt className="text-content-tertiary">Source</dt>
        <dd>
          <a
            className="break-all text-content-secondary underline underline-offset-4 hover:text-content-primary"
            href={source.sourceUrl}
            rel="noreferrer"
            target="_blank"
          >
            {source.sourceUrl}
          </a>
        </dd>

        <dt className="text-content-tertiary">Role</dt>
        <dd className="text-content-secondary">{source.role}</dd>
      </dl>

      {source.conditions.length > 0 && (
        <div className="mt-5 border-t border-surface-border pt-4">
          <p className="text-xs uppercase tracking-wide text-content-tertiary">
            Conditions we hold ourselves to
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-content-secondary">
            {source.conditions.map((condition) => (
              <li key={condition} className="flex gap-2">
                <span aria-hidden="true" className="text-content-tertiary">
                  —
                </span>
                <span>{condition}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

export default function AttributionsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-3xl text-content-primary">Attributions</h1>

      <p className="mt-4 leading-relaxed text-content-secondary">
        Codrona is built on data and research published by others. Every source we
        considered is listed here, with the terms it is used under and the
        conditions those terms place on us.
      </p>

      <p className="mt-4 text-sm text-content-tertiary">
        The full provenance ledger, including the reasoning behind each decision,
        is{' '}
        <a
          className="underline underline-offset-4 hover:text-content-secondary"
          href={attributionLedgerUrl}
          rel="noreferrer"
          target="_blank"
        >
          published alongside the source
        </a>
        .
      </p>

      <h2 className="mt-12 font-display text-xl text-content-primary">
        Sources used
      </h2>
      <div className="mt-5 space-y-5">
        {used.map((source) => (
          <SourceCard key={source.id} source={source} />
        ))}
      </div>

      {declined.length > 0 && (
        <>
          <h2 className="mt-12 font-display text-xl text-content-primary">
            Sources deliberately not used
          </h2>
          <p className="mt-3 text-sm text-content-tertiary">
            Recorded because a decision not to use something is part of the
            provenance record, not an absence of one.
          </p>
          <div className="mt-5 space-y-5">
            {declined.map((source) => (
              <SourceCard key={source.id} source={source} />
            ))}
          </div>
        </>
      )}

      {attributionCitations.length > 0 && (
        <>
          <h2 className="mt-12 font-display text-xl text-content-primary">
            Citations
          </h2>
          <ul className="mt-5 space-y-3">
            {attributionCitations.map((citation) => (
              <li
                key={citation}
                className="rounded-lg border border-surface-border bg-surface-raised p-4 font-mono text-xs leading-relaxed text-content-secondary"
              >
                {citation}
              </li>
            ))}
          </ul>
        </>
      )}

      <p className="mt-12 border-t border-surface-border pt-6 text-sm text-content-tertiary">
        Codrona is not affiliated with, endorsed by, or sponsored by any of the
        platforms named above.
      </p>
    </main>
  );
}
