import { Suspense } from 'react';
import { LeadTable } from '@/components/leads/LeadTable';
import { LeadFilters } from '@/components/leads/LeadFilters';
import { LeadFormModalTrigger } from '@/components/leads/LeadFormModalTrigger';
import api from '@/lib/api';
import { Lead, PaginatedResponse } from '@/types';
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';

type SearchParams = { [key: string]: string | string[] | undefined };

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getLeads(params: SearchParams) {
  try {
    const q = typeof params.q === 'string' ? params.q : '';
    const status = typeof params.status === 'string' ? params.status : '';
    const page = typeof params.page === 'string' ? params.page : '1';
    const limit = '10';

    const queryParams: Record<string, string> = { page, limit, sort: 'createdAt', order: 'desc' };
    if (q) queryParams.q = q;
    if (status) queryParams.status = status;

    const response = await api.get<PaginatedResponse<Lead>>('/leads', {
      params: queryParams,
    });
    return { data: response.data, error: null };
  } catch (err) {
    console.error('Failed to fetch leads:', err);
    return { data: null, error: 'Failed to connect to the server' };
  }
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export default async function LeadsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { data, error } = await getLeads(params);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground mt-1">
            Manage your sales pipeline and track potential customers.
          </p>
        </div>
        <LeadFormModalTrigger />
      </div>

      <Suspense fallback={<div className="h-10 w-full animate-pulse bg-muted rounded-xl" />}>
        <LeadFilters />
      </Suspense>

      {error ? (
        <div className="p-8 rounded-2xl border border-destructive/20 bg-destructive/5 flex flex-col items-center justify-center text-center space-y-3">
          <AlertCircle size={40} className="text-destructive" />
          <h3 className="text-lg font-semibold">Connection Error</h3>
          <p className="text-muted-foreground max-w-sm">
            We couldn't connect to the server. Please check your internet connection and try again.
          </p>
          <Link 
            href="/leads"
            className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg font-medium"
          >
            Retry
          </Link>
        </div>
      ) : (
        <>
          <LeadTable leads={data?.items || []} isLoading={false} />
          
          {data && data.meta.totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">{(data.meta.page - 1) * data.meta.limit + 1}</span> to{' '}
                <span className="font-medium text-foreground">
                  {Math.min(data.meta.page * data.meta.limit, data.meta.total)}
                </span>{' '}
                of <span className="font-medium text-foreground">{data.meta.total}</span> leads
              </p>
              <div className="flex gap-2">
                <PaginationLink 
                  page={data.meta.page - 1} 
                  disabled={data.meta.page === 1}
                  params={params}
                >
                  <ChevronLeft size={20} />
                </PaginationLink>
                <PaginationLink 
                  page={data.meta.page + 1} 
                  disabled={data.meta.page === data.meta.totalPages}
                  params={params}
                >
                  <ChevronRight size={20} />
                </PaginationLink>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function PaginationLink({ 
  page, 
  disabled, 
  children,
  params 
}: { 
  page: number; 
  disabled: boolean; 
  children: React.ReactNode;
  params: SearchParams;
}) {
  if (disabled) {
    return (
      <div className="p-2 border rounded-lg opacity-50 cursor-not-allowed">
        {children}
      </div>
    );
  }

  const newParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value && typeof value === 'string') newParams.set(key, value);
  });
  newParams.set('page', page.toString());

  return (
    <Link
      href={`/leads?${newParams.toString()}`}
      className="p-2 border rounded-lg hover:bg-accent transition-colors"
    >
      {children}
    </Link>
  );
}
