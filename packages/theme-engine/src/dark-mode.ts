import chroma from "chroma-js";

import type { MappedTokens } from "./types";

/**
 * Invert the palette mapping for dark mode.
 * In dark mode, the surface becomes dark and primary becomes a lighter accent.
 */
export function invertForDarkMode(mapped: MappedTokens): MappedTokens {
  return {
    primary: chroma(mapped.primary).brighten(1).hex(),
    secondary: chroma(mapped.secondary).brighten(0.5).hex(),
    accent: mapped.accent,
    warm: mapped.warm,
    surface: chroma(mapped.primary).darken(2).hex(),
  };
}
