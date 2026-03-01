import { AppShellMain, Stack, Text, Title } from "@mantine/core";

export const metadata = {
  title: "HomePanel",
};

export default function HomePanelPage() {
  return (
    <AppShellMain>
      <Stack align="center" justify="center" h="100%">
        <Title order={1}>HomePanel</Title>
        <Text c="dimmed" size="lg">
          Your smart home dashboard is ready. Widgets coming in Phase 2.
        </Text>
      </Stack>
    </AppShellMain>
  );
}
