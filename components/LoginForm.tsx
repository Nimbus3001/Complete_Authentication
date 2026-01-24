import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api.ts';

const h = React.createElement;

const LoginForm = ({ onStatus }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      onStatus('CREDENTIALS_REQUIRED', 'error');
      return;
    }

    setIsLoading(true);
    onStatus('INITIATING_HANDSHAKE...', 'neutral');
    
    try {
      const response = await loginUser(username, password);
      if (response.success) {
        onStatus(response.message, 'success');
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        onStatus(response.message, 'error');
      }
    } catch (err) {
      onStatus('TERMINAL_TIMEOUT: CONNECTION_LOST', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return h('form', { onSubmit: handleSubmit, className: "space-y-6" },
    h('div', { className: "space-y-2 group" },
      h('label', { className: "flex justify-between yellow-text text-[10px] uppercase font-bold tracking-widest opacity-80 group-focus-within:opacity-100 transition-opacity" },
        h('span', null, "IDENTITY_HANDLE"),
        h('span', { className: "opacity-40" }, "01")
      ),
      h('div', { className: "relative" },
        h('input', {
          type: "text",
          value: username,
          onChange: (e) => setUsername(e.target.value),
          className: "w-full bg-[#001a1a]/50 border-b-2 border-[#00f5d4]/30 p-4 text-[#00f5d4] focus:outline-none focus:border-[#00f5d4] focus:bg-[#002a2a]/50 transition-all font-mono text-sm",
          placeholder: "USER_NAME",
          autoComplete: "username"
        })
      )
    ),
    h('div', { className: "space-y-2 group" },
      h('label', { className: "flex justify-between yellow-text text-[10px] uppercase font-bold tracking-widest opacity-80 group-focus-within:opacity-100 transition-opacity" },
        h('span', null, "ENCRYPTION_KEY"),
        h('span', { className: "opacity-40" }, "02")
      ),
      h('div', { className: "relative" },
        h('input', {
          type: "password",
          value: password,
          onChange: (e) => setPassword(e.target.value),
          className: "w-full bg-[#001a1a]/50 border-b-2 border-[#00f5d4]/30 p-4 text-[#00f5d4] focus:outline-none focus:border-[#00f5d4] focus:bg-[#002a2a]/50 transition-all font-mono text-sm",
          placeholder: "••••••••",
          autoComplete: "current-password"
        })
      )
    ),
    h('div', { className: "flex flex-col gap-6 pt-2" },
      h('button', {
        type: "submit",
        disabled: isLoading,
        className: `w-full py-5 font-bold uppercase tracking-[0.3em] neon-button text-xs ${isLoading ? 'opacity-50 cursor-wait' : ''}`
      }, isLoading ? 'DECRYPTING_UPLINK...' : 'AUTHORIZE_ACCESS'),
      h('div', { className: "flex flex-col gap-3" },
        h(Link, {
          to: "/forgot-password",
          className: "text-[9px] yellow-text uppercase tracking-[0.2em] hover:text-white transition-colors flex items-center gap-2"
        }, h('span', { className: "opacity-40" }, ">"), " RECOVER_LOST_IDENTITY"),
        h(Link, {
          to: "/register",
          className: "text-[9px] yellow-text uppercase tracking-[0.2em] hover:text-white transition-colors flex items-center gap-2"
        }, h('span', { className: "opacity-40" }, ">"), " GENERATE_NEW_PROTOCOL")
      )
    )
  );
};

export default LoginForm;