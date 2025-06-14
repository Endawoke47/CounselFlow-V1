
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search, User, Sun, Moon, Settings, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function Header() {
  return (
    <header className="header-bar sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 theme-transition">
      <div className="main-content content-padding h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <SidebarTrigger className="hover:bg-accent/10 focus-ring" />
          
          {/* Breadcrumb navigation */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium">User & Access Management</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          {/* Global search */}
          <div className="hidden lg:flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-lg min-w-[400px] border">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search across entities, contracts, matters, policies..."
              className="bg-transparent outline-none flex-1 text-sm placeholder:text-muted-foreground"
            />
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Quick actions */}
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <HelpCircle className="h-4 w-4" />
            <span className="sr-only">Help & Support</span>
          </Button>
          
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative text-muted-foreground hover:text-foreground">
                <Bell className="h-4 w-4" />
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                  3
                </Badge>
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-background border">
              <div className="p-4 border-b">
                <h4 className="font-medium">Notifications</h4>
                <p className="text-sm text-muted-foreground">You have 3 unread notifications</p>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <DropdownMenuItem className="p-4 flex-col items-start">
                  <div className="font-medium">Contract Review Required</div>
                  <div className="text-sm text-muted-foreground">Microsoft Services Agreement needs approval</div>
                  <div className="text-xs text-muted-foreground mt-1">2 hours ago</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-4 flex-col items-start">
                  <div className="font-medium">New Dispute Filed</div>
                  <div className="text-sm text-muted-foreground">Patent infringement case opened</div>
                  <div className="text-xs text-muted-foreground mt-1">4 hours ago</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-4 flex-col items-start">
                  <div className="font-medium">Compliance Deadline</div>
                  <div className="text-sm text-muted-foreground">GDPR assessment due in 3 days</div>
                  <div className="text-xs text-muted-foreground mt-1">1 day ago</div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme toggle */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground hover:text-foreground theme-transition"
            title="Toggle theme (Ctrl+Shift+D)"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative h-9 w-9 rounded-full bg-accent/10">
                <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-xs font-medium text-primary-foreground">JD</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-background border">
              <div className="p-2">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">john.doe@company.com</p>
                  <p className="text-xs text-muted-foreground">General Counsel</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Preferences
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
