import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Phone, MapPin, X, ExternalLink } from 'lucide-react';

export default function Footer() {
  const [showContactModal, setShowContactModal] = useState(false);

  // PLACEHOLDERS FOR USER TO EDIT
  const personalDetails = {
    name: "Aditya Singh",
    email: "Adityasing1276@gmail.com",
    phone: "[ADD YOUR PHONE HERE]", // EDIT THIS LINE
    location: "Lucknow, Uttar Pradesh",
    github: "[ADD YOUR GITHUB LINK HERE]", // EDIT THIS LINE
    linkedin: "[ADD YOUR LINKEDIN LINK HERE]" // EDIT THIS LINE
  };

  return (
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
            <div className="flex items-center gap-4 mt-2">
              <a href={personalDetails.github} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href={personalDetails.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
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
              <button 
                onClick={() => setShowContactModal(true)}
                className="text-left hover:text-red-400 text-sm transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                Contact Support
              </button>
              <span style={{ color: 'var(--text-secondary)' }} className="text-sm cursor-help">API Docs</span>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: 'rgba(255,255,255,0.05)', color: '#4b5563' }}>
          <p className="text-xs font-medium tracking-wide">© 2026 NRN SMART LEARNING. ALL RIGHTS RESERVED.</p>
          <p className="text-xs font-bold tracking-widest uppercase">
            Created by <span className="text-white hover:text-red-400 transition-colors cursor-pointer">{personalDetails.name}</span>
          </p>
        </div>
      </div>

      {/* Contact Support Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#1a1a1a] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">Contact Support</h2>
                  <p className="text-zinc-500 text-sm">Reach out for any queries or help.</p>
                </div>
                <button 
                  onClick={() => setShowContactModal(false)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-red-400/10 flex items-center justify-center text-red-400">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Email Address</p>
                    <p className="text-white font-medium">{personalDetails.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-blue-400/10 flex items-center justify-center text-blue-400">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Phone Number</p>
                    <p className="text-white font-medium">{personalDetails.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-green-400/10 flex items-center justify-center text-green-400">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Location</p>
                    <p className="text-white font-medium">{personalDetails.location}</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/5 flex justify-center gap-6">
                <a href={personalDetails.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-bold">
                  <Github size={18} /> GitHub <ExternalLink size={14} />
                </a>
                <a href={personalDetails.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-bold">
                  <Linkedin size={18} /> LinkedIn <ExternalLink size={14} />
                </a>
              </div>
            </div>
            
            <button 
              onClick={() => setShowContactModal(false)}
              className="w-full py-5 bg-white text-black font-black uppercase tracking-widest text-sm hover:bg-zinc-200 transition-colors"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
