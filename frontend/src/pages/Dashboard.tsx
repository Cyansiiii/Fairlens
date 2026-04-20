import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Bot,
  Clock3,
  FileCheck2,
  Globe2,
  Radar,
  ShieldCheck,
  Sparkles,
  WandSparkles,
  Workflow,
} from 'lucide-react';

import AppShell from '../components/premium/AppShell';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Gauge from '../components/ui/Gauge';

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

const protections = [
  'Proxy feature drift alerts are active',
  'Cross-region representation checks are running',
  'Certificate composer is linked to the latest audit narrative',
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <AppShell
      eyebrow="Operations Cockpit"
      title="Bias governance, redesigned as a premium command center."
      description="The workspace now behaves like a polished SaaS product: one place to launch audits, inspect risk, compare interventions, and publish certificates."
      actions={(
        <>
          <Button size="lg" onClick={() => navigate('/audit/new/upload')}>
            Start Audit
            <WandSparkles className="h-5 w-5" />
          </Button>
          <Button variant="secondary" size="lg" onClick={() => navigate('/audit/demo-001/certificate')}>
            Open Certificate
            <FileCheck2 className="h-5 w-5" />
          </Button>
        </>
      )}
    >
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid gap-6 2xl:grid-cols-[1.12fr_0.88fr]"
      >
        <Card tone="accent" className="rounded-[34px] overflow-hidden">
          <div className="grid gap-6 lg:grid-cols-[240px_1fr] lg:items-center">
            <div className="rounded-[28px] border border-white/55 bg-white/62 p-4">
              <Gauge score={84} size={190} strokeWidth={11} label="Live workspace confidence" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="accent">Live FairScore</Badge>
                <Badge variant="success" dot>
                  Recovery path available
                </Badge>
              </div>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.07em] text-text-primary">
                One orchestration layer for intake, analysis, mitigation, and trust artifacts.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-text-secondary">
                The redesigned dashboard prioritizes the signals a premium governance tool should surface first: operating health, audit momentum, and the next best action for the team.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { label: 'Active audits', value: '12' },
                  { label: 'Protected classes tracked', value: '16' },
                  { label: 'Frameworks mapped', value: '4' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[24px] border border-white/55 bg-white/60 px-4 py-4 shadow-[0_18px_40px_-30px_rgba(17,33,59,0.36)]"
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-text-tertiary">{item.label}</p>
                    <p className="mt-2 font-display text-3xl font-semibold tracking-[-0.06em] text-text-primary">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <div className="grid gap-6">
          <Card className="rounded-[34px]">
            <div className="flex items-center justify-between">
              <Badge variant="neutral">Protection Stack</Badge>
              <ShieldCheck className="h-5 w-5 text-accent-600" />
            </div>
            <div className="mt-5 space-y-3">
              {protections.map((item) => (
                <div
                  key={item}
                  className="rounded-[22px] border border-white/55 bg-white/60 px-4 py-4 text-sm text-text-secondary"
                >
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-[34px]">
            <div className="flex items-center justify-between">
              <Badge variant="accent">Quick actions</Badge>
              <Sparkles className="h-5 w-5 text-primary-500" />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                {
                  label: 'Launch simulation',
                  icon: Workflow,
                  action: () => navigate('/simulation'),
                },
                {
                  label: 'Review mitigations',
                  icon: Radar,
                  action: () => navigate('/audit/demo-001/fix'),
                },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={item.action}
                  className="rounded-[22px] border border-white/60 bg-white/62 px-4 py-4 text-left transition duration-200 hover:-translate-y-1 hover:shadow-[0_22px_48px_-32px_rgba(17,33,59,0.42)]"
                >
                  <item.icon className="h-5 w-5 text-primary-500" />
                  <p className="mt-4 font-semibold text-text-primary">{item.label}</p>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.08 }}
        className="grid gap-6 xl:grid-cols-[1.04fr_0.96fr]"
      >
        <Card className="rounded-[34px]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Badge variant="neutral">Recent audits</Badge>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.07em] text-text-primary">
                The review queue is now readable at a glance.
              </h2>
            </div>
            <Button variant="secondary" onClick={() => navigate('/audit/new/upload')}>
              New Intake
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-6 space-y-3">
            {audits.map((audit) => (
              <button
                key={audit.auditId}
                type="button"
                onClick={() => navigate(`/audit/${audit.auditId}/results`)}
                className="glass-chip flex w-full items-center gap-4 rounded-[24px] px-4 py-4 text-left transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_56px_-34px_rgba(17,33,59,0.42)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-primary-50 text-primary-600">
                  <Activity className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate font-semibold text-text-primary">{audit.filename}</p>
                    <Badge variant={audit.score >= 80 ? 'success' : audit.score >= 50 ? 'warning' : 'critical'}>
                      {audit.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-text-secondary">Updated {audit.updated}</p>
                </div>
                <div className="hidden sm:block">
                  <Gauge score={audit.score} size={92} strokeWidth={8} label="" showGrade={false} />
                </div>
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-text-tertiary" />
              </button>
            ))}
          </div>
        </Card>

        <div className="grid gap-6">
          <Card className="rounded-[34px]">
            <div className="flex items-center justify-between">
              <Badge variant="accent">Regional coverage</Badge>
              <Globe2 className="h-5 w-5 text-accent-600" />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {['Caste', 'Gender', 'Religion', 'Language', 'State', 'Locality'].map((item) => (
                <div
                  key={item}
                  className="rounded-[22px] border border-white/55 bg-white/60 px-4 py-4 text-sm font-semibold text-text-secondary"
                >
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card tone="success" className="rounded-[34px]">
            <div className="flex items-center justify-between">
              <Badge variant="success">AI copilot prompts</Badge>
              <Bot className="h-5 w-5 text-success-600" />
            </div>
            <div className="mt-5 space-y-3">
              {[
                'Summarize the riskiest subgroup deltas for leadership.',
                'Draft mitigation options for the current model version.',
                'Explain why the certificate is blocked in plain language.',
              ].map((prompt) => (
                <div
                  key={prompt}
                  className="rounded-[22px] border border-white/55 bg-white/62 px-4 py-4 text-sm text-text-secondary"
                >
                  {prompt}
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-3 text-sm text-text-tertiary">
              <Clock3 className="h-4 w-4" />
              Response window under 2 seconds for cached audit narratives.
            </div>
          </Card>
        </div>
      </motion.section>
    </AppShell>
  );
}
