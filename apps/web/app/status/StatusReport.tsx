/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Fetched in the browser rather than at build time. A prerendered status page
 * bakes in whatever the runs looked like when it was built and then reports
 * that indefinitely, which is worse than having no page at all.
 *
 * The GitHub API is read unauthenticated - the repository is public and no
 * token belongs in a client bundle. That caps a visitor at 60 requests an hour
 * from their own address, so an exhausted limit is an expected state and says
 * so, with a link to the runs themselves.
 */
'use client';

import { useEffect, useState } from 'react';

const RUNS_URL =
  'https://api.github.com/repos/codronahq/core/actions/workflows/uptime.yml/runs?per_page=30';
const ACTIONS_URL =
  'https://github.com/codronahq/core/actions/workflows/uptime.yml';

interface Run {
  id: number;
  conclusion: string | null;
  status: string;
  created_at: string;
  html_url: string;
}

function relative(iso: string): string {
  const minutes = Math.round((Date.now() - Date.parse(iso)) / 60000);
  if (minutes < 1) {
    return 'just now';
  }
  if (minutes < 60) {
    return `${minutes}m ago`;
  }
  const hours = Math.round(minutes / 60);
  if (hours < 24) {
    return `${hours}h ago`;
  }
  return `${Math.round(hours / 24)}d ago`;
}

export default function StatusReport() {
  const [runs, setRuns] = useState<Run[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(RUNS_URL, { headers: { Accept: 'application/vnd.github+json' } })
      .then((response) => {
        if (response.status === 403 || response.status === 429) {
          throw new Error(
            'GitHub is rate limiting this address. The checks are still running.',
          );
        }
        if (!response.ok) {
          throw new Error(`GitHub returned ${response.status}.`);
        }
        return response.json();
      })
      .then((data: { workflow_runs?: Run[] }) => {
        if (!cancelled) {
          setRuns(data.workflow_runs ?? []);
        }
      })
      .catch((cause: Error) => {
        if (!cancelled) {
          setError(cause.message);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error !== null) {
    return (
      <section className="mt-10 rounded-lg border border-surface-border bg-surface-raised p-6">
        <p className="text-sm text-content-secondary">{error}</p>
        <a
          className="mt-3 inline-block text-sm text-content-secondary underline underline-offset-4 hover:text-content-primary"
          href={ACTIONS_URL}
          rel="noreferrer"
          target="_blank"
        >
          Read the checks directly on GitHub
        </a>
      </section>
    );
  }

  if (runs === null) {
    return (
      <p className="mt-10 text-sm text-content-tertiary">Reading the checks…</p>
    );
  }

  const finished = runs.filter((run) => run.conclusion !== null);
  const passed = finished.filter((run) => run.conclusion === 'success').length;
  const latest = finished[0];
  const healthy = latest !== undefined && latest.conclusion === 'success';

  return (
    <section className="mt-10">
      <div className="rounded-lg border border-surface-border bg-surface-raised p-6">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className={`h-2.5 w-2.5 shrink-0 rounded-full ${
              healthy ? 'bg-rating-pupil' : 'bg-rating-grandmaster'
            }`}
          />
          <h2 className="font-display text-lg text-content-primary">
            {latest === undefined
              ? 'No checks recorded yet'
              : healthy
                ? 'All checks passing'
                : 'The last check failed'}
          </h2>
        </div>
        {latest !== undefined ? (
          <p className="mt-3 text-sm text-content-secondary">
            {passed} of {finished.length} recent checks passed. Last checked{' '}
            {relative(latest.created_at)}.
          </p>
        ) : null}
      </div>

      <ol className="mt-6 border-t border-surface-border">
        {finished.map((run) => (
          <li
            key={run.id}
            className="flex items-center gap-3 border-b border-surface-border py-3"
          >
            <span
              aria-hidden
              className={`h-4 w-1 shrink-0 rounded-full ${
                run.conclusion === 'success'
                  ? 'bg-rating-pupil'
                  : 'bg-rating-grandmaster'
              }`}
            />
            <span className="min-w-0 flex-1 truncate text-sm text-content-secondary">
              {run.conclusion === 'success'
                ? 'Passed'
                : `Failed (${run.conclusion})`}
            </span>
            <a
              className="tabular shrink-0 font-mono text-xs text-content-tertiary underline underline-offset-4 hover:text-content-secondary"
              href={run.html_url}
              rel="noreferrer"
              target="_blank"
            >
              {relative(run.created_at)}
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
