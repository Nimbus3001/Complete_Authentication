import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { resetPassword } from '../services/api.ts';

const h = React.createElement;

const ForgotPasswordForm = ({ onStatus }) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username) {
      onStatus('Username required', 'error');
      return;
    }

    setIsLoading(true);
    onStatus('Verifying user...', 'neutral');
    
    try {
      const response = await resetPassword(username);
      if (response.success) {
        onStatus('Reset link sent to your email', 'success');
      } else {
        onStatus(response.message, 'error');
      }
    } catch (err) {
      onStatus('Request failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return h('form', { onSubmit: handleSubmit, className: "space-y-6" },
    h('p', { className: "text-xs text-[#00f5d4]/80 uppercase tracking-tighter leading-relaxed" },
      "Enter your username below. We will send a secure password reset link to the email associated with your account."
    ),
    h('div', { className: "space-y-2" },
      h('label', { className: "block yellow-text text-sm uppercase font-bold tracking-widest" }, "Username"),
      h('input', {
        type: "text",
        value: username,
        onChange: (e) => setUsername(e.target.value),
        className: "w-full bg-[#001a1a] border-b-2 border-[#00f5d4] p-3 text-[#00f5d4] focus:outline-none focus:bg-[#002a2a] transition-all",
        placeholder: "Your username",
        autoComplete: "username"
      })
    ),
    h('button', {
      type: "submit",
      disabled: isLoading,
      className: `w-full py-4 mt-4 font-bold uppercase tracking-widest neon-button ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`
    }, isLoading ? 'Sending...' : 'Reset Password'),
    h('div', { className: "pt-4 text-center" },
      h(Link, {
        to: "/login",
        className: "text-xs yellow-text uppercase tracking-widest hover:underline opacity-80"
      }, "[ Return to Login ]")
    )
  );
};

export default ForgotPasswordForm;