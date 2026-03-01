import chroma from "chroma-js";

import type { DerivedTokens, FullThemeTokens, MappedTokens } from "./types";

/**
 * Compute 12 derived tokens from the 5 semantic palette colors.
 * Uses chroma.js for perceptually uniform color manipulation.
 */
export function deriveTokens(mapped: MappedTokens): FullThemeTokens {
  const { primary, secondary, accent, warm, surface } = mapped;

  const derived: DerivedTokens = {
    // Backgrounds
    bg: chroma(surface).brighten(0.5).hex(),
    bgDark: chroma(primary).darken(1.5).hex(),

    // Text
    text: chroma(primary).luminance() < 0.15 ? chroma(primary).darken(0.5).hex() : chroma(primary).darken(2).hex(),
    textMuted: chroma(secondary).desaturate(1).alpha(0.7).css(),
    textOnPrimary: chroma.contrast(primary, "#fff") >= 4.5 ? "#ffffff" : "#1a1a1a",

    // Sidebar
    sidebarBg: primary,
    sidebarIcon: chroma(surface).alpha(0.6).css(),
    sidebarIconActive: surface,

    // Cards
    cardBg: chroma(surface).brighten(0.3).hex(),
    cardBorder: chroma(secondary).alpha(0.2).css(),

    // Interactive
    hoverOverlay: chroma(warm).alpha(0.1).css(),
    focusRing: chroma(accent).alpha(0.5).css(),
  };

  return { ...mapped, ...derived };
}
