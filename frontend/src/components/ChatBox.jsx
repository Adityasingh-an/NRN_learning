import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

export default function ChatBox({ messages, isTyping, onPlay }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-8 scrollbar-hide relative">
      <div className="max-w-4xl mx-auto flex flex-col min-h-full">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-[0_0_30px_rgba(255,107,82,0.1)]">
              <img src="/assets/logo.png" alt="NRN AI" className="w-10 h-10 object-contain" />
            </div>
            <p className="text-lg">Start a conversation to begin learning.</p>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <MessageBubble key={msg.id} text={msg.text} sender={msg.sender} onPlay={onPlay ? (mode) => onPlay(msg.text, mode) : undefined} />
            ))}
            
            {isTyping && (
              <div className="flex w-full justify-start mb-6">
                <div className="flex max-w-[80%] gap-4 flex-row">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 shadow-[0_0_15px_rgba(255,107,82,0.15)] flex items-center justify-center">
                    <img src="/assets/logo.png" alt="Typing" className="w-5 h-5 object-contain" />
                  </div>
                  <div className="px-5 py-4 rounded-2xl bg-zinc-900/60 backdrop-blur-md border border-zinc-700/50 rounded-tl-none flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-orange-400 typing-dot"></div>
                    <div className="w-2 h-2 rounded-full bg-orange-400 typing-dot"></div>
                    <div className="w-2 h-2 rounded-full bg-orange-400 typing-dot"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} className="h-4" />
          </>
        )}
      </div>
    </div>
  );
}
