'use client';

import { Lead } from '@/types';
import { StatusBadge } from './StatusBadge';
import { formatDate, formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import { MoreHorizontal, ExternalLink, Mail, Building2 } from 'lucide-react';

interface LeadTableProps {
  leads: Lead[];
  isLoading: boolean;
}

export function LeadTable({ leads, isLoading }: LeadTableProps) {
  if (isLoading) {
    return (
      <div className="w-full space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 w-full animate-pulse rounded-lg bg-muted/50" />
        ))}
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <Users size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">No leads found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or create a new lead.</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto rounded-xl border bg-card shadow-sm">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-muted/50 text-xs uppercase text-muted-foreground border-b">
          <tr>
            <th className="px-6 py-4 font-semibold">Lead</th>
            <th className="px-6 py-4 font-semibold">Company</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold">Value</th>
            <th className="px-6 py-4 font-semibold">Created</th>
            <th className="px-6 py-4 font-semibold"></th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {leads.map((lead) => (
            <tr key={lead.id} className="group hover:bg-muted/30 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col">
                  <Link 
                    href={`/leads/${lead.id}`}
                    className="font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1.5"
                  >
                    {lead.name}
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  {lead.email && (
                    <span className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Mail size={12} />
                      {lead.email}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                {lead.company ? (
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Building2 size={14} />
                    {lead.company}
                  </span>
                ) : (
                  <span className="text-muted-foreground/50">—</span>
                )}
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={lead.status} />
              </td>
              <td className="px-6 py-4 font-medium text-foreground">
                {lead.value ? formatCurrency(lead.value) : <span className="text-muted-foreground/50">—</span>}
              </td>
              <td className="px-6 py-4 text-muted-foreground text-xs">
                {formatDate(lead.createdAt)}
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { Users } from 'lucide-react';
