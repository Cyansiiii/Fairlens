import { type FormEvent, type KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  BarChart2,
  BrainCircuit,
  Check,
  FileBadge,
  FileText,
  Globe,
  MessageSquare,
  MoreVertical,
  Plus,
  Search,
  Send,
  Settings,
  Share2,
  ShieldAlert,
  Sidebar,
  SlidersHorizontal,
  Sparkles,
  Zap,
} from 'lucide-react';

import ThemeToggle from '../../components/ui/ThemeToggle';
import { sendChatMessage } from '../../api/endpoints';
import { useChatStore } from '../../store';

const initialSources = [
  { id: '1', name: 'hiring_decisions_2024.csv', type: 'csv', selected: true },
  { id: '2', name: 'loan_model_shadow_v2.onnx', type: 'model', selected: false },
  { id: '3', name: 'triage_outcomes_q1.csv', type: 'csv', selected: false },
];

const studioActions = [
  { id: 'sim', name: 'Run Simulation', icon: SlidersHorizontal, color: 'text-blue-500 dark:text-blue-400', path: '/simulation' },
  { id: 'mit', name: 'Apply Mitigation', icon: ShieldAlert, color: 'text-amber-500 dark:text-amber-400', path: 'fix' },
  { id: 'cert', name: 'Generate Certificate', icon: FileBadge, color: 'text-green-500 dark:text-green-400', path: 'certificate' },
  { id: 'rep', name: 'FairScore Report', icon: BarChart2, color: 'text-violet-500 dark:text-purple-400', path: 'certificate' },
  { id: 'feat', name: 'Feature Importance', icon: Sparkles, color: 'text-pink-500 dark:text-pink-400', path: '/simulation' },
];

const savedNotes = [
  { id: 'n1', title: 'High Disparate Impact in Age group', date: '12d ago' },
  { id: 'n2', title: 'Simulation: Dropping zip code proxy', date: '12d ago' },
];

const getChatResponseText = (response: unknown) => {
  if (typeof response === 'string') {
    const textChunks = Array.from(response.matchAll(/content['"]?\s*:\s*['"]([^'"]+)/g)).map((match) => match[1]);
    return textChunks.join(' ').trim() || response.replace(/^data:\s*/gm, '').trim();
  }

  if (response && typeof response === 'object') {
    const data = response as { message?: unknown; content?: unknown; response?: unknown };
    const content = data.message ?? data.content ?? data.response;

    if (typeof content === 'string') {
      return content;
    }
  }

  return 'I received your question, but the response format was not recognized.';
};

