
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DataProtectionDashboard } from "@/components/data-protection/DataProtectionDashboard";

const DataProtection = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 overflow-auto">
            <div className="desktop-container content-padding">
              <DataProtectionDashboard />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DataProtection;
