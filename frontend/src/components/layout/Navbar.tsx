import Link from 'next/link';
import { LayoutDashboard, Users, Bell, Search } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          <Link href="/leads" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Users size={18} />
            </div>
            <span className="text-xl font-bold tracking-tight hidden sm:inline-block">
              Arcti<span className="text-primary">CRM</span>
            </span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="w-full max-w-sm hidden md:flex items-center relative">
             {/* This could be a search input if globally needed, but specifically asked for /leads page search */}
          </div>
          <button className="relative p-2 rounded-full hover:bg-accent text-muted-foreground transition-colors">
            <Bell size={20} />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive border-2 border-background"></span>
          </button>
          <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center border text-sm font-medium">
            JD
          </div>
        </div>
      </div>
    </nav>
  );
}
