import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { BookType, Sparkles, MessageSquare, MonitorPlay, FileText, ShieldCheck } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen relative overflow-hidden font-sans" style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-primary)' }}>
      <Navbar />

      {/* Abstract Background Elements */}
      <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full blur-[150px] -z-10" style={{ backgroundColor: 'rgba(255, 107, 82, 0.15)' }}></div>
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] rounded-full blur-[180px] -z-10" style={{ backgroundColor: 'rgba(18, 31, 45, 0.8)' }}></div>

      {/* Hero Section */}
      <div className="pt-40 pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
          Supercharge Your Knowledge<br />
          With <span style={{ color: 'var(--primary-accent)' }}>NRN AI Tutor</span>.
        </h1>
        
        <p className="text-lg md:text-xl max-w-2xl mb-12" style={{ color: 'var(--text-secondary)' }}>
          Experience the world's most advanced autonomous tutor. From interactive multi-modal video explanations to dynamically generated courses controlled instantly from a master admin system.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/register" className="px-8 py-4 rounded-full font-bold text-lg shadow-[0_0_30px_rgba(255,107,82,0.3)] hover:-translate-y-1 transition-all" style={{ backgroundColor: 'var(--primary-accent)', color: 'var(--text-primary)' }}>
            Start Learning Free
          </Link>
          <Link to="/courses" className="px-8 py-4 rounded-full font-bold text-lg border hover:bg-white/5 transition-all" style={{ borderColor: 'var(--secondary-bg-color)' }}>
            Explore Course Library
          </Link>
        </div>
      </div>

      {/* Heavy Footer Section with Charcoal Grey Modern Dark style */}
      <footer className="py-20 border-t mt-auto relative z-10" style={{ borderColor: 'rgba(255,255,255,0.05)', backgroundColor: '#121212' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div className="flex flex-col gap-4 max-w-sm">
              <div className="flex items-center gap-3">
                <img src="/assets/logo.png" alt="NRN Logo" className="w-8 h-8 object-contain" />
                <span className="font-black text-2xl tracking-tighter uppercase" style={{ color: 'var(--text-primary)' }}>NRN Smart</span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Empowering the next generation of learners with autonomous AI tutoring systems. Explore, Learn, and Master any subject with NRN technical architecture.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 md:gap-20">
              <div className="flex flex-col gap-4">
                <h4 className="text-white font-bold text-sm uppercase tracking-widest">Platform</h4>
                <Link to="/" style={{ color: 'var(--text-secondary)' }} className="hover:text-red-400 text-sm transition-colors">Home</Link>
                <Link to="/courses" style={{ color: 'var(--text-secondary)' }} className="hover:text-red-400 text-sm transition-colors">Courses</Link>
                <Link to="/tutor" style={{ color: 'var(--text-secondary)' }} className="hover:text-red-400 text-sm transition-colors">AI Tutor</Link>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="text-white font-bold text-sm uppercase tracking-widest">Company</h4>
                <Link to="/about" style={{ color: 'var(--text-secondary)' }} className="hover:text-red-400 text-sm transition-colors">About Us</Link>
                <Link to="/facilities" style={{ color: 'var(--text-secondary)' }} className="hover:text-red-400 text-sm transition-colors">Facilities</Link>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="text-white font-bold text-sm uppercase tracking-widest">Support</h4>
                <span style={{ color: 'var(--text-secondary)' }} className="text-sm">Contact Support</span>
                <span style={{ color: 'var(--text-secondary)' }} className="text-sm">API Docs</span>
              </div>
            </div>
          </div>
          
          <div className="text-center pt-8 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)', color: '#4b5563' }}>
            <p className="text-xs font-medium tracking-wide">© 2026 NRN SMART LEARNING. ALL RIGHTS RESERVED. DESIGNED FOR AUTONOMOUS EDUCATION.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
