import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  sections: string[];
}

export default function AddProductModal({ isOpen, onClose, category, sections }: AddProductModalProps) {
  const { addProduct } = useProducts();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    section: sections[0] || ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      ...formData,
      category
    });
    onClose();
    setFormData({ title: '', description: '', image: '', section: sections[0] || '' });
  };

  return (
    <div className="fixed inset-0 bg-[#0a0c14]/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-white/[0.06] backdrop-blur-[30px] border border-white/[0.12] p-[30px] rounded-[24px] shadow-2xl max-w-md w-full relative animate-in fade-in zoom-in duration-200">
        <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>
        <h3 className="text-[24px] font-bold mb-6 flex items-center gap-2">
          <Upload className="w-6 h-6 text-blue-500" /> Upload Product
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[12px] font-semibold text-white/60 mb-2 uppercase tracking-wide">Section</label>
            <select 
              value={formData.section}
              onChange={(e) => setFormData({...formData, section: e.target.value})}
              className="w-full bg-white/5 border border-white/10 p-3 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              {sections.map(s => <option key={s} value={s} className="bg-[#0a0c14]">{s}</option>)}
            </select>
          </div>
          <div>
            <input type="text" placeholder="Product Title" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-lg text-white placeholder:text-white/40 focus:border-blue-500 outline-none" />
          </div>
          <div>
            <input type="url" placeholder="Image URL (https://...)" required value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-lg text-white placeholder:text-white/40 focus:border-blue-500 outline-none" />
          </div>
          <div>
            <textarea placeholder="Product Description" required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-white/5 border border-white/10 p-3 rounded-lg text-white placeholder:text-white/40 focus:border-blue-500 outline-none resize-none"></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-500 py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors mt-2">
            Upload Product
          </button>
        </form>
      </div>
    </div>
  );
}
