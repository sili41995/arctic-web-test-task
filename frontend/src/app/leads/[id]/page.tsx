import api from '@/lib/api';
import { Lead, Comment } from '@/types';
import { StatusBadge } from '@/components/leads/StatusBadge';
import { LeadDetailActions } from '@/components/leads/LeadDetailActions';
import { CommentList } from '@/components/comments/CommentList';
import { CommentForm } from '@/components/comments/CommentForm';
import { formatCurrency, formatDate } from '@/lib/utils';
import { 
  ArrowLeft, 
  Mail, 
  Building2, 
  Calendar, 
  ChevronRight,
  AlertCircle,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AxiosError } from 'axios';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getLead(id: string) {
  try {
    const response = await api.get<Lead>(`/leads/${id}`);
    return { lead: response.data, error: null };
  } catch (err) {
    const axiosError = err as AxiosError;
    if (axiosError.response?.status === 404) return { lead: null, error: 'Not Found' };
    return { lead: null, error: 'Server Error' };
  }
}

async function getComments(id: string) {
  try {
    const response = await api.get<Comment[]>(`/leads/${id}/comments`);
    return response.data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (err) {
    console.error('Failed to fetch comments:', err);
    return [];
  }
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function LeadDetailPage({ params }: PageProps) {
  const { id } = await params;
  const { lead, error } = await getLead(id);
  
  if (error === 'Not Found') {
    notFound();
  }

  if (error || !lead) {
    return (
      <div className="space-y-6">
        <Link href="/leads" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          <span>Back to Leads</span>
        </Link>
        <div className="p-12 rounded-2xl border border-destructive/20 bg-destructive/5 flex flex-col items-center justify-center text-center space-y-4">
          <AlertCircle size={48} className="text-destructive" />
          <h2 className="text-2xl font-bold">Connection Error</h2>
          <p className="text-muted-foreground max-w-sm">
            We couldn't connect to the server. Please try again later.
          </p>
          <Link 
            href="/leads"
            className="px-6 py-2 bg-primary text-primary-foreground rounded-xl font-semibold"
          >
            Return to List
          </Link>
        </div>
      </div>
    );
  }

  const comments = await getComments(id);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header & Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/leads" className="p-2 border rounded-xl hover:bg-accent transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/leads" className="hover:text-foreground">Leads</Link>
            <ChevronRight size={14} />
            <span className="text-foreground font-medium truncate max-w-[200px]">{lead.name}</span>
          </div>
        </div>
        
        <LeadDetailActions lead={lead} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">
            <div className="p-8 border-b bg-muted/20">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h1 className="text-3xl font-bold tracking-tight">{lead.name}</h1>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    {lead.company && (
                      <span className="flex items-center gap-1.5">
                        <Building2 size={16} />
                        {lead.company}
                      </span>
                    )}
                    {lead.email && (
                      <span className="flex items-center gap-1.5">
                        <Mail size={16} />
                        {lead.email}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <StatusBadge status={lead.status} />
                  <p className="text-2xl font-bold">
                    {lead.value ? formatCurrency(lead.value) : '$0.00'}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">General Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm py-2 border-b">
                      <span className="text-muted-foreground">Status</span>
                      <span className="font-medium">{lead.status}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm py-2 border-b">
                      <span className="text-muted-foreground">Value</span>
                      <span className="font-medium">{lead.value ? formatCurrency(lead.value) : '—'}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm py-2 border-b">
                      <span className="text-muted-foreground">Created</span>
                      <span className="font-medium flex items-center gap-1.5">
                        <Calendar size={14} />
                        {formatDate(lead.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm py-2">
                      <span className="text-muted-foreground">Last Update</span>
                      <span className="font-medium flex items-center gap-1.5">
                        <Clock size={14} />
                        {formatDate(lead.updatedAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Notes</h3>
                  <div className="p-4 rounded-xl bg-muted/30 border text-sm min-h-[120px] leading-relaxed italic">
                    {lead.notes || 'No notes available for this lead.'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold">Activity Feed</h2>
            <CommentForm leadId={lead.id} />
            <div className="pt-4">
              <CommentList comments={comments} isLoading={false} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold flex items-center gap-2">
              <div className="h-6 w-1 bg-primary rounded-full" />
              Quick Stats
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-accent/50 text-center">
                <p className="text-[10px] uppercase font-bold text-muted-foreground">Comments</p>
                <p className="text-xl font-bold">{comments.length}</p>
              </div>
              <div className="p-3 rounded-xl bg-accent/50 text-center">
                <p className="text-[10px] uppercase font-bold text-muted-foreground">Age</p>
                <p className="text-xl font-bold">
                  {Math.floor((new Date().getTime() - new Date(lead.createdAt).getTime()) / (1000 * 3600 * 24))}d
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 space-y-3">
             <h4 className="font-bold text-primary">Sales Coaching AI</h4>
             <p className="text-sm text-balance leading-snug">
               Based on the <strong>{lead.status}</strong> status, we recommend following up with an email focusing on the potential <strong>{formatCurrency(lead.value || 0)}</strong> value of the deal.
             </p>
             <button className="text-xs font-bold text-primary hover:underline underline-offset-4">
               Generate Email Draft →
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
