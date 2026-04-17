import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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

      <Footer />
    </div>
  );
}
