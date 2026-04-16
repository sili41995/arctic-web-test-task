'use client';

import { Comment } from '@/types';
import { formatDate } from '@/lib/utils';
import { MessageSquare, Clock } from 'lucide-react';

interface CommentListProps {
  comments: Comment[];
  isLoading: boolean;
}

export function CommentList({ comments, isLoading }: CommentListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-4">
            <div className="h-10 w-10 rounded-full bg-muted animate-pulse shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/4 bg-muted animate-pulse rounded" />
              <div className="h-12 w-full bg-muted animate-pulse rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/20 border border-dashed rounded-2xl">
        <MessageSquare size={32} className="text-muted-foreground/30 mb-2" />
        <p className="text-sm text-muted-foreground">No comments yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-4 group">
          <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-sm font-semibold border shrink-0">
            {/* Anonymous avatar placeholder */}
            <MessageSquare size={16} className="text-muted-foreground" />
          </div>
          <div className="flex-1">
            <div className="bg-muted/30 group-hover:bg-muted/50 transition-colors p-4 rounded-2xl rounded-tl-none border">
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{comment.text}</p>
            </div>
            <div className="flex items-center gap-2 mt-2 px-1">
               <Clock size={12} className="text-muted-foreground" />
               <span className="text-[11px] font-medium text-muted-foreground uppercase opacity-70">
                {formatDate(comment.createdAt)}
               </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
