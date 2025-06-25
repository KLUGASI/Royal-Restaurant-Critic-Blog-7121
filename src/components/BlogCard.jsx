import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiStar, FiCalendar, FiMapPin, FiClock, FiArrowRight } = FiIcons;

const BlogCard = ({ post }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <SafeIcon
        key={i}
        icon={FiStar}
        className={`h-4 w-4 ${
          i < rating ? 'text-amber-400 fill-current' : 'text-gray-300'
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
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-amber-400 text-purple-900 px-3 py-1 rounded-full font-cinzel font-semibold text-xs">
            {post.category.replace('-', ' ').toUpperCase()}
          </span>
        </div>

        {/* Rating */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
          <div className="flex items-center space-x-1">
            {renderStars(post.rating)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-purple-900 mb-3 font-cinzel line-clamp-2 hover:text-purple-700 transition-colors">
          {post.title}
        </h3>
        
        <p className="text-gray-600 mb-4 font-crimson line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <SafeIcon icon={FiCalendar} className="h-4 w-4 mr-1" />
            <span className="font-crimson">{post.date}</span>
          </div>
          <div className="flex items-center">
            <SafeIcon icon={FiMapPin} className="h-4 w-4 mr-1" />
            <span className="font-crimson">{post.location}</span>
          </div>
          <div className="flex items-center">
            <SafeIcon icon={FiClock} className="h-4 w-4 mr-1" />
            <span className="font-crimson">{post.readTime}</span>
          </div>
        </div>

        {/* Read More Button */}
        <Link
          to={`/blog/${post.id}`}
          className="inline-flex items-center text-purple-600 hover:text-amber-600 font-cinzel font-semibold transition-colors duration-300 group"
        >
          Read Chronicle
          <SafeIcon 
            icon={FiArrowRight} 
            className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
          />
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogCard;