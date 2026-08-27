import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { TrafficProvider } from './context/TrafficContext';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { NotificationToast } from './components/common/NotificationToast';

import { Dashboard } from './pages/Dashboard';
import { LiveTraffic } from './pages/LiveTraffic';
import { SignalControl } from './pages/SignalControl';
import { CctvMonitor } from './pages/CctvMonitor';
import { Incidents } from './pages/Incidents';
import { Vehicles } from './pages/Vehicles';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';

export const App = () => {
  return (
    <TrafficProvider>
      <Router>
        <div className="flex h-screen w-screen overflow-hidden bg-[#0a0e17] text-slate-100 antialiased selection:bg-blue-600 selection:text-white">
          {/* Permanent Left Sidebar */}
          <Sidebar />

          {/* Main Layout Area */}
          <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
            {/* Top Navigation Bar */}
            <Topbar />

            {/* Scrollable Main Content Container */}
            <main className="flex-1 overflow-y-auto px-6 py-6 min-w-0">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/live-traffic" element={<LiveTraffic />} />
                <Route path="/signal-control" element={<SignalControl />} />
                <Route path="/cctv" element={<CctvMonitor />} />
                <Route path="/analytics" element={<Dashboard />} />
                <Route path="/incidents" element={<Incidents />} />
                <Route path="/vehicles" element={<Vehicles />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>

          {/* Toast Notification Layer */}
          <NotificationToast />
        </div>
      </Router>
    </TrafficProvider>
  );
};

export default App;
