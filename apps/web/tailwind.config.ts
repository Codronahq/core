/**
 * The web surface defines no design values of its own. Every colour, radius,
 * duration, and type step arrives through the shared preset so that web,
 * desktop, and mobile cannot drift apart.
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import type { Config } from 'tailwindcss';
import { rating } from '@codrona/design-tokens';
import preset from '@codrona/design-tokens/tailwind';

// Rating classes are built from tier ids at runtime (`bg-rating-${tier.id}`),
// so Tailwind's static scanner never sees them and would purge every one.
// Generating the safelist from the same token map keeps it from going stale.
const ratingClasses = Object.keys(rating).flatMap((key) => [
  `bg-rating-${key}`,
  `text-rating-${key}`,
]);

const config: Config = {
  presets: [preset as unknown as Config],
  content: ['./app/**/*.{ts,tsx}'],
  safelist: ratingClasses,
};

export default config;
