import { Card, Button } from '../components/ui';
import { useNavigate } from 'react-router-dom';
import { Shield, Beaker, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SimulationStudio() {
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
            <span className="text-sm font-medium text-text-secondary">Simulation Studio</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-text-primary mb-2">Adversarial Simulation Studio</h1>
          <p className="text-text-secondary mb-8">
            Test your model against synthetic adversarial scenarios to uncover hidden discrimination.
          </p>

          <Card className="text-center py-16">
            <Beaker className="w-16 h-16 text-accent-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">Coming in Phase 3</h3>
            <p className="text-text-secondary mb-6 max-w-md mx-auto">
              The Simulation Studio will generate synthetic test cases using SDV and the South Asian Name Database to stress-test your model.
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
