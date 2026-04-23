import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [generatedId, setGeneratedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: name, email: email, password: password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setGeneratedId(data.nrn_id);
      } else {
        alert("Registration failed: " + data.detail);
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to server. Is the backend running?");
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen text-white flex items-center justify-center p-6 relative overflow-hidden" style={{ backgroundColor: 'var(--background-color)' }}>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-[100px] -z-10 pointer-events-none" style={{ backgroundColor: 'rgba(255, 107, 82, 0.15)' }}></div>
      
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 hover:opacity-100 transition-opacity" style={{ color: 'var(--text-secondary)' }}>
        <img src="/assets/logo.png" alt="NRN Logo" className="w-6 h-6 object-contain" />
        <span className="font-bold tracking-wide" style={{ color: 'var(--text-primary)' }}>NRN Smart</span>
      </Link>

      <div className="w-full max-w-md p-8 md:p-12 rounded-[2rem] border shadow-2xl relative" style={{ backgroundColor: 'var(--secondary-bg-color)', borderColor: 'rgba(255,255,255,0.05)' }}>
        {!generatedId ? (
          <>
            <h2 className="text-3xl font-extrabold mb-2">Create Account</h2>
            <p className="text-zinc-500 mb-8">We will securely generate a unique NRN ID for your profile.</p>

            <form onSubmit={handleRegister} className="flex flex-col gap-5">
              <div>
                <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors"
                  style={{ backgroundColor: 'var(--background-color)', borderColor: 'rgba(255,255,255,0.1)' }}
                  placeholder="Name"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors"
                  style={{ backgroundColor: 'var(--background-color)', borderColor: 'rgba(255,255,255,0.1)' }}
                  placeholder="Name12@example.com"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Create Password</label>
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
                disabled={isLoading}
                className="w-full mt-4 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 hover:-translate-y-1"
                style={{ backgroundColor: 'var(--primary-accent)', color: 'var(--text-primary)' }}
              >
                {isLoading ? <Loader2 className="animate-spin" /> : "Generate My NRN ID"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6 animate-in fade-in zoom-in">
            <div className="w-20 h-20 bg-green-500/20 border border-green-500/50 rounded-full flex items-center justify-center mx-auto mb-6">
               <img src="/assets/logo.png" alt="NRN Success" className="w-10 h-10 object-contain" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Registration Complete</h2>
            <p className="text-zinc-400 mb-6">Store this Unique ID somewhere safe. You will need it to login.</p>
            
            <div className="bg-black border border-zinc-700 rounded-xl p-4 mb-8">
              <span className="text-sm text-zinc-500 block mb-1">Your Unique ID:</span>
              <span className="text-3xl font-mono font-bold text-orange-400 tracking-wider select-all">{generatedId}</span>
            </div>

            <button 
              onClick={handleContinue}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-400 hover:to-rose-500 text-white font-bold shadow-[0_0_20px_rgba(225,29,72,0.4)] transition-all"
            >
              Enter The Platform
            </button>
          </div>
        )}

        {!generatedId && (
          <div className="mt-8 text-center text-sm text-zinc-500">
            Already have an ID?{' '}
            <Link to="/login" className="text-white hover:text-orange-400 font-medium ml-1 transition-colors">
              Login here
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
