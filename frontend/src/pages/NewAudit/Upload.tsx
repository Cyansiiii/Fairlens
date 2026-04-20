import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload as UploadIcon, FileSpreadsheet, FileCode, X, ArrowRight, Shield, AlertTriangle } from 'lucide-react';
import { Card, Button, Badge } from '../../components/ui';
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
    maxSize: 2 * 1024 * 1024 * 1024, // 2GB
    multiple: false,
  });

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    // TODO: Phase 1 — Call uploadDataset API
    setTimeout(() => {
      navigate('/audit/new/configure');
    }, 1500);
  };

  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (ext === 'csv' || ext === 'xlsx') return FileSpreadsheet;
    return FileCode;
  };

  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Header */}
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-text-primary">FairLens</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-tertiary">
            <span className="text-primary-600 font-medium">1. Upload</span>
            <span>→</span>
            <span>2. Configure</span>
            <span>→</span>
            <span>3. Results</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-text-primary mb-2">Upload your dataset</h1>
          <p className="text-text-secondary mb-8">
            Drop a CSV, Excel spreadsheet, or ML model file. We'll auto-detect sensitive columns and scan for PII.
          </p>

          {/* Drop Zone */}
          <Card padding="none" className="mb-6">
            <div
              {...getRootProps()}
              className={`p-12 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all duration-200 ${
                isDragActive
                  ? 'border-primary-400 bg-primary-50'
                  : selectedFile
                  ? 'border-success-300 bg-success-50'
                  : 'border-border hover:border-primary-300 hover:bg-surface-tertiary'
              }`}
            >
              <input {...getInputProps()} />

              {selectedFile ? (
                <div className="flex flex-col items-center gap-3">
                  {(() => {
                    const Icon = getFileIcon(selectedFile.name);
                    return <Icon className="w-12 h-12 text-success-600" />;
                  })()}
                  <div>
                    <p className="font-semibold text-text-primary">{selectedFile.name}</p>
                    <p className="text-sm text-text-secondary">{formatFileSize(selectedFile.size)}</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                    className="text-sm text-text-tertiary hover:text-critical-600 flex items-center gap-1"
                  >
                    <X className="w-4 h-4" /> Remove
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center">
                    <UploadIcon className="w-8 h-8 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">
                      {isDragActive ? 'Drop your file here' : 'Drag & drop your file here'}
                    </p>
                    <p className="text-sm text-text-secondary mt-1">or click to browse</p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 mt-2">
                    {['CSV', 'XLSX', 'PKL', 'ONNX', 'JSON'].map((ext) => (
                      <Badge key={ext} variant="neutral">.{ext.toLowerCase()}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Info cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card padding="sm" className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-warning-50 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-4 h-4 text-warning-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">PII Detection</p>
                <p className="text-xs text-text-secondary">We automatically scan for emails, phone numbers, and Aadhaar patterns.</p>
              </div>
            </Card>
            <Card padding="sm" className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">Encrypted Storage</p>
                <p className="text-xs text-text-secondary">Files are encrypted with AES-256 at rest on Google Cloud Storage.</p>
              </div>
            </Card>
          </div>

          {/* Upload Button */}
          <div className="flex justify-end">
            <Button
              size="lg"
              disabled={!selectedFile}
              loading={uploading}
              onClick={handleUpload}
            >
              Upload & Continue
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
