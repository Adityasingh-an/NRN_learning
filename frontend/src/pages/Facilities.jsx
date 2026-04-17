import Navbar from '../components/Navbar';
import { Server, Users, Bot, Layers, Shield, Zap } from 'lucide-react';

export default function Facilities() {
  const facilitiesList = [
    {
      icon: <Bot size={24} />,
      title: "Autonomous Artificial Intelligence",
      desc: "Complete 24/7 access to an infinitely patient neural engine that remembers your conversation history while contextually analyzing documents."
    },
    {
      icon: <Users size={24} />,
      title: "Unified Student Dashboards",
      desc: "Every enrolled student possesses a centralized operational hub tracking their NRN ID, secure email mappings, and enrolled curriculums."
    },
    {
      icon: <Server size={24} />,
      title: "Master Control Panel",
      desc: "Educators rule over a centralized SQLite server farm, manipulating what AI languages are allowed and deploying live course catalogs."
    },
    {
      icon: <Layers size={24} />,
      title: "Categorical Course Routing",
      desc: "Information isn't just dumped. It is structurally sorted into specific root categories, preparing for future PDF/Book native-cloud digestion."
    },
    {
      icon: <Shield size={24} />,
      title: "Military-Grade Identity Hashing",
      desc: "NRN bypasses standard weak passwords by forcing a randomly generated unique identifier securely hashed natively in Python."
    },
    {
      icon: <Zap size={24} />,
      title: "Zero-Latency Fast-API Routing",
      desc: "The entire backend sits on an asynchronous API network rendering data instantly to the dark-mode optimized React client."
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12" style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-primary)' }}>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">Platform Facilities</h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            A comprehensive breakdown of the digital and structural accommodations provided natively by the NRN Smart Learning environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilitiesList.map((item, index) => (
            <div key={index} className="p-8 rounded-3xl border transition-all hover:-translate-y-2 group" style={{ backgroundColor: 'var(--secondary-bg-color)', borderColor: 'rgba(255,255,255,0.05)' }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110" style={{ backgroundColor: 'var(--background-color)', color: 'var(--primary-accent)' }}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
