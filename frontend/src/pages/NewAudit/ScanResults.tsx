import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Plus,
  Search,
  Globe,
  Zap,
  MoreVertical,
  Sidebar,
  Settings,
  Share2,
  BarChart2,
  BrainCircuit,
  FileText,
  ChevronRight,
  Send,
  MessageSquare,
  ShieldAlert,
  SlidersHorizontal,
  FileBadge,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

const sources = [
  { id: '1', name: 'hiring_decisions_2024.csv', type: 'csv', selected: true },
  { id: '2', name: 'loan_model_shadow_v2.onnx', type: 'model', selected: false },
  { id: '3', name: 'triage_outcomes_q1.csv', type: 'csv', selected: false },
];

const studioActions = [
  { id: 'sim', name: 'Run Simulation', icon: SlidersHorizontal, color: 'text-blue-400', path: '/simulation' },
  { id: 'mit', name: 'Apply Mitigation', icon: ShieldAlert, color: 'text-amber-400', path: 'fix' },
  { id: 'cert', name: 'Generate Certificate', icon: FileBadge, color: 'text-green-400', path: 'certificate' },
  { id: 'rep', name: 'FairScore Report', icon: BarChart2, color: 'text-purple-400', path: '#' },
  { id: 'feat', name: 'Feature Importance', icon: Sparkles, color: 'text-pink-400', path: '#' },
];

const savedNotes = [
  { id: 'n1', title: 'High Disparate Impact in Age group', date: '12d ago' },
  { id: 'n2', title: 'Simulation: Dropping zip code proxy', date: '12d ago' },
];

