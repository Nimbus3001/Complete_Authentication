
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';

const AppContent: React.FC = () => {
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' | 'neutral' } | null>(null);
  const [isSimulation, setIsSimulation] = useState(false);
  const location = useLocation();

  const handleStatus = (text: string, type: 'success' | 'error' | 'neutral') => {
    setStatusMessage({ text, type });
    if (text.includes('[SIMULATION]')) {
      setIsSimulation(true);
    } else {
      setIsSimulation(false);
    }
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/register': return 'New Identity Registration';
      case '/forgot-password': return 'Recovery Protocol';
      default: return 'System Authentication';
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#000a0a] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00f5d4] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#e9ff70] rounded-full blur-[120px]"></div>
      </div>

      {isSimulation && (
        <div className="absolute top-0 w-full bg-[#e9ff70] text-[#000] text-[10px] py-1 text-center font-bold tracking-[0.3em] uppercase z-50">
          Running in Simulation Mode: Backend (localhost:3000) is unreachable
        </div>
      )}

      {/* Header following the aesthetic style */}
      <header className="mb-12 text-center relative z-10">
        <h1 className="text-3xl md:text-5xl font-bold neon-glow tracking-widest uppercase">
          Codemania Admin Portal
        </h1>
        <div className="h-1 w-full mt-4 bg-gradient-to-r from-transparent via-[#00f5d4] to-transparent shadow-[0_0_10px_#00f5d4]"></div>
      </header>

      <main className="w-full max-w-md relative z-10">
        <div className="mb-6 flex flex-col gap-2">
           <h2 className="text-xl yellow-text uppercase tracking-wider font-bold yellow-glow">
            {getPageTitle()}
          </h2>
        </div>

        <div className="bg-[#001212]/90 border-2 neon-border rounded-md p-8 backdrop-blur-md shadow-[0_0_30px_rgba(0,245,212,0.1)]">
          <Routes>
            <Route path="/login" element={<LoginForm onStatus={handleStatus} />} />
            <Route path="/register" element={<RegisterForm onStatus={handleStatus} />} />
            <Route path="/forgot-password" element={<ForgotPasswordForm onStatus={handleStatus} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>

        {statusMessage && (
          <div className={`mt-6 p-4 text-center border font-bold uppercase tracking-tighter transition-all animate-pulse ${
            statusMessage.type === 'success' ? 'border-[#00f5d4] text-[#00f5d4] bg-[#00f5d4]/10' : 
            statusMessage.type === 'error' ? 'border-red-500 text-red-500 bg-red-500/10' : 
            'border-[#e9ff70] text-[#e9ff70] bg-[#e9ff70]/10'
          }`}>
            <span className="mr-2">&gt;&gt;</span>
            {statusMessage.text}
          </div>
        )}

        <footer className="mt-12 text-center opacity-40 text-xs uppercase tracking-[0.2em] yellow-text">
          &copy; 2025 CODEMANIA_OS // SECURITY_LEVEL_04
        </footer>
      </main>
    </div>
  );
};

const App: React.FC = () => (
  <HashRouter>
    <AppContent />
  </HashRouter>
);

export default App;
