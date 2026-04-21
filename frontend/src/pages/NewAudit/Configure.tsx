import { useState } from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ScanSearch,
  Settings2,
  SlidersHorizontal,
} from 'lucide-react';

import AppShell from '../../components/premium/AppShell';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const SENSITIVE_ATTRIBUTES = [
  'gender',
  'sex',
  'caste',
  'religion',
  'age',
  'name',
  'first_name',
  'last_name',
  'state',
  'language',
  'disability',
  'ethnicity',
  'race',
  'marital_status',
  'nationality',
  'locality',
];

const frameworks = [
  {
    value: 'all',
    label: 'All frameworks',
    description: 'EU AI Act, India DPDP, NYC LL144, and internal fairness review.',
  },
  {
    value: 'eu_ai_act',
    label: 'EU AI Act',
    description: 'High-risk system governance, transparency, and data quality mappings.',
  },
  {
    value: 'india_dpdp',
    label: 'India DPDP',
    description: 'Consent posture, data minimization, and accountable processing evidence.',
  },
  {
    value: 'nyc_ll144',
    label: 'NYC LL144',
    description: 'Automated employment decision support tool review posture.',
  },
];

export default function ConfigurePage() {
  const navigate = useNavigate();
  const [selectedAttrs, setSelectedAttrs] = useState<string[]>(['gender', 'caste', 'name']);
  const [targetColumn, setTargetColumn] = useState('decision');
  const [framework, setFramework] = useState('all');

  const toggleAttribute = (attribute: string) => {
    setSelectedAttrs((previous) =>
      previous.includes(attribute)
        ? previous.filter((item) => item !== attribute)
        : [...previous, attribute],
    );
  };

  const handleStartScan = () => {
    navigate('/audit/demo-001/results');
  };

  return (
    <AppShell
      eyebrow="New Audit - Step 2 of 3"
      title="Shape the audit before the engine runs."
      description="Configuration now feels like a curated control panel: protected attributes, target signals, and compliance posture are staged in one premium review surface."
      actions={(
        <>
          <Badge variant="success" size="md">
            Upload staged successfully
          </Badge>
          <Button variant="secondary" size="lg" onClick={() => navigate('/audit/new/upload')}>
            Back to Upload
          </Button>
        </>
      )}
    >
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]"
      >
        <div className="grid gap-6">
          <Card className="rounded-[34px]">
            <div className="flex items-center justify-between">
              <Badge variant="accent">Protected attributes</Badge>
              <ScanSearch className="h-5 w-5 text-primary-500" />
            </div>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.07em] text-text-primary">
              Confirm the classes that deserve scrutiny.
            </h2>
            <p className="mt-3 text-sm leading-7 text-text-secondary">
              The intake layer suggested likely protected columns. Keep the ones you want in scope and add any additional fairness dimensions the model should be judged against.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {SENSITIVE_ATTRIBUTES.map((attribute) => {
                const active = selectedAttrs.includes(attribute);

                return (
                  <button
                    key={attribute}
                    type="button"
                    onClick={() => toggleAttribute(attribute)}
                    className={clsx(
                      'rounded-full px-4 py-2.5 text-sm font-semibold capitalize transition duration-200',
                      active
                        ? 'button-primary text-white shadow-[0_18px_42px_-22px_rgba(0,101,242,0.78)]'
                        : 'glass-chip text-text-secondary hover:-translate-y-0.5 hover:text-text-primary',
                    )}
                  >
                    {attribute.replace('_', ' ')}
                  </button>
                );
              })}
            </div>
          </Card>

          <Card className="rounded-[34px]">
            <div className="flex items-center justify-between">
              <Badge variant="neutral">Target signal</Badge>
              <SlidersHorizontal className="h-5 w-5 text-text-tertiary" />
            </div>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.07em] text-text-primary">
              Define the outcome column the model influences.
            </h2>
            <p className="mt-3 text-sm leading-7 text-text-secondary">
              Use the decision, approval, risk, or routing field that captures the model&apos;s real-world outcome. FairLens will align the scorecards and explanations around it.
            </p>
            <div className="mt-6">
              <input
                type="text"
                value={targetColumn}
                onChange={(event) => setTargetColumn(event.target.value)}
                className="glass-input"
                placeholder="e.g. decision, approval_outcome, risk_band"
              />
            </div>
          </Card>

          <Card className="rounded-[34px]">
            <div className="flex items-center justify-between">
              <Badge variant="accent">Regulatory posture</Badge>
              <Settings2 className="h-5 w-5 text-primary-500" />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {frameworks.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setFramework(item.value)}
                  className={clsx(
                    'rounded-[26px] border px-4 py-4 text-left transition duration-200',
                    framework === item.value
                      ? 'border-primary-100 bg-[linear-gradient(135deg,rgba(0,101,242,0.12),rgba(18,179,168,0.12))] shadow-[0_20px_48px_-30px_rgba(0,101,242,0.42)]'
                      : 'theme-surface-muted theme-surface-hover',
                  )}
                >
                  <p className="font-semibold text-text-primary">{item.label}</p>
                  <p className="mt-2 text-sm leading-7 text-text-secondary">{item.description}</p>
                </button>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid gap-6">
          <Card tone="accent" className="rounded-[34px]">
            <div className="flex items-center justify-between">
              <Badge variant="accent">AI setup brief</Badge>
              <Bot className="h-5 w-5 text-primary-500" />
            </div>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.07em] text-text-primary">
              Recommended scan profile
            </h2>
            <div className="mt-5 space-y-3">
              {[
                `Audit ${selectedAttrs.length} protected attributes in the first pass.`,
                `Treat "${targetColumn}" as the decisive model outcome column.`,
                `Attach ${framework.split('_').join(' ')} narrative mapping to the certificate draft.`,
              ].map((item) => (
                <div key={item} className="theme-surface-soft rounded-[22px] px-4 py-4 text-sm text-text-secondary">
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card tone="success" className="rounded-[34px]">
            <Badge variant="success">What happens next</Badge>
            <div className="mt-5 space-y-4">
              {[
                'Metric engine runs fairness bundles and proxy detection.',
                'AI copilot writes the executive summary in plain language.',
                'Results screen prioritizes the highest-risk subgroup failures.',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-text-secondary">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-success-500" />
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-[34px]">
            <Badge variant="neutral">Premium detail</Badge>
            <p className="mt-4 text-sm leading-7 text-text-secondary">
              This configuration page now reads like a control surface instead of a form. It sets up the scan with clear hierarchy, richer cards, and better decision framing.
            </p>
          </Card>
        </div>
      </motion.section>

      <div className="flex justify-end">
        <Button size="lg" onClick={handleStartScan} disabled={selectedAttrs.length === 0}>
          Start Bias Scan
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </AppShell>
  );
}
