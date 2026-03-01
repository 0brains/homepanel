"use client";

import { type PropsWithChildren, useEffect, useMemo } from "react";
import type { MantineColorScheme, MantineColorSchemeManager } from "@mantine/core";
import { DirectionProvider, MantineProvider } from "@mantine/core";
import dayjs from "dayjs";

import { clientApi } from "@homarr/api/client";
import { useSession } from "@homarr/auth/client";
import { parseCookies, setClientCookie } from "@homarr/common";
import type { ColorScheme } from "@homarr/definitions";
import { colorSchemeCookieKey } from "@homarr/definitions";
import {
  applyTheme,
  createHomePanelTheme,
  DEFAULT_PALETTE,
  deriveTokens,
  mapPaletteToTokens,
  parseCoolorsUrl,
  readPaletteCookie,
} from "@homarr/theme-engine";

export const CustomMantineProvider = ({
  children,
  defaultColorScheme,
}: PropsWithChildren<{ defaultColorScheme: ColorScheme }>) => {
  const manager = useColorSchemeManager();

  const tokens = useMemo(() => {
    const paletteStr = typeof window !== "undefined" ? readPaletteCookie() : DEFAULT_PALETTE;
    try {
      const coolors = parseCoolorsUrl(paletteStr);
      const mapped = mapPaletteToTokens(coolors);
      return deriveTokens(mapped);
    } catch {
      const coolors = parseCoolorsUrl(DEFAULT_PALETTE);
      const mapped = mapPaletteToTokens(coolors);
      return deriveTokens(mapped);
    }
  }, []);

  const theme = useMemo(() => createHomePanelTheme(tokens), [tokens]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      applyTheme(tokens);
    }
  }, [tokens]);

  return (
    <DirectionProvider>
      <MantineProvider
        defaultColorScheme={defaultColorScheme}
        colorSchemeManager={manager}
        theme={theme}
      >
        {children}
      </MantineProvider>
    </DirectionProvider>
  );
};

export function useColorSchemeManager(): MantineColorSchemeManager {
  const { data: session } = useSession();

  const updateCookieValue = (value: Exclude<MantineColorScheme, "auto">) => {
    setClientCookie(colorSchemeCookieKey, value, { expires: dayjs().add(1, "year").toDate(), path: "/" });
  };

  const { mutate: mutateColorScheme } = clientApi.user.changeColorScheme.useMutation({
    onSuccess: (_, variables) => {
      updateCookieValue(variables.colorScheme);
    },
  });

  return {
    get: (defaultValue) => {
      if (typeof window === "undefined") {
        return defaultValue;
      }

      try {
        const cookies = parseCookies(document.cookie);
        return (cookies[colorSchemeCookieKey] as MantineColorScheme | undefined) ?? defaultValue;
      } catch {
        return defaultValue;
      }
    },

    set: (value) => {
      if (value === "auto") return;
      try {
        if (session) {
          mutateColorScheme({ colorScheme: value });
        }
        updateCookieValue(value);
      } catch (error) {
        console.warn("[@mantine/core] Color scheme manager was unable to save color scheme.", error);
      }
    },
    subscribe: () => undefined,
    unsubscribe: () => undefined,
    clear: () => undefined,
  };
}
