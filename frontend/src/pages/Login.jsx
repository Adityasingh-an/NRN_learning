import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const [uniqueId, setUniqueId] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nrn_id: uniqueId, password: password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Save the JWT token in localStorage for secure authenticated api calls later
        localStorage.setItem("nrn_token", data.access_token);
        localStorage.setItem("nrn_user", data.full_name);
        if (data.email) localStorage.setItem("nrn_email", data.email);
        localStorage.setItem("nrn_nrnid", data.nrn_id); // store ID as well for dashboard
        navigate('/tutor');
      } else {
        alert("Login failed: " + data.detail);
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to server. Is the backend running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white flex items-center justify-center p-6 relative overflow-hidden" style={{ backgroundColor: 'var(--background-color)' }}>
      {/* Ambience */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[100px] -z-10 pointer-events-none" style={{ backgroundColor: 'rgba(255, 107, 82, 0.15)' }}></div>
      
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 transition-opacity hover:opacity-100" style={{ color: 'var(--text-secondary)' }}>
        <img src="/assets/logo.png" alt="NRN Logo" className="w-6 h-6 object-contain" />
        <span className="font-bold tracking-wide" style={{ color: 'var(--text-primary)' }}>NRN Smart</span>
      </Link>

      <div className="w-full max-w-md p-8 md:p-12 rounded-[2rem] border shadow-2xl relative" style={{ backgroundColor: 'var(--secondary-bg-color)', borderColor: 'rgba(255,255,255,0.05)' }}>
        <h2 className="text-3xl font-extrabold mb-2">Welcome Back</h2>
        <p className="text-zinc-500 mb-8">Enter your Unique NRN ID to continue learning.</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Unique ID</label>
            <input 
              type="text" 
              value={uniqueId}
              onChange={(e) => setUniqueId(e.target.value)}
              required
              className="w-full border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors"
              style={{ backgroundColor: 'var(--background-color)', borderColor: 'rgba(255,255,255,0.1)' }}
              placeholder="e.g. NRN-8472-A"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors"
              style={{ backgroundColor: 'var(--background-color)', borderColor: 'rgba(255,255,255,0.1)' }}
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full mt-4 py-4 rounded-xl font-bold shadow-[0_0_20px_rgba(255,107,82,0.4)] transition-all flex items-center justify-center gap-2 group hover:-translate-y-1"
            style={{ backgroundColor: 'var(--primary-accent)', color: 'var(--text-primary)' }}
          >
            Access Dashboard <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-zinc-500">
          Don't have an ID?{' '}
          <Link to="/register" className="text-orange-400 hover:text-orange-300 font-medium ml-1">
            Register your account
          </Link>
        </div>
      </div>
    </div>
  );
}
