import { useEffect } from 'react';
import { Toast as ToastType } from '../../types';
import { cn } from '../../lib/utils';

interface Props {
  toast: ToastType;
  onDismiss: (id: string) => void;
}

export function Toast({ toast, onDismiss }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, toast.duration ?? 3000);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  return (
    <div
      className={cn(
        'animate-bounce-in px-4 py-2 rounded-lg shadow-lg text-sm font-medium',
        toast.type === 'success' && 'bg-green-500 text-white',
        toast.type === 'info' && 'bg-blue-500 text-white',
        toast.type === 'warning' && 'bg-amber-500 text-white',
      )}
    >
      {toast.message}
    </div>
  );
}
