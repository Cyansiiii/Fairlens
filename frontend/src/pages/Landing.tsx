import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Menu,
  Play,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';

import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const heroStats = [
  { value: '8', label: 'fairness metrics wired into every audit' },
  { value: '10m', label: 'average time to a readable first verdict' },
  { value: '4', label: 'compliance frameworks mapped from launch' },
];

const auditChannels = ['Hiring', 'Finance', 'Healthcare', 'GovTech'];

const pricingPlans = [
  {
    name: 'Starter Plan',
    price: '$12',
    description: 'Bias scans for product prototypes and early internal reviews.',
    features: ['Like new audits', 'Chat-based AI explanations', 'Basic compliance summary'],
    highlight: 'Pay monthly',
  },
  {
    name: 'Pro Version',
    price: 'Custom',
    description: 'For teams running active governance, remediation, and certificate workflows.',
    features: ['Unlimited scans', 'Simulation studio', 'Shared evidence vault'],
    highlight: 'Business',
  },
];

function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function LandingPanel({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={clsx('landing-panel rounded-[38px] px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10', className)}
    >
      <div className="relative z-10">{children}</div>
    </section>
  );
}

function TinyLogo() {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/75 bg-white/78 shadow-[0_18px_40px_-28px_rgba(28,38,71,0.3)]">
      <div className="relative h-5 w-5">
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full border border-text-primary" />
        <span className="absolute bottom-0 left-0 h-2 w-2 rounded-full border border-text-primary" />
        <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full border border-text-primary" />
        <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-text-primary" />
      </div>
    </div>
  );
}

function HeroMockup() {
  return (
    <div className="relative mx-auto h-[25rem] w-full max-w-[44rem] sm:h-[32rem]">
      <div className="pointer-events-none absolute left-1/2 top-[58%] h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/45 sm:h-[28rem] sm:w-[28rem]" />
      <div className="pointer-events-none absolute left-1/2 top-[58%] h-[16rem] w-[16rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/55 sm:h-[22rem] sm:w-[22rem]" />
      <div className="pointer-events-none absolute left-1/2 top-[58%] h-[10rem] w-[10rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/65 sm:h-[16rem] sm:w-[16rem]" />

      <motion.div whileHover={{ scale: 1.05 }} className="landing-card absolute left-1/2 top-[50%] w-[85%] sm:w-[66%] -translate-x-1/2 -translate-y-1/2 rounded-[30px] p-3 sm:p-4 shadow-xl">
        <div className="flex items-center justify-between px-2 py-1 text-[0.72rem] text-text-tertiary">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-primary-500" />
            <span className="font-semibold text-text-primary">FairLens Audit</span>
          </div>
          <span>Priya S.</span>
        </div>
        <div className="mt-3 overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,#cde6ff_0%,#cfe0ff_28%,#b8b7ff_62%,#beb7f4_100%)]">
          <div className="h-[12rem] sm:h-[15rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.85),transparent_48%),linear-gradient(180deg,rgba(255,255,255,0.22),transparent)]" />
        </div>
        <div className="mt-3 flex items-center justify-between rounded-[22px] bg-white/80 px-4 py-3">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.22em] text-text-tertiary">Report summary</p>
            <p className="mt-1 text-sm font-semibold text-text-primary">Recoverable to 89</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-white shadow-[0_16px_36px_-20px_rgba(91,97,255,0.8)]">
            <ArrowUpRight className="h-4.5 w-4.5" />
          </div>
        </div>
      </motion.div>

      <motion.div whileHover={{ y: -5, scale: 1.05 }} className="landing-card animate-float-gentle absolute left-[2%] sm:left-[4%] top-[46%] rounded-full px-4 py-3 text-sm font-medium text-text-primary shadow-lg">
        Bias detected in hiring outcomes
      </motion.div>
      <motion.div whileHover={{ y: -5, scale: 1.05 }} className="landing-card animate-float-gentle absolute right-[2%] sm:right-[4%] top-[56%] rounded-full px-4 py-3 text-sm font-medium text-text-primary shadow-lg [animation-delay:0.8s]">
        Auto-mitigation path ready
      </motion.div>
      <motion.div whileHover={{ y: -5, scale: 1.05 }} className="landing-card animate-float-gentle absolute right-[8%] sm:right-[12%] top-[18%] rounded-[24px] px-4 py-4 text-left shadow-lg [animation-delay:1.2s]">
        <p className="text-[0.65rem] uppercase tracking-[0.22em] text-text-tertiary">FairScore</p>
        <p className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-text-primary">72</p>
      </motion.div>

      <motion.div whileHover={{ y: -5, scale: 1.02 }} className="absolute bottom-[7%] left-1/2 flex w-[85%] sm:w-[72%] -translate-x-1/2 items-center justify-between rounded-full border border-white/75 bg-white/84 px-5 py-3 shadow-[0_24px_56px_-36px_rgba(28,38,71,0.28)]">
        <span className="text-sm font-medium text-text-primary">Explain findings in plain language</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-500 text-white">
          <Sparkles className="h-4 w-4" />
        </span>
      </motion.div>

      <div className="absolute left-[18%] top-[24%] h-16 w-16 rounded-full bg-[linear-gradient(180deg,#d7d7ff,#f7d0df)] shadow-[0_22px_48px_-30px_rgba(31,42,83,0.42)]" />
      <div className="absolute right-[18%] top-[36%] h-20 w-20 rounded-full bg-[linear-gradient(180deg,#91d8ff,#a9f0d8)] shadow-[0_22px_48px_-30px_rgba(31,42,83,0.42)]" />
      <div className="absolute left-[12%] bottom-[18%] h-20 w-20 rounded-full bg-[linear-gradient(180deg,#bfd1ff,#f9d7ea)] shadow-[0_22px_48px_-30px_rgba(31,42,83,0.42)]" />
    </div>
  );
}

