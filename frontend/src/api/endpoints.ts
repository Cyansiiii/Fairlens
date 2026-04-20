import { api } from './client';
import type {
  UploadResponse,
  AuditConfigureRequest,
  ScanTriggerResponse,
  ScanResultsResponse,
  AuditResponse,
  SimulationRequest,
  SimulationResponse,
  MitigationOption,
  ApplyFixRequest,
  ApplyFixResponse,
  CertificateResponse,
} from '../types';

// Audits
export const uploadDataset = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await api.post('/audits/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const configureAudit = async (auditId: string, config: AuditConfigureRequest) => {
  const { data } = await api.post(`/audits/${auditId}/configure`, config);
  return data;
};

export const triggerScan = async (auditId: string): Promise<ScanTriggerResponse> => {
  const { data } = await api.post(`/audits/${auditId}/scan`);
  return data;
};

export const getScanResults = async (auditId: string): Promise<ScanResultsResponse> => {
  const { data } = await api.get(`/audits/${auditId}/results`);
  return data;
};

export const listAudits = async (page = 1, pageSize = 20): Promise<{ audits: AuditResponse[]; total: number }> => {
  const { data } = await api.get('/audits', { params: { page, page_size: pageSize } });
  return data;
};

// Chat
export const sendChatMessage = async (auditId: string, message: string) => {
  const { data } = await api.post(`/audits/${auditId}/chat`, { message });
  return data;
};

// Simulation
export const runSimulation = async (auditId: string, request: SimulationRequest): Promise<SimulationResponse> => {
  const { data } = await api.post(`/audits/${auditId}/simulate`, request);
  return data;
};

// Mitigations
export const getMitigations = async (auditId: string): Promise<{ mitigations: MitigationOption[] }> => {
  const { data } = await api.get(`/audits/${auditId}/mitigations`);
  return data;
};

export const applyFix = async (auditId: string, request: ApplyFixRequest): Promise<ApplyFixResponse> => {
  const { data } = await api.post(`/audits/${auditId}/apply-fix`, request);
  return data;
};

// Certificate
export const getCertificate = async (auditId: string): Promise<CertificateResponse> => {
  const { data } = await api.get(`/audits/${auditId}/certificate`);
  return data;
};

// Health
export const healthCheck = async () => {
  const { data } = await api.get('/health');
  return data;
};
