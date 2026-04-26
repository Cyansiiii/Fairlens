import { useState } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Menu,
  Play,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';

import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import ThemeToggle from '../components/ui/ThemeToggle';

const heroStats = [
  { value: '8', label: 'fairness metrics wired into every audit' },
  { value: '10m', label: 'average time to a readable first verdict' },
  { value: '4', label: 'compliance frameworks mapped from launch' },
];

const heroSupport = [
  'Give your team one operating surface for scans, explanations, mitigations, and certificates.',
  'FairLens makes high-risk model reviews readable enough for compliance, product, and risk teams to act on.',
];

const auditChannels = ['Hiring', 'Finance', 'Healthcare', 'GovTech'];
const sandboxTags = ['OpenSea', 'Foundation', 'AndroidVR', 'Showtime'];

type BillingCycle = 'monthly' | 'yearly';

type BillingPlan = {
  name: string;
  eyebrow: string;
  description: string;
  price: string;
  suffix: string;
  badge: string;
  cta?: string;
  featured?: boolean;
  icon: 'shield' | 'sparkles';
  features: Array<{
    label: string;
    value: string;
  }>;
};

const billingPlans: Record<BillingCycle, BillingPlan[]> = {
  monthly: [
    {
      name: 'Starter Plan',
      eyebrow: 'Built for pilots and lean product teams',
      description: 'Launch bias reviews fast with an affordable monthly workspace.',
      price: '$12',
      suffix: '/ month',
      badge: 'Pay monthly',
      cta: 'Pay now',
      featured: true,
      icon: 'shield',
      features: [
        { label: 'Bias scans', value: '1,000' },
        { label: 'AI auditor copilot', value: 'Yes' },
        { label: 'Simulation runs', value: '250' },
        { label: 'Governance exports', value: 'Basic' },
      ],
    },
    {
      name: 'Business',
      eyebrow: 'For security, procurement, and governance-heavy rollouts',
      description: 'We can scope seats, private cloud, and support together.',
      price: 'Business',
      suffix: '',
      badge: 'Pro version',
      icon: 'sparkles',
      features: [
        { label: 'Bias scans', value: 'Unlimited' },
        { label: 'AI auditor copilot', value: 'Priority' },
        { label: 'Simulation runs', value: 'Unlimited' },
        { label: 'Governance exports', value: 'Pro plus' },
      ],
    },
  ],
  yearly: [
    {
      name: 'Starter Plan',
      eyebrow: 'Equivalent to $10 per month, billed once per year',
      description: 'Save on recurring audits while keeping every core workflow live.',
      price: '$120',
      suffix: '/ year',
      badge: 'Save 17%',
      cta: 'Save now',
      featured: true,
      icon: 'shield',
      features: [
        { label: 'Bias scans', value: '12,000' },
        { label: 'AI auditor copilot', value: 'Yes' },
        { label: 'Simulation runs', value: '3,000' },
        { label: 'Governance exports', value: 'Advanced' },
      ],
    },
    {
      name: 'Business',
      eyebrow: 'Annual contracts with SSO, onboarding, and dedicated support',
      description: 'Best for regulated teams that need scale, procurement, and SLAs.',
      price: 'Business',
      suffix: '',
      badge: 'Enterprise',
      icon: 'sparkles',
      features: [
        { label: 'Bias scans', value: 'Unlimited' },
        { label: 'AI auditor copilot', value: 'Dedicated' },
        { label: 'Simulation runs', value: 'Unlimited' },
        { label: 'Governance exports', value: 'Enterprise' },
      ],
    },
  ],
};

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
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
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
      className={clsx(
        'landing-panel relative isolate overflow-hidden rounded-[34px] px-5 py-6 sm:px-8 sm:py-8 lg:rounded-[42px] lg:px-10 lg:py-10',
        className,
      )}
    >
      <div className="noise-mask opacity-[0.1]" />
      <div className="relative z-10">{children}</div>
    </section>
  );
}

function TinyLogo() {
  return (
    <div className="theme-surface-strong relative flex h-12 w-12 items-center justify-center rounded-full shadow-[0_22px_56px_-34px_rgba(77,88,190,0.32)]">
      <div className="absolute inset-[3px] rounded-full border border-white/60" />
      <div className="relative h-5 w-5">
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full border border-text-primary" />
        <span className="absolute bottom-0 left-0 h-2 w-2 rounded-full border border-text-primary" />
        <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full border border-text-primary" />
        <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-text-primary" />
      </div>
    </div>
  );
}

function Halo({
  className,
  gradient,
}: {
  className?: string;
  gradient: string;
}) {
  return (
    <div
      className={clsx('pointer-events-none absolute rounded-full blur-3xl', className)}
      style={{ background: gradient }}
    />
  );
}

