import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import RecommendationSection from '../components/RecommendationSection';
import { getRecommendations } from '../data/products';

const { FiShoppingBag, FiHeart, FiUser, FiSettings } = FiIcons;

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState({});
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [userPreferences, setUserPreferences] = useState({
    budget: 'medium',
    categories: ['dining-essentials', 'wine-accessories'],
    style: 'luxury'
  });

  useEffect(() => {
    // Simulate fetching user data and generating recommendations
    const fetchRecommendations = async () => {
      const recs = getRecommendations('user123', [], userPreferences);
      setRecommendations(recs);
    };

    fetchRecommendations();
  }, [userPreferences]);

  const handleAddToCart = (product) => {
    setCart(prev => [...prev, product]);
    // Show success notification
    console.log(`Added ${product.name} to cart`);
  };

  const handleAddToWishlist = (product) => {
    setWishlist(prev => [...prev, product]);
    // Show success notification
    console.log(`Added ${product.name} to wishlist`);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-amber-400 rounded-full mb-8 shadow-2xl"
          >
            <SafeIcon icon={FiShoppingBag} className="h-10 w-10 text-purple-900" />
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-purple-900 mb-4 font-cinzel">
            Royal Recommendations
          </h1>
          <div className="w-32 h-1 bg-amber-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-crimson leading-relaxed">
            Curated selections of the finest dining accessories and gourmet products, 
            personally chosen to elevate your culinary kingdom.
          </p>
        </motion.div>

        {/* User Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-3xl p-8 mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: FiShoppingBag, label: 'Cart Items', value: cart.length },
              { icon: FiHeart, label: 'Wishlist', value: wishlist.length },
              { icon: FiUser, label: 'Recommendations', value: Object.values(recommendations).flat().length }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-amber-400/20"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-400 rounded-full mb-4">
                  <SafeIcon icon={stat.icon} className="h-6 w-6 text-purple-900" />
                </div>
                <h3 className="text-2xl font-bold text-amber-400 mb-2 font-cinzel">
                  {stat.value}
                </h3>
                <p className="text-purple-200 font-crimson">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recommendation Sections */}
        {recommendations.featured && (
          <RecommendationSection
            title="Featured Royal Selections"
            products={recommendations.featured}
            icon="featured"
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
          />
        )}

        {recommendations.trending && (
          <RecommendationSection
            title="Trending in the Kingdom"
            products={recommendations.trending}
            icon="trending"
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
          />
        )}

        {recommendations.deals && (
          <RecommendationSection
            title="Royal Deals & Offers"
            products={recommendations.deals}
            icon="deals"
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
          />
        )}

        {recommendations.similar && (
          <RecommendationSection
            title="You Might Also Like"
            products={recommendations.similar}
            icon="similar"
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
          />
        )}

        {/* Personalization Panel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl p-8 border border-purple-100 mt-16"
        >
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center mr-4">
              <SafeIcon icon={FiSettings} className="h-6 w-6 text-purple-900" />
            </div>
            <h3 className="text-2xl font-bold text-purple-900 font-cinzel">
              Customize Your Experience
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-purple-900 mb-2 font-cinzel">
                Budget Preference
              </label>
              <select
                value={userPreferences.budget}
                onChange={(e) => setUserPreferences(prev => ({ ...prev, budget: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-crimson"
              >
                <option value="budget">Budget Friendly</option>
                <option value="medium">Mid-Range</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-purple-900 mb-2 font-cinzel">
                Style Preference
              </label>
              <select
                value={userPreferences.style}
                onChange={(e) => setUserPreferences(prev => ({ ...prev, style: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-crimson"
              >
                <option value="modern">Modern</option>
                <option value="classic">Classic</option>
                <option value="luxury">Luxury</option>
                <option value="rustic">Rustic</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-purple-900 mb-2 font-cinzel">
                Notification Preferences
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm font-crimson">New arrivals</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm font-crimson">Special offers</span>
                </label>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Recommendations;