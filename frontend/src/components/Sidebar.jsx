import { Bot, Home, BookOpen, Settings, LayoutDashboard, LogOut } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const { sidebarOpen } = useAppContext();
  const location = useLocation();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, text: 'Dashboard', path: '/dashboard' },
    { icon: <Bot size={20} />, text: 'AI Tutor', path: '/tutor' },
    { icon: <BookOpen size={20} />, text: 'My Courses', path: '/courses' },
  ];

  return (
    <aside 
      className={`h-full flex flex-col transition-all duration-300 bg-zinc-950/80 backdrop-blur-xl border-r border-zinc-800 ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center gap-3 h-20 px-6 border-b border-zinc-800/50">
        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
          <img src="/assets/logo.png" alt="NRN Logo" className="w-full h-full object-contain" />
        </div>
        {sidebarOpen && (
          <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-rose-500 whitespace-nowrap">
            NRN Smart
          </h1>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-4 space-y-2">
        {menuItems.map((item, idx) => {
          const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/');
          
          return (
            <Link 
              key={idx}
              to={item.path}
              className={`w-full flex items-center gap-4 px-3 py-3 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? 'bg-zinc-800/50 text-orange-400 shadow-[inset_2px_0_0_0_#ff6b52]' 
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/30'
              }`}
            >
              <span className={`${isActive ? 'drop-shadow-[0_0_5px_rgba(255,107,82,0.5)]' : ''}`}>
                {item.icon}
              </span>
              {sidebarOpen && (
                <span className="font-medium whitespace-nowrap">{item.text}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Settings */}
      <div className="p-4 border-t border-zinc-800/50">
        <Link to="/" className="w-full flex items-center gap-4 px-3 py-3 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all">
          <LogOut size={20} />
          {sidebarOpen && <span className="font-medium whitespace-nowrap">Logout</span>}
        </Link>
      </div>
    </aside>
  );
}
