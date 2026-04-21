import { clsx } from 'clsx';
import type { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  tone?: 'default' | 'accent' | 'success' | 'danger';
}

export default function Card({
  children,
  className,
  hover = false,
  padding = 'md',
  tone = 'default',
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        'glass-panel rounded-[28px] shadow-[0_28px_80px_-40px_rgba(17,33,59,0.36)]',
        hover && 'premium-card-hover',
        {
          'shadow-[0_0_0_1px_rgba(0,101,242,0.06),0_28px_80px_-40px_rgba(0,101,242,0.38)]': tone === 'accent',
          'shadow-[0_0_0_1px_rgba(24,171,113,0.06),0_28px_80px_-40px_rgba(24,171,113,0.32)]': tone === 'success',
          'shadow-[0_0_0_1px_rgba(246,95,67,0.06),0_28px_80px_-40px_rgba(246,95,67,0.32)]': tone === 'danger',
        },
        {
          'p-0': padding === 'none',
          'p-4 sm:p-5': padding === 'sm',
          'p-5 sm:p-6': padding === 'md',
          'p-6 sm:p-8': padding === 'lg',
        },
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
