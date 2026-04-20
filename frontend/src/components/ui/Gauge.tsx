import { useId } from 'react';
import { motion } from 'framer-motion';
import { getFairScoreColor } from '../../utils';

interface GaugeProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  showGrade?: boolean;
}

export default function Gauge({ score, size = 200, strokeWidth = 12, label = 'FairScore', showGrade = true }: GaugeProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const color = getFairScoreColor(score);
  const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 50 ? 'D' : 'F';
  const gradientId = useId().replace(/:/g, '');
  const glowId = `${gradientId}-glow`;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <div className="absolute inset-[16%] rounded-full border border-white/60 bg-white/58 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_30px_50px_-36px_rgba(17,33,59,0.5)] backdrop-blur-xl" />
        <svg width={size} height={size} className="-rotate-90 overflow-visible">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0065f2" />
              <stop offset="55%" stopColor="#12b3a8" />
              <stop offset="100%" stopColor="#67e2d0" />
            </linearGradient>
            <filter id={glowId}>
              <feGaussianBlur stdDeviation="4.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(17, 33, 59, 0.08)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            filter={`url(#${glowId})`}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - (score / 100) * circumference }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="font-display font-semibold tracking-[-0.08em]"
            style={{ fontSize: size * 0.24, color }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {Math.round(score)}
          </motion.span>
          {showGrade && (
            <motion.span
              className="rounded-full border border-white/55 bg-white/62 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-text-secondary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Grade {grade}
            </motion.span>
          )}
        </div>
      </div>
      <span className="text-sm font-semibold text-text-secondary">{label}</span>
    </div>
  );
}
