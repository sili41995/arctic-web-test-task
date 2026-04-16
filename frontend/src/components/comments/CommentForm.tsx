'use client';

import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

import { AxiosError } from 'axios';

interface CommentFormProps {
  leadId: string;
}

export function CommentForm({ leadId }: CommentFormProps) {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsSubmitting(true);
    setError(null);
    try {
      await api.post(`/leads/${leadId}/comments`, { text, leadId });
      setText('');
      router.refresh();
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      setError(axiosError.response?.data?.message || 'Failed to add comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          className="w-full min-h-[100px] p-4 rounded-xl border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none shadow-sm text-sm"
          maxLength={500}
        />
        <div className="absolute bottom-3 right-3 flex items-center gap-3">
           <span className={text.length > 450 ? "text-xs text-amber-500" : "text-xs text-muted-foreground"}>
            {text.length}/500
          </span>
          <button
            type="submit"
            disabled={isSubmitting || !text.trim()}
            className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:grayscale shadow-md"
          >
            {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </form>
  );
}
