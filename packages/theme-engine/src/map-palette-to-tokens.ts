import chroma from "chroma-js";

import type { CoolorsTokens, MappedTokens } from "./types";

/**
 * Sort the 5 palette colors by luminance (darkest → lightest)
 * and map them to semantic token roles.
 *
 * | Position (sorted) | Token       | UI Role                            |
 * |-------------------|-------------|------------------------------------|
 * | 1 (darkest)       | primary     | Sidebar bg, buttons, active states |
 * | 2                 | secondary   | Card accents, toggles, chart lines |
 * | 3                 | accent      | Highlights, badges, notifications  |
 * | 4                 | warm        | Banners, hover states, gradients   |
 * | 5 (lightest)      | surface     | Card backgrounds, inputs           |
 */
export function mapPaletteToTokens(tokens: CoolorsTokens): MappedTokens {
  const colors = [tokens.color1, tokens.color2, tokens.color3, tokens.color4, tokens.color5];
  const sorted = [...colors].sort((a, b) => chroma(a).luminance() - chroma(b).luminance());

  return {
    primary: sorted[0]!,
    secondary: sorted[1]!,
    accent: sorted[2]!,
    warm: sorted[3]!,
    surface: sorted[4]!,
  };
}
