import { cn } from '../../lib/utils';

interface Props {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function Card({ className, children, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white rounded-2xl shadow-md border border-gray-100 p-6',
        onClick && 'cursor-pointer hover:shadow-lg hover:border-blue-200 transition-all duration-200',
        className,
      )}
    >
      {children}
    </div>
  );
}
