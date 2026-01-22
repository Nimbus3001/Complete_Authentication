
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../services/api';

interface LoginFormProps {
  onStatus: (text: string, type: 'success' | 'error' | 'neutral') => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onStatus }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !password) {
      onStatus('Missing credentials', 'error');
      return;
    }

    setIsLoading(true);
    onStatus('Authenticating...', 'neutral');
    
    try {
      const response = await loginUser(name, password);
      if (response.success) {
        onStatus(response.message, 'success');
      } else {
        onStatus(response.message, 'error');
      }
    } catch (err) {
      onStatus('CONNECTION INTERRUPTED', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <div className="space-y-2">
        <label className="block yellow-text text-sm uppercase font-bold tracking-widest">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-[#001a1a] border-b-2 border-[#00f5d4] p-3 text-[#00f5d4] focus:outline-none focus:bg-[#002a2a] transition-all"
          placeholder="••••••••"
          autoComplete="current-password"
        />
      </div>

      <div className="flex flex-col gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 mt-2 font-bold uppercase tracking-widest neon-button ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'ESTABLISHING LINK...' : 'EXECUTE LOGIN'}
        </button>

        <div className="flex justify-between items-center px-1">
          <Link
            to="/forgot-password"
            className="text-[10px] yellow-text uppercase tracking-widest hover:underline opacity-80"
          >
            [ Forgot Access Key? ]
          </Link>
          <Link
            to="/register"
            className="text-[10px] yellow-text uppercase tracking-widest hover:underline opacity-80"
          >
            [ Create New Identity ]
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
