import React, { useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Home } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const { login, adminUsername, adminPassword } = useSite();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === adminUsername && password === adminPassword) {
      login();
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 relative">
      {/* Back to Home Button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center gap-3 text-primary hover:text-secondary transition group"
      >
        <div className="bg-white p-3 rounded-full shadow-lg group-hover:scale-110 transition-transform flex items-center justify-center">
          <Home size={24} />
        </div>
        <span className="font-bold text-lg hidden md:block shadow-sm">Back to Home</span>
      </Link>

      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold text-primary">Admin Portal</h2>
          <p className="text-gray-500">Janak Builders CMS</p>
        </div>
        
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm text-center">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full p-3 border rounded focus:ring-2 focus:ring-primary outline-none mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-3 border rounded focus:ring-2 focus:ring-primary outline-none mt-1"
            />
          </div>
          <button type="submit" className="w-full bg-primary text-white py-3 rounded font-bold hover:bg-blue-900 transition">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;