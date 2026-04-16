'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Users, 
  Settings, 
  PieChart, 
  Calendar, 
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Leads', href: '/leads', icon: Users },
  { name: 'Dashboard', href: '#', icon: PieChart },
  { name: 'Calendar', href: '#', icon: Calendar },
  { name: 'Messages', href: '#', icon: MessageSquare },
  { name: 'Settings', href: '#', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r bg-muted/30">
      <div className="flex flex-col gap-2 p-4">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href) && item.href !== '#';
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} className={cn(
                  "transition-colors",
                  isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-accent-foreground"
                )} />
                {item.name}
              </div>
              {isActive && <ChevronRight size={14} className="opacity-70" />}
            </Link>
          );
        })}
      </div>

      <div className="mt-auto p-4 border-t">
        <div className="rounded-xl bg-primary/10 p-4">
          <p className="text-xs font-semibold text-primary uppercase tracking-tight">Pro Plan</p>
          <p className="text-[10px] text-muted-foreground mt-1">Unlock advanced CRM features and analytics.</p>
          <button className="mt-3 w-full py-1.5 px-3 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:bg-primary/90 transition-colors">
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
}
