import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Mail } from 'lucide-react';
import { GoogleGenAI, Type, FunctionDeclaration } from '@google/genai';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  type?: 'text' | 'contact_options' | 'contact_form';
  formMethod?: 'whatsapp' | 'email';
}

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const showContactOptionsDeclaration: FunctionDeclaration = {
  name: "showContactOptions",
  description: "Show options for the user to contact the human admin via WhatsApp or Email. Call this ONLY when the user explicitly asks to place an order, hire the agency, or speak to a human.",
  parameters: {
    type: Type.OBJECT,
    properties: {},
  },
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: '👋 Assalamu Alaikum! How can I help you?', isBot: true }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSelectContact = (method: 'whatsapp' | 'email') => {
    setMessages(prev => [...prev, 
      { id: Date.now().toString(), text: `I want to proceed with ${method === 'whatsapp' ? 'WhatsApp' : 'Email'}.`, isBot: false },
      { id: (Date.now() + 1).toString(), text: "Great! Please provide your details below:", isBot: true, type: 'contact_form', formMethod: method }
    ]);
  };

  const handleChatWhatsAppSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('Name') as string;
    const address = formData.get('Address') as string;
    const details = formData.get('Details') as string;

    const message = `New Inquiry from Chat:\n\nName: ${name}\nAddress: ${address}\nDetails: ${details}`;
    const whatsappUrl = `https://wa.me/8801889515357?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    setMessages(prev => [...prev, { id: Date.now().toString(), text: "Your message has been prepared in WhatsApp! We will get back to you soon.", isBot: true }]);
  };

  const sendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    
    // Add user message
    const newUserMsg: Message = { id: Date.now().toString(), text: userText, isBot: false };
    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Build conversation history for context
      const chatHistory = messages.map(msg => `${msg.isBot ? 'Junior Admin' : 'Customer'}: ${msg.text}`).join('\n');
      const prompt = `
You are "Junior Admin", a highly persuasive, confident, and expert sales representative and customer support assistant for Fahad's creative agency.
The agency provides top-tier services: Graphic Design (including Poster Design), Video Editing, and Digital Marketing services (including Social Media Kits).

YOUR ULTIMATE GOAL: Convince the customer to place an order. You must persuade them that Fahad's agency is the absolute best choice to grow their business, make their brand stand out, and deliver premium quality results.

CRITICAL INSTRUCTIONS:
1. LANGUAGE MATCHING: You MUST reply in the exact same language the customer uses (e.g., Bengali, English, Hindi).
2. BE PERSUASIVE & VALUE-DRIVEN: When answering questions, don't just list features. Explain the *benefits*. Use convincing language. Tell them how our video editing will capture attention, how our graphic design will build trust, and how our digital marketing will drive sales.
3. BUILD EXCITEMENT: Be enthusiastic and professional. Make the customer feel confident that they are making the right choice by working with us.
4. CLOSE THE DEAL: Once you have answered their questions and they seem convinced, interested in starting, or explicitly ask how to order/contact us, you MUST call the "showContactOptions" function to present them with Email and WhatsApp options. Do not ask for their details directly; let the function handle it.

Conversation history:
${chatHistory}
Customer: ${userText}
Junior Admin:`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          tools: [{ functionDeclarations: [showContactOptionsDeclaration] }],
          temperature: 0.7,
        }
      });

      if (response.functionCalls && response.functionCalls.length > 0) {
        const call = response.functionCalls[0];
        if (call.name === 'showContactOptions') {
          setMessages(prev => [...prev, { 
            id: Date.now().toString(), 
            text: "Please choose how you would like to proceed:", 
            isBot: true,
            type: 'contact_options'
          }]);
          setIsTyping(false);
          return;
        }
      }

      const botText = response.text || "I'm sorry, I couldn't process that right now. Please try again or contact us via WhatsApp.";
      
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        text: botText.trim(), 
        isBot: true 
      }]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        text: "Sorry, I am having trouble connecting right now. Please contact us via WhatsApp.", 
        isBot: true 
      }]);
    } finally {
      setIsTyping(false);
    }
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
                
                {msg.type === 'contact_options' && (
                  <div className="flex flex-col gap-2 mt-3">
                    <button onClick={() => handleSelectContact('whatsapp')} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors">
                      <MessageCircle className="w-4 h-4" /> WhatsApp
                    </button>
                    <button onClick={() => handleSelectContact('email')} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors">
                      <Mail className="w-4 h-4" /> Email
                    </button>
                  </div>
                )}

                {msg.type === 'contact_form' && (
                  <form 
                    action={msg.formMethod === 'email' ? "https://formspree.io/f/fahadulkarim56@gmail.com" : undefined}
                    method={msg.formMethod === 'email' ? "POST" : undefined}
                    onSubmit={msg.formMethod === 'whatsapp' ? handleChatWhatsAppSubmit : undefined}
                    className="flex flex-col gap-2 mt-3"
                  >
                    <input type="hidden" name="_subject" value="New Inquiry from Chat Widget" />
                    <input type="text" name="Name" placeholder="Your Name" required className="bg-black/20 border border-white/10 rounded p-2 text-white placeholder:text-white/50 focus:outline-none focus:border-blue-500" />
                    <input type="text" name="Address" placeholder="Your Address" required className="bg-black/20 border border-white/10 rounded p-2 text-white placeholder:text-white/50 focus:outline-none focus:border-blue-500" />
                    <textarea name="Details" placeholder="Description of needs" required rows={3} className="bg-black/20 border border-white/10 rounded p-2 text-white placeholder:text-white/50 focus:outline-none focus:border-blue-500 resize-none" />
                    <button type="submit" className={`py-2 px-4 rounded-lg font-bold text-white transition-colors mt-1 ${msg.formMethod === 'whatsapp' ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}`}>
                      {msg.formMethod === 'whatsapp' ? 'Send to WhatsApp' : 'Send via Email'}
                    </button>
                  </form>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="bg-white/[0.08] text-white/60 self-start rounded-2xl rounded-tl-sm border border-white/[0.05] p-3 text-sm flex items-center gap-1">
                <span className="animate-bounce">.</span><span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span><span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <form onSubmit={sendMessage} className="p-4 border-t border-white/[0.12] bg-white/[0.02] flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..." 
              disabled={isTyping}
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 focus:bg-white/[0.08] transition-all disabled:opacity-50"
            />
            <button 
              type="submit"
              disabled={isTyping || !input.trim()}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white p-2 rounded-full transition-colors flex items-center justify-center shrink-0 shadow-[0_2px_10px_rgba(59,130,246,0.3)]"
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
