import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus, MoreVertical, FileText, Settings, Bot } from 'lucide-react';

import AppShell from '../components/premium/AppShell';

const audits = [
  {
    auditId: 'demo-001',
    filename: 'hiring_decisions_2024.csv',
    status: 'Certificate ready',
    score: 84,
    updated: '8 minutes ago',
  },
  {
    auditId: 'demo-002',
    filename: 'loan_model_shadow_v2.onnx',
    status: 'Simulation queued',
    score: 67,
    updated: '24 minutes ago',
  },
  {
    auditId: 'demo-003',
    filename: 'triage_outcomes_q1.csv',
    status: 'Needs mitigation',
    score: 42,
    updated: '1 hour ago',
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <AppShell
      eyebrow="Workspace"
      title="My Audits"
      description="Track active audits, jump back into evidence review, and launch fresh scans from a workspace that now stays aligned with the rest of the premium shell."
      actions={(
        <button
          onClick={() => navigate('/settings')}
          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          title="Settings"
        >
          <Settings className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
        </button>
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          <button
            onClick={() => navigate('/audit/new/upload')}
            className="group flex flex-col items-center justify-center aspect-[4/5] rounded-2xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-primary-500 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 p-6 text-center"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/40 transition-colors mb-4">
              <Plus className="h-6 w-6 text-neutral-600 dark:text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-400" />
            </div>
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400">
              New Audit
            </h3>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              Upload dataset or model
            </p>
          </button>

          {audits.map((audit, index) => (
            <motion.div
              key={audit.auditId}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => navigate(`/audit/${audit.auditId}/results`)}
              className="relative group flex flex-col aspect-[4/5] rounded-2xl bg-white dark:bg-[#1e1e1e] border border-neutral-200 dark:border-neutral-800 hover:shadow-xl dark:hover:shadow-black/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="h-2 w-full bg-gradient-to-r from-primary-500 to-indigo-500 opacity-80" />

              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
                    <FileText className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
                  </div>
                  <button
                    className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>

                <h3 className="font-semibold text-lg leading-tight text-neutral-900 dark:text-white mb-2 line-clamp-3">
                  {audit.filename}
                </h3>

                <div className="mt-auto pt-4 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-primary-500" />
                    <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                      Score: {audit.score}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium truncate">
                    {audit.status}
                  </p>
                  <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
                    {audit.updated}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AppShell>
  );
}
