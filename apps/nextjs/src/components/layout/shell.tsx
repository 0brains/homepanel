"use client";

import type { PropsWithChildren } from "react";
import { AppShell } from "@mantine/core";
import { useAtomValue } from "jotai";

import { useOptionalBackgroundProps } from "./background";
import { navigationCollapsedAtom } from "./header/burger";

interface ClientShellProps {
  hasHeader?: boolean;
  hasNavigation?: boolean;
  hasAside?: boolean;
}

export const ClientShell = ({
  hasHeader = true,
  hasNavigation = true,
  hasAside = false,
  children,
}: PropsWithChildren<ClientShellProps>) => {
  const collapsed = useAtomValue(navigationCollapsedAtom);
  const backgroundProps = useOptionalBackgroundProps();

  return (
    <AppShell
      {...backgroundProps}
      header={hasHeader ? { height: 60 } : undefined}
      navbar={
        hasNavigation
          ? {
              width: hasAside ? 80 : 300,
              breakpoint: "sm",
              collapsed: { mobile: collapsed },
            }
          : undefined
      }
      aside={
        hasAside
          ? {
              width: 320,
              breakpoint: "md",
            }
          : undefined
      }
      padding="md"
    >
      {children}
    </AppShell>
  );
};