export default function ScanResults() {
  const navigate = useNavigate();
  const { auditId } = useParams();
  const [chatInput, setChatInput] = useState('');

  return (
    <div className="flex flex-col h-screen w-full bg-[#131314] text-neutral-200 font-sans overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#131314]">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors mr-1"
            title="Back to Dashboard"
          >
            <ArrowLeft className="h-5 w-5 text-neutral-400" />
          </button>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
            <BrainCircuit className="h-5 w-5" />
          </div>
          <h1 className="text-xl font-medium text-white tracking-tight">FairLens Analysis: {auditId}</h1>
          <span className="ml-2 px-2 py-0.5 rounded text-xs font-medium bg-neutral-800 text-neutral-300 border border-white/10">
            Shared
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border-l border-white/10 pl-4">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors text-sm">
              <BarChart2 className="h-4 w-4" /> Analytics
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors text-sm">
              <Share2 className="h-4 w-4" /> Share
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors text-sm">
              <Settings className="h-4 w-4" /> Settings
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex overflow-hidden p-4 gap-4">
        
        {/* LEFT COLUMN: Sources */}
        <aside className="w-[320px] flex flex-col bg-[#1e1e1f] rounded-2xl border border-white/5 overflow-hidden flex-shrink-0">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <h2 className="text-sm font-medium text-white">Sources</h2>
            <Sidebar className="h-4 w-4 text-neutral-400 cursor-pointer hover:text-white" />
          </div>
          
          <div className="p-4 flex flex-col gap-4 overflow-y-auto">
            <button className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium">
              <Plus className="h-4 w-4" />
              Add sources
            </button>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <input 
                type="text" 
                placeholder="Search the web for new sources" 
                className="w-full bg-[#131314] border border-white/10 rounded-full pl-9 pr-4 py-2.5 text-sm outline-none focus:border-white/20 transition-colors placeholder:text-neutral-500"
              />
            </div>

            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 bg-[#131314] border border-white/10 rounded-full py-2 text-xs font-medium hover:bg-white/5">
                <Globe className="h-3 w-3" /> Web
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-[#131314] border border-white/10 rounded-full py-2 text-xs font-medium hover:bg-white/5">
                <Zap className="h-3 w-3" /> Fast Research
              </button>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-3 px-1">
                <span>Select all sources</span>
                <div className="w-4 h-4 rounded border border-neutral-600 flex items-center justify-center cursor-pointer hover:border-white">
                  <div className="w-2 h-2 bg-white rounded-sm opacity-50" />
                </div>
              </div>

              <div className="space-y-1">
                {sources.map(source => (
                  <div key={source.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 group cursor-pointer">
                    <FileText className={`h-4 w-4 ${source.type === 'csv' ? 'text-green-400' : 'text-blue-400'}`} />
                    <span className="text-sm truncate flex-1">{source.name}</span>
                    <div className={`w-4 h-4 rounded flex items-center justify-center border ${source.selected ? 'bg-white border-white' : 'border-neutral-600 group-hover:border-white'}`}>
                      {source.selected && <span className="text-black text-[10px]">✓</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* MIDDLE COLUMN: Chat */}
        <section className="flex-1 flex flex-col bg-[#1e1e1f] rounded-2xl border border-white/5 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-sm font-medium text-white">Fairness Copilot</h2>
            <div className="flex items-center gap-3 text-neutral-400">
              <SlidersHorizontal className="h-4 w-4 cursor-pointer hover:text-white" />
              <MoreVertical className="h-4 w-4 cursor-pointer hover:text-white" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-8 md:px-12 lg:px-24 py-8 flex flex-col">
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center opacity-80">
                <BrainCircuit className="h-8 w-8 text-white" />
              </div>
            </div>

            <h1 className="text-3xl font-medium text-white mb-2 leading-tight">
              FairLens: Analysis Findings
            </h1>
            <p className="text-sm text-neutral-400 mb-8">
              1 source · Uploaded today
            </p>

            <div className="text-base text-neutral-300 leading-relaxed space-y-4">
              <p>
                <strong>Analysis Complete:</strong> The model is operable, but not defensible yet. The sharpest failure appears in caste-linked hiring outcomes.
              </p>
              <p>
                Proxy-heavy name and locality features are amplifying the disparity. Mitigation and representation balancing are likely to recover the score into the 80s.
              </p>
            </div>
          </div>

          <div className="p-6 pt-0 mt-auto">
            <div className="relative bg-[#131314] rounded-2xl border border-white/10 p-2 flex items-end">
              <textarea 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about fairness metrics, bias findings, or mitigations..."
                className="w-full bg-transparent text-sm p-3 outline-none resize-none min-h-[44px] max-h-[200px]"
                rows={1}
              />
              <div className="flex items-center gap-3 p-2">
                <span className="text-xs text-neutral-500 whitespace-nowrap">1 source</span>
                <button className={`p-2 rounded-full transition-colors ${chatInput.trim() ? 'bg-white text-black' : 'bg-white/10 text-neutral-500'}`}>
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="text-center text-[11px] text-neutral-500 mt-3">
              FairLens Copilot can make mistakes. Please verify critical mitigation decisions.
            </p>
          </div>
        </section>

        {/* RIGHT COLUMN: Studio */}
        <aside className="w-[340px] flex flex-col bg-[#1e1e1f] rounded-2xl border border-white/5 overflow-hidden flex-shrink-0">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <h2 className="text-sm font-medium text-white">Action Studio</h2>
            <Sidebar className="h-4 w-4 text-neutral-400 cursor-pointer hover:text-white" />
          </div>

          <div className="p-4 overflow-y-auto flex-1">
            {/* Banner Area */}
            <div className="rounded-xl p-4 mb-4 bg-gradient-to-r from-indigo-900/40 via-purple-900/40 to-pink-900/40 border border-white/10">
              <p className="text-sm text-neutral-200">
                Run an audit on: <span className="text-blue-300">Gender</span>, <span className="text-purple-300">Age</span>, <span className="text-pink-300">Ethnicity</span>, <span className="text-indigo-300">Income Level</span>
              </p>
            </div>

            {/* Grid of Actions */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {studioActions.map(action => (
                <button 
                  key={action.id}
                  onClick={() => action.path !== '#' && navigate(action.path.startsWith('/') ? action.path : `/audit/${auditId}/${action.path}`)}
                  className="flex flex-col items-start gap-3 p-3 rounded-xl bg-[#131314] border border-white/5 hover:bg-white/5 hover:border-white/20 transition-all text-left"
                >
                  <action.icon className={`h-5 w-5 ${action.color}`} />
                  <span className="text-xs font-medium text-neutral-300">{action.name}</span>
                </button>
              ))}
            </div>

            {/* Saved Notes / Artifacts */}
            <div className="space-y-2">
              <h3 className="text-xs font-medium text-neutral-500 px-1 mb-3 uppercase tracking-wider">Saved Insights</h3>
              
              {savedNotes.map(note => (
                <div key={note.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer group">
                  <MessageSquare className="h-4 w-4 text-neutral-400 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-neutral-300 truncate">{note.title}</p>
                    <p className="text-xs text-neutral-500 mt-1">{note.date}</p>
                  </div>
                  <MoreVertical className="h-4 w-4 text-neutral-600 group-hover:text-neutral-400" />
                </div>
              ))}

              <button className="w-full flex items-center justify-center gap-2 py-3 mt-4 rounded-full bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors">
                <Plus className="h-4 w-4" /> Add note
              </button>
            </div>
          </div>
        </aside>

      </main>
    </div>
  );
}
