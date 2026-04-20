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

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="var(--color-surface-tertiary)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Score arc */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - (score / 100) * circumference }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
          />
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="font-mono font-bold"
            style={{ fontSize: size * 0.22, color }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {Math.round(score)}
          </motion.span>
          {showGrade && (
            <motion.span
              className="text-sm font-semibold text-text-secondary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Grade {grade}
            </motion.span>
          )}
        </div>
      </div>
      <span className="text-sm font-medium text-text-secondary">{label}</span>
    </div>
  );
}
