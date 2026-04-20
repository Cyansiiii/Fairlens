import type { RiskLevel, Grade, Severity } from '../types';

/**
 * Get the color class for a FairScore value
 */
export function getFairScoreColor(score: number): string {
  if (score >= 80) return 'var(--color-success-600)';
  if (score >= 50) return 'var(--color-warning-600)';
  return 'var(--color-critical-600)';
}

export function getFairScoreColorClass(score: number): string {
  if (score >= 80) return 'text-success-600';
  if (score >= 50) return 'text-warning-600';
  return 'text-critical-600';
}

export function getFairScoreBgClass(score: number): string {
  if (score >= 80) return 'bg-success-50';
  if (score >= 50) return 'bg-warning-50';
  return 'bg-critical-50';
}

export function getGradeFromScore(score: number): Grade {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 50) return 'D';
  return 'F';
}

export function getRiskLevel(score: number): RiskLevel {
  if (score >= 80) return 'low';
  if (score >= 50) return 'medium';
  if (score >= 30) return 'high';
  return 'critical';
}

export function getSeverityColor(severity: Severity): string {
  switch (severity) {
    case 'critical': return 'var(--color-critical-600)';
    case 'high': return 'var(--color-critical-500)';
    case 'medium': return 'var(--color-warning-600)';
    case 'low': return 'var(--color-success-600)';
  }
}

export function getSeverityBadgeClass(severity: Severity): string {
  switch (severity) {
    case 'critical': return 'bg-critical-100 text-critical-700';
    case 'high': return 'bg-critical-50 text-critical-600';
    case 'medium': return 'bg-warning-100 text-warning-700';
    case 'low': return 'bg-success-100 text-success-700';
  }
}

export function formatMetricValue(value: number): string {
  return (value * 100).toFixed(1) + '%';
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
