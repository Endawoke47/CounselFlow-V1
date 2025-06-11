
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search, User } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border/50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <SidebarTrigger className="hover:bg-accent/50 transition-colors" />
          <div className="hidden md:flex items-center gap-3 bg-muted/50 px-4 py-2.5 rounded-xl min-w-[320px] border border-border/30">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search entities, contracts, matters..."
              className="bg-transparent outline-none flex-1 text-sm placeholder:text-muted-foreground/70"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-accent/50">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-accent/50">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