function DecorativeAvatar({
  className,
  gradient,
}: {
  className?: string;
  gradient: string;
}) {
  return (
    <div
      className={clsx(
        'theme-surface-strong absolute overflow-hidden rounded-full border border-white/70 shadow-[0_24px_70px_-36px_rgba(61,71,146,0.42)]',
        className,
      )}
    >
      <div className="h-full w-full" style={{ background: gradient }} />
    </div>
  );
}

function HeroMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[48rem] min-h-[34rem] sm:min-h-[38rem] xl:min-h-[42rem]">
      <Halo
        className="left-[8%] top-[4%] h-40 w-40"
        gradient="radial-gradient(circle, rgba(118, 110, 255, 0.32), rgba(118, 110, 255, 0))"
      />
      <Halo
        className="right-[6%] top-[12%] h-52 w-52"
        gradient="radial-gradient(circle, rgba(109, 202, 255, 0.28), rgba(109, 202, 255, 0))"
      />
      <Halo
        className="left-[20%] bottom-[2%] h-56 w-56"
        gradient="radial-gradient(circle, rgba(255, 201, 237, 0.26), rgba(255, 201, 237, 0))"
      />

      <div className="absolute inset-[6%] rounded-[40px] border border-white/55 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.78),rgba(255,255,255,0.18)_62%,transparent_100%)]" />
      <div className="absolute inset-[13%] rounded-[38px] border border-white/45" />
      <div className="absolute inset-[20%] rounded-[34px] border border-white/32" />

      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        className="landing-card absolute inset-x-[6%] bottom-[10%] top-[14%] overflow-hidden rounded-[36px] p-4 shadow-[0_48px_120px_-56px_rgba(52,62,142,0.42)] sm:p-5"
      >
        <div className="grid h-full gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
          <div className="theme-surface-soft flex flex-col rounded-[30px] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary-500" />
                <span className="text-xs font-semibold text-text-primary">FairLens Audit</span>
              </div>
              <span className="text-[0.72rem] text-text-tertiary">Priya S.</span>
            </div>

            <div className="mt-5 space-y-3">
              {heroStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={clsx(
                    'rounded-[22px] border px-3.5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]',
                    index === 0
                      ? 'border-white/70 bg-white/78 dark:border-slate-500/56 dark:bg-slate-200/12 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
                      : 'border-white/55 bg-white/58 dark:border-slate-500/46 dark:bg-slate-200/10 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]',
                  )}
                >
                  <p className="font-display text-3xl font-semibold tracking-[-0.08em] text-text-primary">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[0.72rem] leading-5 text-text-secondary">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-auto theme-surface-soft rounded-[24px] px-4 py-3">
              <p className="text-[0.65rem] uppercase tracking-[0.22em] text-text-tertiary">
                Report summary
              </p>
              <p className="mt-2 text-sm font-semibold text-text-primary">
                Recoverable to 89
              </p>
            </div>
          </div>

          <div className="grid min-h-[22rem] gap-4 sm:grid-rows-[auto_1fr_auto]">
            <div className="theme-surface-soft flex items-center justify-between rounded-[26px] px-4 py-3">
              <div className="h-2.5 w-28 rounded-full bg-white/80 shadow-[0_10px_24px_-18px_rgba(61,71,146,0.25)] dark:bg-slate-100/18" />
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-white/90 dark:bg-slate-100/72" />
                <span className="h-3 w-3 rounded-full bg-white/60 dark:bg-slate-300/34" />
                <span className="h-3 w-3 rounded-full bg-white/35 dark:bg-slate-500/28" />
              </div>
            </div>

            <div className="theme-surface rounded-[30px] p-4">
              <div className="grid h-full gap-4 md:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(238,243,255,0.96),rgba(225,233,255,0.74))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] dark:bg-[linear-gradient(180deg,rgba(30,41,59,0.92),rgba(51,65,85,0.72))]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[0.62rem] uppercase tracking-[0.22em] text-text-tertiary">
                        FairScore
                      </p>
                      <p className="mt-2 font-display text-5xl font-semibold tracking-[-0.08em] text-text-primary">
                        72
                      </p>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7765ff,#5db8ff)] text-white shadow-[0_18px_46px_-22px_rgba(106,101,255,0.66)]">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-6 items-end gap-2">
                    {[32, 56, 42, 70, 60, 78].map((height, index) => (
                      <div
                        key={height}
                        className="rounded-full bg-[linear-gradient(180deg,rgba(126,116,255,0.18),rgba(104,198,255,0.78))]"
                        style={{
                          height: `${height}px`,
                          opacity: index === 3 ? 1 : 0.75,
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="theme-surface-soft rounded-[24px] p-4">
                  <div className="space-y-3">
                    {heroStats.map((stat, index) => (
                      <div
                        key={stat.value}
                        className="rounded-[18px] bg-white/68 px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.82)] dark:bg-slate-800/68"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                            {stat.value}
                          </span>
                          <span className="h-2 w-2 rounded-full bg-primary-400" />
                        </div>
                        <div className="mt-2 h-2 rounded-full bg-slate-200/72 dark:bg-slate-700/72">
                          <div
                            className="h-full rounded-full bg-[linear-gradient(90deg,#7a67ff,#6bc9ff)]"
                            style={{ width: `${54 + index * 12}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="theme-surface-strong flex items-center justify-between rounded-[26px] px-4 py-3 shadow-[0_20px_50px_-30px_rgba(61,71,146,0.35)]">
              <span className="text-sm font-medium text-text-primary">
                Explain findings in plain language
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7868ff,#62c7ff)] text-white shadow-[0_18px_42px_-20px_rgba(106,101,255,0.58)]">
                <Sparkles className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </motion.div>



      <DecorativeAvatar
        className="left-[18%] top-[8%] h-16 w-16"
        gradient="linear-gradient(180deg,#e7ebff,#cfd7ff)"
      />
      <DecorativeAvatar
        className="right-[22%] top-[50%] h-20 w-20"
        gradient="linear-gradient(180deg,#9dd7ff,#84ffd5)"
      />
      <DecorativeAvatar
        className="left-[24%] bottom-[12%] h-14 w-14"
        gradient="linear-gradient(180deg,#ffcedf,#d9d7ff)"
      />
    </div>
  );
}

function TeamVisual() {
  return (
    <div className="relative min-h-[30rem] overflow-hidden rounded-[34px]">
      <Halo
        className="left-[18%] top-[18%] h-44 w-44"
        gradient="radial-gradient(circle, rgba(125, 118, 255, 0.28), rgba(125, 118, 255, 0))"
      />
      <Halo
        className="right-[8%] bottom-[8%] h-52 w-52"
        gradient="radial-gradient(circle, rgba(105, 196, 255, 0.26), rgba(105, 196, 255, 0))"
      />

      <div className="pointer-events-none absolute left-1/2 top-[58%] h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/42" />
      <div className="pointer-events-none absolute left-1/2 top-[58%] h-[19rem] w-[19rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/35" />
      <div className="pointer-events-none absolute left-1/2 top-[58%] h-[12rem] w-[12rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/28" />

      <motion.div
        whileHover={{ y: -5 }}
        className="landing-card absolute left-[4%] top-[10%] z-20 rounded-full px-4 py-3 text-sm font-medium text-text-primary shadow-lg"
      >
        Like posts by your representatives
      </motion.div>

      <motion.div
        whileHover={{ y: -5 }}
        className="landing-card absolute right-[4%] top-[8%] z-20 rounded-full px-4 py-3 text-sm font-medium text-text-primary shadow-lg"
      >
        Use this method
      </motion.div>

      <motion.div
        whileHover={{ y: -5 }}
        className="absolute left-1/2 top-[36%] z-20 -translate-x-1/2 rounded-full bg-[linear-gradient(135deg,rgba(122,240,195,0.95),rgba(108,203,255,0.88))] px-5 py-2 text-sm font-semibold text-white shadow-[0_24px_60px_-28px_rgba(83,201,185,0.58)]"
      >
        Sourcing
      </motion.div>

      <motion.div
        whileHover={{ y: -5 }}
        className="landing-card absolute bottom-[11%] left-1/2 z-20 -translate-x-1/2 rounded-full px-4 py-3 text-sm font-medium text-text-primary shadow-lg"
      >
        Fair reviews increase adoption
      </motion.div>

      <motion.div
        whileHover={{ rotate: -10, y: -6 }}
        className="theme-surface-strong absolute left-1/2 top-[60%] z-10 w-[68%] -translate-x-1/2 -translate-y-1/2 rotate-[-14deg] rounded-[36px] p-3 shadow-[0_46px_120px_-64px_rgba(61,71,146,0.52)]"
      >
        <div className="h-[18rem] rounded-[30px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.98),rgba(206,222,255,0.7)_42%,rgba(159,181,255,0.3)_68%,rgba(131,207,255,0.18)_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.24),rgba(30,41,59,0.78)_54%,rgba(15,23,42,0.94)_100%)]" />
      </motion.div>

      <div className="pointer-events-none absolute left-[14%] top-[48%] h-px w-[22%] rotate-[10deg] bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.55),rgba(255,255,255,0))]" />
      <div className="pointer-events-none absolute right-[13%] top-[56%] h-px w-[24%] -rotate-[12deg] bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.55),rgba(255,255,255,0))]" />

      <DecorativeAvatar
        className="left-[17%] top-[54%] h-14 w-14"
        gradient="linear-gradient(180deg,#f2d9ff,#cfd8ff)"
      />
      <DecorativeAvatar
        className="right-[18%] top-[50%] h-16 w-16"
        gradient="linear-gradient(180deg,#d6ebff,#8df2d3)"
      />
    </div>
  );
}

function CopilotVisual() {
  return (
    <div className="relative min-h-[40rem] sm:min-h-[44rem] xl:min-h-[40rem]">
      <Halo
        className="left-[8%] top-[8%] h-40 w-40"
        gradient="radial-gradient(circle, rgba(126, 116, 255, 0.26), rgba(126, 116, 255, 0))"
      />
      <Halo
        className="right-[10%] top-[24%] h-48 w-48"
        gradient="radial-gradient(circle, rgba(102, 200, 255, 0.22), rgba(102, 200, 255, 0))"
      />

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="landing-card absolute left-[4%] top-[4%] hidden w-[52%] rounded-[30px] p-4 shadow-xl sm:block"
      >
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
            <div className="h-16 rounded-[18px] bg-[linear-gradient(180deg,#dbe5ff,#ecf2ff)]" />
            <div className="h-3 rounded-full bg-slate-200/70" />
            <div className="h-3 w-3/4 rounded-full bg-slate-200/55" />
          </div>
          <div className="rounded-[18px] bg-slate-100/70" />
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="landing-card absolute right-0 top-[14%] z-20 w-full rounded-[30px] p-5 shadow-[0_42px_100px_-52px_rgba(61,71,146,0.5)] sm:w-[70%] lg:w-[76%]"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7563ff,#63c1ff)] text-white shadow-[0_18px_40px_-20px_rgba(112,102,255,0.6)]">
            Z
          </span>
          <div>
            <p className="font-semibold leading-tight text-text-primary">FairLens AI Auditor</p>
            <p className="mt-0.5 text-sm leading-tight text-text-secondary">
              How are we doing on fairness this week?
            </p>
          </div>
        </div>

        <div className="theme-surface-inverse mt-4 rounded-[20px] px-4 py-4 text-sm text-white">
          <p className="text-white/72">45 new findings</p>
          <p className="mt-2 font-semibold">
            AI summarized the highest-risk subgroup gaps this week.
          </p>
        </div>

        <div className="theme-surface mt-4 rounded-[22px] p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.22em] text-text-tertiary">
                Fairness pulse
              </p>
              <p className="mt-1 text-sm font-semibold text-text-primary">
                The riskiest signals are now readable.
              </p>
            </div>
            <span className="rounded-full bg-accent-50 px-3 py-1 text-[0.68rem] font-semibold text-accent-700 dark:bg-accent-500/14 dark:text-accent-200">
              Recoverable
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {[
              {
                label: 'Hiring parity drift',
                value: '0.62',
                width: '78%',
                tone: 'from-critical-400 to-warning-300',
              },
              {
                label: 'Proxy signal risk',
                value: 'High',
                width: '88%',
                tone: 'from-primary-500 to-accent-400',
              },
              {
                label: 'Recoverable score',
                value: '89',
                width: '64%',
                tone: 'from-accent-500 to-success-400',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[18px] bg-white/72 px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.78)] dark:bg-slate-800/68"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold text-text-primary">{item.label}</p>
                  <p className="text-xs font-semibold text-text-secondary">{item.value}</p>
                </div>
                <div className="mt-2 h-2 rounded-full bg-slate-200/72 dark:bg-slate-700/72">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${item.tone}`}
                    style={{ width: item.width }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>



      <DecorativeAvatar
        className="left-[76%] top-[4%] h-12 w-12"
        gradient="linear-gradient(180deg,#111827,#444f7e)"
      />
      <DecorativeAvatar
        className="left-[18%] bottom-[24%] h-14 w-14"
        gradient="linear-gradient(180deg,#ffbfd8,#dcd7ff)"
      />
    </div>
  );
}

function PricingVisual() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [activePlanIndex, setActivePlanIndex] = useState(0);
  const plans = billingPlans[billingCycle];

  return (
    <div className="relative min-h-[35rem] pt-14 sm:min-h-[40rem] xl:px-8">
      <div className="pointer-events-none absolute left-1/2 top-[8rem] h-[24rem] w-[24rem] -translate-x-1/2 rounded-full border border-white/44 sm:h-[28rem] sm:w-[28rem]" />
      <div className="pointer-events-none absolute left-1/2 top-[8rem] h-[31rem] w-[31rem] -translate-x-1/2 rounded-full border border-white/26 sm:h-[35rem] sm:w-[35rem]" />
      <div className="pointer-events-none absolute left-1/2 top-[8rem] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full border border-white/18" />
      <div className="pointer-events-none absolute left-1/2 top-[11rem] h-[18rem] w-[18rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(186,188,255,0.22),rgba(186,188,255,0)_72%)] sm:h-[22rem] sm:w-[22rem]" />

      <div className="absolute left-1/2 top-0 z-30 -translate-x-1/2">
        <motion.div
          whileHover={{ y: -3 }}
          className="theme-surface-strong flex items-center gap-1 rounded-full p-1.5 shadow-[0_20px_48px_-28px_rgba(61,71,146,0.3)]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/78 text-lg font-medium text-text-tertiary shadow-[inset_0_1px_0_rgba(255,255,255,0.82)] dark:bg-slate-900/72">
            x
          </span>
          {(['monthly', 'yearly'] as const).map((cycle) => (
            <button
              key={cycle}
              type="button"
              onClick={() => {
                setBillingCycle(cycle);
                setActivePlanIndex(0);
              }}
              aria-pressed={billingCycle === cycle}
              className={clsx(
                'rounded-full px-4 py-2.5 text-sm font-medium capitalize transition',
                billingCycle === cycle
                  ? 'bg-white text-text-primary shadow-[0_18px_44px_-28px_rgba(61,71,146,0.36)] dark:bg-slate-900'
                  : 'text-text-secondary hover:text-text-primary',
              )}
            >
              {cycle}
            </button>
          ))}
        </motion.div>
      </div>

      <div className="grid gap-6 pt-10 lg:grid-cols-2 lg:gap-7 lg:pt-16 xl:mx-auto xl:max-w-[48rem]">
        {plans.map((plan, index) => {
          const isTextPrice = !plan.suffix;

          return (
          <motion.div
            whileHover={{ y: -8 }}
            key={plan.name}
            onClick={() => setActivePlanIndex(index)}
            className={clsx(
              'relative mx-auto flex min-h-[31rem] w-full max-w-[23rem] cursor-pointer flex-col rounded-[32px] border p-6 shadow-[0_34px_90px_-46px_rgba(61,71,146,0.34)] transition sm:p-8',
              plan.featured
                ? 'border-white/80 bg-[linear-gradient(180deg,rgba(242,236,255,0.98),rgba(220,234,255,0.84))] dark:border-primary-300/30 dark:bg-[linear-gradient(180deg,rgba(63,47,146,0.42),rgba(18,68,113,0.32))]'
                : 'border-white/74 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(245,247,255,0.84))] dark:border-slate-700/72 dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.86),rgba(30,41,59,0.76))]',
              activePlanIndex === index
                ? 'lg:-translate-y-2 lg:shadow-[0_44px_110px_-48px_rgba(61,71,146,0.44)]'
                : 'opacity-[0.92]',
            )}
          >
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/72 text-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:bg-slate-900/72">
                {plan.icon === 'shield' ? (
                  <ShieldCheck className="h-5 w-5" />
                ) : (
                  <Sparkles className="h-5 w-5" />
                )}
              </div>

              <div className="mt-8 text-center">
                <p className="text-3xl font-medium tracking-[-0.05em] text-text-primary">{plan.name}</p>
                <p className="mt-3 text-sm leading-6 text-text-secondary">{plan.eyebrow}</p>
              </div>

              <div
                className={clsx(
                  'mt-8 min-w-0 justify-center text-center',
                  isTextPrice ? 'flex' : 'flex items-end gap-2',
                )}
              >
                <p
                  className={clsx(
                    'mx-auto max-w-full break-words font-display font-semibold text-text-primary',
                    isTextPrice
                      ? 'max-w-[11rem] text-[clamp(2rem,3.2vw,2.6rem)] leading-[0.94] tracking-[-0.05em]'
                      : 'text-[clamp(3rem,7vw,4.2rem)] tracking-[-0.08em]',
                  )}
                >
                  {plan.price}
                </p>
                {plan.suffix ? (
                  <span className="mb-2 shrink-0 text-sm font-medium text-text-secondary">
                    {plan.suffix}
                  </span>
                ) : null}
              </div>

              <p className="mt-3 text-center text-sm leading-6 text-text-secondary">
                {plan.description}
              </p>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between gap-3 border-b border-white/58 pb-5 dark:border-slate-700/72">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-text-tertiary">
                  {plan.badge}
                </span>
                <span className="h-2.5 w-2.5 rounded-full bg-[linear-gradient(135deg,#7a67ff,#69c7ff)]" />
              </div>

              <div className="mt-6 space-y-4">
                {plan.features.map((feature) => (
                  <div
                    key={feature.label}
                    className="flex items-center justify-between gap-4 text-sm font-medium text-text-secondary"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full border border-text-tertiary/36 bg-white/52 shadow-[inset_0_1px_0_rgba(255,255,255,0.76)] dark:bg-slate-900/48">
                        <span className="h-2 w-2 rounded-full border border-text-tertiary/42" />
                      </span>
                      <span>{feature.label}</span>
                    </span>
                    <span className="text-text-tertiary">{feature.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              type="button"
              className={clsx(
                'absolute bottom-[-1.75rem] left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full transition-colors hover:brightness-110',
                index === 0
                  ? 'theme-surface-inverse text-white'
                  : 'theme-surface-strong text-text-primary',
              )}
            >
              <ArrowUpRight className="h-6 w-6" />
            </motion.button>
          </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function SandboxVisual() {
  return (
    <div className="relative min-h-[35rem] pt-8 sm:min-h-[31rem]">
      <Halo
        className="left-[10%] top-[16%] h-44 w-44"
        gradient="radial-gradient(circle, rgba(123, 117, 255, 0.22), rgba(123, 117, 255, 0))"
      />
      <Halo
        className="right-[8%] top-[24%] h-52 w-52"
        gradient="radial-gradient(circle, rgba(99, 194, 255, 0.22), rgba(99, 194, 255, 0))"
      />

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="landing-card absolute left-[2%] top-[5%] z-20 w-[96%] overflow-hidden rounded-[32px] p-0 shadow-[0_42px_110px_-56px_rgba(61,71,146,0.42)] sm:left-[7%] sm:top-[22%] sm:w-[85%]"
      >
        <div className="flex flex-col sm:flex-row">
          <div className="border-b border-[var(--surface-card-border-strong)] bg-[linear-gradient(180deg,rgba(239,240,255,0.84),rgba  (243,247,255,0.72))] p-6 sm:w-[40%] sm:border-b-0 sm:border-r dark:bg-[linear-gradient(180deg,rgba(30,41,59,0.88),rgba(15,23,42,0.72))]">
            <button className="theme-surface-inverse flex w-full items-center justify-center gap-3 rounded-full px-6 py-3 text-sm font-medium text-white transition hover:brightness-110">
              <span className="text-lg">+</span>
              Add New Task
            </button>
            <div className="mt-6 hidden space-y-4 text-sm text-text-primary sm:block">
              {['Likes', 'Comments', 'Bias review', 'Promote', 'Completed', 'Start new profile'].map((item, index) => (
                <div key={item} className="flex items-center gap-3">
                  <span
                    className={clsx(
                      'h-5 w-5 rounded-full border',
                      index < 3 ? 'border-primary-200 bg-primary-50' : 'border-slate-200',
                    )}
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 sm:w-[60%] sm:p-6">
            <div className="theme-surface-soft rounded-full px-4 py-3 text-sm text-text-tertiary">
              Type to search
            </div>
            <div className="mt-5 space-y-5">
              {[
                ['48,997', 'Likes', 'Dec 13, 2024'],
                ['2,598', 'Comments', 'Dec 14, 2024'],
                ['92', 'Mitigation notes', 'Dec 15, 2024'],
              ].map(([value, label, date]) => (
                <div key={label}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xl font-semibold tracking-[-0.04em] text-text-primary sm:text-2xl">
                        {value} {label}
                      </p>
                      <p className="mt-1 text-xs text-text-secondary sm:text-sm">{date}</p>
                    </div>
                    <div className="hidden -space-x-2 sm:flex">
                      <span className="h-8 w-8 rounded-full border-2 border-white bg-[#cad7ff]" />
                      <span className="h-8 w-8 rounded-full border-2 border-white bg-[#f4d8ea]" />
                      <span className="h-8 w-8 rounded-full border-2 border-white bg-[#b7ecde]" />
                    </div>
                  </div>
                  <div className="mt-3 h-3 rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-3 rounded-full bg-[linear-gradient(90deg,#7867ff,#69c7ff)]"
                      style={{
                        width:
                          label === 'Likes' ? '74%' : label === 'Comments' ? '42%' : '60%',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>


    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden pb-14 sm:pb-20">
      <div className="pointer-events-none absolute inset-0">
        <Halo
          className="left-[-8rem] top-[5rem] h-[26rem] w-[26rem]"
          gradient="radial-gradient(circle, rgba(118, 110, 255, 0.22), rgba(118, 110, 255, 0))"
        />
        <Halo
          className="right-[-6rem] top-[2rem] h-[22rem] w-[22rem]"
          gradient="radial-gradient(circle, rgba(103, 194, 255, 0.22), rgba(103, 194, 255, 0))"
        />
        <Halo
          className="bottom-[-10rem] left-[20%] h-[28rem] w-[28rem]"
          gradient="radial-gradient(circle, rgba(255, 204, 236, 0.2), rgba(255, 204, 236, 0))"
        />
      </div>

      <div className="relative mx-auto max-w-[1540px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
        <Reveal>
          <LandingPanel className="min-h-[calc(100vh-3rem)]">
            <nav className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <TinyLogo />
                <div className="hidden items-center gap-8 md:flex">
                  <a href="#platform" className="text-sm font-medium text-text-primary transition hover:text-primary-500">
                    Solutions
                  </a>
                  <a href="#teams" className="text-sm font-medium text-text-primary transition hover:text-primary-500">
                    Promote
                  </a>
                  <a href="#pricing" className="text-sm font-medium text-text-primary transition hover:text-primary-500">
                    Price
                  </a>
                  <a href="#copilot" className="text-sm font-medium text-text-primary transition hover:text-primary-500">
                    About our method
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ThemeToggle />
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="button-ghost hidden rounded-full px-4 py-2 text-sm font-medium text-text-primary transition hover:text-primary-500 md:inline-flex"
                >
                  Sign in
                </button>
                <Button size="sm" onClick={() => navigate('/audit/new/upload')}>
                  Create free account
                </Button>
                <button
                  type="button"
                  className="button-ghost flex h-11 w-11 items-center justify-center rounded-full text-text-primary shadow-[0_18px_40px_-28px_rgba(61,71,146,0.28)]"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </div>
            </nav>

            <div className="mt-12 grid gap-12 xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] xl:items-center">
              <div className="relative">
                <div className="glass-chip inline-flex rounded-full px-4 py-2 text-sm font-medium text-text-secondary">
                  A platform to manage your
                </div>

                <h1 className="mt-6 max-w-[11ch] font-display text-[clamp(3.5rem,8vw,7rem)] font-semibold leading-[0.9] tracking-[-0.095em] text-text-primary">
                  AI Fairness Audits In One Cloud
                </h1>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {heroSupport.map((item, index) => (
                    <motion.div
                      key={item}
                      whileHover={{ y: -4 }}
                      className={clsx(
                        'landing-card rounded-[26px] px-5 py-5 text-sm leading-7 text-text-secondary shadow-md',
                        index === 0 && 'sm:translate-y-4',
                      )}
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button size="lg" onClick={() => navigate('/audit/new/upload')}>
                    Start free audit
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={() => navigate('/dashboard')}
                    className="button-secondary inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-medium text-text-primary shadow-sm"
                  >
                    <Play className="h-4 w-4" />
                    Explore product shell
                  </motion.button>
                </div>

                <div className="mt-10 grid gap-3 sm:grid-cols-3">
                  {heroStats.map((stat, index) => (
                    <motion.div
                      whileHover={{ y: -5 }}
                      key={stat.label}
                      className={clsx(
                        'landing-card rounded-[28px] px-4 py-5 text-left shadow-md',
                        index === 1 && 'sm:-translate-y-3',
                      )}
                    >
                      <p className="text-4xl font-semibold tracking-[-0.08em] text-text-primary">
                        {stat.value}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-text-secondary">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <HeroMockup />
            </div>
          </LandingPanel>
        </Reveal>

        <div id="platform" className="mt-6 space-y-6">
          <Reveal>
            <LandingPanel id="teams">
              <div className="grid gap-10 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:items-center">
                <div className="max-w-xl">
                  <Badge variant="neutral" size="md">Workflow units</Badge>
                  <h2 className="mt-5 font-display text-4xl font-semibold leading-[0.95] tracking-[-0.08em] text-text-primary sm:text-5xl">
                    Create review teams to promote your model safely.
                  </h2>
                  <p className="mt-5 text-base leading-8 text-text-secondary">
                    Spin up a fairness workflow for hiring, lending, healthcare, or public-sector models without turning the review into an engineering-only exercise.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {auditChannels.map((channel) => (
                      <motion.span
                        whileHover={{ scale: 1.04 }}
                        key={channel}
                        className="landing-card rounded-full px-4 py-2 text-sm font-medium text-text-primary shadow-sm"
                      >
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
            <LandingPanel id="copilot">
              <div className="grid gap-10 xl:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] xl:items-center">
                <CopilotVisual />

                <div className="max-w-xl xl:justify-self-end">
                  <p className="text-lg font-medium text-text-secondary">Powered by AI Auditor</p>
                  <h2 className="mt-3 font-display text-4xl font-semibold leading-[0.95] tracking-[-0.08em] text-text-primary sm:text-5xl">
                    The only AI that explains your bias findings in plain language.
                  </h2>
                  <p className="mt-5 text-base leading-8 text-text-secondary">
                    You can read subgroup failures manually or trust FairLens AI to turn metrics, proxy detection, and mitigation notes into a decision-ready narrative.
                  </p>

                  <div className="mt-8">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      onClick={() => navigate('/audit/new/upload')}
                      className="button-primary inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-medium text-white transition-colors"
                    >
                      Explore AI Auditor
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                        <ArrowDown className="h-4 w-4" />
                      </span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </LandingPanel>
          </Reveal>
        </div>

        <div className="mt-6 flex flex-col gap-6">
          <Reveal>
            <LandingPanel id="sandbox" className="h-full">
              <div className="flex h-full flex-col gap-8">
                <div className="text-center sm:text-left">
                  <h2 className="max-w-xl font-display text-4xl font-semibold leading-[0.95] tracking-[-0.08em] text-text-primary sm:text-5xl">
                    Units operate from secure virtual sandboxes
                  </h2>

                  <div className="mt-6 flex flex-wrap justify-center gap-2 sm:justify-start">
                    {sandboxTags.map((label) => (
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        key={label}
                        className="rounded-full px-4 py-2 text-sm font-medium shadow-sm transition-shadow hover:shadow-md"
                        style={{
                          background:
                            label === 'OpenSea'
                              ? 'rgba(191, 199, 255, 0.82)'
                              : label === 'Foundation'
                                ? 'rgba(234, 208, 255, 0.82)'
                                : label === 'AndroidVR'
                                  ? 'rgba(255, 208, 235, 0.84)'
                                  : 'rgba(255, 214, 162, 0.84)',
                        }}
                      >
                        {label}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <SandboxVisual />

                <div className="mt-auto grid gap-6 pt-8 text-base text-text-secondary md:grid-cols-2">
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

          <Reveal>
            <LandingPanel id="pricing" className="h-full">
              <div className="flex h-full flex-col gap-10">
                <div className="max-w-sm pt-2 sm:pt-4">
                  <p className="text-sm font-medium text-text-tertiary">FairLens billing</p>
                  <h2 className="mt-5 font-display text-4xl font-semibold leading-[0.95] tracking-[-0.08em] text-text-primary sm:text-5xl">
                    Exclusive billing plans
                  </h2>
                  <p className="mt-5 text-base leading-8 text-text-secondary">
                    Move from quick pilot audits to enterprise governance without switching platforms.
                  </p>
                  <div className="mt-8 inline-flex rounded-full border border-white/70 bg-white/68 px-4 py-2 text-sm font-medium text-text-primary shadow-[0_22px_52px_-34px_rgba(61,71,146,0.22)] dark:border-slate-700/72 dark:bg-slate-900/54">
                    Save more with yearly billing
                  </div>
                </div>

                <PricingVisual />
              </div>
            </LandingPanel>
          </Reveal>
        </div>

        <Reveal className="mt-6">
          <LandingPanel>
            <div className="grid gap-10 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:items-center">
              <div className="max-w-2xl">
                <Badge variant="accent" size="md">FairLens redesigned</Badge>
                <h2 className="mt-5 font-display text-5xl font-semibold tracking-[-0.08em] text-text-primary">
                  A lighter landing page that stays premium without burning laptop performance.
                </h2>
                <p className="mt-5 text-base leading-8 text-text-secondary">
                  The new direction matches the reference more closely: oversized type, soft modular panels, pale gradients, floating workflow cards, and smoother motion from Lenis instead of a live 3D canvas.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button size="lg" onClick={() => navigate('/audit/new/upload')}>
                    Launch a new audit
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                  <button
                    type="button"
                    onClick={() => navigate('/dashboard')}
                    className="button-secondary inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-medium text-text-primary transition"
                  >
                    Open workspace
                    <Workflow className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {heroStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ y: -5 }}
                    className={clsx(
                      'landing-card rounded-[30px] px-5 py-5 shadow-md',
                      index === 2 && 'sm:col-span-2',
                    )}
                  >
                    <p className="text-[0.68rem] uppercase tracking-[0.22em] text-text-tertiary">
                      {stat.label}
                    </p>
                    <p className="mt-4 font-display text-5xl font-semibold tracking-[-0.08em] text-text-primary">
                      {stat.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </LandingPanel>
        </Reveal>
      </div>
    </div>
  );
}
