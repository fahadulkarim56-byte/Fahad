import React, { useState, useEffect } from 'react';
import { MessageCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PageProps {
  openOrderModal: (service: string) => void;
}

const BACKGROUND_IMAGES = [
  'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=2000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1564683214965-3619addd900d?q=80&w=2000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=2000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519817914152-2a640c047663?q=80&w=2000&auto=format&fit=crop'
];

export default function Home({ openOrderModal }: PageProps) {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    // Change background every 1 minute (60000 ms)
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % BACKGROUND_IMAGES.length);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero flex flex-col justify-center items-center text-center px-4 pt-20 z-10 overflow-hidden">
        <div 
          className="hero-bg" 
          style={{ backgroundImage: `url('${BACKGROUND_IMAGES[currentBgIndex]}')` }}
        />
        <div className="relative z-10 flex flex-col items-center">
          {/* Slider Text */}
          <h1 className="text-4xl sm:text-5xl md:text-[64px] font-extrabold mb-8 tracking-[-2px] text-blue-500 slider-container max-w-[100vw] px-2">
            <div className="slider-text">
              <span>Graphic Design</span>
              <span>Video Editing</span>
              <span>Digital Marketing</span>
              <span>Graphic Design</span>
            </div>
          </h1>

          {/* Menu moved নিচে */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-lg font-medium">
            <Link to="/graphic-design" className="hover:text-blue-400 transition-colors">Graphic Design</Link>
            <Link to="/video-editing" className="hover:text-blue-400 transition-colors">Video Editing</Link>
            <Link to="/digital-marketing" className="hover:text-blue-400 transition-colors">Digital Marketing</Link>
          </div>

          <p className="text-xl text-white/60">Social Media Kits</p>
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
            <div className="flex items-center justify-end mt-auto pt-4 border-t border-white/10">
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
            <div className="flex items-center justify-end mt-auto pt-4 border-t border-white/10">
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
            <div className="flex items-center justify-end mt-auto pt-4 border-t border-white/10">
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
            <div className="flex items-center justify-end mt-auto pt-4 border-t border-white/10">
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
            <div className="flex items-center justify-end mt-auto pt-4 border-t border-white/10">
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

      {/* Stats Section */}
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
    </>
  );
}
