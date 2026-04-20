import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Upload from './pages/NewAudit/Upload';
import Configure from './pages/NewAudit/Configure';
import ScanResults from './pages/NewAudit/ScanResults';
import SimulationStudio from './pages/SimulationStudio';
import FixWorkspace from './pages/FixWorkspace';
import Certificate from './pages/Certificate';
import Settings from './pages/Settings';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Landing />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* New Audit Flow */}
          <Route path="/audit/new/upload" element={<Upload />} />
          <Route path="/audit/new/configure" element={<Configure />} />

          {/* Audit Results & Actions */}
          <Route path="/audit/:auditId/results" element={<ScanResults />} />
          <Route path="/audit/:auditId/fix" element={<FixWorkspace />} />
          <Route path="/audit/:auditId/certificate" element={<Certificate />} />

          {/* Standalone Pages */}
          <Route path="/simulation" element={<SimulationStudio />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
