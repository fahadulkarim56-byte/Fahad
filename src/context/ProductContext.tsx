import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  section: string;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
}

const defaultProducts: Product[] = [
  // Graphic Design - Social Media Kits
  { id: '1', category: 'graphic-design', section: 'Social Media Kits', title: 'Instagram Grid Puzzle', description: 'A cohesive 9-post grid design that tells a story and makes your profile stand out.', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop' },
  { id: '2', category: 'graphic-design', section: 'Social Media Kits', title: 'Facebook Ad Creatives', description: 'High-converting ad graphics designed specifically for Meta\'s advertising platform.', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop' },
  { id: '3', category: 'graphic-design', section: 'Social Media Kits', title: 'Monthly Content Batch', description: '15 custom-designed social media posts tailored to your brand guidelines.', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop' },
  // Graphic Design - Brand Identity
  { id: '4', category: 'graphic-design', section: 'Brand Identity', title: 'Logo Design', description: 'A unique, memorable logo that captures the essence of your business.', image: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?q=80&w=800&auto=format&fit=crop' },
  { id: '5', category: 'graphic-design', section: 'Brand Identity', title: 'Brand Guidelines', description: 'A comprehensive rulebook for your brand\'s typography, colors, and imagery.', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop' },
  { id: '6', category: 'graphic-design', section: 'Brand Identity', title: 'Stationery Kit', description: 'Business cards, letterheads, and envelope designs ready for print.', image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=800&auto=format&fit=crop' },
  // Graphic Design - UI/UX & Web Design
  { id: '7', category: 'graphic-design', section: 'UI/UX & Web Design', title: 'Landing Page Design', description: 'A high-converting, single-page website design optimized for lead generation.', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop' },
  { id: '8', category: 'graphic-design', section: 'UI/UX & Web Design', title: 'Mobile App UI', description: 'Intuitive and beautiful user interfaces for iOS and Android applications.', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop' },
  { id: '9', category: 'graphic-design', section: 'UI/UX & Web Design', title: 'E-commerce Redesign', description: 'Revamp your online store to improve user experience and boost sales.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop' },

  // Video Editing - Commercial Ads
  { id: '10', category: 'video-editing', section: 'Commercial Ads', title: 'Product Promo Video', description: 'High-energy promotional video showcasing your product\'s best features.', image: 'https://images.unsplash.com/photo-1574717024453-354056aadd19?q=80&w=800&auto=format&fit=crop' },
  { id: '11', category: 'video-editing', section: 'Commercial Ads', title: 'Brand Story Ad', description: 'A cinematic narrative video that connects your audience to your brand\'s mission.', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop' },
  { id: '12', category: 'video-editing', section: 'Commercial Ads', title: 'UGC Style Ad', description: 'Authentic, user-generated style content optimized for social media conversions.', image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=800&auto=format&fit=crop' },
  // Video Editing - YouTube Content
  { id: '13', category: 'video-editing', section: 'YouTube Content', title: 'Vlog Editing', description: 'Engaging cuts, color grading, and sound design for your personal or travel vlogs.', image: 'https://images.unsplash.com/photo-1516280440502-6143922b0244?q=80&w=800&auto=format&fit=crop' },
  { id: '14', category: 'video-editing', section: 'YouTube Content', title: 'Talking Head / Tutorial', description: 'Clean edits with motion graphics, lower thirds, and B-roll integration.', image: 'https://images.unsplash.com/photo-1535016120720-40c746a6580c?q=80&w=800&auto=format&fit=crop' },
  { id: '15', category: 'video-editing', section: 'YouTube Content', title: 'Documentary Style', description: 'Deep-dive video editing with complex narrative structures and cinematic pacing.', image: 'https://images.unsplash.com/photo-1585241936939-82bc566d8b11?q=80&w=800&auto=format&fit=crop' },
  // Video Editing - Short-form Content
  { id: '16', category: 'video-editing', section: 'Short-form Content', title: 'TikTok / Reels Batch', description: '5 high-retention short videos with trendy captions and transitions.', image: 'https://images.unsplash.com/photo-1611162618828-bc409f073cbf?q=80&w=800&auto=format&fit=crop' },
  { id: '17', category: 'video-editing', section: 'Short-form Content', title: 'Podcast Highlights', description: 'Extracting the best moments from your long-form podcasts into viral shorts.', image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop' },
  { id: '18', category: 'video-editing', section: 'Short-form Content', title: 'Event Recap Shorts', description: 'Fast-paced, energetic recaps of your live events or behind-the-scenes footage.', image: 'https://images.unsplash.com/photo-1470229722913-7c092dbbba3a?q=80&w=800&auto=format&fit=crop' },

  // Digital Marketing - Social Media Advertising
  { id: '19', category: 'digital-marketing', section: 'Social Media Advertising', title: 'Meta Ads Setup', description: 'Complete setup of your Facebook and Instagram ad campaigns, including pixel installation.', image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff0f?q=80&w=800&auto=format&fit=crop' },
  { id: '20', category: 'digital-marketing', section: 'Social Media Advertising', title: 'Monthly Ad Management', description: 'Ongoing optimization, A/B testing, and scaling of your social media ad campaigns.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop' },
  { id: '21', category: 'digital-marketing', section: 'Social Media Advertising', title: 'Retargeting Campaigns', description: 'Bring back lost visitors and convert them into paying customers with precise retargeting.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop' },
  // Digital Marketing - Search Engine Optimization (SEO)
  { id: '22', category: 'digital-marketing', section: 'Search Engine Optimization (SEO)', title: 'Technical SEO Audit', description: 'In-depth analysis of your website\'s technical health and search engine visibility.', image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=800&auto=format&fit=crop' },
  { id: '23', category: 'digital-marketing', section: 'Search Engine Optimization (SEO)', title: 'On-Page Optimization', description: 'Keyword research and optimization of your website\'s content and meta tags.', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop' },
  { id: '24', category: 'digital-marketing', section: 'Search Engine Optimization (SEO)', title: 'Local SEO Package', description: 'Optimize your Google My Business profile and local citations to dominate local search.', image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop' },
  // Digital Marketing - Content Marketing
  { id: '25', category: 'digital-marketing', section: 'Content Marketing', title: 'Content Strategy Plan', description: 'A comprehensive 3-month content calendar tailored to your target audience.', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop' },
  { id: '26', category: 'digital-marketing', section: 'Content Marketing', title: 'Email Marketing Setup', description: 'Newsletter template design and automated welcome sequence creation.', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop' },
  { id: '27', category: 'digital-marketing', section: 'Content Marketing', title: 'Blog Post Writing', description: 'SEO-optimized, engaging blog articles (up to 1500 words) for your website.', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop' },
];

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('app_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultProducts;
      }
    }
    return defaultProducts;
  });

  useEffect(() => {
    localStorage.setItem('app_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: Date.now().toString() };
    setProducts(prev => [...prev, newProduct]);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
