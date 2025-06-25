import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import BlogCard from '../components/BlogCard';
import { allPosts } from '../data/blogPosts';

const { FiFilter, FiSearch, FiStar } = FiIcons;

const Reviews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const categories = ['all', 'fine-dining', 'casual', 'international', 'local'];
  
  const filteredPosts = allPosts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.title.localeCompare(b.title);
    });

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-purple-900 mb-4 font-cinzel">
            Royal Chronicles
          </h1>
          <div className="w-32 h-1 bg-amber-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-crimson">
            A curated collection of dining experiences from across the kingdom, 
            each establishment judged by the highest royal standards.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-12 border border-purple-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div className="relative">
              <SafeIcon 
                icon={FiSearch} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" 
              />
              <input
                type="text"
                placeholder="Search chronicles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-crimson"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <SafeIcon 
                icon={FiFilter} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" 
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-crimson appearance-none bg-white"
              >
                <option value="all">All Categories</option>
                <option value="fine-dining">Fine Dining</option>
                <option value="casual">Casual Dining</option>
                <option value="international">International</option>
                <option value="local">Local Favorites</option>
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <SafeIcon 
                icon={FiStar} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" 
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-crimson appearance-none bg-white"
              >
                <option value="date">Latest First</option>
                <option value="rating">Highest Rated</option>
                <option value="title">Alphabetical</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <p className="text-gray-600 font-crimson text-lg">
            Showing {filteredPosts.length} royal chronicles
          </p>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <SafeIcon icon={FiSearch} className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2 font-cinzel">
              No Chronicles Found
            </h3>
            <p className="text-gray-500 font-crimson">
              Try adjusting your search criteria to find more results.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Reviews;