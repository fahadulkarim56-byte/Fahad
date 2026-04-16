import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import AddProductModal from '../components/AddProductModal';
import { Plus } from 'lucide-react';

interface PageProps {
  openOrderModal: (service: string) => void;
}

const SECTIONS = ['Social Media Kits', 'Brand Identity', 'UI/UX & Web Design'];

export default function GraphicDesign({ openOrderModal }: PageProps) {
  const { products } = useProducts();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const pageProducts = products.filter(p => p.category === 'graphic-design');

  return (
    <div className="pt-32 pb-20 px-6 md:px-[60px] relative z-10 min-h-screen max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Graphic <span className="text-blue-500">Design</span>
        </h2>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.1] px-6 py-3 rounded-full font-semibold transition-colors"
        >
          <Plus className="w-5 h-5" /> Upload Product
        </button>
      </div>
      
      {SECTIONS.map(section => {
        const sectionProducts = pageProducts.filter(p => p.section === section);
        if (sectionProducts.length === 0) return null;

        return (
          <section key={section} className="mb-20">
            <h3 className="text-2xl font-bold mb-8 border-b border-white/10 pb-4">{section}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sectionProducts.map(product => (
                <ProductCard 
                  key={product.id}
                  title={product.title}
                  description={product.description}
                  image={product.image}
                  onOrder={() => openOrderModal(product.title)}
                />
              ))}
            </div>
          </section>
        );
      })}

      <AddProductModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        category="graphic-design"
        sections={SECTIONS}
      />
    </div>
  );
}
