import { z } from "zod";

/** The 5 colors extracted from a Coolors URL, in URL order. */
export interface CoolorsTokens {
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
}

/** Semantic role assignments after luminance-sorting the palette. */
export interface MappedTokens {
  primary: string;
  secondary: string;
  accent: string;
  warm: string;
  surface: string;
}

/** Auto-derived tokens computed via chroma.js from the mapped palette. */
export interface DerivedTokens {
  bg: string;
  bgDark: string;
  text: string;
  textMuted: string;
  textOnPrimary: string;
  sidebarBg: string;
  sidebarIcon: string;
  sidebarIconActive: string;
  cardBg: string;
  cardBorder: string;
  hoverOverlay: string;
  focusRing: string;
}

/** The complete theme token set used throughout the app. */
export interface FullThemeTokens extends MappedTokens, DerivedTokens {}

/** Default palette — a neutral blue-grey smart home theme. */
export const DEFAULT_PALETTE = "264653-2a9d8f-e9c46a-f4a261-e76f51";

export const coolorsUrlSchema = z.string().regex(
  /^(?:https?:\/\/coolors\.co\/)?([0-9a-fA-F]{6}(?:-[0-9a-fA-F]{6}){4})$/,
  "Must be a Coolors URL or 5 hex colors separated by dashes",
);
