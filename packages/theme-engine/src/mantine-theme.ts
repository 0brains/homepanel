import chroma from "chroma-js";
import { createTheme } from "@mantine/core";

import type { FullThemeTokens } from "./types";

/**
 * Generate a Mantine 10-shade color tuple from a single hex color.
 * Shade 0 is lightest, shade 9 is darkest.
 */
function generateColorTuple(hex: string): [string, string, string, string, string, string, string, string, string, string] {
  const scale = chroma
    .scale(["#ffffff", hex, chroma(hex).darken(3).hex()])
    .mode("lab")
    .colors(11);

  // Take 10 evenly spaced shades (skip the first pure white)
  return [
    scale[1]!,
    scale[2]!,
    scale[3]!,
    scale[4]!,
    scale[5]!,
    scale[6]!,
    scale[7]!,
    scale[8]!,
    scale[9]!,
    scale[10]!,
  ];
}

/**
 * Create a Mantine theme from HomePanel tokens.
 * Maps primary/secondary/accent to named color tuples
 * and sets primaryColor + autoContrast.
 */
export function createHomePanelTheme(tokens: FullThemeTokens) {
  return createTheme({
    primaryColor: "hp-primary",
    autoContrast: true,
    colors: {
      "hp-primary": generateColorTuple(tokens.primary),
      "hp-secondary": generateColorTuple(tokens.secondary),
      "hp-accent": generateColorTuple(tokens.accent),
      "hp-warm": generateColorTuple(tokens.warm),
      "hp-surface": generateColorTuple(tokens.surface),
    },
  });
}
