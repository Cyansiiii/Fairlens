import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  FlaskConical,
  MessageSquareText,
  ShieldAlert,
  Sparkles,
  Wrench,
  XCircle,
} from 'lucide-react';

import AppShell from '../../components/premium/AppShell';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Gauge from '../../components/ui/Gauge';

const mockResults = {
  fairScore: 42,
  grade: 'F',
  riskLevel: 'Critical review',
  summary: { totalMetrics: 8, passed: 3, failed: 5, criticalFlags: 2, highFlags: 3 },
  metrics: [
    {
      metricName: 'Disparate Impact Ratio',
      value: '0.62',
      description: 'Hiring rate for SC and ST candidates falls below the acceptable ratio relative to the general category.',
      severity: 'critical' as const,
      passed: false,
      affectedGroups: ['SC', 'ST'],
    },
    {
      metricName: 'Demographic Parity',
      value: '18%',
      description: 'Selection rates drift materially across caste groups and the delta stays visible after normalization.',
      severity: 'high' as const,
      passed: false,
      affectedGroups: ['SC', 'ST', 'OBC'],
    },
    {
      metricName: 'Proxy Detection',
      value: '82%',
      description: 'Last name and locality features correlate strongly with protected attributes and likely act as proxies.',
      severity: 'high' as const,
      passed: false,
      affectedGroups: ['Name', 'Locality'],
    },
    {
      metricName: 'Representation Score',
      value: '3%',
      description: 'The training sample under-represents ST candidates and weakens fairness confidence in the tail.',
      severity: 'critical' as const,
      passed: false,
      affectedGroups: ['ST'],
    },
  ],
};

