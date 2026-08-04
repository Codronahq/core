/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import type { Metadata } from 'next';
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
      <body className="min-h-screen bg-surface-base font-ui text-content-primary antialiased">
        {children}
      </body>
    </html>
  );
}
