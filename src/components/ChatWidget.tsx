import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: '👋 Assalamu Alaikum! How can I help you?', isBot: true }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const sendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newUserMsg: Message = { id: Date.now().toString(), text: input, isBot: false };
    setMessages(prev => [...prev, newUserMsg]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        text: "Thanks for reaching out! A human admin will get back to you shortly.", 
        isBot: true 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Chat Box */}
      {isOpen && (
        <div className="bg-[#0a0c14]/90 backdrop-blur-[25px] border border-white/[0.12] rounded-[24px] w-[320px] h-[400px] mb-4 flex flex-col shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-white/[0.06] border-b border-white/[0.12] p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-bold text-white">Junior Admin</span>
            </div>
            <button onClick={toggleChat} className="text-white/50 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {messages.map(msg => (
              <div 
                key={msg.id} 
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.isBot 
                    ? 'bg-white/[0.08] text-white self-start rounded-tl-sm border border-white/[0.05]' 
                    : 'bg-blue-500 text-white self-end rounded-tr-sm shadow-[0_2px_10px_rgba(59,130,246,0.3)]'
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <form onSubmit={sendMessage} className="p-4 border-t border-white/[0.12] bg-white/[0.02] flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..." 
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 focus:bg-white/[0.08] transition-all"
            />
            <button 
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors flex items-center justify-center shrink-0 shadow-[0_2px_10px_rgba(59,130,246,0.3)]"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>
        </div>
      )}

      {/* Chat Button */}
      <button 
        onClick={toggleChat}
        className="w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(59,130,246,0.4)] transition-transform hover:scale-105"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
}
