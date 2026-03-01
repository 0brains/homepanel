"use client";

import { usePathname } from "next/navigation";
import { AppShellNavbar, AppShellSection, Stack, Tooltip, UnstyledButton } from "@mantine/core";
import {
  IconApps,
  IconChartBar,
  IconHome,
  IconLock,
  IconLogout,
  IconMapPin,
  IconPower,
  IconRouter,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import { Link } from "@homarr/ui";

import classes from "./sidebar-navigation.module.scss";

interface SidebarLink {
  icon: typeof IconHome;
  label: string;
  href: string;
}

const topLinks: SidebarLink[] = [
  { icon: IconHome, label: "Home", href: "/" },
  { icon: IconApps, label: "Apps", href: "/boards" },
  { icon: IconRouter, label: "Devices", href: "/devices" },
  { icon: IconLock, label: "Security", href: "/security" },
  { icon: IconPower, label: "Power", href: "/power" },
  { icon: IconMapPin, label: "Location", href: "/location" },
  { icon: IconUsers, label: "Members", href: "/members" },
  { icon: IconChartBar, label: "Analytics", href: "/analytics" },
];

const bottomLinks: SidebarLink[] = [
  { icon: IconSettings, label: "Settings", href: "/manage/settings" },
  { icon: IconLogout, label: "Logout", href: "/auth/logout" },
];

export const SidebarNavigation = () => {
  const pathname = usePathname();

  // Strip locale prefix for matching (e.g., "/en/boards" → "/boards")
  const normalizedPath = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "/";

  return (
    <AppShellNavbar className={classes.sidebar}>
      <AppShellSection grow>
        <Stack gap={4} align="center" pt="md">
          {topLinks.map((link) => (
            <SidebarButton
              key={link.href}
              link={link}
              active={
                link.href === "/"
                  ? normalizedPath === "/"
                  : normalizedPath.startsWith(link.href)
              }
            />
          ))}
        </Stack>
      </AppShellSection>
      <AppShellSection>
        <Stack gap={4} align="center" pb="md">
          {bottomLinks.map((link) => (
            <SidebarButton
              key={link.href}
              link={link}
              active={normalizedPath.startsWith(link.href)}
            />
          ))}
        </Stack>
      </AppShellSection>
    </AppShellNavbar>
  );
};

function SidebarButton({ link, active }: { link: SidebarLink; active: boolean }) {
  const Icon = link.icon;

  return (
    <Tooltip label={link.label} position="right" withArrow>
      <UnstyledButton
        component={Link}
        href={link.href}
        className={classes.link}
        data-active={active || undefined}
      >
        <Icon
          size={24}
          stroke={active ? 2 : 1.5}
          style={{
            color: active ? "var(--hp-sidebar-icon-active)" : "var(--hp-sidebar-icon)",
          }}
        />
      </UnstyledButton>
    </Tooltip>
  );
}
