
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { KnowledgeManagementDashboard } from "@/components/knowledge-management/KnowledgeManagementDashboard";

const KnowledgeManagement = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">
            <KnowledgeManagementDashboard />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default KnowledgeManagement;
