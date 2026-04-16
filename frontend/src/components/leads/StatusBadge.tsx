import { Status } from '@/types';
import { cn } from '@/lib/utils';

const statusStyles: Record<Status, { label: string; bg: string; text: string }> = {
  [Status.NEW]: { label: 'New', bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400' },
  [Status.CONTACTED]: { label: 'Contacted', bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-400' },
  [Status.IN_PROGRESS]: { label: 'In Progress', bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-400' },
  [Status.WON]: { label: 'Won', bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-400' },
  [Status.LOST]: { label: 'Lost', bg: 'bg-rose-100 dark:bg-rose-900/30', text: 'text-rose-700 dark:text-rose-400' },
};

export function StatusBadge({ status }: { status: Status }) {
  const style = statusStyles[status];
  
  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border",
      style.bg,
      style.text,
      "border-transparent"
    )}>
      {style.label}
    </span>
  );
}
