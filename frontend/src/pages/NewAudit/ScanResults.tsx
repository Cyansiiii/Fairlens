import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Shield, MessageSquare, Beaker, Wrench, FileCheck, CheckCircle2, XCircle } from 'lucide-react';
import { Card, Button, Badge, Gauge } from '../../components/ui';

// Mock data for scan results
const mockResults = {
  fair_score: 42,
  grade: 'F' as const,
  risk_level: 'high' as const,
  summary: { total_metrics: 8, passed: 3, failed: 5, critical_flags: 2, high_flags: 3 },
  metrics: [
    { metric_name: 'Disparate Impact Ratio', value: 0.62, threshold: 0.8, passed: false, severity: 'critical' as const, description: 'Hiring rate for SC/ST candidates is 62% of General category rate', affected_groups: ['SC', 'ST'] },
    { metric_name: 'Demographic Parity', value: 0.18, threshold: 0.1, passed: false, severity: 'high' as const, description: '18% difference in selection rates across caste groups', affected_groups: ['SC', 'ST', 'OBC'] },
    { metric_name: 'Equalized Odds (TPR)', value: 0.15, threshold: 0.1, passed: false, severity: 'high' as const, description: 'True positive rate differs by 15% between groups', affected_groups: ['SC', 'Muslim'] },
    { metric_name: 'Proxy Detection', value: 0.82, threshold: 0.7, passed: false, severity: 'high' as const, description: 'Last name has 82% correlation with caste attribute', affected_groups: [] },
    { metric_name: 'Representation Score', value: 0.03, threshold: 0.05, passed: false, severity: 'critical' as const, description: 'ST candidates comprise only 3% of training data', affected_groups: ['ST'] },
    { metric_name: 'Individual Fairness', value: 0.88, threshold: 0.85, passed: true, severity: 'low' as const, description: 'Similar individuals receive similar outcomes', affected_groups: [] },
    { metric_name: 'Calibration', value: 0.04, threshold: 0.05, passed: true, severity: 'low' as const, description: 'Prediction confidence is well-calibrated across groups', affected_groups: [] },
    { metric_name: 'Counterfactual Fairness', value: 0.0, threshold: 0.0, passed: true, severity: 'low' as const, description: 'No outcome changes detected on attribute flip', affected_groups: [] },
  ],
  breakdown: { representation: 25, individual_fairness: 72, group_fairness: 35, counterfactual_fairness: 65 },
};

export default function ScanResults() {
  const { auditId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface-secondary">
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-text-primary">FairLens</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="accent" size="sm" onClick={() => navigate(`/audit/${auditId}/chat`)}>
              <MessageSquare className="w-4 h-4" /> Ask AI
            </Button>
            <Button variant="secondary" size="sm">
              <Beaker className="w-4 h-4" /> Simulate
            </Button>
            <Button size="sm" onClick={() => navigate(`/audit/${auditId}/fix`)}>
              <Wrench className="w-4 h-4" /> Fix Issues
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Score Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="flex flex-col items-center py-8">
              <Gauge score={mockResults.fair_score} size={180} />
              <div className="mt-4 flex items-center gap-2">
                <Badge variant="critical" size="md" dot>High Risk</Badge>
              </div>
            </Card>
          </motion.div>

          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <h2 className="text-lg font-semibold text-text-primary mb-4">Score Breakdown</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(mockResults.breakdown).map(([dim, score]) => (
                  <div key={dim} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-text-secondary capitalize">
                          {dim.replace(/_/g, ' ')}
                        </span>
                        <span className="text-sm font-mono font-semibold" style={{ color: score >= 70 ? 'var(--color-success-600)' : score >= 50 ? 'var(--color-warning-600)' : 'var(--color-critical-600)' }}>
                          {score}
                        </span>
                      </div>
                      <div className="h-2 bg-surface-tertiary rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: score >= 70 ? 'var(--color-success-500)' : score >= 50 ? 'var(--color-warning-500)' : 'var(--color-critical-500)' }}
                          initial={{ width: 0 }}
                          animate={{ width: `${score}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-border grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold font-mono text-critical-600">{mockResults.summary.failed}</div>
                  <div className="text-xs text-text-tertiary">Failed Metrics</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-success-600">{mockResults.summary.passed}</div>
                  <div className="text-xs text-text-tertiary">Passed Metrics</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-critical-600">{mockResults.summary.critical_flags}</div>
                  <div className="text-xs text-text-tertiary">Critical Flags</div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Metrics List */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold text-text-primary mb-4">Detailed Metrics</h2>
          <div className="space-y-3">
            {mockResults.metrics.map((metric, index) => (
              <motion.div
                key={metric.metric_name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                <Card hover className="cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      metric.passed ? 'bg-success-50' : 'bg-critical-50'
                    }`}>
                      {metric.passed
                        ? <CheckCircle2 className="w-5 h-5 text-success-600" />
                        : <XCircle className="w-5 h-5 text-critical-600" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-text-primary">{metric.metric_name}</h3>
                        <Badge severity={metric.severity}>{metric.severity}</Badge>
                      </div>
                      <p className="text-sm text-text-secondary">{metric.description}</p>
                      {metric.affected_groups.length > 0 && (
                        <div className="flex items-center gap-1.5 mt-2">
                          <span className="text-xs text-text-tertiary">Affected:</span>
                          {metric.affected_groups.map((g) => (
                            <Badge key={g} variant="neutral">{g}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-mono text-lg font-bold" style={{
                        color: metric.passed ? 'var(--color-success-600)' : 'var(--color-critical-600)'
                      }}>
                        {metric.value < 1 ? (metric.value * 100).toFixed(0) + '%' : metric.value.toFixed(2)}
                      </div>
                      <div className="text-xs text-text-tertiary">
                        threshold: {metric.threshold < 1 ? (metric.threshold * 100).toFixed(0) + '%' : metric.threshold.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action buttons at bottom */}
        <motion.div
          className="flex justify-center gap-4 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Button variant="accent" size="lg" onClick={() => navigate(`/audit/${auditId}/chat`)}>
            <MessageSquare className="w-5 h-5" /> Talk to AI Auditor
          </Button>
          <Button size="lg" onClick={() => navigate(`/audit/${auditId}/fix`)}>
            <Wrench className="w-5 h-5" /> Fix Issues
          </Button>
          <Button variant="secondary" size="lg">
            <FileCheck className="w-5 h-5" /> Generate Certificate
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
