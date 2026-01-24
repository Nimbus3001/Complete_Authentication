import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm.tsx';
import RegisterForm from './components/RegisterForm.tsx';
import ForgotPasswordForm from './components/ForgotPasswordForm.tsx';

const h = React.createElement;

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('codemania_auth_token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('codemania_auth_token');
    navigate('/login');
  };

  if (!token) return null;

  return h('div', { className: "space-y-6 text-center" },
    h('div', { className: "p-6 border border-[#00f5d4]/30 bg-[#001a1a]/40 rounded" },
      h('h2', { className: "text-2xl font-bold yellow-text neon-glow mb-4 uppercase italic" }, "ACCESS GRANTED"),
      h('p', { className: "text-xs opacity-80 leading-relaxed mb-6" },
        "Welcome back, Administrator. You are now logged into the Codemania secure portal."
      ),
      h('div', { className: "grid grid-cols-2 gap-4 text-[10px] uppercase tracking-widest text-left mb-8" },
        h('div', { className: "p-2 bg-black/40 border-l-2 border-[#00f5d4]" }, "Status: Online"),
        h('div', { className: "p-2 bg-black/40 border-l-2 border-[#e9ff70]" }, "Secure: Yes")
      ),
      h('button', { 
        onClick: handleLogout,
        className: "w-full py-3 bg-red-500/20 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-all text-xs font-bold uppercase tracking-widest"
      }, "Log Out")
    )
  );
};

const AppContent = () => {
  const [statusMessage, setStatusMessage] = useState(null);
  const [isSimulation, setIsSimulation] = useState(false);
  const location = useLocation();

  const handleStatus = (text, type) => {
    setStatusMessage({ text, type });
    if (text && text.includes('OFFLINE')) {
      setIsSimulation(true);
    } else {
      setIsSimulation(false);
    }
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/register') return 'User Registration';
    if (path === '/forgot-password') return 'Reset Password';
    if (path === '/dashboard') return 'Admin Dashboard';
    return 'Secure Portal Login';
  };

  return h('div', { className: "min-h-screen flex flex-col items-center justify-center p-4 relative z-10" },
    isSimulation && h('div', { className: "fixed top-0 w-full bg-[#e9ff70] text-[#000] text-[10px] py-1 text-center font-bold tracking-[0.3em] uppercase z-50 shadow-[0_0_20px_#e9ff70]" },
      "RUNNING IN OFFLINE SIMULATION MODE"
    ),
    h('header', { className: "mb-10 text-center relative" },
      h('div', { className: "absolute -top-10 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none whitespace-nowrap overflow-hidden" },
        h('span', { className: "text-8xl font-black text-[#00f5d4]" }, "CODEMANIA")
      ),
      h('h1', { className: "text-4xl md:text-6xl font-bold neon-glow tracking-tighter uppercase italic" },
        "CODE", h('span', { className: "yellow-text" }, "MANIA")
      )
    ),
    h('main', { className: "w-full max-w-md" },
      h('div', { className: "mb-3 flex justify-between items-end px-1" },
        h('h2', { className: "text-[10px] yellow-text uppercase tracking-[0.2em] font-bold yellow-glow" }, getPageTitle()),
        h('span', { className: "text-[8px] opacity-40 font-mono" }, "ID: 0x7F2A")
      ),
      h('div', { className: "bg-[#001212]/90 neon-border rounded-sm p-8 backdrop-blur-xl" },
        h(Routes, null,
          h(Route, { path: "/login", element: h(LoginForm, { onStatus: handleStatus }) }),
          h(Route, { path: "/register", element: h(RegisterForm, { onStatus: handleStatus }) }),
          h(Route, { path: "/forgot-password", element: h(ForgotPasswordForm, { onStatus: handleStatus }) }),
          h(Route, { path: "/dashboard", element: h(Dashboard, null) }),
          h(Route, { path: "*", element: h(Navigate, { to: "/login", replace: true }) })
        )
      ),
      h('div', { className: "min-h-[60px]" },
        statusMessage && h('div', { 
          className: `mt-6 p-4 text-[10px] text-center border-l-4 font-bold uppercase tracking-widest transition-all duration-300 ${
            statusMessage.type === 'success' ? 'border-[#00f5d4] text-[#00f5d4] bg-[#00f5d4]/5' : 
            statusMessage.type === 'error' ? 'border-red-500 text-red-500 bg-red-500/5' : 
            'border-[#e9ff70] text-[#e9ff70] bg-[#e9ff70]/5'
          }`
        }, statusMessage.text)
      ),
      h('footer', { className: "mt-12 flex justify-between items-center opacity-30 text-[8px] uppercase tracking-[0.2em]" },
        h('span', null, "© 2025 CODEMANIA CORP"),
        h('span', null, "SECURE TERMINAL")
      )
    )
  );
};

const App = () => {
  return h(HashRouter, null, h(AppContent, null));
};

export default App;