function TeamVisual() {
  return (
    <div className="relative min-h-[26rem]">
      <div className="pointer-events-none absolute left-1/2 top-[58%] h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50" />
      <div className="pointer-events-none absolute left-1/2 top-[58%] h-[15rem] w-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60" />
      <motion.div whileHover={{ y: -5 }} className="absolute left-[8%] top-[10%] landing-card shadow-lg rounded-full px-4 py-3 text-sm font-medium text-text-primary">
        Like posts by your representatives
      </motion.div>
      <motion.div whileHover={{ y: -5 }} className="absolute right-[10%] top-[4%] landing-card shadow-lg rounded-full px-4 py-3 text-sm font-medium text-text-primary">
        Use this method
      </motion.div>
      <motion.div whileHover={{ y: -5 }} className="absolute right-[24%] top-[38%] landing-card shadow-lg rounded-full bg-[#9ae8bf]/80 px-4 py-2 text-sm font-medium text-white">
        Sourcing
      </motion.div>
      <motion.div whileHover={{ y: -5 }} className="absolute bottom-[12%] left-[48%] landing-card shadow-lg rounded-full px-4 py-3 text-sm font-medium text-text-primary z-10">
        Fair reviews increase adoption
      </motion.div>
      <div className="absolute left-1/2 top-[58%] w-[68%] sm:w-[58%] -translate-x-1/2 -translate-y-1/2 rotate-[-18deg] rounded-[34px] border border-white/75 bg-[linear-gradient(180deg,#eff4ff_0%,#d4dcff_58%,#d6cdf8_100%)] p-3 shadow-[0_36px_80px_-46px_rgba(31,42,83,0.34)]">
        <div className="h-[18rem] rounded-[28px] border border-white/70 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.9),rgba(184,200,255,0.46)_52%,rgba(135,142,255,0.18)_100%)]" />
      </div>
    </div>
  );
}

