import { X, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

export default function AvatarSettingsModal({ isOpen, onClose }) {
  const { pitch, setPitch, speed, setSpeed, voiceURI, setVoiceURI } = useAppContext();
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-[400px] p-6 rounded-3xl bg-zinc-900 border border-zinc-700 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium text-white flex items-center gap-2">
            <Settings className="text-orange-400" /> Avatar Settings
          </h3>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="flex flex-col gap-6">
          <div>
            <label className="text-sm font-medium text-zinc-300 mb-2 block">Selected Voice</label>
            <select 
              className="w-full bg-black border border-zinc-700 text-zinc-300 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500"
              value={voiceURI}
              onChange={(e) => setVoiceURI(e.target.value)}
            >
              <option value="">Default System Voice</option>
              {voices.map(voice => (
                <option key={voice.voiceURI} value={voice.voiceURI}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>

          <div className="bg-black/30 p-4 rounded-2xl border border-zinc-800">
            <label className="text-sm font-medium text-zinc-300 mb-3 flex justify-between">
              <span>Speaking Speed</span> <span className="text-orange-400 font-bold">{speed.toFixed(1)}x</span>
            </label>
            <input 
              type="range" min="0.5" max="2" step="0.1" 
              value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full accent-orange-500 mb-4"
            />
            
            <label className="text-sm font-medium text-zinc-300 mb-3 flex justify-between mt-4">
              <span>Voice Pitch</span> <span className="text-orange-400 font-bold">{pitch.toFixed(1)}</span>
            </label>
            <input 
              type="range" min="0" max="2" step="0.1" 
              value={pitch} onChange={(e) => setPitch(parseFloat(e.target.value))}
              className="w-full accent-orange-500"
            />
          </div>
          
          <button onClick={onClose} className="w-full py-3 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition-colors">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
