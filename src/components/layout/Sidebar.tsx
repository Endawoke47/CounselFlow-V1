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
  Search,
  ChevronDown,
  User,
  LogOut,
  Bell
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
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const modules = [
  {
    title: "Overview",
    url: "/",
    icon: Home,
    category: "main"
  },
  {
    title: "Company Secretarial",
    url: "/company-secretarial",
    icon: Building2,
    category: "corporate"
  },
  {
    title: "Contract Lifecycle",
    url: "/contracts",
    icon: FileText,
    category: "contracts"
  },
  {
    title: "Dispute Resolution",
    url: "/dispute-resolution",
    icon: Scale,
    category: "legal"
  },
  {
    title: "Matter Management",
    url: "/matters",
    icon: FolderOpen,
    category: "legal"
  },
  {
    title: "Licensing & Regulatory",
    url: "/licensing-regulatory",
    icon: Shield,
    category: "compliance"
  },
  {
    title: "Policy Management",
    url: "/policy-management",
    icon: BookOpen,
    category: "compliance"
  },
  {
    title: "Knowledge Management",
    url: "/knowledge-management",
    icon: Lightbulb,
    category: "knowledge"
  },
  {
    title: "IP Management",
    url: "/ip-management",
    icon: Shield,
    category: "ip"
  },
  {
    title: "Data Protection",
    url: "/data-protection",
    icon: Database,
    category: "compliance"
  },
  {
    title: "Outsourcing & Spend",
    url: "/outsourced-matters-spend",
    icon: CreditCard,
    category: "finance"
  },
  {
    title: "Risk Dashboard",
    url: "/risk-dashboard",
    icon: BarChart3,
    category: "analytics"
  },
  {
    title: "Task Management",
    url: "/task-management",
    icon: CheckSquare,
    category: "productivity"
  },
  {
    title: "User & Access Management",
    url: "/user-access-management",
    icon: Users,
    category: "admin"
  },
  {
    title: "Dealflow",
    url: "/dealflow",
    icon: TrendingUp,
    category: "business"
  },
];

const moduleCategories = {
  main: "Dashboard",
  corporate: "Corporate",
  contracts: "Contracts",
  legal: "Legal Operations",
  compliance: "Compliance",
  knowledge: "Knowledge",
  ip: "Intellectual Property",
  finance: "Financial",
  analytics: "Analytics",
  productivity: "Productivity",
  admin: "Administration",
  business: "Business Development"
};

export function Sidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());
  const location = useLocation();

  const filteredModules = modules.filter(module =>
    module.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedModules = filteredModules.reduce((acc, module) => {
    if (!acc[module.category]) {
      acc[module.category] = [];
    }
    acc[module.category].push(module);
    return acc;
  }, {} as Record<string, typeof modules>);

  const toggleCategory = (category: string) => {
    const newCollapsed = new Set(collapsedCategories);
    if (newCollapsed.has(category)) {
      newCollapsed.delete(category);
    } else {
      newCollapsed.add(category);
    }
    setCollapsedCategories(newCollapsed);
  };

  const isActiveRoute = (url: string) => {
    if (url === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(url);
  };

  return (
    <SidebarPrimitive className="sidebar-width border-r border-sidebar-border bg-sidebar-background">
      {/* Header */}
      <SidebarHeader className="border-b border-sidebar-border p-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Scale className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-sidebar-foreground">CounselFlow</h1>
            <p className="text-xs text-sidebar-foreground/60">Legal Operations Platform</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="flex flex-col h-full">
        {/* Quick Search */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sidebar-foreground/50" />
            <input
              type="text"
              placeholder="Search modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-10 pr-3 bg-sidebar-accent/50 border border-sidebar-border rounded-md text-sm text-sidebar-foreground placeholder:text-sidebar-foreground/50 focus:outline-none focus:ring-2 focus:ring-sidebar-ring focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Navigation Modules */}
        <div className="flex-1 overflow-y-auto">
          {Object.entries(groupedModules).map(([category, categoryModules]) => (
            <SidebarGroup key={category} className="px-4 py-2">
              {category !== 'main' && (
                <SidebarGroupLabel 
                  className="flex items-center justify-between cursor-pointer hover:text-sidebar-foreground transition-colors group"
                  onClick={() => toggleCategory(category)}
                >
                  <span className="text-xs font-medium text-sidebar-foreground/70 uppercase tracking-wider">
                    {moduleCategories[category as keyof typeof moduleCategories]}
                  </span>
                  <ChevronDown 
                    className={`h-3 w-3 text-sidebar-foreground/50 transition-transform group-hover:text-sidebar-foreground/70 ${
                      collapsedCategories.has(category) ? '-rotate-90' : ''
                    }`} 
                  />
                </SidebarGroupLabel>
              )}
              
              {!collapsedCategories.has(category) && (
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-1">
                    {categoryModules.map((module) => (
                      <SidebarMenuItem key={module.title}>
                        <SidebarMenuButton 
                          asChild
                          className={`group relative transition-all duration-200 hover:bg-sidebar-accent ${
                            isActiveRoute(module.url) 
                              ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' 
                              : 'text-sidebar-foreground hover:text-sidebar-accent-foreground'
                          }`}
                        >
                          <a href={module.url} className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-md">
                            <module.icon className={`h-4 w-4 transition-colors ${
                              isActiveRoute(module.url) ? 'text-sidebar-primary' : 'text-sidebar-foreground/70 group-hover:text-sidebar-accent-foreground'
                            }`} />
                            <span className="flex-1">{module.title}</span>
                            {isActiveRoute(module.url) && (
                              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-sidebar-primary rounded-r-full"></div>
                            )}
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              )}
            </SidebarGroup>
          ))}
        </div>
      </SidebarContent>
      
      {/* Footer - User Profile & Settings */}
      <SidebarFooter className="border-t border-sidebar-border p-4 space-y-2">
        {/* User Profile */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent/50 hover:bg-sidebar-accent transition-colors cursor-pointer group">
          <div className="flex items-center justify-center w-8 h-8 bg-sidebar-primary rounded-full">
            <User className="h-4 w-4 text-sidebar-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
            <p className="text-xs text-sidebar-foreground/60 truncate">Legal Operations Manager</p>
          </div>
          <div className="relative">
            <Bell className="h-4 w-4 text-sidebar-foreground/50 group-hover:text-sidebar-foreground transition-colors" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-destructive rounded-full"></span>
          </div>
        </div>

        {/* Settings */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild
              className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all"
            >
              <a href="/settings" className="flex items-center gap-3 px-3 py-2 text-sm rounded-md">
                <Settings className="h-4 w-4 text-sidebar-foreground/70" />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Quick Actions */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex-1 text-xs text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <LogOut className="h-3 w-3 mr-1" />
            Sign Out
          </Button>
        </div>
      </SidebarFooter>
    </SidebarPrimitive>
  );
}
