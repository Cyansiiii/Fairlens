import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../../store';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';
  const nextLabel = isDark ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        toggleTheme();
      }}
      className="button-ghost flex h-10 w-10 items-center justify-center rounded-[18px] text-text-secondary transition-all duration-200 hover:-translate-y-0.5 hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/20"
      title={`Switch to ${nextLabel} mode`}
      aria-label={`Switch to ${nextLabel} mode`}
    >
      {isDark ? <Sun className="h-5 w-5 text-warning-400" /> : <Moon className="h-5 w-5 text-primary-500" />}
    </button>
  );
}
