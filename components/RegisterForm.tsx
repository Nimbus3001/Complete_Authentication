import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api.ts';

const h = React.createElement;

const RegisterForm = ({ onStatus }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      onStatus('Username and password required', 'error');
      return;
    }

    setIsLoading(true);
    onStatus('Creating account...', 'neutral');

    try {
      const response = await registerUser(username, password);
      if (response.success) {
        onStatus('Account created successfully', 'success');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        onStatus(response.message, 'error');
      }
    } catch (err) {
      onStatus('Registration failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return h('form', { onSubmit: handleSubmit, className: "space-y-6" },
    h('div', { className: "space-y-2 group" },
      h('label', { className: "flex justify-between yellow-text text-[10px] uppercase font-bold tracking-widest opacity-80 group-focus-within:opacity-100" },
        h('span', null, "Choose Username"),
        h('span', { className: "opacity-40" }, "01")
      ),
      h('input', {
        type: "text",
        value: username,
        onChange: (e) => setUsername(e.target.value),
        className: "w-full bg-[#001a1a]/50 border-b-2 border-[#00f5d4]/30 p-4 text-[#00f5d4] focus:outline-none focus:border-[#00f5d4] transition-all font-mono text-sm",
        placeholder: "Username",
        autoComplete: "username"
      })
    ),
    h('div', { className: "space-y-2 group" },
      h('label', { className: "flex justify-between yellow-text text-[10px] uppercase font-bold tracking-widest opacity-80 group-focus-within:opacity-100" },
        h('span', null, "Set Password"),
        h('span', { className: "opacity-40" }, "02")
      ),
      h('input', {
        type: "password",
        value: password,
        onChange: (e) => setPassword(e.target.value),
        className: "w-full bg-[#001a1a]/50 border-b-2 border-[#00f5d4]/30 p-4 text-[#00f5d4] focus:outline-none focus:border-[#00f5d4] transition-all font-mono text-sm",
        placeholder: "Password",
        autoComplete: "new-password"
      })
    ),
    h('button', {
      type: "submit",
      disabled: isLoading,
      className: `w-full py-5 mt-4 font-bold uppercase tracking-[0.3em] neon-button text-xs ${isLoading ? 'opacity-50 cursor-wait' : ''}`
    }, isLoading ? 'Registering...' : 'Create Account'),
    h('div', { className: "pt-4 text-center" },
      h(Link, {
        to: "/login",
        className: "text-[9px] yellow-text uppercase tracking-[0.2em] hover:text-white transition-colors"
      }, "[ Back to Login ]")
    )
  );
};

export default RegisterForm;