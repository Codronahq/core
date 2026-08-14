/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Codrona',
  description:
    'Adaptive competitive programming training and coaching platform.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-surface-base font-ui text-content-primary antialiased">
        <div className="flex-1">{children}</div>
        <footer className="border-t border-surface-border px-6 py-8">
          <p className="mx-auto max-w-3xl text-sm text-content-tertiary">
            Codrona is built on data and research published by others.{' '}
            <Link
              className="text-content-secondary underline underline-offset-4 hover:text-content-primary"
              href="/attributions"
            >
              Attributions and licences
            </Link>
            {' · '}
            <Link
              className="text-content-secondary underline underline-offset-4 hover:text-content-primary"
              href="/status"
            >
              Status and uptime checks
            </Link>
          </p>
        </footer>
      </body>
    </html>
  );
}
