import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { allPosts } from '../data/blogPosts';

const { FiCalendar, FiStar, FiMapPin, FiClock, FiArrowLeft } = FiIcons;

const BlogPost = () => {
  const { id } = useParams();
  const post = allPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return <Navigate to="/reviews" replace />;
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <SafeIcon
        key={i}
        icon={FiStar}
        className={`h-5 w-5 ${
          i < rating ? 'text-amber-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => window.history.back()}
          className="flex items-center text-purple-600 hover:text-purple-800 mb-8 font-cinzel font-medium transition-colors"
        >
          <SafeIcon icon={FiArrowLeft} className="h-5 w-5 mr-2" />
          Return to Chronicles
        </motion.button>

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-purple-100"
        >
          {/* Hero Image */}
          <div className="relative h-96 bg-gradient-to-r from-purple-900 to-indigo-900">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            {/* Category Badge */}
            <div className="absolute top-6 left-6">
              <span className="bg-amber-400 text-purple-900 px-4 py-2 rounded-full font-cinzel font-semibold text-sm">
                {post.category.replace('-', ' ').toUpperCase()}
              </span>
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-cinzel leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90">
                <div className="flex items-center">
                  <SafeIcon icon={FiCalendar} className="h-4 w-4 mr-2" />
                  <span className="font-crimson">{post.date}</span>
                </div>
                <div className="flex items-center">
                  <SafeIcon icon={FiMapPin} className="h-4 w-4 mr-2" />
                  <span className="font-crimson">{post.location}</span>
                </div>
                <div className="flex items-center">
                  <SafeIcon icon={FiClock} className="h-4 w-4 mr-2" />
                  <span className="font-crimson">{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Rating Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 mb-8 border border-amber-200"
            >
              <h3 className="text-2xl font-bold text-purple-900 mb-4 font-cinzel">
                Royal Verdict
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {renderStars(post.rating)}
                  <span className="text-2xl font-bold text-amber-600 ml-2">
                    {post.rating}/5
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-purple-700 font-cinzel font-semibold">
                    {post.rating >= 4.5 ? 'Royal Excellence' :
                     post.rating >= 4 ? 'Noble Quality' :
                     post.rating >= 3 ? 'Worthy Mention' : 'Needs Improvement'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="prose prose-lg max-w-none font-crimson text-gray-700 leading-relaxed"
            >
              <p className="text-xl mb-6 font-medium text-purple-800">
                {post.excerpt}
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-purple-900 mb-4 font-cinzel">
                    The Royal Experience
                  </h3>
                  <p>
                    Upon entering this establishment, one is immediately struck by the 
                    attention to detail in both ambiance and service. The dining room 
                    exudes an air of sophistication that befits a venue of this caliber, 
                    with carefully curated lighting and furnishings that speak to the 
                    establishment's commitment to excellence.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-purple-900 mb-4 font-cinzel">
                    Culinary Artistry
                  </h3>
                  <p>
                    The menu presents a thoughtful selection of dishes that showcase 
                    both technical skill and creative vision. Each course arrives as 
                    a carefully composed work of art, with flavors that build and 
                    complement one another in harmonious succession. The chef's mastery 
                    is evident in every bite, from the perfectly balanced seasonings 
                    to the impeccable presentation.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-purple-900 mb-4 font-cinzel">
                    Service Worthy of Royalty
                  </h3>
                  <p>
                    The service staff demonstrates a level of professionalism and 
                    attention that elevates the entire dining experience. Their 
                    knowledge of the menu and wine pairings is extensive, and their 
                    ability to anticipate guests' needs creates an atmosphere of 
                    effortless hospitality.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-purple-900 mb-4 font-cinzel">
                    Final Royal Decree
                  </h3>
                  <p>
                    This establishment has earned its place among the kingdom's finest 
                    dining destinations. Whether celebrating a special occasion or 
                    simply seeking an exceptional culinary experience, one can dine 
                    here with the confidence that every aspect of the meal has been 
                    crafted with the utmost care and attention to detail.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-12 pt-8 border-t border-gray-200"
            >
              <h4 className="text-lg font-bold text-purple-900 mb-4 font-cinzel">
                Royal Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium font-crimson"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.article>
      </div>
    </div>
  );
};

export default BlogPost;