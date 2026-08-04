/**
 * `next lint` was deprecated in Next 15.5 and removed in 16, so ESLint is
 * wired up directly here rather than through the framework wrapper.
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['.next/**', 'next-env.d.ts', 'node_modules/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
);
