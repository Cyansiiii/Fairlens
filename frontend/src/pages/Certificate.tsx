import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  BadgeCheck,
  CheckCircle2,
  Download,
  FileCheck2,
  ShieldCheck,
} from 'lucide-react';

import AppShell from '../components/premium/AppShell';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function Certificate() {
  const navigate = useNavigate();

  return (
    <AppShell
      eyebrow="Certificate Composer"
      title="Package fairness evidence into an artifact worth sharing."
      description="The certificate screen now looks like the premium finish to the workflow: evidence summary, compliance mappings, and a polished handoff moment."
      actions={(
        <>
          <Button variant="secondary" size="lg" onClick={() => navigate('/audit/demo-001/results')}>
            Back to Results
          </Button>
          <Button size="lg" onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </Button>
        </>
      )}
    >
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid gap-6 xl:grid-cols-[1fr_1fr]"
      >
        <Card tone="accent" className="rounded-[34px]">
          <Badge variant="accent">Certificate preview</Badge>
          <div className="theme-surface-strong mt-6 rounded-[30px] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-text-tertiary">FairLens Certificate</p>
                <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.07em] text-text-primary">
                  FairScore 84 - Conditional approval
                </h2>
              </div>
              <BadgeCheck className="h-8 w-8 text-success-600" />
            </div>
            <div className="section-divider my-6" />
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                'Mapped to EU AI Act controls',
                'Linked to India DPDP posture',
                'Includes mitigation summary',
                'Ready for stakeholder review',
              ].map((item) => (
                <div key={item} className="theme-surface-soft rounded-[20px] px-4 py-4 text-sm text-text-secondary">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="grid gap-6">
          <Card className="rounded-[34px]">
            <div className="flex items-center justify-between">
              <Badge variant="neutral">Included evidence</Badge>
              <FileCheck2 className="h-5 w-5 text-text-tertiary" />
            </div>
            <div className="mt-5 space-y-4">
              {[
                'Audit narrative summary',
                'Affected subgroup breakdown',
                'Mitigation steps and recovered score',
                'Compliance control mapping',
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
              <Badge variant="success">Premium finish</Badge>
              <ShieldCheck className="h-5 w-5 text-success-600" />
            </div>
            <p className="mt-4 text-sm leading-7 text-text-secondary">
              Certification should feel like a polished output, not an afterthought. This redesign gives the artifact a final, trustworthy presentation layer.
            </p>
            <Button className="mt-6 w-full">
              Download Certificate
              <Download className="h-4 w-4" />
            </Button>
          </Card>
        </div>
      </motion.section>
    </AppShell>
  );
}