export default function ScanResults() {
  const navigate = useNavigate();
  const { auditId } = useParams();
  const resolvedAuditId = auditId ?? 'demo-001';
  const [chatInput, setChatInput] = useState('');
  const [sources, setSources] = useState(initialSources);
  const [sourceQuery, setSourceQuery] = useState('');
  const [sourceMode, setSourceMode] = useState<'web' | 'research'>('web');
  const [notes, setNotes] = useState(savedNotes);
  const { messages, isLoading, addMessage, setLoading } = useChatStore();
  const conversationEndRef = useRef<HTMLDivElement>(null);

  const selectedSourcesCount = sources.filter((source) => source.selected).length;
  const allSourcesSelected = sources.every((source) => source.selected);
  const normalizedSourceQuery = sourceQuery.trim().toLowerCase();
  const filteredSources = normalizedSourceQuery
    ? sources.filter((source) => source.name.toLowerCase().includes(normalizedSourceQuery))
    : sources;

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages.length, isLoading]);

  const toggleAllSources = () => {
    setSources((current) =>
      current.map((source) => ({
        ...source,
        selected: !allSourcesSelected,
      })),
    );
  };

  const toggleSource = (sourceId: string) => {
    setSources((current) =>
      current.map((source) =>
        source.id === sourceId
          ? { ...source, selected: !source.selected }
          : source,
      ),
    );
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `FairLens Analysis: ${resolvedAuditId}`,
          url: shareUrl,
        });
        return;
      } catch {
        // Fall through to clipboard copy when native share is cancelled or unavailable.
      }
    }

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(shareUrl);
    }
  };

  const handleSendMessage = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const message = chatInput.trim();
    if (!message || isLoading) {
      return;
    }

    addMessage({ role: 'user', content: message });
    setChatInput('');
    setLoading(true);

    try {
      const response = await sendChatMessage(resolvedAuditId, message);
      addMessage({ role: 'assistant', content: getChatResponseText(response) });
    } catch {
      addMessage({
        role: 'assistant',
        content: 'I could not reach the FairLens Copilot service. Please make sure the backend is running and you are signed in, then try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChatKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void handleSendMessage();
    }
  };

  const handleAddNote = () => {
    const latestMessage = [...messages].reverse().find((message) => message.content.trim());
    const title = latestMessage?.content.trim().slice(0, 52) || 'Review fairness mitigation plan';

    setNotes((current) => [
      { id: crypto.randomUUID(), title, date: 'Just now' },
      ...current,
    ]);
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-slate-50 font-sans text-slate-900 dark:bg-[#131314] dark:text-neutral-200">
      <header className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-[#131314]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="mr-1 rounded-full p-1.5 transition-colors hover:bg-slate-200 dark:hover:bg-white/10"
            title="Back to Dashboard"
          >
            <ArrowLeft className="h-5 w-5 text-slate-500 dark:text-neutral-400" />
          </button>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white dark:bg-white dark:text-black">
            <BrainCircuit className="h-5 w-5" />
          </div>
          <h1 className="text-xl font-medium tracking-tight text-slate-900 dark:text-white">
            FairLens Analysis: {resolvedAuditId}
          </h1>
          <span className="ml-2 rounded border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-neutral-800 dark:text-neutral-300">
            Shared
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border-l border-slate-200 pl-4 dark:border-white/10">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => navigate('/simulation')}
              className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-colors hover:bg-slate-200 dark:hover:bg-white/10"
            >
              <BarChart2 className="h-4 w-4" /> Analytics
            </button>
            <button
              type="button"
              onClick={() => {
                void handleShare();
              }}
              className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-colors hover:bg-slate-200 dark:hover:bg-white/10"
            >
              <Share2 className="h-4 w-4" /> Share
            </button>
            <button
              type="button"
              onClick={() => navigate('/settings')}
              className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-colors hover:bg-slate-200 dark:hover:bg-white/10"
            >
              <Settings className="h-4 w-4" /> Settings
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-1 gap-4 overflow-hidden p-4">
        <aside className="flex w-[320px] flex-shrink-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-[#1e1e1f] dark:shadow-none">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-white/5">
            <h2 className="text-sm font-medium text-slate-900 dark:text-white">Sources</h2>
            <button
              type="button"
              onClick={() => setSourceQuery('')}
              className="rounded-full p-1 transition-colors hover:bg-slate-100 dark:hover:bg-white/10"
              title="Reset source search"
              aria-label="Reset source search"
            >
              <Sidebar className="h-4 w-4 text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white" />
            </button>
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto p-4">
            <button
              type="button"
              onClick={() => navigate('/audit/new/upload')}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 py-2.5 text-sm font-medium transition-colors hover:bg-slate-100 dark:border-white/10 dark:hover:bg-white/5"
            >
              <Plus className="h-4 w-4" />
              Add sources
            </button>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-neutral-500" />
              <input
                type="text"
                value={sourceQuery}
                onChange={(event) => setSourceQuery(event.target.value)}
                placeholder="Search the web for new sources"
                className="w-full cursor-text select-text rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 caret-slate-900 focus:border-slate-300 dark:border-white/10 dark:bg-[#131314] dark:text-white dark:placeholder:text-neutral-500 dark:caret-white dark:focus:border-white/20"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSourceMode('web')}
                className={`flex flex-1 items-center justify-center gap-2 rounded-full border py-2 text-xs font-medium transition-colors ${
                  sourceMode === 'web'
                    ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-black'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 dark:border-white/10 dark:bg-[#131314] dark:text-neutral-200 dark:hover:bg-white/5'
                }`}
              >
                <Globe className="h-3 w-3" /> Web
              </button>
              <button
                type="button"
                onClick={() => setSourceMode('research')}
                className={`flex flex-1 items-center justify-center gap-2 rounded-full border py-2 text-xs font-medium transition-colors ${
                  sourceMode === 'research'
                    ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-black'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 dark:border-white/10 dark:bg-[#131314] dark:text-neutral-200 dark:hover:bg-white/5'
                }`}
              >
                <Zap className="h-3 w-3" /> Fast Research
              </button>
            </div>

            <div className="mt-4">
              <div className="mb-3 flex items-center justify-between px-1 text-xs text-slate-500 dark:text-neutral-400">
                <span>Select all sources</span>
                <button
                  type="button"
                  onClick={toggleAllSources}
                  className="flex h-4 w-4 items-center justify-center rounded border border-slate-300 hover:border-slate-900 dark:border-neutral-600 dark:hover:border-white"
                  aria-label="Select all sources"
                >
                  {allSourcesSelected ? <Check className="h-3 w-3 text-slate-900 dark:text-white" /> : null}
                </button>
              </div>

              <div className="space-y-1">
                {filteredSources.length > 0 ? (
                  filteredSources.map((source) => (
                    <button
                      key={source.id}
                      type="button"
                      onClick={() => toggleSource(source.id)}
                      className="group flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-slate-100 dark:hover:bg-white/5"
                    >
                      <FileText className={`h-4 w-4 ${source.type === 'csv' ? 'text-green-500 dark:text-green-400' : 'text-blue-500 dark:text-blue-400'}`} />
                      <span className="flex-1 truncate text-sm text-slate-700 dark:text-neutral-200">
                        {source.name}
                      </span>
                      <div
                        className={`flex h-4 w-4 items-center justify-center rounded border ${
                          source.selected
                            ? 'border-slate-900 bg-slate-900 dark:border-white dark:bg-white'
                            : 'border-slate-300 group-hover:border-slate-900 dark:border-neutral-600 dark:group-hover:border-white'
                        }`}
                      >
                        {source.selected ? <Check className="h-3 w-3 text-white dark:text-black" /> : null}
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="rounded-lg border border-dashed border-slate-200 px-3 py-4 text-center text-sm text-slate-500 dark:border-white/10 dark:text-neutral-500">
                    No sources match &quot;{sourceQuery}&quot;.
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>

        <section className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-[#1e1e1f] dark:shadow-none">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-sm font-medium text-slate-900 dark:text-white">Fairness Copilot</h2>
            <div className="flex items-center gap-3 text-slate-500 dark:text-neutral-400">
              <button
                type="button"
                onClick={() => navigate('/simulation')}
                className="rounded-full p-1 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
                aria-label="Open simulation controls"
                title="Open simulation controls"
              >
                <SlidersHorizontal className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => navigate('/settings')}
                className="rounded-full p-1 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
                aria-label="Open settings"
                title="Open settings"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-1 flex-col overflow-y-auto px-8 py-8 md:px-12 lg:px-24">
            <div className="mb-8 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-80">
                <BrainCircuit className="h-8 w-8 text-white" />
              </div>
            </div>

            <h1 className="mb-2 text-3xl font-medium leading-tight text-slate-900 dark:text-white">
              FairLens: Analysis Findings
            </h1>
            <p className="mb-8 text-sm text-slate-500 dark:text-neutral-400">
              {selectedSourcesCount} source{selectedSourcesCount === 1 ? '' : 's'} &middot; Uploaded today
            </p>

            <div className="select-text space-y-4 text-base leading-relaxed text-slate-700 dark:text-neutral-300">
              <p>
                <strong className="text-slate-900 dark:text-white">Analysis Complete:</strong> The model is operable, but not defensible yet. The sharpest failure appears in caste-linked hiring outcomes.
              </p>
              <p>
                Proxy-heavy name and locality features are amplifying the disparity. Mitigation and representation balancing are likely to recover the score into the 80s.
              </p>
            </div>

            {messages.length > 0 ? (
              <div className="mt-8 space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        message.role === 'user'
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-black'
                          : 'border border-slate-200 bg-slate-50 text-slate-700 dark:border-white/10 dark:bg-[#131314] dark:text-neutral-200'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isLoading ? (
                  <div className="flex justify-start">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 dark:border-white/10 dark:bg-[#131314] dark:text-neutral-400">
                      Thinking...
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
            <div ref={conversationEndRef} />
          </div>

          <div className="mt-auto p-6 pt-0">
            <form
              onSubmit={(event) => {
                void handleSendMessage(event);
              }}
              className="relative flex items-end rounded-2xl border border-slate-200 bg-slate-50 p-2 dark:border-white/10 dark:bg-[#131314]"
            >
              <textarea
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                onKeyDown={handleChatKeyDown}
                placeholder="Ask about fairness metrics, bias findings, or mitigations..."
                className="min-h-[44px] max-h-[200px] w-full resize-none bg-transparent p-3 text-sm text-slate-900 outline-none cursor-text select-text caret-slate-900 placeholder:text-slate-400 dark:text-white dark:placeholder:text-neutral-500 dark:caret-white"
                rows={1}
              />
              <div className="flex items-center gap-3 p-2">
                <span className="whitespace-nowrap text-xs text-slate-500 dark:text-neutral-500">
                  {selectedSourcesCount} source{selectedSourcesCount === 1 ? '' : 's'}
                </span>
                <button
                  type="submit"
                  disabled={!chatInput.trim() || isLoading}
                  aria-label="Send message"
                  title="Send message"
                  className={`rounded-full p-2 transition-colors ${
                    chatInput.trim() && !isLoading
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-black'
                      : 'cursor-not-allowed bg-slate-200 text-slate-400 dark:bg-white/10 dark:text-neutral-500'
                  }`}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
            <p className="mt-3 text-center text-[11px] text-slate-500 dark:text-neutral-500">
              FairLens Copilot can make mistakes. Please verify critical mitigation decisions.
            </p>
          </div>
        </section>

        <aside className="flex w-[340px] flex-shrink-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-[#1e1e1f] dark:shadow-none">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-white/5">
            <h2 className="text-sm font-medium text-slate-900 dark:text-white">Action Studio</h2>
            <button
              type="button"
              onClick={() => navigate('/audit/new/upload')}
              className="rounded-full p-1 transition-colors hover:bg-slate-100 dark:hover:bg-white/10"
              aria-label="Add sources"
              title="Add sources"
            >
              <Sidebar className="h-4 w-4 text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-4 rounded-xl border border-slate-200 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-4 dark:border-white/10 dark:from-indigo-900/40 dark:via-purple-900/40 dark:to-pink-900/40">
              <p className="text-sm text-slate-700 dark:text-neutral-200">
                Run an audit on: <span className="text-blue-600 dark:text-blue-300">Gender</span>, <span className="text-purple-600 dark:text-purple-300">Age</span>, <span className="text-pink-600 dark:text-pink-300">Ethnicity</span>, <span className="text-indigo-600 dark:text-indigo-300">Income Level</span>
              </p>
            </div>

            <div className="mb-8 grid grid-cols-2 gap-3">
              {studioActions.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => navigate(action.path.startsWith('/') ? action.path : `/audit/${resolvedAuditId}/${action.path}`)}
                  className="flex flex-col items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-left transition-all hover:border-slate-300 hover:bg-slate-100 dark:border-white/5 dark:bg-[#131314] dark:hover:border-white/20 dark:hover:bg-white/5"
                >
                  <action.icon className={`h-5 w-5 ${action.color}`} />
                  <span className="text-xs font-medium text-slate-700 dark:text-neutral-300">{action.name}</span>
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <h3 className="mb-3 px-1 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-neutral-500">
                Saved Insights
              </h3>

              {notes.map((note) => (
                <button
                  key={note.id}
                  type="button"
                  onClick={() => setChatInput(note.title)}
                  className="group flex w-full items-start gap-3 rounded-xl p-3 text-left hover:bg-slate-100 dark:hover:bg-white/5"
                >
                  <MessageSquare className="mt-0.5 h-4 w-4 text-slate-400 dark:text-neutral-400" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-slate-700 dark:text-neutral-300">{note.title}</p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-neutral-500">{note.date}</p>
                  </div>
                  <MoreVertical className="h-4 w-4 text-slate-400 group-hover:text-slate-600 dark:text-neutral-600 dark:group-hover:text-neutral-400" />
                </button>
              ))}

              <button
                type="button"
                onClick={handleAddNote}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              >
                <Plus className="h-4 w-4" /> Add note
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
