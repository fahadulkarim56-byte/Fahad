import React, { useState } from 'react';
import { MessageCircle, Mail, X, Search } from 'lucide-react';

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
    <div className="min-h-screen text-white font-sans selection:bg-blue-500/30 relative overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed w-full z-50 h-[80px] px-6 md:px-[60px] flex justify-between items-center bg-[#0a0c14]/80 backdrop-blur-[10px] border-b border-white/[0.12] gap-4">
        <h1 className="text-[24px] font-black tracking-[-1px] uppercase shrink-0">
          FAHAD<span className="text-blue-500">UL</span>
        </h1>
        
        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 relative group">
          <input 
            type="text" 
            placeholder="Search in..." 
            className="w-full bg-white/[0.06] border border-white/[0.12] rounded-full py-2.5 pl-5 pr-10 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-blue-500/80 transition-colors" />
        </div>

        <div className="hidden lg:flex items-center space-x-[32px] shrink-0">
          <div className="flex space-x-[24px] text-[13px] uppercase tracking-[1px] text-white/80">
            <a href="#graphics" className="hover:text-white transition-colors">Graphics</a>
            <a href="#video" className="hover:text-white transition-colors">Video Editing</a>
            <a href="#marketing" className="hover:text-white transition-colors">Meta Marketing</a>
          </div>
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

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20 relative z-10 overflow-hidden">
        {/* Premium Background */}
        <div className="absolute inset-0 -z-10">
          <img 
            src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=3000&auto=format&fit=crop" 
            alt="Premium Abstract Background" 
            className="w-full h-full object-cover opacity-40"
          />
          {/* Gradient overlays for seamless blending */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0c14]/80 to-[#0a0c14]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0c14_100%)] opacity-80"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-5xl md:text-[64px] leading-[1.1] font-extrabold mb-[16px] tracking-[-2px]">
            Elevate Your Brand <br /> With <span className="text-blue-500">Premium Design</span>
          </h2>
          <p className="text-[18px] text-white/60 max-w-[600px] mb-8 mx-auto">
            Professional Graphics, Video Editing, and Meta Marketing tailored for high-impact business growth and visual storytelling.
          </p>
          <a 
            href="#graphics" 
            className="border border-white/[0.12] bg-white/[0.06] backdrop-blur-[25px] px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 font-medium"
          >
            Explore My Work
          </a>
        </div>
      </section>

      {/* Graphics Section */}
      <section id="graphics" className="py-20 px-6 md:px-[60px] relative z-10">
        <h3 className="text-3xl font-bold text-center mb-12 tracking-tight">Graphic Design</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Sample Card 1 */}
          <div className="bg-white/[0.06] backdrop-blur-[25px] border border-white/[0.12] rounded-[24px] p-[30px] flex flex-col hover:-translate-y-2 transition-transform duration-300">
            <img src="https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop" alt="Poster" className="rounded-xl mb-5 w-full h-48 object-cover" />
            <h4 className="text-[20px] font-bold mb-3">Social Media Poster</h4>
            <p className="text-[14px] text-white/50 leading-[1.6] mb-5 flex-1">Custom social media posters that capture attention and drive engagement.</p>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
              <span className="text-[12px] font-bold text-green-500 uppercase tracking-wide">Starts at $49</span>
              <button 
                onClick={() => openOrderModal('Graphics Poster')} 
                className="bg-blue-500 px-4 py-2 rounded-lg font-semibold text-xs hover:bg-blue-600 transition-colors"
              >
                Order Now
              </button>
            </div>
          </div>
          {/* Sample Card 2 */}
          <div className="bg-white/[0.06] backdrop-blur-[25px] border border-white/[0.12] rounded-[24px] p-[30px] flex flex-col hover:-translate-y-2 transition-transform duration-300">
            <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop" alt="Branding" className="rounded-xl mb-5 w-full h-48 object-cover" />
            <h4 className="text-[20px] font-bold mb-3">Brand Identity</h4>
            <p className="text-[14px] text-white/50 leading-[1.6] mb-5 flex-1">Complete branding packages including logos, typography, and color palettes.</p>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
              <span className="text-[12px] font-bold text-green-500 uppercase tracking-wide">Starts at $199</span>
              <button 
                onClick={() => openOrderModal('Brand Identity')} 
                className="bg-blue-500 px-4 py-2 rounded-lg font-semibold text-xs hover:bg-blue-600 transition-colors"
              >
                Order Now
              </button>
            </div>
          </div>
          {/* Sample Card 3 */}
          <div className="bg-white/[0.06] backdrop-blur-[25px] border border-white/[0.12] rounded-[24px] p-[30px] flex flex-col hover:-translate-y-2 transition-transform duration-300">
            <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop" alt="UI/UX" className="rounded-xl mb-5 w-full h-48 object-cover" />
            <h4 className="text-[20px] font-bold mb-3">UI/UX Design</h4>
            <p className="text-[14px] text-white/50 leading-[1.6] mb-5 flex-1">Intuitive and beautiful user interfaces for web and mobile applications.</p>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
              <span className="text-[12px] font-bold text-green-500 uppercase tracking-wide">Starts at $299</span>
              <button 
                onClick={() => openOrderModal('UI/UX Design')} 
                className="bg-blue-500 px-4 py-2 rounded-lg font-semibold text-xs hover:bg-blue-600 transition-colors"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="video" className="py-20 px-6 md:px-[60px] relative z-10">
        <h3 className="text-3xl font-bold text-center mb-12 tracking-tight">Video Editing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <div className="bg-white/[0.06] backdrop-blur-[25px] border border-white/[0.12] rounded-[24px] p-[30px] flex flex-col hover:-translate-y-2 transition-transform duration-300">
            <div className="aspect-video bg-black/40 rounded-xl mb-5 flex items-center justify-center relative overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1574717024453-354056aadd19?q=80&w=800&auto=format&fit=crop" alt="Video thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center z-10">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[12px] border-l-white border-b-8 border-b-transparent ml-1"></div>
              </div>
            </div>
            <h4 className="text-[20px] font-bold mb-3">Commercial Ad Video</h4>
            <p className="text-[14px] text-white/50 leading-[1.6] mb-5 flex-1">Cinematic commercial ads designed to tell your story in motion.</p>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
              <span className="text-[12px] font-bold text-green-500 uppercase tracking-wide">Starts at $99</span>
              <button 
                onClick={() => openOrderModal('Commercial Ad Video')} 
                className="bg-blue-500 px-4 py-2 rounded-lg font-semibold text-xs hover:bg-blue-600 transition-colors"
              >
                Order Now
              </button>
            </div>
          </div>
          <div className="bg-white/[0.06] backdrop-blur-[25px] border border-white/[0.12] rounded-[24px] p-[30px] flex flex-col hover:-translate-y-2 transition-transform duration-300">
            <div className="aspect-video bg-black/40 rounded-xl mb-5 flex items-center justify-center relative overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=800&auto=format&fit=crop" alt="Video thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center z-10">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[12px] border-l-white border-b-8 border-b-transparent ml-1"></div>
              </div>
            </div>
            <h4 className="text-[20px] font-bold mb-3">Social Media Reels/Shorts</h4>
            <p className="text-[14px] text-white/50 leading-[1.6] mb-5 flex-1">High-retention short-form content optimized for TikTok, Reels, and Shorts.</p>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
              <span className="text-[12px] font-bold text-green-500 uppercase tracking-wide">Starts at $49</span>
              <button 
                onClick={() => openOrderModal('Social Media Reels/Shorts')} 
                className="bg-blue-500 px-4 py-2 rounded-lg font-semibold text-xs hover:bg-blue-600 transition-colors"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Meta Marketing Section */}
      <section id="marketing" className="py-20 px-6 md:px-[60px] relative z-10">
        <h3 className="text-3xl font-bold text-center mb-12 tracking-tight">Meta Marketing</h3>
        <div className="max-w-4xl mx-auto bg-white/[0.06] backdrop-blur-[25px] border border-white/[0.12] p-[30px] rounded-[24px]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h4 className="text-[24px] font-bold mb-2 text-blue-400">Facebook & Instagram Ads</h4>
              <p className="text-[14px] text-white/50 leading-[1.6]">Data-driven ad campaigns focused on ROI, lead generation, and brand awareness.</p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-3">
              <span className="text-[12px] font-bold text-green-500 uppercase tracking-wide">Starts at $149/mo</span>
              <button 
                onClick={() => openOrderModal('Meta Marketing')} 
                className="bg-blue-500 px-8 py-3 rounded-lg font-semibold text-sm hover:bg-blue-600 transition-colors whitespace-nowrap"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section (Added from theme) */}
      <section className="py-10 px-6 md:px-[60px] relative z-10 max-w-5xl mx-auto">
        <div className="border-t border-white/[0.12] pt-10 flex flex-wrap justify-center gap-12 md:gap-24">
          <div className="flex flex-col items-center">
            <span className="text-[24px] font-extrabold">250+</span>
            <span className="text-[11px] uppercase tracking-[1px] text-white/40 mt-1">Projects Done</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[24px] font-extrabold">180+</span>
            <span className="text-[11px] uppercase tracking-[1px] text-white/40 mt-1">Happy Clients</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[24px] font-extrabold">4.9/5</span>
            <span className="text-[11px] uppercase tracking-[1px] text-white/40 mt-1">Avg Rating</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[24px] font-extrabold">24/7</span>
            <span className="text-[11px] uppercase tracking-[1px] text-white/40 mt-1">Live Support</span>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 md:px-[60px] text-center relative z-10">
        <h3 className="text-3xl font-bold mb-8 tracking-tight">Get In Touch</h3>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a 
            href="https://wa.me/8801889515357" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-green-500/10 border border-green-500/30 px-8 py-4 rounded-[24px] text-lg font-bold text-green-400 hover:bg-green-500/20 transition-colors"
          >
            <MessageCircle className="w-6 h-6" /> WhatsApp
          </a>
          <a 
            href="mailto:fahadulkarim56@gmail.com" 
            className="flex items-center justify-center gap-3 bg-blue-500/10 border border-blue-500/30 px-8 py-4 rounded-[24px] text-lg font-bold text-blue-400 hover:bg-blue-500/20 transition-colors"
          >
            <Mail className="w-6 h-6" /> Email Me
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-white/40 text-sm border-t border-white/[0.12] relative z-10">
        <p>&copy; {new Date().getFullYear()} Fahadul Karim. All rights reserved.</p>
      </footer>

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
  );
}
