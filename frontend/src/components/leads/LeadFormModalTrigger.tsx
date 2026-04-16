'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { LeadFormModal } from './LeadFormModal';
import { useRouter } from 'next/navigation';

export function LeadFormModalTrigger() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
      >
        <Plus size={20} />
        <span>New Lead</span>
      </button>

      <LeadFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => router.refresh()}
      />
    </>
  );
}
