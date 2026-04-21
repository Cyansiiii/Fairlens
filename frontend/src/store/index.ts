import { create } from 'zustand';
import type { AuditResponse, ScanResultsResponse, UploadResponse, User } from '../types';

type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'fairlens_theme';
const DEFAULT_THEME: Theme = 'light';

const getStoredTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return DEFAULT_THEME;
  }

  return window.localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : DEFAULT_THEME;
};

const applyTheme = (theme: Theme) => {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.style.colorScheme = theme;
};

const initialTheme = getStoredTheme();
applyTheme(initialTheme);

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  initializeTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: initialTheme,
  setTheme: (theme) => {
    applyTheme(theme);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
    set({ theme });
  },
  toggleTheme: () =>
    set((state) => {
      const nextTheme = state.theme === 'light' ? 'dark' : 'light';
      applyTheme(nextTheme);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      }

      return { theme: nextTheme };
    }),
  initializeTheme: () => {
    const theme = getStoredTheme();
    applyTheme(theme);
    set({ theme });
  },
}));

// User Store
interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => {
    localStorage.removeItem('fairlens_token');
    set({ user: null, isAuthenticated: false });
  },
}));

// Audit Store
interface AuditState {
  currentAudit: AuditResponse | null;
  currentUpload: UploadResponse | null;
  scanResults: ScanResultsResponse | null;
  audits: AuditResponse[];
  scanProgress: number;
  setCurrentAudit: (audit: AuditResponse | null) => void;
  setCurrentUpload: (upload: UploadResponse | null) => void;
  setScanResults: (results: ScanResultsResponse | null) => void;
  setAudits: (audits: AuditResponse[]) => void;
  setScanProgress: (progress: number) => void;
}

export const useAuditStore = create<AuditState>((set) => ({
  currentAudit: null,
  currentUpload: null,
  scanResults: null,
  audits: [],
  scanProgress: 0,
  setCurrentAudit: (audit) => set({ currentAudit: audit }),
  setCurrentUpload: (upload) => set({ currentUpload: upload }),
  setScanResults: (results) => set({ scanResults: results }),
  setAudits: (audits) => set({ audits }),
  setScanProgress: (progress) => set({ scanProgress: progress }),
}));

// Chat Store
interface ChatState {
  messages: Array<{ id: string; role: 'user' | 'assistant'; content: string; timestamp: Date }>;
  isLoading: boolean;
  addMessage: (message: { role: 'user' | 'assistant'; content: string }) => void;
  setLoading: (loading: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,
  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        { ...message, id: crypto.randomUUID(), timestamp: new Date() },
      ],
    })),
  setLoading: (loading) => set({ isLoading: loading }),
  clearMessages: () => set({ messages: [] }),
}));
