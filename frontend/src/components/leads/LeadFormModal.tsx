'use client';

import { Status, Lead } from '@/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { AxiosError } from 'axios';

const leadSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address').nullable().optional().or(z.literal('')),
  company: z.string().nullable().optional().or(z.literal('')),
  status: z.nativeEnum(Status),
  value: z.union([z.number().min(0, 'Value must be positive'), z.string(), z.null(), z.undefined()])
    .transform((val) => {
      if (val === '' || val === null || val === undefined) return undefined;
      if (typeof val === 'string') return Number(val);
      return val;
    }),
  notes: z.string().nullable().optional().or(z.literal('')),
});

export type LeadFormData = {
  name: string;
  email?: string | null;
  company?: string | null;
  status: Status;
  value?: number | string | null;
  notes?: string | null;
};

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Lead;
}

export function LeadFormModal({ isOpen, onClose, onSuccess, initialData }: LeadFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema) as any,
    defaultValues: {
      status: Status.NEW,
      name: '',
      email: '',
      company: '',
      notes: '',
      value: '',
    },
  });

  // Reset form when initialData changes or modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset({
          name: initialData.name,
          email: initialData.email || '',
          company: initialData.company || '',
          status: initialData.status,
          value: initialData.value ?? '',
          notes: initialData.notes || '',
        });
      } else {
        reset({
          status: Status.NEW,
          name: '',
          email: '',
          company: '',
          notes: '',
          value: '',
        });
      }
    }
  }, [isOpen, initialData, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const payload = {
        ...data,
        email: data.email || null,
        company: data.company || null,
        notes: data.notes || null,
        value: data.value === '' || data.value === null || data.value === undefined ? null : Number(data.value),
      };

      if (initialData?.id) {
        await api.patch(`/leads/${initialData.id}`, payload);
      } else {
        await api.post('/leads', payload);
      }
      
      onSuccess();
      onClose();
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string | string[] }>;
      const message = axiosError.response?.data?.message;
      setError(Array.isArray(message) ? message[0] : message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      <div className='absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity' onClick={onClose} />
      <div className='relative w-full max-w-lg overflow-hidden rounded-2xl border bg-card shadow-2xl animate-in fade-in zoom-in duration-200'>
        <div className='flex items-center justify-between border-b px-6 py-4'>
          <h2 className='text-xl font-bold'>{initialData ? 'Edit Lead' : 'Create New Lead'}</h2>
          <button onClick={onClose} className='rounded-full p-1 hover:bg-accent transition-colors'>
            <X size={20} className='text-muted-foreground' />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='p-6 space-y-4'>
          {error && <div className='p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm'>{error}</div>}

          <div className='space-y-1.5'>
            <label className='text-sm font-semibold'>Name *</label>
            <input
              {...register('name')}
              className='w-full px-4 py-2 rounded-lg border bg-background outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'
              placeholder='e.g. John Doe'
            />
            {errors.name && <p className='text-xs text-destructive'>{errors.name.message as string}</p>}
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-1.5'>
              <label className='text-sm font-semibold'>Email</label>
              <input
                {...register('email')}
                className='w-full px-4 py-2 rounded-lg border bg-background outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'
                placeholder='john@example.com'
              />
              {errors.email && <p className='text-xs text-destructive'>{errors.email.message as string}</p>}
            </div>
            <div className='space-y-1.5'>
              <label className='text-sm font-semibold'>Company</label>
              <input
                {...register('company')}
                className='w-full px-4 py-2 rounded-lg border bg-background outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'
                placeholder='Acme Corp'
              />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-1.5'>
              <label className='text-sm font-semibold'>Status</label>
              <select
                {...register('status')}
                className='w-full px-4 py-2 rounded-lg border bg-background outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all accent-primary appearance-none cursor-pointer'
              >
                {Object.values(Status).map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0) + status.slice(1).toLowerCase().replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>
            <div className='space-y-1.5'>
              <label className='text-sm font-semibold'>Value ($)</label>
              <input
                type='number'
                step='0.01'
                {...register('value')}
                className='w-full px-4 py-2 rounded-lg border bg-background outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'
                placeholder='1000.00'
              />
              {errors.value && <p className='text-xs text-destructive'>{errors.value.message as string}</p>}
            </div>
          </div>

          <div className='space-y-1.5'>
            <label className='text-sm font-semibold'>Notes</label>
            <textarea
              {...register('notes')}
              rows={3}
              className='w-full px-4 py-2 rounded-lg border bg-background outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none'
              placeholder='Any additional details...'
            />
          </div>

          <div className='flex gap-3 pt-2'>
            <button type='button' onClick={onClose} className='flex-1 py-2 px-4 rounded-xl border font-semibold hover:bg-accent transition-colors'>
              Cancel
            </button>
            <button
              type='submit'
              disabled={isSubmitting}
              className='flex-1 py-2 px-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2'
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className='animate-spin' />
                  Saving...
                </>
              ) : initialData ? (
                'Update Lead'
              ) : (
                'Create Lead'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
