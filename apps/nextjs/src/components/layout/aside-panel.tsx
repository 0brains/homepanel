"use client";

import { AppShellAside, AppShellSection, Stack, Text, Title } from "@mantine/core";

/**
 * Column C — 320px aside panel.
 * Phase 1: placeholder content. Real widgets come in Phase 2.
 */
export const AsidePanel = () => {
  return (
    <AppShellAside p="md">
      <AppShellSection>
        <Stack gap="sm">
          <Title order={4} c="dimmed">
            Quick Info
          </Title>
          <Text size="sm" c="dimmed">
            Widgets will appear here in Phase 2.
          </Text>
        </Stack>
      </AppShellSection>
    </AppShellAside>
  );
};
