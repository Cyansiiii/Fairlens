import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  GaugeCircle,
  ShieldCheck,
  Wrench,
} from 'lucide-react';

import AppShell from '../components/premium/AppShell';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const interventions = [
  {
    title: 'Reweight under-represented cohorts',
    description: 'Boost coverage for ST and low-sample caste groups without retraining the full model from scratch.',
    projected: '84 FairScore',
  },
  {
    title: 'Constrain proxy-heavy features',
    description: 'Reduce the influence of name and locality features that are acting as protected-attribute stand-ins.',
    projected: '78 FairScore',
  },
  {
    title: 'Tune decision thresholds by cohort',
    description: 'Improve parity on the positive decision boundary while keeping overall utility within range.',
    projected: '73 FairScore',
  },
];

export default function FixWorkspace() {
  const navigate = useNavigate();

  return (
    <AppShell
      eyebrow="Fix Workspace"
      title="Compare interventions in a workspace built for decision confidence."
      description="The mitigation surface is now laid out like a premium SaaS lab: projected score recovery, strategy cards, and an obvious path from diagnosis to action."
      actions={(
        <>
          <Button variant="secondary" size="lg" onClick={() => navigate('/audit/demo-001/results')}>
            Back to Results
          </Button>
          <Button size="lg" onClick={() => navigate('/audit/demo-001/certificate')}>
            Continue to Certificate
          </Button>
        </>
      )}
    >
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]"
      >
        <Card tone="accent" className="rounded-[34px]">
          <div className="flex items-center justify-between">
            <Badge variant="accent">Recovery plan</Badge>
            <GaugeCircle className="h-6 w-6 text-primary-500" />
          </div>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.07em] text-text-primary">
            The best path is visible before you commit engineering effort.
          </h2>
          <div className="mt-6 space-y-3">
            {interventions.map((item) => (
              <div key={item.title} className="theme-surface rounded-[26px] p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-semibold text-text-primary">{item.title}</p>
                  <Badge variant="success">{item.projected}</Badge>
                </div>
                <p className="mt-3 text-sm leading-7 text-text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-6">
          <Card className="rounded-[34px]">
            <div className="flex items-center justify-between">
              <Badge variant="neutral">Mitigation ladder</Badge>
              <Wrench className="h-5 w-5 text-text-tertiary" />
            </div>
            <div className="mt-5 space-y-4">
              {[
                'Select the intervention with the strongest projected recovery.',
                'Compare fairness lift against operational cost and retraining complexity.',
                'Push the best candidate into simulation before certification.',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-text-secondary">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-success-500" />
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card tone="success" className="rounded-[34px]">
            <div className="flex items-center justify-between">
              <Badge variant="success">Design outcome</Badge>
              <ShieldCheck className="h-5 w-5 text-success-600" />
            </div>
            <p className="mt-4 text-sm leading-7 text-text-secondary">
              This screen now looks like a serious remediation studio rather than a placeholder message. It gives the user a stronger mental model for what "fixing bias" means in the product.
            </p>
          </Card>
        </div>
      </motion.section>

      <div className="flex justify-end">
        <Button size="lg" onClick={() => navigate('/simulation')}>
          Run Simulations on the Best Fix
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </AppShell>
  );
}
