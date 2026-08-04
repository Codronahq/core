/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // @codrona/design-tokens publishes raw .ts from src/ with no build step,
  // so Next has to compile it rather than treat it as pre-built JS.
  transpilePackages: ['@codrona/design-tokens'],
};

export default nextConfig;
