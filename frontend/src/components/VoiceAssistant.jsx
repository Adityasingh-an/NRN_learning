import { Mic, X, Send } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

export default function VoiceAssistant({ isOpen, onClose, onAudioSubmit }) {
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      return;
    }
    
    setTranscript('');
    setError('');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Your browser does not support Voice Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = 0; i < event.results.length; i++) {
        finalTranscript += event.results[i][0].transcript;
      }
      setTranscript(finalTranscript);
    };

    recognition.onerror = (event) => {
      setError("Voice Error: " + event.error);
    };

    try {
      recognition.start();
    } catch(e) {}

    return () => {
      recognition.stop();
    };
  }, [isOpen]);

  const handleSend = () => {
    if (transcript.trim() && onAudioSubmit) {
      onAudioSubmit(transcript);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-[400px] p-8 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-[0_0_50px_rgba(255,107,82,0.15)] flex flex-col items-center">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors">
          <X size={20} />
        </button>
        
        <div className="mb-6 relative mt-4">
          <div className="absolute inset-0 rounded-full bg-orange-500 blur-2xl opacity-20 animate-pulse"></div>
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-rose-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <Mic size={40} className="text-white" />
          </div>
        </div>
        
        <h3 className="text-xl font-medium text-white mb-2 text-center">
          {error ? <span className="text-red-400">{error}</span> : "Listening..."}
        </h3>
        
        <div className="w-full bg-black/40 min-h-[60px] max-h-[120px] overflow-y-auto rounded-xl p-4 mb-6 border border-zinc-800 text-zinc-300 text-center italic">
          {transcript || "Speak clearly into your microphone..."}
        </div>
        
        <button 
          onClick={handleSend}
          disabled={!transcript.trim()}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-600 text-white rounded-full font-medium shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={18} />
          Send to AI
        </button>

      </div>
    </div>
  );
}
