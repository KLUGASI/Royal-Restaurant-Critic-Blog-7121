import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiStar, FiShoppingCart, FiHeart, FiEye, FiTag } = FiIcons;

const ProductCard = ({ product, onAddToCart, onAddToWishlist }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <SafeIcon
        key={i}
        icon={FiStar}
        className={`h-3 w-3 ${
          i < Math.floor(rating) ? 'text-amber-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100 hover:shadow-2xl transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-3 left-3">
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              -{product.discount}%
            </span>
          </div>
        )}
        
        {/* Stock Status */}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            product.inStock 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        
        {/* Quick Actions */}
        <div className="absolute bottom-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onAddToWishlist?.(product)}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
          >
            <SafeIcon icon={FiHeart} className="h-4 w-4 text-purple-600" />
          </button>
          <Link
            to={`/product/${product.id}`}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
          >
            <SafeIcon icon={FiEye} className="h-4 w-4 text-purple-600" />
          </Link>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-purple-900 mb-2 font-cinzel line-clamp-2 hover:text-purple-700 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 font-crimson line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center space-x-1 mr-2">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-600 font-crimson">
            {product.rating} ({product.reviews})
          </span>
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-purple-900 font-cinzel">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through font-crimson">
                ${product.originalPrice}
              </span>
            )}
          </div>
          {product.discount && (
            <div className="flex items-center text-green-600">
              <SafeIcon icon={FiTag} className="h-4 w-4 mr-1" />
              <span className="text-sm font-semibold">Save ${(product.originalPrice - product.price).toFixed(2)}</span>
            </div>
          )}
        </div>
        
        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart?.(product)}
          disabled={!product.inStock}
          className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-cinzel font-semibold transition-all duration-300 ${
            product.inStock
              ? 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg transform hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <SafeIcon icon={FiShoppingCart} className="h-4 w-4" />
          <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;