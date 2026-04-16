import React from 'react';

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  onOrder: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, description, image, onOrder }) => {
  return (
    <div className="bg-white/[0.06] backdrop-blur-[25px] border border-white/[0.12] rounded-[24px] p-[30px] flex flex-col hover:-translate-y-2 transition-transform duration-300">
      <img src={image} alt={title} className="rounded-xl mb-5 w-full h-48 object-cover" />
      <h4 className="text-[20px] font-bold mb-3">{title}</h4>
      <p className="text-[14px] text-white/50 leading-[1.6] mb-5 flex-1">{description}</p>
      <div className="flex items-center justify-end mt-auto pt-4 border-t border-white/10">
        <button 
          onClick={onOrder} 
          className="bg-blue-500 px-4 py-2 rounded-lg font-semibold text-xs hover:bg-blue-600 transition-colors"
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
