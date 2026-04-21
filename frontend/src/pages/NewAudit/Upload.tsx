import { useCallback, useState } from 'react';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  FileCode,
  FileSpreadsheet,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Upload as UploadIcon,
  X,
} from 'lucide-react';

import AppShell from '../../components/premium/AppShell';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { formatFileSize } from '../../utils';

const ACCEPTED_TYPES = {
  'text/csv': ['.csv'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  'application/octet-stream': ['.pkl', '.onnx'],
  'application/json': ['.json'],
};

export default function UploadPage() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxSize: 2 * 1024 * 1024 * 1024,
    multiple: false,
  });

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }

    setUploading(true);
    setTimeout(() => {
      navigate('/audit/new/configure');
    }, 1200);
  };

  const FileIcon = selectedFile?.name.endsWith('.csv') || selectedFile?.name.endsWith('.xlsx')
    ? FileSpreadsheet
    : FileCode;

  return (
    <AppShell
      eyebrow="New Audit - Step 1 of 3"
      title="Bring in the dataset or model you want to challenge."
      description="The redesigned intake surface makes uploads feel deliberate: secure, legible, and ready for a premium audit workflow."
      actions={(
        <>
          <Badge variant="accent" size="md">
            2 GB upload limit
          </Badge>
          <Button variant="secondary" size="lg" onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </Button>
        </>
      )}
    >
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <Card className="rounded-[34px] overflow-hidden p-0">
          <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative flex flex-col p-6 sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,101,242,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(18,179,168,0.1),transparent_30%)]" />
              <div className="relative flex flex-1 flex-col">
                <div className="flex items-center justify-between">
                  <Badge variant="accent">Secure Intake</Badge>
                  <ShieldCheck className="h-5 w-5 text-accent-600" />
                </div>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.07em] text-text-primary">
                  Drop the asset. FairLens handles the staging.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-text-secondary">
                  Upload a dataset, model artifact, or fairness evidence package. The intake layer validates the file type, prepares the schema preview, and routes you into configuration.
                </p>

                <div
                  {...getRootProps()}
                  className={clsx(
                    'mt-8 flex flex-1 cursor-pointer flex-col items-center justify-center rounded-[30px] border border-dashed p-6 transition duration-300',
                    isDragActive
                      ? 'border-primary-300 bg-primary-50/60 shadow-[0_24px_60px_-34px_rgba(0,101,242,0.42)]'
                      : 'theme-surface-dashed theme-surface-hover',
                  )}
                >
                  <input {...getInputProps()} />

                  {!selectedFile ? (
                    <div className="flex min-h-[18rem] flex-col items-center justify-center text-center">
                      <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[24px] gradient-primary shadow-[0_24px_56px_-26px_rgba(0,101,242,0.82)]">
                        <UploadIcon className="h-8 w-8 text-white" />
                      </div>
                      <p className="mt-6 font-display text-2xl font-semibold tracking-[-0.06em] text-text-primary">
                        {isDragActive ? 'Release to stage your file' : 'Drag, drop, or browse your audit asset'}
                      </p>
                      <p className="mt-3 max-w-md text-sm leading-7 text-text-secondary">
                        CSV, XLSX, PKL, ONNX, and JSON are supported. The new upload surface is tuned to feel like a polished SaaS console, not a generic dropzone.
                      </p>
                      <div className="mt-6 flex flex-wrap justify-center gap-2">
                        {['CSV', 'XLSX', 'PKL', 'ONNX', 'JSON'].map((ext) => (
                          <span key={ext} className="glass-chip rounded-full px-3 py-1.5 text-xs font-semibold text-text-secondary">
                            .{ext.toLowerCase()}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="theme-surface rounded-[26px] p-5">
                      <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-[20px] gradient-primary text-white">
                          <FileIcon className="h-7 w-7" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="truncate font-semibold text-text-primary">{selectedFile.name}</p>
                              <p className="mt-1 text-sm text-text-secondary">
                                {formatFileSize(selectedFile.size)} - staged for configuration
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                setSelectedFile(null);
                              }}
                              className="button-ghost flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition hover:text-text-primary"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="mt-5 grid gap-3 sm:grid-cols-3">
                            {[
                              { label: 'Schema preview', value: 'Ready' },
                              { label: 'PII scan', value: 'Queued' },
                              { label: 'Encryption', value: 'Active' },
                            ].map((item) => (
                              <div
                                key={item.label}
                                className="theme-surface-soft rounded-[18px] px-3 py-3"
                              >
                                <p className="text-xs uppercase tracking-[0.22em] text-text-tertiary">{item.label}</p>
                                <p className="mt-2 text-sm font-semibold text-text-primary">{item.value}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-[var(--surface-card-border)] bg-[var(--surface-card-bg-strong)] p-6 sm:p-8 lg:border-l lg:border-t-0">
              <Badge variant="neutral">Before you continue</Badge>
              <div className="mt-5 space-y-4">
                {[
                  {
                    icon: LockKeyhole,
                    title: 'Encrypted staging',
                    description: 'Uploads are represented as protected assets before the audit engine touches them.',
                  },
                  {
                    icon: AlertTriangle,
                    title: 'PII guardrails',
                    description: 'FairLens flags direct identifiers so the team can redact or justify them early.',
                  },
                  {
                    icon: Sparkles,
                    title: 'AI-assisted setup',
                    description: 'The next step pre-populates sensitive attributes and target columns to reduce friction.',
                  },
                ].map((item) => (
                  <div key={item.title} className="theme-surface rounded-[24px] p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-[18px] bg-primary-50 text-primary-600">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <p className="font-semibold text-text-primary">{item.title}</p>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-text-secondary">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="theme-surface-dashed mt-5 rounded-[24px] p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-text-tertiary">Suggested payloads</p>
                <p className="mt-2 text-sm text-text-secondary">
                  Hiring outcomes, lending approvals, triage decisions, and feature importance exports all work well with this flow.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </motion.section>

      <div className="flex justify-end">
        <Button size="lg" disabled={!selectedFile} loading={uploading} onClick={handleUpload}>
          Upload and Continue
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </AppShell>
  );
}
