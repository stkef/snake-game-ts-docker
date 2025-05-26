import React, { useState } from 'react';
import { useUserStore } from '../../stores/userStore';
import { UserPlus } from 'lucide-react';

interface RegisterFormProps {
  onSuccess: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { register } = useUserStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Please fill in all fields');
      return;
    }
    
    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    const success = register(username, password);
    if (success) {
      onSuccess();
    } else {
      setError('Username already exists');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="register-username" className="block text-sm font-medium mb-1">
          Username
        </label>
        <input
          type="text"
          id="register-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Choose a username"
        />
      </div>
      
      <div>
        <label htmlFor="register-password" className="block text-sm font-medium mb-1">
          Password
        </label>
        <input
          type="password"
          id="register-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Choose a password"
        />
      </div>
      
      <div>
        <label htmlFor="confirm-password" className="block text-sm font-medium mb-1">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Confirm your password"
        />
      </div>
      
      <button
        type="submit"
        className="w-full flex items-center justify-center py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        <UserPlus size={18} className="mr-2" />
        Create Account
      </button>
    </form>
  );
};

export default RegisterForm;