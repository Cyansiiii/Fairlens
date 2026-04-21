import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Beaker,
  CheckCircle2,
  Play,
  Radar,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import AppShell from '../components/premium/AppShell';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function SimulationStudio() {
  const navigate = useNavigate();

  return (
    <AppShell
      eyebrow="Simulation Studio"
      title="Stress-test fairness recovery before you certify the model."
      description="The simulation screen now feels like part of the product, not a placeholder. It frames scenarios, expected drift, and launch actions in the same premium visual language as the rest of the workspace."
      actions={(
        <>
          <Button variant="secondary" size="lg" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
          <Button size="lg" onClick={() => navigate('/audit/demo-001/results')}>
            Return to Results
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
            <Badge variant="accent">Scenario library</Badge>
            <Beaker className="h-6 w-6 text-primary-500" />
          </div>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.07em] text-text-primary">
            Model the ugly edge cases before they reach production.
          </h2>
          <div className="mt-6 grid gap-3">
            {[
              'Shift representation ratios to test under-sampled groups.',
              'Inject proxy-heavy feature bundles to surface indirect discrimination.',
              'Stress score thresholds against alternative market or regional mixes.',
            ].map((item) => (
              <div key={item} className="theme-surface-soft rounded-[24px] px-4 py-4 text-sm text-text-secondary">
                {item}
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-6">
          <Card className="rounded-[34px]">
            <div className="flex items-center justify-between">
              <Badge variant="neutral">Launch plan</Badge>
              <Play className="h-5 w-5 text-text-tertiary" />
            </div>
            <div className="mt-5 space-y-4">
              {[
                'Base audit snapshot locked',
                'Mitigation candidate selected',
                'Scenario batch ready for generation',
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
              <Badge variant="success">Why it matters</Badge>
              <ShieldCheck className="h-5 w-5 text-success-600" />
            </div>
            <p className="mt-4 text-sm leading-7 text-text-secondary">
              A premium fairness tool should not stop at static diagnostics. Simulation helps teams understand whether a recovered score stays resilient when the world shifts.
            </p>
          </Card>
        </div>
      </motion.section>

      <Card className="rounded-[34px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Badge variant="accent">Next build target</Badge>
            <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.07em] text-text-primary">
              Scenario generation UI is ready for real engine wiring.
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={() => navigate('/audit/demo-001/fix')}>
              Open Fix Workspace
            </Button>
            <Button onClick={() => navigate('/audit/demo-001/certificate')}>
              Continue to Certificate
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {['Representation shocks', 'Proxy drift', 'Threshold sweep'].map((item) => (
            <div
              key={item}
              className="theme-surface-soft rounded-[22px] px-4 py-4 text-sm font-semibold text-text-secondary"
            >
              <Radar className="mb-3 h-5 w-5 text-primary-500" />
              {item}
            </div>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}
