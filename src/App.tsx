import React, { useState } from 'react';
import { MessageCircle, Mail, X, Search, CheckCircle } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';

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
  const [orderMethod, setOrderMethod] = useState<'email' | 'whatsapp' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const openOrderModal = (service: string) => {
    setSelectedService(service);
    setOrderMethod(null);
    setIsSuccess(false);
    setIsModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsModalOpen(false);
    setOrderMethod(null);
    setIsSuccess(false);
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  };

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    
    try {
      const response = await fetch("https://formspree.io/f/fahadulkarim56@gmail.com", {
        method: "POST",
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setIsSuccess(true);
        triggerConfetti();
      } else {
        alert("There was an error submitting your form. Please try again.");
      }
    } catch (error) {
      alert("There was an error submitting your form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const service = formData.get('Service') as string;
    const name = formData.get('Name') as string;
    const email = formData.get('Email') as string;
    const phone = formData.get('Phone') as string;
    const details = formData.get('Details') as string;

    const emailText = email ? `\nEmail: ${email}` : '';
    const message = `New Order Request:\n\nService: ${service}\nName: ${name}${emailText}\nPhone: ${phone}\nDescription: ${details}`;
    
    // WhatsApp URL
    const whatsappUrl = `https://wa.me/8801889515357?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');

    closeOrderModal();
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
              
              {!orderMethod && !isSuccess && (
                <div className="space-y-4">
                  <p className="text-white/80 mb-4">How would you like to place your order?</p>
                  <button 
                    onClick={() => setOrderMethod('whatsapp')}
                    className="w-full bg-green-500 py-3 rounded-lg font-bold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </button>
                  <button 
                    onClick={() => setOrderMethod('email')}
                    className="w-full bg-blue-500 py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    Email
                  </button>
                </div>
              )}
              
              {orderMethod && !isSuccess && (
                <form 
                  onSubmit={orderMethod === 'whatsapp' ? handleWhatsAppSubmit : handleEmailSubmit} 
                  className="space-y-4"
                >
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
                      type="email" 
                      name="Email" 
                      placeholder="Your Email" 
                      required={orderMethod === 'email'} 
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
                      placeholder="Description" 
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 p-3 rounded-lg text-white placeholder:text-white/40 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none"
                    ></textarea>
                  </div>
                  
                  <div className="flex gap-3 mt-2">
                    <button 
                      type="button"
                      onClick={() => setOrderMethod(null)}
                      className="w-1/3 bg-white/10 py-3 rounded-lg font-bold hover:bg-white/20 transition-colors"
                      disabled={isSubmitting}
                    >
                      Back
                    </button>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className={`w-2/3 py-3 rounded-lg font-bold transition-colors disabled:opacity-50 ${orderMethod === 'whatsapp' ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                    >
                      {isSubmitting ? 'Sending...' : (orderMethod === 'whatsapp' ? 'Send to WhatsApp' : 'Send Email')}
                    </button>
                  </div>
                </form>
              )}

              {isSuccess && (
                <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">অভিনন্দন!</h4>
                  <p className="text-white/80">আপনার তথ্য সফলভাবে জমা দেওয়া হয়েছে।</p>
                  <button 
                    onClick={closeOrderModal}
                    className="mt-6 bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Router>
    </ProductProvider>
  );
}
