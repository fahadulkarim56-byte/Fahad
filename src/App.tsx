import React, { useState } from 'react';
import { MessageCircle, Mail, X, Search } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import GraphicDesign from './pages/GraphicDesign';
import VideoEditing from './pages/VideoEditing';
import DigitalMarketing from './pages/DigitalMarketing';
import { ProductProvider } from './context/ProductContext';
import ChatWidget from './components/ChatWidget';
import FacebookWidget from './components/FacebookWidget';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const openOrderModal = (service: string) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ProductProvider>
      <Router>
        <div className="min-h-screen text-white font-sans selection:bg-blue-500/30 relative overflow-x-hidden">
        {/* Navigation */}
        <nav className="fixed w-full z-50 h-[80px] px-6 md:px-[60px] flex justify-between items-center bg-[#0a0c14]/80 backdrop-blur-[10px] border-b border-white/[0.12] gap-4">
          <Link to="/" className="text-[24px] font-black tracking-[-1px] shrink-0">
            Fahad
          </Link>
          
          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 relative group">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-white/[0.06] border border-white/[0.12] rounded-full py-2.5 pl-5 pr-10 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-blue-500/80 transition-colors" />
          </div>

          <div className="flex items-center shrink-0">
            <a 
              href="https://wa.me/8801889515357" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-[24px] py-[10px] rounded-full font-bold text-[14px] shadow-[0_4px_15px_rgba(34,197,94,0.3)] hover:bg-green-400 transition-colors"
            >
              WhatsApp Me
            </a>
          </div>
        </nav>

        {/* Main Content Area */}
        <Routes>
          <Route path="/" element={<Home openOrderModal={openOrderModal} />} />
          <Route path="/graphic-design" element={<GraphicDesign openOrderModal={openOrderModal} />} />
          <Route path="/video-editing" element={<VideoEditing openOrderModal={openOrderModal} />} />
          <Route path="/digital-marketing" element={<DigitalMarketing openOrderModal={openOrderModal} />} />
        </Routes>

        {/* Footer */}
        <footer className="py-8 text-center text-white/40 text-sm border-t border-white/[0.12] relative z-10">
          <p>&copy; {new Date().getFullYear()} Fahadul Karim. All rights reserved.</p>
        </footer>

        {/* Chat Widget */}
        <ChatWidget />

        {/* Facebook Widget */}
        <FacebookWidget />

        {/* Order Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-[#0a0c14]/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <div className="bg-white/[0.06] backdrop-blur-[30px] border border-white/[0.12] p-[30px] rounded-[24px] shadow-2xl max-w-md w-full relative animate-in fade-in zoom-in duration-200">
              <button 
                onClick={closeOrderModal} 
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-[24px] font-bold mb-6">Place Your Order</h3>
              
              <form action="https://formspree.io/f/fahadulkarim56@gmail.com" method="POST" className="space-y-4">
                <input type="hidden" name="_subject" value="New Order from Website" />
                
                <div>
                  <label className="block text-[12px] font-semibold text-white/60 mb-2 uppercase tracking-wide">Selected Service</label>
                  <input 
                    type="text" 
                    name="Service" 
                    value={selectedService} 
                    readOnly 
                    className="w-full bg-white/5 border border-white/10 p-3 rounded-lg text-white/80 focus:outline-none"
                  />
                </div>
                
                <div>
                  <input 
                    type="text" 
                    name="Name" 
                    placeholder="Your Name" 
                    required 
                    className="w-full bg-white/5 border border-white/10 p-3 rounded-lg text-white placeholder:text-white/40 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                
                <div>
                  <input 
                    type="tel" 
                    name="Phone" 
                    placeholder="Your Phone Number" 
                    required 
                    className="w-full bg-white/5 border border-white/10 p-3 rounded-lg text-white placeholder:text-white/40 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                
                <div>
                  <textarea 
                    name="Details" 
                    placeholder="Briefly describe your requirement" 
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 p-3 rounded-lg text-white placeholder:text-white/40 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-blue-500 py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors mt-2"
                >
                  Confirm Order
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Router>
    </ProductProvider>
  );
}
