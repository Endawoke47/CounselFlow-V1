import { 
  Building2, 
  FileText, 
  Scale, 
  FolderOpen, 
  Shield, 
  BookOpen, 
  Lightbulb, 
  CreditCard, 
  BarChart3,
  Home,
  Settings,
  CheckSquare,
  Users,
  TrendingUp
} from "lucide-react";
import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

const modules = [
  {
    title: "Overview",
    url: "/",
    icon: Home,
  },
  {
    title: "Company Secretarial",
    url: "/company-secretarial",
    icon: Building2,
  },
  {
    title: "Contract Lifecycle",
    url: "/contracts",
    icon: FileText,
  },
  {
    title: "Dispute Resolution",
    url: "/disputes",
    icon: Scale,
  },
  {
    title: "Matter Management",
    url: "/matters",
    icon: FolderOpen,
  },
  {
    title: "Licensing & Regulatory",
    url: "/licensing",
    icon: Shield,
  },
  {
    title: "Policy Management",
    url: "/policies",
    icon: BookOpen,
  },
  {
    title: "Knowledge Management",
    url: "/knowledge",
    icon: Lightbulb,
  },
  {
    title: "IP Management",
    url: "/ip",
    icon: Shield,
  },
  {
    title: "Legal Spend",
    url: "/spend",
    icon: CreditCard,
  },
  {
    title: "Risk Dashboard",
    url: "/risk",
    icon: BarChart3,
  },
  {
    title: "Task Management",
    url: "/task-management",
    icon: CheckSquare,
  },
  {
    title: "User & Access Management",
    url: "/user-access-management",
    icon: Users,
  },
  {
    title: "Dealflow",
    url: "/dealflow",
    icon: TrendingUp,
  },
];

export function Sidebar() {
  return (
    <SidebarPrimitive className="border-r border-border bg-sidebar-background">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <Scale className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">CounselFlow</h1>
            <p className="text-xs text-sidebar-foreground/60">Legal Operations Platform</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Modules</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {modules.map((module) => (
                <SidebarMenuItem key={module.title}>
                  <SidebarMenuButton asChild>
                    <a href={module.url} className="flex items-center gap-3 px-3 py-2 text-sm">
                      <module.icon className="h-4 w-4" />
                      <span>{module.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/settings" className="flex items-center gap-3 px-3 py-2 text-sm">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </SidebarPrimitive>
  );
}
