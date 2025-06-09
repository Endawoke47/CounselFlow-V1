
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PolicyManagementDashboard } from "@/components/policy-management/PolicyManagementDashboard";

const PolicyManagement = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">
            <PolicyManagementDashboard />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PolicyManagement;
