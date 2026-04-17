import { User, PlayCircle, Volume2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function MessageBubble({ text, sender, onPlay }) {
  const isAI = sender === 'ai';

  return (
    <div className={`flex w-full ${isAI ? 'justify-start' : 'justify-end'} mb-6 group`}>
      <div className={`flex max-w-[80%] gap-4 ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
          ${isAI ? 'bg-zinc-900 border border-zinc-800 shadow-[0_0_15px_rgba(255,107,82,0.15)] glow-avatar' : 'bg-gradient-to-br from-orange-500 to-rose-600'}`}>
          {isAI ? <img src="/assets/logo.png" alt="NRN" className="w-6 h-6 object-contain" /> : <User size={20} className="text-white" />}
        </div>

        {/* Bubble */}
        <div className={`px-5 py-3.5 rounded-2xl relative
          ${isAI 
            ? 'bg-zinc-900/60 backdrop-blur-md border border-zinc-700/50 text-zinc-100 rounded-tl-none shadow-sm' 
            : 'bg-gradient-to-br from-orange-600/90 to-rose-700/90 backdrop-blur-md text-white rounded-tr-none shadow-lg'
          }
        `}>
          <div className="text-sm md:text-base leading-relaxed markdown-body">
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>

          {/* AI Manual Play Buttons */}
          {isAI && onPlay && (
            <div className="flex gap-2 mt-4 flex-wrap">
              <button 
                onClick={() => onPlay('video')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-800/80 hover:bg-orange-500/20 text-orange-400 hover:text-orange-300 border border-zinc-700/50 text-xs font-medium transition-all group-hover:opacity-100 opacity-60"
              >
                <PlayCircle size={14} /> Video & Audio
              </button>
              <button 
                onClick={() => onPlay('audio')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700/50 text-xs font-medium transition-all group-hover:opacity-100 opacity-60"
              >
                <Volume2 size={14} /> Audio Only
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
