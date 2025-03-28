import { DEMO_WORKSPACE, TOP_LINKS } from "@/lib/data/analytics";
import { AppWindow } from "@/components/ui/AppWindow";
import { Chip } from "@/components/ui/Chip";
import { AppSidebar } from "./AppSidebar";
import { LinkTable } from "./LinkTable";
import { PerformanceChart } from "./PerformanceChart";

/** The analytics screen of the app, as shown in the home page hero. */
export function AnalyticsDashboard() {
  return (
    <AppWindow url={`app.clickpath.com/${DEMO_WORKSPACE.slug}/analytics`}>
      <div className="app">
        <AppSidebar workspace={DEMO_WORKSPACE.name} />
        <div className="main">
          <div className="main-h">
            <h4>Analytics</h4>
            <div className="chips">
              <Chip>{DEMO_WORKSPACE.domain}</Chip>
              <Chip>{DEMO_WORKSPACE.range}</Chip>
              <Chip>All campaigns</Chip>
            </div>
          </div>
          <PerformanceChart mode="overview" />
          <LinkTable links={TOP_LINKS} />
        </div>
      </div>
    </AppWindow>
  );
}
