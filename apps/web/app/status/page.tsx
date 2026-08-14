/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * The public half of the always-live guarantee in codrona.md section 7. The
 * Uptime workflow checks both public endpoints and asserts their content; this
 * page reports what those checks found.
 *
 * Metadata must be exported from a server component, so the page itself is a
 * shell and the fetching lives in StatusReport.
 */
import type { Metadata } from 'next';
import StatusReport from './StatusReport';

export const metadata: Metadata = {
  title: 'Status — Codrona',
  description:
    'Automated availability checks on codrona.vercel.app, reported from their own run history.',
};

export default function StatusPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <header>
        <h1 className="font-display text-3xl text-content-primary">Status</h1>
        <p className="mt-3 text-sm leading-relaxed text-content-secondary">
          A scheduled job fetches every public page and asserts that each one
          returns 200, exceeds a size floor, and still contains the text it is
          obliged to serve — including the Community Data License Agreement
          notice that Project CodeNet requires. This page reports the outcome
          of those checks, read live from their run history.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-content-tertiary">
          Two honest caveats. The schedule is best-effort: GitHub throttles
          scheduled jobs on shared runners, so the real interval between checks
          is longer and more variable than the requested five minutes, and the
          gaps below are the measured truth rather than a target. And this page
          is served by the site it reports on, so it cannot tell you the site
          is down — it can only tell you what the last checks found.
        </p>
      </header>
      <StatusReport />
    </main>
  );
}
