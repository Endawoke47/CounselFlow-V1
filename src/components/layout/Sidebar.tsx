
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
  TrendingUp,
  Database,
  Search
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
  SidebarInput,
} from "@/components/ui/sidebar";

const modules = [
  {
    title: "Dashboard",
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
    title: "Data Protection",
    url: "/data-protection",
    icon: Database,
  },
  {
    title: "Outsourcing & Spend",
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
    <SidebarPrimitive className="sidebar-enhanced border-r border-sidebar-border bg-sidebar-background theme-transition">
      <SidebarHeader className="border-b border-sidebar-border p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Scale className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-sidebar-foreground">CounselFlow</h1>
            <p className="text-sm text-sidebar-foreground/60">Legal Operations Platform</p>
          </div>
        </div>
        
        {/* Quick search bar */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sidebar-foreground/40" />
          <SidebarInput 
            placeholder="Quick search..." 
            className="pl-10 bg-sidebar-accent/50 border-sidebar-border focus-ring"
          />
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 font-medium mb-2">
            Legal Modules
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {modules.map((module) => (
                <SidebarMenuItem key={module.title}>
                  <SidebarMenuButton 
                    asChild 
                    className="h-11 px-3 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-200 group"
                    tooltip={module.title}
                  >
                    <a href={module.url} className="flex items-center gap-3 text-sm font-medium">
                      <module.icon className="h-5 w-5 text-sidebar-foreground/70 group-hover:text-sidebar-accent-foreground transition-colors" />
                      <span className="text-sidebar-foreground group-hover:text-sidebar-accent-foreground transition-colors">
                        {module.title}
                      </span>
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
            <SidebarMenuButton 
              asChild 
              className="h-11 px-3 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-200"
            >
              <a href="/settings" className="flex items-center gap-3 text-sm font-medium">
                <Settings className="h-5 w-5 text-sidebar-foreground/70" />
                <span className="text-sidebar-foreground">Settings & Preferences</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        
        {/* User profile section */}
        <div className="mt-4 p-3 rounded-lg bg-sidebar-accent/30 border border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-xs font-medium text-primary-foreground">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">Legal Counsel</p>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </SidebarPrimitive>
  );
}
