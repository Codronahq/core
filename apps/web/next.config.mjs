/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // @codrona/design-tokens and @codrona/attribution publish raw .ts from src/
  // with no build step, so Next has to compile them rather than treat them as
  // pre-built JS.
  transpilePackages: ['@codrona/design-tokens', '@codrona/attribution'],
};

export default nextConfig;
