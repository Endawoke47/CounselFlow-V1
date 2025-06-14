
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Bell, Search, User } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border bg-background p-4 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div className="hidden md:flex items-center gap-2 bg-muted px-3 py-2 rounded-md min-w-[300px]">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search entities, contracts, matters..."
              className="bg-transparent outline-none flex-1 text-sm placeholder:text-muted-foreground"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
