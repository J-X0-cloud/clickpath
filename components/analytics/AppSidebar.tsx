import type { IconName } from "@/components/ui/icons";
import { Icon } from "@/components/ui/Icon";

type SidebarItem = { label: string; icon: IconName; count?: number; active?: boolean };
type SidebarGroup = { title?: string; items: readonly SidebarItem[] };

const GROUPS: readonly SidebarGroup[] = [
  {
    items: [
      { label: "Overview", icon: "home" },
      { label: "Links", icon: "link", count: 214 },
      { label: "Analytics", icon: "chart", active: true },
      { label: "Funnels", icon: "filter" },
      { label: "Customers", icon: "users" },
    ],
  },
  {
    title: "Conversions",
    items: [
      { label: "Destinations", icon: "send", count: 3 },
      { label: "Events", icon: "hook" },
      { label: "API keys", icon: "code" },
    ],
  },
  {
    title: "Workspace",
    items: [
      { label: "Domains", icon: "globe" },
      { label: "Settings", icon: "cog" },
    ],
  },
];

export function AppSidebar({ workspace }: { workspace: string }) {
  return (
    <aside className="side">
      <div className="ws">
        <span />
        {workspace}
      </div>
      {GROUPS.map((group, i) => (
        <div key={group.title ?? i}>
          {group.title && <div className="grp">{group.title}</div>}
          {group.items.map((item) => (
            <a key={item.label} className={item.active ? "on" : undefined} href="#">
              <Icon name={item.icon} />
              {item.label}
              {item.count !== undefined && <em>{item.count}</em>}
            </a>
          ))}
        </div>
      ))}
    </aside>
  );
}
