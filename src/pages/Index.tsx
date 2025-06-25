import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { SidebarProvider } from "@/components/ui/sidebar";
import { NotificationContainer } from "@/components/ui/NotificationContainer";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { useState } from "react";

const Index = () => {
  // Example notification state; replace with global state or context as needed
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Contract Review Due", message: "Microsoft Agreement expires in 7 days", type: "warning" },
    { id: 2, title: "New Risk Alert", message: "High risk detected in vendor assessment", type: "error" },
    { id: 3, title: "Task Completed", message: "IP filing submitted successfully", type: "success" }
  ]);
  const removeNotification = (id: number | string) => setNotifications(n => n.filter(noti => noti.id !== id));
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AnimatedBackground />
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 overflow-auto glass transition-all duration-700 ease-in-out animate-fade-in">
            <div className="desktop-container content-padding">
              <DashboardOverview />
            </div>
          </main>
          <NotificationContainer notifications={notifications} onRemove={removeNotification} />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
