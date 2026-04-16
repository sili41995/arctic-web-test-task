'use client';

import { useState } from 'react';
import { Edit3, Trash2, Loader2 } from 'lucide-react';
import { Lead } from '@/types';
import { LeadFormModal } from './LeadFormModal';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export function LeadDetailActions({ lead }: { lead: Lead }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this lead? This action cannot be undone.')) return;
    
    setIsDeleting(true);
    try {
      await api.delete(`/leads/${lead.id}`);
      router.push('/leads');
      router.refresh();
    } catch (err) {
      alert('Failed to delete lead');
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 border rounded-xl font-semibold hover:bg-accent transition-colors"
        >
          <Edit3 size={18} />
          Edit
        </button>
        <button 
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive border border-destructive/20 rounded-xl font-semibold hover:bg-destructive hover:text-destructive-foreground transition-all disabled:opacity-50"
        >
          {isDeleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
          Delete
        </button>
      </div>

      <LeadFormModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        onSuccess={() => router.refresh()}
        initialData={lead}
      />
    </>
  );
}
