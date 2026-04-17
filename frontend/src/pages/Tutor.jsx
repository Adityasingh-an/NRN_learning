import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatBox from '../components/ChatBox';
import Controls from '../components/Controls';
import VoiceAssistant from '../components/VoiceAssistant';
import ImageUploader from '../components/ImageUploader';
import VideoModal from '../components/VideoModal';
import AvatarSettingsModal from '../components/AvatarSettingsModal';
import { useChat } from '../hooks/useChat';
import { useAppContext } from '../context/AppContext';
import { Menu, Settings } from 'lucide-react';

export default function Tutor() {
  const { messages, isTyping, speakingMode, speakingText, sendMessage, playExplanation, stopExplanation } = useChat();
  const { sidebarOpen, setSidebarOpen } = useAppContext();
  
  const [isMicOpen, setIsMicOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleVoiceSubmit = (transcript) => {
    setIsMicOpen(false);
    sendMessage(transcript);
  };

  return (
    <div className="flex h-screen bg-black overflow-hidden selection:bg-orange-500/30">
      
      <main className="flex-1 flex flex-col relative w-full h-full">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

        {/* Global Action Header */}
        <header className="flex justify-between items-center p-4 border-b border-zinc-800/50 backdrop-blur-md bg-black/50 z-20">
          <div className="flex items-center">
             <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-zinc-300 md:hidden block mr-4">
               <Menu size={24} />
             </button>
             <h1 className="font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-rose-500">
               NRN Smart Learning
             </h1>
          </div>
          
          <button 
             onClick={() => setIsSettingsOpen(true)}
             className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-700 hover:border-orange-500 text-zinc-300 hover:text-white transition-all text-sm font-medium shadow-sm group"
          >
             <Settings size={16} className="text-orange-400 group-hover:rotate-90 transition-transform duration-500" />
             <span className="hidden sm:inline">Avatar Settings</span>
          </button>
        </header>

        {/* Minimalist Full-Width Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden p-0 md:p-6 z-10 w-full max-w-screen-xl mx-auto">
          <div className="flex-1 flex flex-col min-w-0 relative">
            <ChatBox messages={messages} isTyping={isTyping} onPlay={playExplanation} />
            
            {/* Input Area */}
            <div className="pb-4 pt-2 shrink-0 relative bg-gradient-to-t from-black via-black/80 to-transparent">
              <Controls 
                onSend={sendMessage} 
                isTyping={isTyping} 
                onMicClick={() => setIsMicOpen(true)}
                onImageClick={() => setIsImageOpen(true)}
              />
            </div>
          </div>
        </div>

        {/* Portals & Modals */}
        <VoiceAssistant 
          isOpen={isMicOpen} 
          onClose={() => setIsMicOpen(false)} 
          onAudioSubmit={handleVoiceSubmit}
        />
        <ImageUploader isOpen={isImageOpen} onClose={() => setIsImageOpen(false)} />
        
        <AvatarSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        
        <VideoModal 
            isOpen={speakingMode === 'video'} 
            isSpeaking={speakingMode !== null} 
            text={speakingText}
            onStop={stopExplanation} 
        />

        {/* Float Stop Audio Button if Audio Only Mode */}
        {speakingMode === 'audio' && (
           <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-zinc-900 border border-orange-500/30 shadow-[0_0_50px_rgba(255,107,82,0.15)] rounded-full px-6 py-3 animate-in slide-in-from-bottom-10 fade-in duration-300">
             <div className="flex gap-1">
                <span className="w-1.5 h-4 bg-orange-400 rounded-full animate-[pulse_1s_infinite]"></span>
                <span className="w-1.5 h-6 bg-orange-400 rounded-full animate-[pulse_1s_infinite_0.2s]"></span>
                <span className="w-1.5 h-3 bg-orange-400 rounded-full animate-[pulse_1s_infinite_0.4s]"></span>
             </div>
             <span className="text-zinc-300 text-sm font-medium mr-2">Speaking...</span>
             <button onClick={stopExplanation} className="bg-rose-600 hover:bg-rose-500 text-white px-5 py-1.5 rounded-full text-xs font-bold transition-colors">
               STOP
             </button>
           </div>
        )}
      </main>
      
      {/* Moved Sidebar to the Right Side as requested */}
      <Sidebar />
    </div>
  );
}
