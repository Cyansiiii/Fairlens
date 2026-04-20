import { Card, Button } from '../components/ui';
import { useNavigate } from 'react-router-dom';
import { Shield, FileCheck, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Certificate() {
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
            <span className="text-sm font-medium text-text-secondary">Certificate</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-text-primary mb-2">FairScore Certificate</h1>
          <p className="text-text-secondary mb-8">
            Download your compliance-grade audit certificate with regulatory mappings.
          </p>

          <Card className="text-center py-16">
            <FileCheck className="w-16 h-16 text-success-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">Coming in Phase 5</h3>
            <p className="text-text-secondary mb-6 max-w-md mx-auto">
              The Certificate page will display a preview of your FairScore certificate with options to download PDF and embed a shareable badge.
            </p>
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4" /> Go Back
            </Button>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
