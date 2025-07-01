import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { IPManagementDashboard } from "@/components/ip-management/IPManagementDashboard";

const IPManagement = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 overflow-auto glass transition-all duration-700 ease-in-out animate-fade-in">
            <div className="desktop-container content-padding">
              <IPManagementDashboard />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default IPManagement;
