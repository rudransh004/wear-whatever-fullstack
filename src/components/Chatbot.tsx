'use client';

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { useChat } from '@ai-sdk/react';
import type { UIMessage } from 'ai';
import { Bot, Send, Sparkles, X, Lock } from 'lucide-react'; // Added Lock icon

function MessageBubble({ message }: { message: UIMessage }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
      <span className="text-[10px] font-mono text-zinc-500 uppercase mb-1 px-1">
        {isUser ? 'You' : 'Stylist'}
      </span>
      <div
        className={`p-3.5 rounded-2xl text-xs leading-relaxed max-w-[88%] whitespace-pre-wrap ${
          isUser
            ? 'bg-[#f0c808] text-black font-medium rounded-tr-none shadow-md'
            : 'bg-zinc-900 text-zinc-100 border border-white/10 rounded-tl-none'
        }`}
      >
        {message.parts.map((part, index) => {
          if (part.type !== 'text') {
            return null;
          }

          return <div key={`${message.id}-${index}`}>{part.text}</div>;
        })}
      </div>
    </div>
  );
}

// Pass isLoggedIn prop down to the component
export default function Chatbot({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { messages, sendMessage, status } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const isLoading = status === 'submitted' || status === 'streaming';
  const isInputEmpty = !input || input.trim() === '';

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isInputEmpty || isLoading) {
      return;
    }

    sendMessage({ text: input.trim() });
    setInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* FLOATING TOGGLE BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 bg-[#f0c808] hover:bg-[#d8b407] text-black font-black uppercase text-xs tracking-widest px-5 py-3.5 rounded-full shadow-[0_0_25px_rgba(240,200,8,0.3)] transition-all transform hover:scale-105 active:scale-95"
        >
          <Sparkles className="w-4 h-4 fill-black" />
          <span>AI Stylist</span>
        </button>
      )}

      {/* FLOATING CHAT WIDGET WINDOW */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] bg-[#0a0a0a] border border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* HEADER (Always visible so they can close it) */}
          <div className="bg-gradient-to-r from-zinc-900 via-black to-zinc-900 border-b border-white/10 p-4 flex items-center justify-between z-30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#f0c808] text-black flex items-center justify-center font-black text-xs shadow-md">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                  WearWhatever AI
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                </h3>
                <p className="text-[10px] text-zinc-400 font-mono">Live Streetwear Advisor</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* CONTENT WRAPPER */}
          <div className="relative flex-1 flex flex-col overflow-hidden">
            
            {/* 🔒 LOCK SCREEN OVERLAY (Only shows if NOT logged in) */}
            {!isLoggedIn && (
              <div className="absolute inset-0 z-20 backdrop-blur-xl bg-black/80 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-[#f0c808]/10 border border-[#f0c808]/30 flex items-center justify-center mb-5 shadow-[0_0_30px_rgba(240,200,8,0.15)]">
                  <Lock className="w-7 h-7 text-[#f0c808]" />
                </div>
                <h4 className="text-white font-black uppercase text-lg mb-2 tracking-widest">Access Restricted</h4>
                <p className="text-zinc-400 text-xs font-mono mb-8 leading-relaxed max-w-[90%]">
                  The AI Stylist is a VIP feature. Join the void to unlock 1-on-1 custom styling advice.
                </p>
                <a
                  href="/login" // Make sure this matches your actual login route
                  className="bg-[#f0c808] text-black px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest hover:bg-[#d8b407] transition-all hover:scale-105 shadow-[0_0_20px_rgba(240,200,8,0.3)]"
                >
                  Log In To Access
                </a>
              </div>
            )}

            {/* MESSAGE LOG */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#f0c808]">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <p className="text-xs text-zinc-400 font-mono leading-relaxed">
                    Looking for outfit recommendations or drop details? Ask your AI Stylist below.
                  </p>
                </div>
              )}

              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono pl-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#f0c808] animate-ping"></div>
                  Stylist is cooking up a response...
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* INPUT FORM */}
            <form
              onSubmit={handleSubmit}
              className="p-3 border-t border-white/10 bg-black flex items-center gap-2"
            >
              <input
                value={input || ''}
                onChange={handleInputChange}
                placeholder="e.g. Style a black graphic tee..."
                className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#f0c808] transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || isInputEmpty}
                className="bg-[#f0c808] text-black p-2.5 rounded-xl hover:bg-[#d8b407] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}