import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          'group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-transparent font-semibold tracking-[-0.02em] transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50',
          {
            'bg-[var(--gradient-brand)] text-white shadow-[0_22px_50px_-22px_rgba(0,101,242,0.82)] hover:-translate-y-0.5 hover:shadow-[0_28px_70px_-24px_rgba(0,101,242,0.82)] focus-visible:ring-primary-400':
              variant === 'primary',
            'glass-panel glass-panel-strong text-text-primary shadow-[0_22px_50px_-30px_rgba(17,33,59,0.45)] hover:-translate-y-0.5 hover:shadow-[0_28px_70px_-30px_rgba(17,33,59,0.48)] focus-visible:ring-primary-300':
              variant === 'secondary',
            'border-white/20 bg-white/18 text-text-secondary backdrop-blur-xl hover:border-white/35 hover:bg-white/28 hover:text-text-primary focus-visible:ring-primary-300':
              variant === 'ghost',
            'bg-[var(--gradient-signal)] text-white shadow-[0_22px_50px_-22px_rgba(246,95,67,0.7)] hover:-translate-y-0.5 hover:shadow-[0_28px_70px_-24px_rgba(246,95,67,0.78)] focus-visible:ring-critical-300':
              variant === 'danger',
            'bg-[linear-gradient(135deg,var(--color-accent-500),#67e2d0)] text-white shadow-[0_22px_50px_-22px_rgba(18,179,168,0.7)] hover:-translate-y-0.5 hover:shadow-[0_28px_70px_-24px_rgba(18,179,168,0.78)] focus-visible:ring-accent-300':
              variant === 'accent',
          },
          {
            'px-4 py-2 text-sm gap-1.5': size === 'sm',
            'px-5 py-3 text-sm gap-2': size === 'md',
            'px-6 py-3.5 text-base gap-2.5': size === 'lg',
          },
          className,
        )}
        {...props}
      >
        <span className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
          <span className="absolute inset-y-[-120%] left-[-25%] w-[38%] rotate-[16deg] bg-[linear-gradient(135deg,transparent,rgba(255,255,255,0.55),transparent)] transition duration-700 group-hover:left-[110%]" />
        </span>
        <span className="relative z-10 inline-flex items-center justify-center gap-2">
          {loading && (
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {children}
        </span>
      </button>
    );
  },
);

Button.displayName = 'Button';
export default Button;
