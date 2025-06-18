import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Bell, Search, User, ChevronRight, Command, HelpCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showShortcuts, setShowShortcuts] = useState(false);
  const location = useLocation();

  // Generate breadcrumbs from current path
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Dashboard', path: '/' }];
    
    const pathMap: Record<string, string> = {
      'company-secretarial': 'Company Secretarial',
      'contracts': 'Contract Lifecycle',
      'dispute-resolution': 'Dispute Resolution',
      'matters': 'Matter Management',
      'licensing-regulatory': 'Licensing & Regulatory',
      'policy-management': 'Policy Management',
      'knowledge-management': 'Knowledge Management',
      'ip-management': 'IP Management',
      'data-protection': 'Data Protection',
      'outsourced-matters-spend': 'Outsourcing & Spend',
      'risk-dashboard': 'Risk Dashboard',
      'task-management': 'Task Management',
      'user-access-management': 'User & Access Management',
      'dealflow': 'Dealflow'
    };

    pathSegments.forEach((segment, index) => {
      const path = '/' + pathSegments.slice(0, index + 1).join('/');
      const label = pathMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbs.push({ label, path });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Keyboard shortcuts handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Show shortcuts with ?
      if (event.key === '?' && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        setShowShortcuts(!showShortcuts);
      }
      // Focus search with Ctrl/Cmd + K
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        const searchInput = document.getElementById('global-search');
        searchInput?.focus();
      }
      // Escape to close shortcuts or clear search
      if (event.key === 'Escape') {
        if (showShortcuts) {
          setShowShortcuts(false);
        } else if (document.activeElement?.id === 'global-search') {
          setSearchQuery("");
          (document.activeElement as HTMLElement)?.blur();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showShortcuts]);

  return (
    <header className="header-height border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 transition-all">
      <div className="desktop-container h-full flex items-center justify-between">
        {/* Left Section - Navigation & Search */}
        <div className="flex items-center gap-6 flex-1">
          <SidebarTrigger className="lg:hidden" />
          
          {/* Breadcrumbs - Desktop Only */}
          <nav className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.path} className="flex items-center gap-2">
                {index > 0 && <ChevronRight className="h-3 w-3" />}
                <a 
                  href={crumb.path}
                  className={`hover:text-foreground transition-colors ${
                    index === breadcrumbs.length - 1 
                      ? 'text-foreground font-medium' 
                      : 'hover:underline'
                  }`}
                >
                  {crumb.label}
                </a>
              </div>
            ))}
          </nav>

          {/* Global Search - Enhanced for Desktop */}
          <div className="relative flex-1 max-w-md">
            <div className="relative flex items-center">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                id="global-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search entities, contracts, matters..."
                className="w-full h-10 pl-10 pr-20 bg-muted/50 border border-input rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
              />
              <div className="absolute right-2 flex items-center gap-1 text-xs text-muted-foreground pointer-events-none">
                <Command className="h-3 w-3" />
                <span>K</span>
              </div>
            </div>
            
            {/* Search Results Dropdown - Would be implemented with actual search logic */}
            {searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-50 animate-slide-down">
                <div className="p-2 text-sm text-muted-foreground">
                  Search results for "{searchQuery}" would appear here...
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Right Section - Actions & User */}
        <div className="flex items-center gap-2">
          {/* Keyboard Shortcuts Help */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setShowShortcuts(!showShortcuts)}
            className="hover:bg-accent/10 focus-ring"
            title="Keyboard shortcuts (?)"
          >
            <HelpCircle className="h-4 w-4" />
          </Button>

          {/* Notifications */}
          <Button 
            variant="ghost" 
            size="icon"
            className="relative hover:bg-accent/10 focus-ring"
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-destructive rounded-full"></span>
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User Profile */}
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:bg-accent/10 focus-ring"
            title="User profile"
          >
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Keyboard Shortcuts Modal */}
      {showShortcuts && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card border border-border rounded-lg shadow-desktop p-6 max-w-md w-full mx-4 animate-slide-down">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Keyboard Shortcuts</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowShortcuts(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </Button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Search</span>
                <kbd className="px-2 py-1 bg-muted rounded text-xs">⌘ K</kbd>
              </div>
              <div className="flex justify-between">
                <span>Toggle theme</span>
                <kbd className="px-2 py-1 bg-muted rounded text-xs">⌘ ⇧ D</kbd>
              </div>
              <div className="flex justify-between">
                <span>Show shortcuts</span>
                <kbd className="px-2 py-1 bg-muted rounded text-xs">?</kbd>
              </div>
              <div className="flex justify-between">
                <span>Close/Escape</span>
                <kbd className="px-2 py-1 bg-muted rounded text-xs">Esc</kbd>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
