import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import ProductCard from './ProductCard';

const { FiTrendingUp, FiStar, FiGift, FiShoppingBag } = FiIcons;

const RecommendationSection = ({ title, products, icon, onAddToCart, onAddToWishlist }) => {
  const getIcon = (iconName) => {
    const iconMap = {
      'trending': FiTrendingUp,
      'featured': FiStar,
      'deals': FiGift,
      'similar': FiShoppingBag
    };
    return iconMap[iconName] || FiStar;
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-400 rounded-full mb-4 shadow-lg">
            <SafeIcon icon={getIcon(icon)} className="h-8 w-8 text-purple-900" />
          </div>
          <h2 className="text-4xl font-bold text-purple-900 mb-4 font-cinzel">
            {title}
          </h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto"></div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                onAddToWishlist={onAddToWishlist}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default RecommendationSection;