function CopilotVisual() {
  return (
    <div className="relative min-h-[28rem] mt-6 lg:mt-0">
      <motion.div whileHover={{ scale: 1.02 }} className="landing-card absolute left-[2%] sm:left-[8%] top-[4%] w-[80%] sm:w-[52%] rounded-[28px] p-4 shadow-xl z-10">
        <div className="flex items-center justify-between text-xs text-text-tertiary">
          <div className="flex gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-white" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/40" />
          </div>
          <span className="text-text-primary">x</span>
        </div>
        <div className="mt-4 grid grid-cols-[1.1fr_0.9fr] gap-3">
          <div className="space-y-3">
            <div className="h-16 rounded-[18px] bg-[linear-gradient(180deg,#dcecff,#edf4ff)]" />
            <div className="h-3 rounded-full bg-slate-200/70" />
            <div className="h-3 w-3/4 rounded-full bg-slate-200/55" />
          </div>
          <div className="rounded-[18px] bg-slate-100/70" />
        </div>
      </motion.div>

      <motion.div whileHover={{ scale: 1.02 }} className="landing-card absolute right-[2%] sm:right-0 top-[28%] sm:top-[20%] w-[90%] sm:w-[50%] rounded-[28px] p-5 shadow-2xl z-20">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-500 text-white">Z</span>
          <div>
            <p className="font-semibold text-text-primary leading-tight">FairLens AI Auditor</p>
            <p className="text-sm text-text-secondary leading-tight mt-0.5">How are we doing on fairness this week?</p>
          </div>
        </div>
        <div className="mt-4 rounded-[18px] bg-[#121521] px-4 py-4 text-sm text-white">
          <p className="text-white/80">45 new findings</p>
          <p className="mt-2 font-semibold">AI summarized the highest-risk subgroup gaps this week.</p>
        </div>
        <div className="mt-4 rounded-[18px] bg-white/72 px-4 py-4">
          <div className="h-24 rounded-[14px] bg-[linear-gradient(90deg,#e7ebf6_0_10%,transparent_10_20%,#d8dce8_20_30%,transparent_30_40%,#c7d9ff_40_50%,transparent_50_60%,#d8dce8_60_70%,transparent_70_80%,#c6cff0_80_90%,transparent_90_100%)]" />
        </div>
      </motion.div>

      <motion.div whileHover={{ y: -5 }} className="landing-card absolute bottom-[2%] sm:bottom-[7%] left-[6%] rounded-[22px] px-4 py-3 text-sm text-text-primary shadow-lg z-30">
        Answered to 12 private messages!
      </motion.div>
      <motion.div whileHover={{ scale: 1.02 }} className="landing-card absolute bottom-[10%] sm:bottom-[14%] right-[4%] sm:left-[48%] w-[85%] sm:w-[48%] rounded-[24px] overflow-hidden p-0 shadow-xl z-10">
        <div className="h-32 sm:h-44 bg-[linear-gradient(180deg,#dadada_0%,#f0d2e8_38%,#b8dfff_74%,#f3f5fb_100%)]" />
        <div className="px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="min-w-0 pr-2">
              <p className="font-semibold text-text-primary truncate">Ben Timona</p>
              <p className="text-sm text-text-secondary truncate">I want to ask you a question...</p>
            </div>
            <button className="shrink-0 rounded-full bg-primary-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-600">Answer</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function PricingVisual() {
  return (
    <div className="relative min-h-[30rem]">
      <div className="absolute left-1/2 top-[12%] -translate-x-1/2 rounded-full border border-white/75 bg-white/84 px-5 py-3 text-sm font-medium text-text-primary shadow-[0_18px_44px_-32px_rgba(28,38,71,0.28)]">
        Monthly / Yearly
      </div>
      <div className="pointer-events-none absolute left-1/2 top-[56%] h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50" />
      <div className="grid gap-6 pt-16 md:grid-cols-2">
        {pricingPlans.map((plan, index) => (
          <motion.div
            whileHover={{ y: -8 }}
            key={plan.name}
            className={clsx(
              'landing-card relative flex flex-col justify-between rounded-[30px] p-6 sm:p-8 shadow-lg',
              index === 0
                ? 'bg-[linear-gradient(180deg,rgba(233,234,255,0.84),rgba(209,232,255,0.72))]'
                : 'bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(248,250,255,0.68))] border border-white/80',
            )}
          >
            <div>
              <p className="text-xl font-semibold text-text-primary">{plan.name}</p>
              <p className="mt-2 text-sm leading-6 text-text-secondary">{plan.description}</p>
              <p className="mt-6 font-display text-5xl font-semibold tracking-[-0.08em] text-text-primary">{plan.price}</p>
            </div>
            <div className="mt-auto">
              <div className="mt-8 h-px bg-slate-200/80" />
              <div className="mt-6 space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center justify-between text-sm font-medium text-text-secondary">
                    <span className="flex items-center gap-3">
                      <span className="soft-outline-ring flex h-6 w-6 items-center justify-center rounded-full bg-white/60">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                      </span>
                      {feature}
                    </span>
                    <ChevronRight className="h-4 w-4 text-text-tertiary" />
                  </div>
                ))}
              </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-[-1.6rem] left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-[#222748] text-white shadow-[0_18px_44px_-24px_rgba(34,39,72,0.68)] transition-colors hover:bg-[#2c335f]"
            >
              <ArrowUpRight className="h-6 w-6" />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SandboxVisual() {
  return (
    <div className="relative min-h-[31rem] pt-8">
      <motion.div whileHover={{ scale: 1.02 }} className="landing-card absolute left-[2%] sm:left-[7%] top-[5%] sm:top-[22%] w-[96%] sm:w-[85%] rounded-[30px] p-0 overflow-hidden shadow-xl z-20">
        <div className="flex flex-col sm:flex-row">
          <div className="border-b sm:border-b-0 sm:border-r border-white/70 bg-[linear-gradient(180deg,rgba(232,236,255,0.8),rgba(243,246,255,0.68))] p-6 sm:w-[40%]">
            <button className="flex w-full items-center justify-center gap-3 rounded-full bg-[#2a2f5a] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#343b71]">
              <span className="text-lg">+</span>
              Add New Task
            </button>
            <div className="mt-6 space-y-4 text-sm text-text-primary hidden sm:block">
              {['Likes', 'Comments', 'Bias review', 'Promote', 'Completed', 'Start new profile'].map((item, index) => (
                <div key={item} className="flex items-center gap-3">
                  <span className={clsx('h-5 w-5 rounded-full border', index < 3 ? 'border-primary-200 bg-primary-50' : 'border-slate-200')} />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="p-5 sm:p-6 sm:w-[60%]">
            <div className="rounded-full border border-slate-200/90 bg-white px-4 py-3 text-sm text-text-tertiary">
              Type to search
            </div>
            <div className="mt-5 space-y-5">
              {[
                ['48,997', 'Likes', 'Dec 13, 2024'],
                ['2,598', 'Comments', 'Dec 14, 2024'],
                ['92', 'Mitigation notes', 'Dec 15, 2024'],
              ].map(([value, label, date]) => (
                <div key={label}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xl sm:text-2xl font-semibold tracking-[-0.04em] text-text-primary">
                        {value} {label}
                      </p>
                      <p className="mt-1 text-xs sm:text-sm text-text-secondary">{date}</p>
                    </div>
                    <div className="hidden sm:flex -space-x-2">
                      <span className="h-8 w-8 rounded-full border-2 border-white bg-[#cad7ff]" />
                      <span className="h-8 w-8 rounded-full border-2 border-white bg-[#f4d8ea]" />
                      <span className="h-8 w-8 rounded-full border-2 border-white bg-[#b7ecde]" />
                    </div>
                  </div>
                  <div className="mt-3 h-3 rounded-full bg-slate-100">
                    <div className="h-3 rounded-full bg-[linear-gradient(90deg,#d6dbeb,#c7d9ff)]" style={{ width: label === 'Likes' ? '74%' : label === 'Comments' ? '42%' : '60%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div whileHover={{ y: -5 }} className="landing-card absolute right-[2%] sm:right-[3%] top-[80%] sm:top-[34%] rounded-[22px] px-4 py-3 text-sm text-text-primary shadow-lg z-30">
        That was super fast, thank you so much!
      </motion.div>
      <motion.div whileHover={{ y: -5 }} className="landing-card absolute left-[2%] sm:left-[4%] bottom-0 sm:bottom-[6%] w-[12rem] sm:w-[14rem] rounded-[24px] px-4 py-4 shadow-lg z-30">
        <p className="text-xs uppercase tracking-[0.24em] text-text-tertiary">Review note</p>
        <p className="mt-2 text-xs sm:text-sm text-text-secondary">All audits run in secure cloud sandboxes with isolated execution.</p>
      </motion.div>
      <motion.div whileHover={{ y: -5 }} className="landing-card absolute right-[2%] sm:right-[4%] bottom-[-10%] sm:bottom-[10%] w-[14rem] sm:w-[15rem] rounded-[24px] px-4 py-4 shadow-lg z-10">
        <p className="text-xs sm:text-sm text-text-secondary">
          Monitoring the feed and liking what the behavior type says should be liked.
        </p>
      </motion.div>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden pb-14">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10rem] top-[10rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(111,132,255,0.16),transparent_64%)]" />
        <div className="absolute right-[-8rem] top-[6rem] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(255,188,214,0.16),transparent_64%)]" />
      </div>

      <div className="relative mx-auto max-w-[1480px] px-4 py-6 sm:px-6 lg:px-8">
        <Reveal>
          <LandingPanel className="pt-6 lg:pt-8">
            <nav className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <TinyLogo />
                <div className="hidden items-center gap-8 md:flex">
                  <a href="#platform" className="text-sm font-medium text-text-primary transition hover:text-primary-500">Solutions</a>
                  <a href="#teams" className="text-sm font-medium text-text-primary transition hover:text-primary-500">Promote</a>
                  <a href="#pricing" className="text-sm font-medium text-text-primary transition hover:text-primary-500">Price</a>
                  <a href="#copilot" className="text-sm font-medium text-text-primary transition hover:text-primary-500">About our method</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="hidden text-sm font-medium text-text-primary transition hover:text-primary-500 md:inline-flex"
                >
                  Sign in
                </button>
                <Button size="sm" onClick={() => navigate('/audit/new/upload')}>
                  Create free account
                </Button>
                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/75 bg-white/80 text-text-primary shadow-[0_18px_40px_-28px_rgba(28,38,71,0.28)]"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </div>
            </nav>

            <div className="mt-12 text-center lg:mt-16">
              <p className="text-lg text-text-secondary">A platform to manage your</p>
              <h1 className="mx-auto mt-4 max-w-6xl font-display text-[clamp(3.4rem,10vw,7.4rem)] font-medium leading-[0.92] tracking-[-0.09em] text-text-primary">
                AI Fairness Audits In One Cloud
              </h1>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[14rem_minmax(0,1fr)_14rem] lg:items-center">
              <p className="hidden text-lg leading-8 text-text-secondary lg:block">
                Give your team one operating surface for scans, explanations, mitigations, and certificates.
              </p>

              <HeroMockup />

              <p className="hidden text-lg leading-8 text-text-secondary lg:block">
                FairLens makes high-risk model reviews readable enough for compliance, product, and risk teams to act on.
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" onClick={() => navigate('/audit/new/upload')}>
                Start free audit
                <ArrowRight className="h-5 w-5" />
              </Button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => navigate('/dashboard')}
                className="landing-card inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-medium text-text-primary shadow-sm"
              >
                <Play className="h-4 w-4" />
                Explore product shell
              </motion.button>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <motion.div whileHover={{ y: -5 }} key={stat.label} className="landing-card rounded-[26px] px-4 py-5 text-left shadow-md cursor-default">
                  <p className="text-4xl font-semibold tracking-[-0.07em] text-text-primary">{stat.value}</p>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </LandingPanel>
        </Reveal>

        <div id="platform" className="mt-6 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <LandingPanel id="teams" className="h-full">
              <div className="flex flex-col h-full gap-8">
                <div>
                  <Badge variant="neutral" size="md">Workflow units</Badge>
                  <h2 className="mt-5 max-w-lg font-display text-4xl sm:text-5xl font-medium leading-[0.98] tracking-[-0.08em] text-text-primary">
                    Create review teams to promote your model safely.
                  </h2>
                  <p className="mt-5 max-w-md text-base leading-8 text-text-secondary">
                    Spin up a fairness workflow for hiring, lending, healthcare, or public-sector models without turning the review into an engineering-only exercise.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {auditChannels.map((channel) => (
                      <motion.span whileHover={{ scale: 1.05 }} key={channel} className="landing-card rounded-full px-4 py-2 text-sm font-medium text-text-primary cursor-default">
                        {channel}
                      </motion.span>
                    ))}
                  </div>
                </div>
                <TeamVisual />
              </div>
            </LandingPanel>
          </Reveal>

          <Reveal>
            <LandingPanel id="copilot" className="h-full">
              <div className="flex flex-col h-full gap-8">
                <div>
                  <p className="text-lg font-medium text-text-secondary">Powered by AI Auditor</p>
                  <h2 className="mt-3 max-w-lg font-display text-4xl sm:text-5xl font-medium leading-[0.98] tracking-[-0.08em] text-text-primary">
                    The only AI that explains your bias findings in plain language.
                  </h2>
                  <p className="mt-5 max-w-md text-base leading-8 text-text-secondary">
                    You can read subgroup failures manually or trust FairLens AI to turn metrics, proxy detection, and mitigation notes into a decision-ready narrative.
                  </p>
                  <div className="mt-8">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => navigate('/audit/new/upload')}
                      className="inline-flex items-center gap-3 rounded-full bg-primary-500 px-6 py-3.5 text-sm font-medium text-white shadow-[0_18px_40px_-24px_rgba(91,97,255,0.7)] transition-colors hover:bg-primary-600"
                    >
                      Explore AI Auditor
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                        <ArrowDown className="h-4 w-4" />
                      </span>
                    </motion.button>
                  </div>
                </div>
                <CopilotVisual />
              </div>
            </LandingPanel>
          </Reveal>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <LandingPanel id="pricing" className="h-full">
              <div className="flex flex-col h-full gap-8">
                <div className="pt-2 sm:pt-4">
                  <Badge variant="neutral" size="md">Pricing</Badge>
                  <h2 className="mt-5 font-display text-4xl sm:text-5xl font-medium leading-[0.98] tracking-[-0.08em] text-text-primary">
                    Exclusive price plans
                  </h2>
                  <p className="mt-5 max-w-sm text-base leading-8 text-text-secondary">
                    Pricing that scales from proof-of-concept audits to enterprise governance.
                  </p>
                </div>
                <PricingVisual />
              </div>
            </LandingPanel>
          </Reveal>

          <Reveal>
            <LandingPanel id="sandbox" className="h-full">
              <div className="flex flex-col h-full gap-8">
                <div className="text-center sm:text-left">
                  <h2 className="max-w-xl font-display text-4xl sm:text-5xl font-medium leading-[0.98] tracking-[-0.08em] text-text-primary">
                    Units operate from secure virtual sandboxes
                  </h2>
                  <div className="mt-6 flex flex-wrap justify-center sm:justify-start gap-2">
                    {['OpenSea', 'Foundation', 'AndroidVR', 'Showtime'].map((label) => (
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        key={label}
                        className="rounded-full px-4 py-2 text-sm font-medium shadow-sm cursor-default transition-shadow hover:shadow-md"
                        style={{
                          background:
                            label === 'OpenSea'
                              ? 'rgba(182, 196, 255, 0.8)'
                              : label === 'Foundation'
                                ? 'rgba(234, 208, 255, 0.82)'
                                : label === 'AndroidVR'
                                  ? 'rgba(255, 202, 235, 0.84)'
                                  : 'rgba(255, 207, 146, 0.84)',
                        }}
                      >
                        {label}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <SandboxVisual />

                <div className="mt-auto pt-8 grid gap-6 text-base text-text-secondary md:grid-cols-2">
                  <p className="max-w-sm leading-8">
                    All units operate from virtual review sandboxes that keep decision evidence separate from your live model environment.
                  </p>
                  <p className="max-w-sm leading-8">
                    That gives your team the ability to monitor findings, discuss mitigations, and ship certificate-ready summaries without opening the raw pipeline.
                  </p>
                </div>
              </div>
            </LandingPanel>
          </Reveal>
        </div>

        <Reveal className="mt-6">
          <LandingPanel className="text-center">
            <div className="mx-auto max-w-3xl">
              <Badge variant="accent" size="md">FairLens redesigned</Badge>
              <h2 className="mt-5 font-display text-5xl font-medium tracking-[-0.08em] text-text-primary">
                A lighter landing page that stays premium without burning laptop performance.
              </h2>
              <p className="mt-5 text-base leading-8 text-text-secondary">
                The new direction matches the reference more closely: oversized type, soft modular panels, pale gradients, floating workflow cards, and smoother motion from Lenis instead of a live 3D canvas.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button size="lg" onClick={() => navigate('/audit/new/upload')}>
                  Launch a new audit
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="landing-card inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-medium text-text-primary transition hover:bg-slate-50"
                >
                  Open workspace
                  <Workflow className="h-4 w-4" />
                </button>
              </div>
            </div>
          </LandingPanel>
        </Reveal>
      </div>
    </div>
  );
}
