
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { RiskDashboardMain } from "@/components/risk-dashboard/RiskDashboardMain";

const RiskDashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">
            <RiskDashboardMain />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default RiskDashboard;
