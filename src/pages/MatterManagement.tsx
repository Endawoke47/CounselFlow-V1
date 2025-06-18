
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { MatterManagementDashboard } from "@/components/matter-management/MatterManagementDashboard";

const MatterManagement = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 overflow-auto">
            <div className="desktop-container content-padding">
              <MatterManagementDashboard />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MatterManagement;
