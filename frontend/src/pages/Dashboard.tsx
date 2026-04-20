import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Clock, Shield, BarChart3, ArrowRight } from 'lucide-react';
import { Card, Button, Badge, Gauge } from '../components/ui';

// Mock audit data for development
const mockAudits = [
  {
    audit_id: 'demo-001',
    filename: 'hiring_decisions_2024.csv',
    status: 'completed' as const,
    fair_score: 42,
    created_at: '2024-03-15T10:30:00Z',
  },
  {
    audit_id: 'demo-002',
    filename: 'loan_approval_model.pkl',
    status: 'scanning' as const,
    fair_score: undefined,
    created_at: '2024-03-16T14:20:00Z',
  },
];

const statusConfig = {
  uploaded: { label: 'Uploaded', variant: 'neutral' as const },
  configured: { label: 'Configured', variant: 'default' as const },
  scanning: { label: 'Scanning...', variant: 'warning' as const },
  completed: { label: 'Complete', variant: 'success' as const },
  failed: { label: 'Failed', variant: 'critical' as const },
};

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Top Bar */}
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-text-primary">FairLens</span>
          </div>
          <div className="flex items-center gap-4">
            <Button size="sm" onClick={() => navigate('/audit/new/upload')}>
              <Plus className="w-4 h-4" />
              New Audit
            </Button>
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-sm font-medium text-primary-700">D</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-bold text-text-primary">Welcome back</h1>
          <p className="text-text-secondary mt-1">Here's an overview of your bias audit history.</p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card hover className="cursor-pointer group" onClick={() => navigate('/audit/new/upload')}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                <Plus className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">New Audit</h3>
                <p className="text-sm text-text-secondary">Upload a dataset or model</p>
              </div>
              <ArrowRight className="w-5 h-5 text-text-tertiary ml-auto group-hover:text-primary-600 transition-colors" />
            </div>
          </Card>

          <Card hover className="cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center group-hover:bg-accent-100 transition-colors">
                <BarChart3 className="w-6 h-6 text-accent-600" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">Simulation Studio</h3>
                <p className="text-sm text-text-secondary">Adversarial testing</p>
              </div>
              <ArrowRight className="w-5 h-5 text-text-tertiary ml-auto group-hover:text-accent-600 transition-colors" />
            </div>
          </Card>

          <Card hover className="cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-success-50 flex items-center justify-center group-hover:bg-success-100 transition-colors">
                <Shield className="w-6 h-6 text-success-600" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">Certificates</h3>
                <p className="text-sm text-text-secondary">View & download</p>
              </div>
              <ArrowRight className="w-5 h-5 text-text-tertiary ml-auto group-hover:text-success-600 transition-colors" />
            </div>
          </Card>
        </motion.div>

        {/* Audit History */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold text-text-primary mb-4">Recent Audits</h2>

          {mockAudits.length === 0 ? (
            <Card className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-surface-tertiary flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-text-tertiary" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">No audits yet</h3>
              <p className="text-text-secondary mb-6">Upload a dataset to start your first bias audit.</p>
              <Button onClick={() => navigate('/audit/new/upload')}>
                <Plus className="w-4 h-4" />
                Start Your First Audit
              </Button>
            </Card>
          ) : (
            <div className="space-y-3">
              {mockAudits.map((audit, index) => {
                const config = statusConfig[audit.status];
                return (
                  <motion.div
                    key={audit.audit_id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    <Card hover className="cursor-pointer" onClick={() => navigate(`/audit/${audit.audit_id}/results`)}>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-medium text-text-primary truncate">{audit.filename}</h3>
                            <Badge variant={config.variant} dot>{config.label}</Badge>
                          </div>
                          <p className="text-sm text-text-tertiary">
                            Created {new Date(audit.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                        {audit.fair_score !== undefined && (
                          <Gauge score={audit.fair_score} size={64} strokeWidth={5} label="" showGrade={false} />
                        )}
                        <ArrowRight className="w-5 h-5 text-text-tertiary flex-shrink-0" />
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
