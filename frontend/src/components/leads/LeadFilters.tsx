'use client';

import { Status } from '@/types';
import { Search, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

export function LeadFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    params.set('page', '1');
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams(searchParams);
    if (status) {
      params.set('status', status);
    } else {
      params.delete('status');
    }
    params.set('page', '1');
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  const clearFilters = () => {
    startTransition(() => {
      replace(pathname);
    });
  };

  const currentStatus = searchParams.get('status') || '';
  const currentQuery = searchParams.get('q') || '';

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <input
          type="text"
          placeholder="Search leads by name, email or company..."
          defaultValue={currentQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl border bg-card focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
        />
        {isPending && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <select
            value={currentStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="w-full pl-10 pr-8 py-2 rounded-xl border bg-background outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer text-sm shadow-sm"
          >
            <option value="">All Statuses</option>
            {Object.values(Status).map((status) => (
              <option key={status} value={status}>
                {status.charAt(0) + status.slice(1).toLowerCase().replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        {(currentStatus || currentQuery) && (
          <button
            onClick={clearFilters}
            className="p-2 border rounded-xl hover:bg-accent hover:text-accent-foreground transition-colors group shadow-sm bg-card"
            title="Clear filters"
          >
            <X size={18} className="text-muted-foreground group-hover:text-foreground" />
          </button>
        )}
      </div>
    </div>
  );
}
