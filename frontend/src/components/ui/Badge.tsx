import { clsx } from 'clsx';
import type { Severity } from '../../types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'critical' | 'accent' | 'neutral';
  severity?: Severity;
  size?: 'sm' | 'md';
  dot?: boolean;
}

export default function Badge({ children, variant = 'default', severity, size = 'sm', dot = false }: BadgeProps) {
  const resolvedVariant = severity
    ? severity === 'low' ? 'success'
      : severity === 'medium' ? 'warning'
      : 'critical'
    : variant;

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full border font-semibold tracking-[-0.02em] backdrop-blur-xl',
        {
          'px-2.5 py-1 text-[0.72rem]': size === 'sm',
          'px-3 py-1.5 text-sm': size === 'md',
        },
        {
          'border-primary-100/70 bg-primary-50/82 text-primary-700': resolvedVariant === 'default',
          'border-success-100/70 bg-success-50/82 text-success-700': resolvedVariant === 'success',
          'border-warning-100/70 bg-warning-50/88 text-warning-700': resolvedVariant === 'warning',
          'border-critical-100/70 bg-critical-50/88 text-critical-700': resolvedVariant === 'critical',
          'border-accent-100/70 bg-accent-50/82 text-accent-700': resolvedVariant === 'accent',
          'theme-surface-soft text-text-secondary': resolvedVariant === 'neutral',
        },
      )}
    >
      {dot && (
        <span
          className={clsx('mr-1.5 h-1.5 w-1.5 rounded-full', {
            'bg-primary-500': resolvedVariant === 'default',
            'bg-success-500': resolvedVariant === 'success',
            'bg-warning-500': resolvedVariant === 'warning',
            'bg-critical-500': resolvedVariant === 'critical',
            'bg-accent-500': resolvedVariant === 'accent',
            'bg-text-tertiary': resolvedVariant === 'neutral',
          })}
        />
      )}
      {children}
    </span>
  );
}
