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
        'glass-panel rounded-[30px] shadow-[0_34px_92px_-46px_rgba(52,62,142,0.28)]',
        hover && 'premium-card-hover',
        {
          'shadow-[0_0_0_1px_rgba(115,99,255,0.06),0_34px_92px_-44px_rgba(115,99,255,0.34)]': tone === 'accent',
          'shadow-[0_0_0_1px_rgba(24,171,113,0.06),0_34px_92px_-44px_rgba(24,171,113,0.28)]': tone === 'success',
          'shadow-[0_0_0_1px_rgba(246,95,67,0.06),0_34px_92px_-44px_rgba(246,95,67,0.28)]': tone === 'danger',
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
