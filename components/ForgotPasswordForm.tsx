
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { resetPassword } from '../services/api';

interface ForgotPasswordFormProps {
  onStatus: (text: string, type: 'success' | 'error' | 'neutral') => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onStatus }) => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      onStatus('Identity identifier required', 'error');
      return;
    }

    setIsLoading(true);
    onStatus('Searching mainframe...', 'neutral');
    
    try {
      const response = await resetPassword(name);
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="text-xs text-[#00f5d4]/80 uppercase tracking-tighter leading-relaxed">
        Lost access keys? Enter your Identity ID to initiate remote recovery. A secure transmission will be dispatched to your linked neural uplink.
      </p>

      <div className="space-y-2">
        <label className="block yellow-text text-sm uppercase font-bold tracking-widest">
          User ID
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-[#001a1a] border-b-2 border-[#00f5d4] p-3 text-[#00f5d4] focus:outline-none focus:bg-[#002a2a] transition-all"
          placeholder="USER_NAME"
          autoComplete="username"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-4 mt-4 font-bold uppercase tracking-widest neon-button ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'TRANSMITTING...' : 'INITIATE RECOVERY'}
      </button>

      <div className="pt-4 text-center">
        <Link
          to="/login"
          className="text-xs yellow-text uppercase tracking-widest hover:underline opacity-80"
        >
          [ Return To Authentication ]
        </Link>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
