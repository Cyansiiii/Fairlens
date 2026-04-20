import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Shield, Upload, Brain, FileCheck, ArrowRight, Sparkles,
  BarChart3, Scale, Zap, Globe2, CheckCircle2,
} from 'lucide-react';
import Button from '../components/ui/Button';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const },
  }),
};

const features = [
  {
    icon: Upload,
    title: 'Upload & Auto-Detect',
    description: 'Drop any CSV dataset. We auto-detect sensitive attributes — caste, gender, religion, name, age — in seconds.',
    color: 'var(--color-primary-600)',
  },
  {
    icon: BarChart3,
    title: '8 Fairness Metrics',
    description: 'Disparate impact, demographic parity, equalized odds, proxy detection, and more — all run automatically.',
    color: 'var(--color-accent-600)',
  },
  {
    icon: Brain,
    title: 'AI Audit Agent',
    description: 'Chat with Gemini-powered AI. Ask "Is my model biased against Dalits?" and get plain-language answers.',
    color: 'var(--color-accent-600)',
  },
  {
    icon: Zap,
    title: 'One-Click Fix',
    description: 'Apply reweighting, resampling, or threshold calibration with a single click. See FairScore improve in real-time.',
    color: 'var(--color-success-600)',
  },
  {
    icon: Globe2,
    title: 'Global South Context',
    description: 'Built-in support for Indian demographics — caste, religion, state, language, urban/rural classification.',
    color: 'var(--color-warning-600)',
  },
  {
    icon: FileCheck,
    title: 'FairScore Certificate',
    description: 'Generate a compliance-grade PDF report with EU AI Act and India DPDP Act mappings. Share a verifiable badge.',
    color: 'var(--color-primary-600)',
  },
];

const stats = [
  { value: '8', label: 'Fairness Metrics' },
  { value: '0', label: 'Lines of Code Required' },
  { value: '500+', label: 'South Asian Names' },
  { value: '2', label: 'Regulatory Frameworks' },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-text-primary">FairLens</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-text-secondary hover:text-text-primary transition-colors">How It Works</a>
            <a href="#compliance" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Compliance</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
              Sign In
            </Button>
            <Button size="sm" onClick={() => navigate('/dashboard')}>
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-200 rounded-full opacity-20 blur-3xl -z-10" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-accent-200 rounded-full opacity-20 blur-3xl -z-10" />

        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-50 border border-accent-200 text-accent-700 text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            Powered by Gemini 1.5 Pro
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-extrabold text-text-primary leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Detect AI Bias.
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-600">
              Fix It. Certify It.
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            The no-code platform that helps HR teams, compliance officers, and hospital admins audit their AI for 
            hidden discrimination — with one-click fixes and regulatory-grade certificates.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Button size="lg" onClick={() => navigate('/audit/new/upload')} className="w-full sm:w-auto">
              <Upload className="w-5 h-5" />
              Start Free Audit
            </Button>
            <Button variant="secondary" size="lg" onClick={() => navigate('/dashboard')} className="w-full sm:w-auto">
              View Demo
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold font-mono text-text-primary">{stat.value}</div>
                <div className="text-sm text-text-tertiary mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 bg-surface-secondary">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Everything you need for fair AI
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              From detection to certification — a complete bias audit workflow that doesn't require a single line of code.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white rounded-xl border border-border p-6 hover:shadow-lg hover:border-border-strong transition-all duration-300 group"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={index + 1}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Three steps to fairness
            </h2>
            <p className="text-lg text-text-secondary">
              Upload, audit, and certify — in under 10 minutes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Upload Your Data', desc: 'Drop a CSV, XLSX, or ML model. We handle the rest — column detection, PII scanning, and sensitive attribute identification.', icon: Upload },
              { step: '02', title: 'AI-Powered Audit', desc: 'Our engine runs 8 fairness metrics. Chat with our AI to understand results in plain language. Run adversarial simulations.', icon: Scale },
              { step: '03', title: 'Fix & Certify', desc: 'Apply one-click mitigations. Watch your FairScore improve. Download a compliance-grade PDF certificate.', icon: CheckCircle2 },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                className="relative text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 1}
              >
                <div className="text-6xl font-extrabold text-surface-tertiary mb-4">{item.step}</div>
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section id="compliance" className="py-24 px-6 bg-surface-secondary">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Dual Compliance Mapping
            </h2>
            <p className="text-lg text-text-secondary mb-12 max-w-2xl mx-auto">
              Every audit maps to both international and Indian regulatory frameworks.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'EU AI Act',
                articles: ['Article 9 — Risk Management', 'Article 10 — Data Governance', 'Article 13 — Transparency', 'Article 15 — Accuracy & Robustness'],
                color: 'primary',
              },
              {
                title: 'India DPDP Act 2023',
                articles: ['Section 4 — Consent & Purpose', 'Section 5 — Data Principal Rights', 'Section 8 — Processing Obligations', 'India AI Policy 2024'],
                color: 'accent',
              },
            ].map((framework, i) => (
              <motion.div
                key={framework.title}
                className="bg-white rounded-xl border border-border p-8 text-left"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 1}
              >
                <h3 className="text-xl font-bold text-text-primary mb-6">{framework.title}</h3>
                <ul className="space-y-3">
                  {framework.articles.map((article) => (
                    <li key={article} className="flex items-start gap-3">
                      <CheckCircle2 className={`w-5 h-5 mt-0.5 text-${framework.color}-600 flex-shrink-0`} />
                      <span className="text-sm text-text-secondary">{article}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Ready to make your AI fair?
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Start your first audit in minutes. No credit card, no ML expertise required.
            </p>
            <Button size="lg" onClick={() => navigate('/audit/new/upload')}>
              <Upload className="w-5 h-5" />
              Start Free Audit
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded gradient-primary flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-text-primary">FairLens</span>
            <span className="text-sm text-text-tertiary">by Team MINDBOT</span>
          </div>
          <p className="text-sm text-text-tertiary">
            Google Solution Challenge 2026 · Built with Gemini, Firebase & Cloud Run
          </p>
        </div>
      </footer>
    </div>
  );
}
