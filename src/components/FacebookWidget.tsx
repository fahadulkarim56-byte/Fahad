import React from 'react';
import { Facebook } from 'lucide-react';

export default function FacebookWidget() {
  return (
    <a
      href="https://www.facebook.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-[100] w-14 h-14 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(24,119,242,0.4)] transition-colors animate-wiggle-icon"
      aria-label="Visit our Facebook page"
    >
      <Facebook className="w-7 h-7" fill="currentColor" />
    </a>
  );
}
