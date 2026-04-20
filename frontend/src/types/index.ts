/* ======================================================================
   FairLens TypeScript Interfaces — Mirrors Pydantic Backend Models
   ====================================================================== */

// Enums
export type RegulatoryFramework = 'eu_ai_act' | 'india_dpdp' | 'nyc_ll144' | 'all';
export type AuditStatus = 'uploaded' | 'configured' | 'scanning' | 'completed' | 'failed';
export type Severity = 'critical' | 'high' | 'medium' | 'low';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type Grade = 'A' | 'B' | 'C' | 'D' | 'F';

// Audit
export interface UploadResponse {
  audit_id: string;
  filename: string;
  file_size: number;
  preview_rows: Record<string, unknown>[];
  detected_sensitive_columns: string[];
  column_types: Record<string, string>;
}

export interface AuditConfigureRequest {
  sensitive_attributes: string[];
  target_column: string;
  regulatory_framework: RegulatoryFramework;
  metric_thresholds?: Record<string, number>;
}

export interface AuditResponse {
  audit_id: string;
  filename: string;
  status: AuditStatus;
  fair_score?: number;
  created_at: string;
  updated_at?: string;
}

// FairScore
export interface FairScoreBreakdown {
  representation: number;
  individual_fairness: number;
  group_fairness: number;
  counterfactual_fairness: number;
}

export interface FairScoreResult {
  overall_score: number;
  grade: Grade;
  breakdown: FairScoreBreakdown;
  risk_level: RiskLevel;
}

// Scan
export interface MetricResult {
  metric_name: string;
  value: number;
  threshold: number;
  passed: boolean;
  severity: Severity;
  description: string;
  affected_groups: string[];
}

export interface BiasFlag {
  flag_id: string;
  metric_name: string;
  severity: Severity;
  description: string;
  affected_attribute: string;
  affected_groups: string[];
  recommendation: string;
}

export interface ScanSummary {
  total_metrics: number;
  passed: number;
  failed: number;
  critical_flags: number;
  high_flags: number;
}

export interface ScanTriggerResponse {
  audit_id: string;
  task_id: string;
  status: string;
}

export interface ScanResultsResponse {
  audit_id: string;
  fair_score: number;
  grade: Grade;
  risk_level: RiskLevel;
  summary: ScanSummary;
  metrics: MetricResult[];
  bias_flags: BiasFlag[];
  demographic_breakdown: Record<string, unknown>;
}

// Simulation
export interface SimulationRequest {
  attribute: string;
  n_pairs: number;
}

export interface SimulationPair {
  pair_id: string;
  original_record: Record<string, unknown>;
  modified_record: Record<string, unknown>;
  original_prediction: number;
  modified_prediction: number;
  prediction_delta: number;
}

export interface SimulationResponse {
  audit_id: string;
  attribute: string;
  n_pairs: number;
  discrimination_gap: number;
  pairs: SimulationPair[];
  statistically_significant: boolean;
  p_value: number;
}

// Chat
export interface ChatRequest {
  message: string;
  conversation_id?: string;
}

export interface ToolCallDisplay {
  tool_name: string;
  tool_input: Record<string, unknown>;
  tool_output?: Record<string, unknown>;
  status: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  tool_calls?: ToolCallDisplay[];
  suggested_prompts?: string[];
  timestamp: Date;
}

// Mitigation
export interface MitigationOption {
  mitigation_id: string;
  name: string;
  technique_type: string;
  description: string;
  projected_fair_score: number;
  accuracy_tradeoff: number;
  target_bias_flags: string[];
}

export interface ApplyFixRequest {
  mitigation_id: string;
}

export interface ApplyFixResponse {
  audit_id: string;
  mitigation_id: string;
  previous_fair_score: number;
  new_fair_score: number;
  accuracy_change: number;
  status: string;
}

// Certificate
export interface CertificateResponse {
  audit_id: string;
  fair_score: number;
  grade: Grade;
  risk_level: RiskLevel;
  issued_at: string;
  methodology_hash: string;
  breakdown: FairScoreBreakdown;
  compliance: ComplianceChecklist;
  biases_detected: BiasDetected[];
  mitigations_applied: MitigationApplied[];
  pdf_url?: string;
  badge_svg?: string;
}

export interface ComplianceCheck {
  framework: string;
  article: string;
  description: string;
  status: 'passed' | 'failed' | 'partial';
  details: string;
}

export interface ComplianceChecklist {
  eu_ai_act: ComplianceCheck[];
  india_dpdp: ComplianceCheck[];
  nyc_ll144: ComplianceCheck[];
}

export interface BiasDetected {
  metric_name: string;
  severity: Severity;
  description: string;
  affected_groups: string[];
}

export interface MitigationApplied {
  name: string;
  technique_type: string;
  before_score: number;
  after_score: number;
}

// User
export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}
