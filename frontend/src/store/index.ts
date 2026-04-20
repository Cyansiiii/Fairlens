import { create } from 'zustand';
import type { AuditResponse, ScanResultsResponse, UploadResponse, User } from '../types';

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
