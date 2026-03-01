import type { FullThemeTokens } from "./types";

/** CSS custom property name mapping for all theme tokens. */
const TOKEN_TO_CSS_VAR: Record<keyof FullThemeTokens, string> = {
  primary: "--hp-primary",
  secondary: "--hp-secondary",
  accent: "--hp-accent",
  warm: "--hp-warm",
  surface: "--hp-surface",
  bg: "--hp-bg",
  bgDark: "--hp-bg-dark",
  text: "--hp-text",
  textMuted: "--hp-text-muted",
  textOnPrimary: "--hp-text-on-primary",
  sidebarBg: "--hp-sidebar-bg",
  sidebarIcon: "--hp-sidebar-icon",
  sidebarIconActive: "--hp-sidebar-icon-active",
  cardBg: "--hp-card-bg",
  cardBorder: "--hp-card-border",
  hoverOverlay: "--hp-hover-overlay",
  focusRing: "--hp-focus-ring",
};

/**
 * Apply all theme tokens as CSS custom properties on `<html>`.
 * Client-only — must be guarded with `typeof window !== "undefined"`.
 */
export function applyTheme(tokens: FullThemeTokens): void {
  if (typeof window === "undefined") return;

  const root = document.documentElement;
  for (const [key, cssVar] of Object.entries(TOKEN_TO_CSS_VAR)) {
    const value = tokens[key as keyof FullThemeTokens];
    if (value) {
      root.style.setProperty(cssVar, value);
    }
  }
}
