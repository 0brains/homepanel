import type { PropsWithChildren } from "react";

import { ClientShell } from "~/components/layout/shell";
import { SidebarNavigation } from "~/components/layout/sidebar-navigation";
import { AsidePanel } from "~/components/layout/aside-panel";

export default function HomePanelLayout({ children }: PropsWithChildren) {
  return (
    <ClientShell hasHeader={false} hasNavigation hasAside>
      <SidebarNavigation />
      {children}
      <AsidePanel />
    </ClientShell>
  );
}
