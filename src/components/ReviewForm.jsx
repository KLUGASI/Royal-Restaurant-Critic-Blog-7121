import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiStar, FiUser, FiSend, FiX } = FiIcons;

const ReviewForm = ({ restaurantId, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    comment: '',
    name: '',
    email: '',
    visitDate: '',
    recommended: true
  });

  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit({
        ...formData,
        restaurantId,
        id: Date.now(),
        date: new Date().toISOString(),
        verified: false,
        helpful: 0
      });
      
      // Reset form
      setFormData({
        rating: 0,
        title: '',
        comment: '',
        name: '',
        email: '',
        visitDate: '',
        recommended: true
      });
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => setFormData(prev => ({ ...prev, rating: i + 1 }))}
        onMouseEnter={() => setHoveredStar(i + 1)}
        onMouseLeave={() => setHoveredStar(0)}
        className="transition-colors duration-200"
      >
        <SafeIcon
          icon={FiStar}
          className={`h-8 w-8 ${
            i < (hoveredStar || formData.rating)
              ? 'text-amber-400 fill-current'
              : 'text-gray-300'
          }`}
        />
      </button>
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-purple-900 font-cinzel">
          Share Your Royal Experience
        </h3>
        <button
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <SafeIcon icon={FiX} className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-sm font-semibold text-purple-900 mb-3 font-cinzel">
            Your Royal Rating *
          </label>
          <div className="flex items-center space-x-1">
            {renderStars()}
            <span className="ml-3 text-gray-600 font-crimson">
              {formData.rating > 0 && (
                <>
                  {formData.rating}/5 - {
                    formData.rating >= 5 ? 'Royal Excellence' :
                    formData.rating >= 4 ? 'Noble Quality' :
                    formData.rating >= 3 ? 'Worthy Mention' :
                    formData.rating >= 2 ? 'Needs Improvement' : 'Poor Experience'
                  }
                </>
              )}
            </span>
          </div>
        </div>

        {/* Review Title */}
        <div>
          <label className="block text-sm font-semibold text-purple-900 mb-2 font-cinzel">
            Review Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Summarize your dining experience..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-crimson"
            required
          />
        </div>

        {/* Review Comment */}
        <div>
          <label className="block text-sm font-semibold text-purple-900 mb-2 font-cinzel">
            Your Review *
          </label>
          <textarea
            value={formData.comment}
            onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
            placeholder="Share details about your dining experience, food quality, service, ambiance..."
            rows={6}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-crimson resize-none"
            required
          />
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-purple-900 mb-2 font-cinzel">
              Your Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-crimson"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-purple-900 mb-2 font-cinzel">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="your@email.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-crimson"
              required
            />
          </div>
        </div>

        {/* Visit Date */}
        <div>
          <label className="block text-sm font-semibold text-purple-900 mb-2 font-cinzel">
            Date of Visit
          </label>
          <input
            type="date"
            value={formData.visitDate}
            onChange={(e) => setFormData(prev => ({ ...prev, visitDate: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-crimson"
          />
        </div>

        {/* Recommendation */}
        <div>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={formData.recommended}
              onChange={(e) => setFormData(prev => ({ ...prev, recommended: e.target.checked }))}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <span className="text-purple-900 font-cinzel font-medium">
              I would recommend this establishment to fellow nobles
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 text-gray-600 hover:text-gray-800 font-cinzel font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !formData.rating || !formData.title || !formData.comment}
            className="flex items-center space-x-2 px-8 py-3 bg-purple-600 text-white rounded-lg font-cinzel font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <SafeIcon icon={FiSend} className="h-4 w-4" />
            <span>{isSubmitting ? 'Submitting...' : 'Submit Review'}</span>
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ReviewForm;