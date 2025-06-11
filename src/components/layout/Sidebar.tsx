
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
  Users
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
];

export function Sidebar() {
  return (
    <SidebarPrimitive className="border-r border-border/50 bg-sidebar-background/95 backdrop-blur supports-[backdrop-filter]:bg-sidebar-background/60">
      <SidebarHeader className="border-b border-sidebar-border/30 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
            <Scale className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-sidebar-foreground">CounselFlow</h1>
            <p className="text-xs text-sidebar-foreground/60 font-medium">Legal Operations Platform</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 py-2 text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">
            Modules
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {modules.map((module) => (
                <SidebarMenuItem key={module.title}>
                  <SidebarMenuButton asChild className="h-10 rounded-lg hover:bg-sidebar-accent/50 transition-colors">
                    <a href={module.url} className="flex items-center gap-3 px-3 py-2 text-sm font-medium">
                      <module.icon className="h-4 w-4 text-sidebar-foreground/70" />
                      <span className="text-sidebar-foreground">{module.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-sidebar-border/30 p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-10 rounded-lg hover:bg-sidebar-accent/50 transition-colors">
              <a href="/settings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium">
                <Settings className="h-4 w-4 text-sidebar-foreground/70" />
                <span className="text-sidebar-foreground">Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </SidebarPrimitive>
  );
}
