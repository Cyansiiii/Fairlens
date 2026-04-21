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
          'group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-transparent font-semibold tracking-[-0.02em] transform-gpu transition-[transform,box-shadow,filter,color,border-color] duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)] disabled:cursor-not-allowed disabled:opacity-50',
          {
            'button-primary text-white focus-visible:ring-primary-400':
              variant === 'primary',
            'button-secondary text-text-primary focus-visible:ring-primary-300':
              variant === 'secondary',
            'button-ghost text-text-secondary focus-visible:ring-primary-300':
              variant === 'ghost',
            'button-danger text-white focus-visible:ring-critical-300':
              variant === 'danger',
            'button-accent text-white focus-visible:ring-accent-300':
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
        <span className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_58%)] opacity-0 transition duration-300 group-hover:opacity-100" />
          <span className="absolute inset-y-[-150%] left-[-34%] w-[40%] rotate-[16deg] bg-[linear-gradient(135deg,transparent,rgba(255,255,255,0.55),transparent)] blur-[1px] transition-[left] duration-700 ease-out group-hover:left-[118%]" />
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
