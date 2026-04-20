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
        'inline-flex items-center font-medium rounded-full',
        {
          'px-2 py-0.5 text-xs': size === 'sm',
          'px-2.5 py-1 text-sm': size === 'md',
        },
        {
          'bg-primary-100 text-primary-700': resolvedVariant === 'default',
          'bg-success-100 text-success-700': resolvedVariant === 'success',
          'bg-warning-100 text-warning-700': resolvedVariant === 'warning',
          'bg-critical-100 text-critical-700': resolvedVariant === 'critical',
          'bg-accent-100 text-accent-700': resolvedVariant === 'accent',
          'bg-surface-tertiary text-text-secondary': resolvedVariant === 'neutral',
        }
      )}
    >
      {dot && (
        <span
          className={clsx('w-1.5 h-1.5 rounded-full mr-1.5', {
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
