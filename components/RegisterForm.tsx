
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

interface RegisterFormProps {
  onStatus: (text: string, type: 'success' | 'error' | 'neutral') => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onStatus }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !password) {
      onStatus('All fields required', 'error');
      return;
    }

    setIsLoading(true);
    onStatus('Processing record...', 'neutral');

    try {
      const response = await registerUser(name, password);
      if (response.success) {
        onStatus(response.message, 'success');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        onStatus(response.message, 'error');
      }
    } catch (err) {
      onStatus('SERVER OFFLINE', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block yellow-text text-sm uppercase font-bold tracking-widest">
          New User ID
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-[#001a1a] border-b-2 border-[#00f5d4] p-3 text-[#00f5d4] focus:outline-none focus:bg-[#002a2a] transition-all"
          placeholder="NEW_NAME"
          autoComplete="username"
        />
      </div>

      <div className="space-y-2">
        <label className="block yellow-text text-sm uppercase font-bold tracking-widest">
          New Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-[#001a1a] border-b-2 border-[#00f5d4] p-3 text-[#00f5d4] focus:outline-none focus:bg-[#002a2a] transition-all"
          placeholder="••••••••"
          autoComplete="new-password"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-4 mt-4 font-bold uppercase tracking-widest neon-button ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'ENCRYPTING...' : 'REGISTER IDENTITY'}
      </button>

      <div className="pt-4 text-center">
        <Link
          to="/login"
          className="text-xs yellow-text uppercase tracking-widest hover:underline opacity-80"
        >
          [ Back To Main Portal ]
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
