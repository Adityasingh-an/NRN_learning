import { X, PlaySquare, MicOff } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function VideoModal({ isOpen, isSpeaking, text, onStop }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8">
      <div className="relative w-full max-w-5xl flex flex-col md:flex-row rounded-[32px] overflow-hidden bg-zinc-900 border border-zinc-700 shadow-[0_0_80px_rgba(255,107,82,0.15)] animate-in fade-in zoom-in duration-300">
        
        {/* Left Side: Video Player */}
        <div className="relative aspect-[3/4] md:h-[70vh] md:aspect-auto md:w-[400px] flex-shrink-0 bg-black flex items-center justify-center border-b md:border-b-0 md:border-r border-zinc-800">
             {/* Header */}
            <div className="absolute top-0 inset-x-0 z-20 flex justify-between items-center px-4 py-3 bg-gradient-to-b from-black/80 to-transparent">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-orange-400 bg-black/40 px-3 py-1 rounded-full border border-orange-500/30">
                <div className={`w-2 h-2 rounded-full bg-orange-400 ${isSpeaking ? 'animate-pulse' : ''}`}></div>
                {isSpeaking ? 'LIVE EXPLANATION' : 'STANDBY'}
              </div>
              <button onClick={onStop} className="md:hidden w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-zinc-300 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>

            {isSpeaking ? (
                <video 
                    src="/assets/talking.mp4"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    autoPlay
                    loop
                    muted
                    playsInline
                />
            ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-black p-6 text-center z-10">
                    <PlaySquare size={48} className="text-zinc-700 mb-4" />
                    <p className="text-zinc-400 text-sm">Explanation Finished</p>
                </div>
            )}
            
            {/* Visualizer at bottom of video */}
            {isSpeaking && (
               <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-orange-900/80 to-transparent z-10 flex items-end justify-center pb-2 gap-1 backdrop-blur-sm">
                 {[...Array(15)].map((_, i) => (
                   <div 
                     key={i} 
                     className="w-1.5 bg-orange-400 rounded-t-sm"
                     style={{ 
                       height: `${Math.random() * 60 + 20}%`,
                       animation: `pulse 0.5s infinite ${i * 0.05}s alternate ease-in-out`
                     }}
                   ></div>
                 ))}
               </div>
            )}
        </div>

        {/* Right Side: Text & Controls */}
        <div className="flex-1 flex flex-col relative bg-zinc-900/80 h-[50vh] md:h-[70vh]">
          {/* Desktop Close Button */}
          <button onClick={onStop} className="hidden md:flex absolute top-6 right-6 w-10 h-10 rounded-full bg-zinc-800 items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors z-20">
             <X size={20} />
          </button>
          
          <div className="flex-1 overflow-y-auto p-6 md:p-12 scrollbar-hide text-left">
            <h3 className="text-xl font-bold text-white mb-6 border-b border-zinc-800 pb-4">Transcript</h3>
            <div className="markdown-body text-zinc-300 text-sm md:text-base leading-relaxed break-words whitespace-pre-wrap">
              <ReactMarkdown>{text}</ReactMarkdown>
            </div>
            <div className="h-24"></div> {/* Spacer for button */}
          </div>

          {/* Stop Button Bottom Overlay */}
          <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-zinc-900 via-zinc-900/90 to-transparent flex justify-center z-10 pointer-events-none">
             <button 
                onClick={onStop}
                className="pointer-events-auto flex items-center gap-2 px-8 py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold shadow-[0_0_30px_rgba(225,29,72,0.4)] transition-all hover:scale-105"
             >
                <MicOff size={20} />
                STOP EXPLANATION
             </button>
          </div>
        </div>

      </div>
    </div>
  );
}
