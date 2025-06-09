
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CompanySecretarialDashboard } from "@/components/company-secretarial/CompanySecretarialDashboard";

const CompanySecretarial = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">
            <CompanySecretarialDashboard />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CompanySecretarial;
