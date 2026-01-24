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
      onStatus('Identity identifier required', 'error');
      return;
    }

    setIsLoading(true);
    onStatus('Searching mainframe...', 'neutral');
    
    try {
      const response = await resetPassword(username);
      if (response.success) {
        onStatus(response.message, 'success');
      } else {
        onStatus(response.message, 'error');
      }
    } catch (err) {
      onStatus('SIGNAL DEGRADED', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return h('form', { onSubmit: handleSubmit, className: "space-y-6" },
    h('p', { className: "text-xs text-[#00f5d4]/80 uppercase tracking-tighter leading-relaxed" },
      "Lost access keys? Enter your Username to initiate remote recovery. A secure transmission will be dispatched to your linked neural uplink."
    ),
    h('div', { className: "space-y-2" },
      h('label', { className: "block yellow-text text-sm uppercase font-bold tracking-widest" }, "Username"),
      h('input', {
        type: "text",
        value: username,
        onChange: (e) => setUsername(e.target.value),
        className: "w-full bg-[#001a1a] border-b-2 border-[#00f5d4] p-3 text-[#00f5d4] focus:outline-none focus:bg-[#002a2a] transition-all",
        placeholder: "USER_NAME",
        autoComplete: "username"
      })
    ),
    h('button', {
      type: "submit",
      disabled: isLoading,
      className: `w-full py-4 mt-4 font-bold uppercase tracking-widest neon-button ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`
    }, isLoading ? 'TRANSMITTING...' : 'INITIATE RECOVERY'),
    h('div', { className: "pt-4 text-center" },
      h(Link, {
        to: "/login",
        className: "text-xs yellow-text uppercase tracking-widest hover:underline opacity-80"
      }, "[ Return To Authentication ]")
    )
  );
};

export default ForgotPasswordForm;