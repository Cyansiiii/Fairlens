import { Card } from '../components/ui';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface-secondary">
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-text-primary">FairLens</span>
            </div>
            <span className="text-text-tertiary">/</span>
            <span className="text-sm font-medium text-text-secondary">Settings</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-text-primary mb-6">Settings</h1>

          <Card className="mb-4">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Account</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-text-secondary">Email</label>
                <p className="text-sm text-text-primary mt-1">dev@fairlens.local</p>
              </div>
              <div>
                <label className="text-sm font-medium text-text-secondary">Plan</label>
                <p className="text-sm text-text-primary mt-1">Free (Solution Challenge)</p>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold text-text-primary mb-4">API Configuration</h2>
            <p className="text-sm text-text-secondary">
              Configure Vertex AI, Firebase, and Cloud Storage credentials in the environment settings.
            </p>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
