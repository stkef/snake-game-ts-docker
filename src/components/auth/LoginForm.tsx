import React, { useState } from 'react';
import { useUserStore } from '../../stores/userStore';
import { LogIn } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useUserStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }
    
    const success = login(username, password);
    if (!success) {
      setError('Invalid username or password');
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
        <label htmlFor="username" className="block text-sm font-medium mb-1">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter your username"
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter your password"
        />
      </div>
      
      <button
        type="submit"
        className="w-full flex items-center justify-center py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        <LogIn size={18} className="mr-2" />
        Sign In
      </button>
      
      <div className="text-center text-sm text-gray-400 pt-2">
        <p>Demo Accounts:</p>
        <p className="mt-1">Username: demo / Password: password</p>
      </div>
    </form>
  );
};

export default LoginForm;