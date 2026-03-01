import { DEFAULT_PALETTE } from "./types";

export const HP_PALETTE_COOKIE = "hp-palette";

/**
 * Read the Coolors palette string from the `hp-palette` cookie.
 * Returns DEFAULT_PALETTE if not set or on the server.
 */
export function readPaletteCookie(): string {
  if (typeof document === "undefined") return DEFAULT_PALETTE;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${HP_PALETTE_COOKIE}=`));

  return match ? decodeURIComponent(match.split("=")[1] ?? DEFAULT_PALETTE) : DEFAULT_PALETTE;
}

/**
 * Write the Coolors palette string to the `hp-palette` cookie.
 * Cookie expires in 1 year, path=/.
 */
export function writePaletteCookie(palette: string): void {
  if (typeof document === "undefined") return;

  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  document.cookie = `${HP_PALETTE_COOKIE}=${encodeURIComponent(palette)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}
