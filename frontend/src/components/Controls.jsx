import { useState } from 'react';
import { Send, Mic, Image as ImageIcon } from 'lucide-react';

export default function Controls({ onSend, isTyping, onMicClick, onImageClick }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isTyping) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto p-4 z-10">
      <form onSubmit={handleSubmit} className="relative flex items-end gap-2 p-2 bg-zinc-900/80 backdrop-blur-xl border border-zinc-700/50 rounded-3xl shadow-xl focus-within:shadow-[0_0_20px_rgba(255,107,82,0.15)] focus-within:border-orange-500/50 transition-all duration-300">
        
        {/* Attachment buttons */}
        <div className="flex gap-1 pb-1 pl-2">
          <button type="button" onClick={onImageClick} className="p-2.5 text-zinc-400 hover:text-orange-400 hover:bg-zinc-800/50 rounded-full transition-colors">
            <ImageIcon size={20} />
          </button>
          <button type="button" onClick={onMicClick} className="p-2.5 text-zinc-400 hover:text-orange-400 hover:bg-zinc-800/50 rounded-full transition-colors">
            <Mic size={20} />
          </button>
        </div>

        {/* Input */}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="Ask me anything..."
          className="flex-1 max-h-32 min-h-12 bg-transparent text-white placeholder-zinc-500 resize-none outline-none py-3 px-2 scrollbar-hide text-base"
          rows={1}
        />

        {/* Send button */}
        <div className="pb-1 pr-1">
          <button 
            type="submit" 
            disabled={!input.trim() || isTyping}
            className="p-3 bg-gradient-to-r from-orange-500 to-rose-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(255,107,82,0.5)] transition-all"
          >
            <Send size={20} className={input.trim() && !isTyping ? "translate-x-0.5 -translate-y-0.5" : ""} />
          </button>
        </div>
      </form>
    </div>
  );
}
