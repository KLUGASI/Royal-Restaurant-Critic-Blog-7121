import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import BlogCard from '../components/BlogCard';
import { featuredPosts } from '../data/blogPosts';

const { FiStar, FiClock, FiArrowRight, FiShield, FiAward } = FiIcons;

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-amber-400 rounded-full mb-8 shadow-2xl"
            >
              <SafeIcon icon={FiShield} className="h-10 w-10 text-purple-900" />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-amber-400 mb-6 font-cinzel tracking-wide">
              Welcome to the
              <span className="block text-white">Royal Palate</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-purple-200 mb-8 max-w-3xl mx-auto font-crimson leading-relaxed">
              Where culinary excellence meets royal standards. Join me on a noble quest 
              to discover the finest dining establishments in our realm.
            </p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/reviews"
                className="inline-flex items-center px-8 py-4 bg-amber-400 text-purple-900 rounded-lg font-cinzel font-semibold hover:bg-amber-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <SafeIcon icon={FiStar} className="mr-2 h-5 w-5" />
                View Chronicles
                <SafeIcon icon={FiArrowRight} className="ml-2 h-5 w-5" />
              </Link>
              
              <Link
                to="/about"
                className="inline-flex items-center px-8 py-4 border-2 border-amber-400 text-amber-400 rounded-lg font-cinzel font-semibold hover:bg-amber-400 hover:text-purple-900 transition-all duration-300"
              >
                <SafeIcon icon={FiAward} className="mr-2 h-5 w-5" />
                Meet the Critic
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-400/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400/10 rounded-full blur-xl"></div>
      </section>

      {/* Featured Reviews */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4 font-cinzel">
              Featured Chronicles
            </h2>
            <div className="w-24 h-1 bg-amber-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-crimson">
              Discover the most recent royal dining experiences and culinary adventures
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/reviews"
              className="inline-flex items-center px-8 py-4 bg-purple-900 text-amber-400 rounded-lg font-cinzel font-semibold hover:bg-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View All Chronicles
              <SafeIcon icon={FiArrowRight} className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { number: '150+', label: 'Restaurants Reviewed', icon: FiStar },
              { number: '5', label: 'Years of Experience', icon: FiClock },
              { number: '25+', label: 'Awards Recognized', icon: FiAward }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-amber-400/20"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-400 rounded-full mb-4">
                  <SafeIcon icon={stat.icon} className="h-8 w-8 text-purple-900" />
                </div>
                <h3 className="text-4xl font-bold text-amber-400 mb-2 font-cinzel">
                  {stat.number}
                </h3>
                <p className="text-purple-200 font-crimson">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;