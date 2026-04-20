import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  BellRing,
  LockKeyhole,
  Settings2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import AppShell from '../components/premium/AppShell';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function Settings() {
  const navigate = useNavigate();

  return (
    <AppShell
      eyebrow="Settings"
      title="Keep account, security, and workflow preferences in the same premium shell."
      description="The settings page now inherits the redesigned product language so even configuration surfaces feel deliberate and high-end."
      actions={(
        <Button size="lg" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      )}
    >
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid gap-6 xl:grid-cols-[1fr_1fr]"
      >
        <Card className="rounded-[34px]">
          <div className="flex items-center justify-between">
            <Badge variant="neutral">Account</Badge>
            <Settings2 className="h-5 w-5 text-text-tertiary" />
          </div>
          <div className="mt-5 space-y-4">
            {[
              ['Email', 'dev@fairlens.local'],
              ['Plan', 'Growth workspace preview'],
              ['Workspace', 'FairLens Demo Org'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[22px] border border-white/55 bg-white/60 px-4 py-4">
                <p className="text-xs uppercase tracking-[0.22em] text-text-tertiary">{label}</p>
                <p className="mt-2 text-sm font-semibold text-text-primary">{value}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid gap-6">
          <Card tone="success" className="rounded-[34px]">
            <div className="flex items-center justify-between">
              <Badge variant="success">Security</Badge>
              <LockKeyhole className="h-5 w-5 text-success-600" />
            </div>
            <div className="mt-5 space-y-4">
              {[
                'Role-based workspace access enabled',
                'Upload encryption enabled',
                'Certificate exports require signed sessions',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-text-secondary">
                  <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-success-500" />
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card tone="accent" className="rounded-[34px]">
            <div className="flex items-center justify-between">
              <Badge variant="accent">Notifications</Badge>
              <BellRing className="h-5 w-5 text-primary-500" />
            </div>
            <p className="mt-4 text-sm leading-7 text-text-secondary">
              Audit completion, mitigation recommendations, and certificate approvals can all live behind one cohesive notification layer in the redesigned shell.
            </p>
            <Button className="mt-6 w-full" variant="secondary">
              Configure Alerts
              <Sparkles className="h-4 w-4" />
            </Button>
          </Card>
        </div>
      </motion.section>
    </AppShell>
  );
}
