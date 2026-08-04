/**
 * Tailwind preset shared by web, desktop, and mobile (NativeWind).
 * Import this rather than redefining any value.
 *
 * SPDX-License-Identifier: MIT
 */
import type { Config } from 'tailwindcss';
import {
  rating, surface, content, verdict, difficulty, stage,
  fontFamily, fontSize, duration, radius, space,
} from './tokens';

const preset: Omit<Config, 'content'> = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        rating,
        surface,
        content,
        verdict,
        difficulty,
        stage,
      },
      fontFamily: fontFamily as unknown as Record<string, string[]>,
      fontSize: fontSize as unknown as Record<string, [string, object]>,
      borderRadius: radius,
      spacing: space,
      transitionDuration: {
        instant: duration.instant,
        fast: duration.fast,
        base: duration.base,
        slow: duration.slow,
        climb: duration.climb,
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.22, 1, 0.36, 1)',
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        exit: 'cubic-bezier(0.4, 0, 1, 1)',
      },
      fontVariantNumeric: {
        tabular: 'tabular-nums',
      },
    },
  },
};

export default preset;
