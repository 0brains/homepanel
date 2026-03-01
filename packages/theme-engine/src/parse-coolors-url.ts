import type { CoolorsTokens } from "./types";

/**
 * Extract 5 hex colors from a Coolors URL or dash-separated hex string.
 *
 * Accepts:
 *   - "https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51"
 *   - "264653-2a9d8f-e9c46a-f4a261-e76f51"
 */
export function parseCoolorsUrl(input: string): CoolorsTokens {
  const cleaned = input
    .replace(/^https?:\/\/coolors\.co\//, "")
    .replace(/\?.*$/, "")
    .trim()
    .toLowerCase();

  const parts = cleaned.split("-");
  if (parts.length !== 5 || !parts.every((p) => /^[0-9a-f]{6}$/.test(p))) {
    throw new Error(
      `Invalid Coolors input: expected 5 hex colors separated by dashes, got "${input}"`,
    );
  }

  return {
    color1: `#${parts[0]}`,
    color2: `#${parts[1]}`,
    color3: `#${parts[2]}`,
    color4: `#${parts[3]}`,
    color5: `#${parts[4]}`,
  };
}
