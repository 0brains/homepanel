"use client";

import { useCallback, useState } from "react";
import { Button, ColorSwatch, Group, Paper, Stack, Text, TextInput, Title } from "@mantine/core";
import { IconPalette, IconRefresh } from "@tabler/icons-react";

import {
  DEFAULT_PALETTE,
  deriveTokens,
  mapPaletteToTokens,
  parseCoolorsUrl,
  writePaletteCookie,
} from "@homarr/theme-engine";
import type { FullThemeTokens } from "@homarr/theme-engine";

const ROLE_LABELS: { key: keyof FullThemeTokens; label: string }[] = [
  { key: "primary", label: "Primary" },
  { key: "secondary", label: "Secondary" },
  { key: "accent", label: "Accent" },
  { key: "warm", label: "Warm" },
  { key: "surface", label: "Surface" },
];

export const ThemeSettingsForm = () => {
  const [url, setUrl] = useState("");
  const [tokens, setTokens] = useState<FullThemeTokens | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleParse = useCallback(() => {
    try {
      const coolors = parseCoolorsUrl(url);
      const mapped = mapPaletteToTokens(coolors);
      const derived = deriveTokens(mapped);
      setTokens(derived);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid Coolors URL");
      setTokens(null);
    }
  }, [url]);

  const handleApply = useCallback(() => {
    if (!tokens) return;
    // Extract the palette string from the URL (just the hex portion)
    const palette = url
      .replace(/^https?:\/\/coolors\.co\//, "")
      .replace(/\?.*$/, "")
      .trim()
      .toLowerCase();
    writePaletteCookie(palette);
    window.location.reload();
  }, [url, tokens]);

  const handleReset = useCallback(() => {
    writePaletteCookie(DEFAULT_PALETTE);
    setUrl("");
    setTokens(null);
    setError(null);
    window.location.reload();
  }, []);

  return (
    <Paper p="md" withBorder>
      <Stack gap="md">
        <Title order={3}>HomePanel Theme</Title>
        <Text size="sm" c="dimmed">
          Paste a Coolors URL to generate a custom theme. The 5 colors will be
          sorted by luminance and mapped to semantic roles.
        </Text>

        <Group align="end">
          <TextInput
            label="Coolors URL"
            placeholder="https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51"
            value={url}
            onChange={(e) => setUrl(e.currentTarget.value)}
            error={error}
            style={{ flex: 1 }}
          />
          <Button
            leftSection={<IconPalette size={16} />}
            onClick={handleParse}
            disabled={!url.trim()}
          >
            Parse
          </Button>
        </Group>

        {tokens && (
          <Group gap="lg">
            {ROLE_LABELS.map(({ key, label }) => (
              <Stack key={key} align="center" gap={4}>
                <ColorSwatch color={tokens[key]} size={40} />
                <Text size="xs" c="dimmed">
                  {label}
                </Text>
              </Stack>
            ))}
          </Group>
        )}

        <Group>
          <Button onClick={handleApply} disabled={!tokens}>
            Apply Theme
          </Button>
          <Button
            variant="subtle"
            leftSection={<IconRefresh size={16} />}
            onClick={handleReset}
          >
            Reset to Default
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
};
