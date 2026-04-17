import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  // Fetch authentication securely from local storage
  const userName = localStorage.getItem('nrn_user');
  const hasToken = localStorage.getItem('nrn_token') !== null;

  const handleLogout = () => {
    localStorage.removeItem('nrn_token');
    localStorage.removeItem('nrn_user');
    localStorage.removeItem('nrn_email');
    localStorage.removeItem('nrn_nrnid');
    navigate('/');
  };

  return (
    <nav style={{ backgroundColor: 'var(--nav-bg)', borderColor: 'var(--secondary-bg-color)' }} className="fixed top-0 w-full z-50 backdrop-blur-md border-b">
      {/* Changed px-6 to px-10 and adjusted max-w for extreme edge alignment */}
      <div className="w-full px-6 md:px-12 h-20 flex items-center justify-between">
        
        {/* Extreme Left: Brand Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/assets/logo.png" alt="NRN Logo" className="w-8 h-8 object-contain group-hover:rotate-12 transition-transform" />
            <span className="font-black text-xl tracking-wide uppercase" style={{ color: 'var(--text-primary)' }}>
              NRN Smart
            </span>
          </Link>
        </div>
        
        {/* Center: Navigation Links */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-8">
          <Link to="/" style={{ color: 'var(--text-secondary)' }} className="hover:text-white font-medium transition-colors">Home</Link>
          <Link to="/courses" style={{ color: 'var(--text-secondary)' }} className="hover:text-white font-medium transition-colors">Courses</Link>
          <Link to="/facilities" style={{ color: 'var(--text-secondary)' }} className="hover:text-white font-medium transition-colors">Facilities</Link>
          <Link to="/about" style={{ color: 'var(--text-secondary)' }} className="hover:text-white font-medium transition-colors">About Us</Link>
          {hasToken && (
            <Link to="/tutor" style={{ color: 'var(--text-secondary)' }} className="hover:text-white font-medium transition-colors">AI Tutor</Link>
          )}
        </div>

        {/* Extreme Right: Authentication / Profile */}
        <div className="flex-shrink-0 flex items-center gap-4">
          {hasToken ? (
            <div className="flex items-center gap-6">
              <Link to="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity" style={{ color: 'var(--primary-accent)' }}>
                <User size={18} />
                <span className="font-bold text-sm tracking-wide uppercase">{userName}</span>
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-medium hover:text-red-400 transition-colors" style={{ color: 'var(--text-secondary)' }}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" style={{ color: 'var(--text-primary)' }} className="text-sm font-bold opacity-80 hover:opacity-100 transition-opacity">
                Login
              </Link>
              <Link to="/register" style={{ backgroundColor: 'var(--primary-accent)', color: 'var(--text-primary)' }} className="px-5 py-2.5 rounded-full text-sm font-bold shadow-lg hover:brightness-110 transition-all hover:scale-105 active:scale-95">
                Register
              </Link>
            </div>
          )}
        </div>
        
      </div>
    </nav>
  );
}
