import type { ReactNode } from 'react';
import { clsx } from 'clsx';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  LayoutDashboard,
  ShieldCheck,
  Settings2,
  Sparkles,
  WandSparkles,
  Workflow,
} from 'lucide-react';

import Badge from '../ui/Badge';
import Button from '../ui/Button';

interface AppShellProps {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
}

const navigation = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    match: ['/dashboard'],
  },
  {
    label: 'New Audit',
    path: '/audit/new/upload',
    icon: WandSparkles,
    match: ['/audit/new', '/audit/'],
  },
  {
    label: 'Simulation',
    path: '/simulation',
    icon: Workflow,
    match: ['/simulation'],
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: Settings2,
    match: ['/settings'],
  },
];

function isNavActive(pathname: string, matchers: string[]) {
  return matchers.some((matcher) => pathname.startsWith(matcher));
}

export default function AppShell({
  eyebrow,
  title,
  description,
  actions,
  children,
}: AppShellProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="page-backdrop" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8rem] top-[6rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(18,179,168,0.18),transparent_62%)] blur-3xl" />
        <div className="absolute right-[-10rem] top-[4rem] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(0,101,242,0.16),transparent_60%)] blur-3xl" />
        <div className="absolute bottom-[-8rem] left-[30%] h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgba(255,127,102,0.14),transparent_60%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1480px] px-4 py-4 sm:px-6 lg:px-8 lg:py-8">
        <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="glass-panel glass-panel-strong rounded-[30px] p-4 sm:p-5 xl:sticky xl:top-6 xl:h-[calc(100vh-3rem)]">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex w-full items-center gap-3 rounded-[24px] border border-white/55 bg-white/55 px-3 py-3 text-left transition hover:bg-white/72"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-[18px] gradient-primary shadow-[0_20px_50px_-22px_rgba(0,101,242,0.7)]">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-display text-lg font-semibold tracking-[-0.04em] text-text-primary">
                  FairLens
                </p>
                <p className="text-xs text-text-tertiary">Premium audit operating system</p>
              </div>
            </button>

            <div className="mt-6 space-y-2">
              {navigation.map((item) => {
                const active = isNavActive(location.pathname, item.match);

                return (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    className={clsx(
                      'group flex items-center justify-between rounded-[22px] px-4 py-3 text-sm font-semibold transition duration-200',
                      active
                        ? 'bg-[linear-gradient(135deg,rgba(0,101,242,0.14),rgba(18,179,168,0.14))] text-text-primary shadow-[0_18px_40px_-28px_rgba(17,33,59,0.45)]'
                        : 'text-text-secondary hover:bg-white/58 hover:text-text-primary',
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={clsx(
                          'flex h-10 w-10 items-center justify-center rounded-[16px] border transition',
                          active
                            ? 'border-white/60 bg-white/72 shadow-[0_14px_30px_-20px_rgba(0,101,242,0.5)]'
                            : 'border-white/45 bg-white/46',
                        )}
                      >
                        <item.icon className="h-[1.125rem] w-[1.125rem]" />
                      </span>
                      {item.label}
                    </span>
                    <ArrowRight
                      className={clsx(
                        'h-4 w-4 transition duration-200',
                        active ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100',
                      )}
                    />
                  </NavLink>
                );
              })}
            </div>

            <div className="mt-6 rounded-[28px] border border-white/55 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,255,255,0.52))] p-4 shadow-[0_28px_70px_-40px_rgba(17,33,59,0.42)]">
              <div className="flex items-center justify-between">
                <Badge variant="accent">Live Workspace</Badge>
                <span className="h-2.5 w-2.5 rounded-full bg-success-500 shadow-[0_0_0_6px_rgba(24,171,113,0.16)]" />
              </div>

              <p className="mt-4 font-display text-[1.35rem] font-semibold tracking-[-0.05em] text-text-primary">
                Every fairness workflow in one surface.
              </p>
              <p className="mt-2 text-sm text-text-secondary">
                Intake, scanning, mitigation, simulation, and certification all share a single orchestration layer.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-[22px] border border-white/55 bg-white/60 p-3">
                  <p className="text-xs uppercase tracking-[0.24em] text-text-tertiary">Monitored</p>
                  <p className="mt-2 font-display text-2xl font-semibold tracking-[-0.05em] text-text-primary">
                    16
                  </p>
                  <p className="text-xs text-text-secondary">Protected attributes</p>
                </div>
                <div className="rounded-[22px] border border-white/55 bg-white/60 p-3">
                  <p className="text-xs uppercase tracking-[0.24em] text-text-tertiary">Mapped</p>
                  <p className="mt-2 font-display text-2xl font-semibold tracking-[-0.05em] text-text-primary">
                    4
                  </p>
                  <p className="text-xs text-text-secondary">Regulatory playbooks</p>
                </div>
              </div>

              <Button
                className="mt-5 w-full"
                onClick={() => navigate('/audit/new/upload')}
              >
                Launch Fresh Audit
                <Sparkles className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-6 rounded-[24px] border border-dashed border-white/55 bg-white/42 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-text-tertiary">Promise Layer</p>
              <p className="mt-2 text-sm font-semibold text-text-primary">
                Explainable, certifiable, and tuned for Global South contexts.
              </p>
              <p className="mt-2 text-sm text-text-secondary">
                FairLens translates bias scores into decisions non-technical teams can defend.
              </p>
            </div>
          </aside>

          <div className="space-y-6">
            <header className="glass-panel glass-panel-strong rounded-[32px] p-6 sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <Badge variant="neutral">{eyebrow}</Badge>
                  <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-[-0.08em] text-text-primary sm:text-5xl">
                    {title}
                  </h1>
                  <p className="mt-4 max-w-2xl text-base text-text-secondary sm:text-lg">
                    {description}
                  </p>
                </div>

                {actions ? (
                  <div className="flex flex-wrap items-center gap-3">{actions}</div>
                ) : null}
              </div>
            </header>

            <main className="space-y-6">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