export default function ScanResults() {
  const navigate = useNavigate();
  const { auditId = 'demo-001' } = useParams();

  return (
    <AppShell
      eyebrow="Scan Results · Step 3 of 3"
      title="The audit results now read like an executive control room."
      description="This redesigned results surface prioritizes clarity: how risky the model is, why it failed, and which action should happen next."
      actions={(
        <>
          <Button variant="secondary" size="lg" onClick={() => navigate('/simulation')}>
            Open Simulation
            <FlaskConical className="h-5 w-5" />
          </Button>
          <Button size="lg" onClick={() => navigate(`/audit/${auditId}/fix`)}>
            Fix Issues
            <Wrench className="h-5 w-5" />
          </Button>
        </>
      )}
    >
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid gap-6 2xl:grid-cols-[1.06fr_0.94fr]"
      >
        <Card tone="danger" className="rounded-[34px] overflow-hidden">
          <div className="grid gap-6 lg:grid-cols-[240px_1fr] lg:items-center">
            <div className="rounded-[28px] border border-white/60 bg-white/64 p-4">
              <Gauge score={mockResults.fairScore} size={190} strokeWidth={11} label="Current FairScore" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="critical">Grade {mockResults.grade}</Badge>
                <Badge variant="warning" dot>
                  {mockResults.riskLevel}
                </Badge>
              </div>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.07em] text-text-primary">
                The model is operable, but not defensible yet.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-text-secondary">
                The new UI makes the story explicit: this audit is still recoverable, but several subgroup failures and proxy signals need action before you should certify or deploy.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-4">
                {[
                  { label: 'Metrics run', value: mockResults.summary.totalMetrics },
                  { label: 'Passed', value: mockResults.summary.passed },
                  { label: 'Critical flags', value: mockResults.summary.criticalFlags },
                  { label: 'High flags', value: mockResults.summary.highFlags },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[22px] border border-white/55 bg-white/62 px-4 py-4 shadow-[0_18px_40px_-32px_rgba(17,33,59,0.36)]"
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
              <Badge variant="accent">AI summary</Badge>
              <MessageSquareText className="h-5 w-5 text-primary-500" />
            </div>
            <div className="mt-5 space-y-3">
              {[
                'The sharpest failure appears in caste-linked hiring outcomes.',
                'Proxy-heavy name and locality features are amplifying the disparity.',
                'Mitigation and representation balancing are likely to recover the score into the 80s.',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[22px] border border-white/55 bg-white/60 px-4 py-4 text-sm text-text-secondary"
                >
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card tone="success" className="rounded-[34px]">
            <div className="flex items-center justify-between">
              <Badge variant="success">Suggested next sequence</Badge>
              <Sparkles className="h-5 w-5 text-success-600" />
            </div>
            <div className="mt-5 space-y-4">
              {[
                'Open mitigation workspace to compare reweighting and resampling.',
                'Use simulation studio to stress-test recovered subgroup performance.',
                'Generate the certificate only after the affected groups clear review.',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-text-secondary">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-success-500" />
                  {item}
                </div>
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
          <div className="flex items-center justify-between">
            <div>
              <Badge variant="neutral">Metric queue</Badge>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.07em] text-text-primary">
                Each failing metric now gets room to explain itself.
              </h2>
            </div>
            <ShieldAlert className="h-6 w-6 text-critical-500" />
          </div>

          <div className="mt-6 space-y-4">
            {mockResults.metrics.map((metric) => {
              const passed = metric.passed;

              return (
                <div
                  key={metric.metricName}
                  className="rounded-[28px] border border-white/55 bg-white/62 p-5 shadow-[0_22px_52px_-34px_rgba(17,33,59,0.38)]"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[18px] ${
                        passed ? 'bg-success-50 text-success-600' : 'bg-critical-50 text-critical-600'
                      }`}
                    >
                      {passed ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-text-primary">{metric.metricName}</p>
                        <Badge severity={metric.severity}>{metric.severity}</Badge>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-text-secondary">{metric.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {metric.affectedGroups.map((group) => (
                          <Badge key={group} variant="neutral">
                            {group}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-[18px] border border-white/55 bg-white/65 px-4 py-3 text-right">
                      <p className="text-xs uppercase tracking-[0.22em] text-text-tertiary">Observed</p>
                      <p className="mt-2 font-display text-2xl font-semibold tracking-[-0.06em] text-text-primary">
                        {metric.value}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <div className="grid gap-6">
          <Card className="rounded-[34px]">
            <Badge variant="accent">Action wall</Badge>
            <div className="mt-5 grid gap-3">
              {[
                {
                  label: 'Open Fix Workspace',
                  description: 'Compare interventions and re-estimate your FairScore.',
                  icon: Wrench,
                  action: () => navigate(`/audit/${auditId}/fix`),
                },
                {
                  label: 'Run Simulations',
                  description: 'Generate adverse scenarios before certifying the model.',
                  icon: FlaskConical,
                  action: () => navigate('/simulation'),
                },
                {
                  label: 'Draft Certificate',
                  description: 'Package the evidence once mitigations clear review.',
                  icon: FileCheck2,
                  action: () => navigate(`/audit/${auditId}/certificate`),
                },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={item.action}
                  className="rounded-[24px] border border-white/60 bg-white/62 px-4 py-4 text-left transition duration-200 hover:-translate-y-1 hover:shadow-[0_22px_48px_-32px_rgba(17,33,59,0.42)]"
                >
                  <div className="flex items-center justify-between">
                    <item.icon className="h-5 w-5 text-primary-500" />
                    <ArrowRight className="h-4 w-4 text-text-tertiary" />
                  </div>
                  <p className="mt-4 font-semibold text-text-primary">{item.label}</p>
                  <p className="mt-2 text-sm leading-7 text-text-secondary">{item.description}</p>
                </button>
              ))}
            </div>
          </Card>

          <Card tone="accent" className="rounded-[34px]">
            <Badge variant="neutral">Design outcome</Badge>
            <p className="mt-4 text-sm leading-7 text-text-secondary">
              This page no longer dumps metrics into a utilitarian list. It now acts like a premium review surface with narrative hierarchy, action framing, and space for risk context.
            </p>
          </Card>
        </div>
      </motion.section>
    </AppShell>
  );
}
