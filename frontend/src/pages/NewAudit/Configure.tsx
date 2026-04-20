import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, ArrowLeft, Settings } from 'lucide-react';
import { Card, Button } from '../../components/ui';

const SENSITIVE_ATTRIBUTES = [
  'gender', 'sex', 'caste', 'religion', 'age', 'name', 'first_name',
  'last_name', 'state', 'language', 'disability', 'ethnicity', 'race',
  'marital_status', 'nationality', 'locality',
];

export default function ConfigurePage() {
  const navigate = useNavigate();
  const [selectedAttrs, setSelectedAttrs] = useState<string[]>(['gender', 'caste', 'name']);
  const [targetColumn, setTargetColumn] = useState('decision');
  const [framework, setFramework] = useState('all');

  const toggleAttribute = (attr: string) => {
    setSelectedAttrs((prev) =>
      prev.includes(attr) ? prev.filter((a) => a !== attr) : [...prev, attr]
    );
  };

  const handleStartScan = () => {
    // TODO: Phase 1 — Call configureAudit + triggerScan API
    navigate('/audit/demo-001/results');
  };

  return (
    <div className="min-h-screen bg-surface-secondary">
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-text-primary">FairLens</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-tertiary">
            <span className="text-success-600">✓ Upload</span>
            <span>→</span>
            <span className="text-primary-600 font-medium">2. Configure</span>
            <span>→</span>
            <span>3. Results</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-text-primary mb-2">Configure your audit</h1>
          <p className="text-text-secondary mb-8">
            Select the sensitive attributes to check for bias and choose your compliance framework.
          </p>

          {/* Sensitive Attributes */}
          <Card className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-text-secondary" />
              <h2 className="text-lg font-semibold text-text-primary">Sensitive Attributes</h2>
            </div>
            <p className="text-sm text-text-secondary mb-4">
              Select which attributes should be checked for bias. We've auto-detected some from your data.
            </p>
            <div className="flex flex-wrap gap-2">
              {SENSITIVE_ATTRIBUTES.map((attr) => (
                <button
                  key={attr}
                  onClick={() => toggleAttribute(attr)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    selectedAttrs.includes(attr)
                      ? 'bg-primary-100 text-primary-700 border border-primary-300'
                      : 'bg-surface-tertiary text-text-secondary border border-transparent hover:border-border'
                  }`}
                >
                  {attr}
                </button>
              ))}
            </div>
          </Card>

          {/* Target Column */}
          <Card className="mb-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Target Column</h2>
            <p className="text-sm text-text-secondary mb-3">
              The outcome/decision column your model predicts (e.g., "hired", "approved", "risk_score").
            </p>
            <input
              type="text"
              value={targetColumn}
              onChange={(e) => setTargetColumn(e.target.value)}
              className="w-full px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="e.g., decision, outcome, label"
            />
          </Card>

          {/* Regulatory Framework */}
          <Card className="mb-8">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Regulatory Framework</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'all', label: 'All Frameworks', desc: 'EU AI Act + India DPDP + NYC LL144' },
                { value: 'eu_ai_act', label: 'EU AI Act', desc: 'Articles 9, 10, 13, 15' },
                { value: 'india_dpdp', label: 'India DPDP', desc: 'Sections 4, 5, 8' },
                { value: 'nyc_ll144', label: 'NYC LL144', desc: 'Local Law 144' },
              ].map((fw) => (
                <button
                  key={fw.value}
                  onClick={() => setFramework(fw.value)}
                  className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                    framework === fw.value
                      ? 'border-primary-400 bg-primary-50 ring-2 ring-primary-200'
                      : 'border-border hover:border-border-strong'
                  }`}
                >
                  <p className="font-medium text-sm text-text-primary">{fw.label}</p>
                  <p className="text-xs text-text-secondary mt-1">{fw.desc}</p>
                </button>
              ))}
            </div>
          </Card>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <Button size="lg" onClick={handleStartScan} disabled={selectedAttrs.length === 0}>
              Start Bias Scan
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
