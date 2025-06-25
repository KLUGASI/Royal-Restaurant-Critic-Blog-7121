import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiStar, FiUser, FiCalendar, FiThumbsUp, FiFlag, FiCheck } = FiIcons;

const UserReview = ({ review, onHelpful, onReport }) => {
  const [isHelpful, setIsHelpful] = useState(false);
  const [showFullReview, setShowFullReview] = useState(false);

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

  const handleHelpful = () => {
    if (!isHelpful) {
      setIsHelpful(true);
      onHelpful?.(review.id);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength = 300) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <SafeIcon icon={FiUser} className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-semibold text-purple-900 font-cinzel">
                {review.name}
              </h4>
              {review.verified && (
                <div className="flex items-center space-x-1 bg-green-100 px-2 py-1 rounded-full">
                  <SafeIcon icon={FiCheck} className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">Verified</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <SafeIcon icon={FiCalendar} className="h-3 w-3" />
                <span className="font-crimson">{formatDate(review.date)}</span>
              </div>
              {review.visitDate && (
                <span className="font-crimson">
                  Visited: {formatDate(review.visitDate)}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {renderStars(review.rating)}
          </div>
          <span className="text-lg font-bold text-purple-900 font-cinzel">
            {review.rating}/5
          </span>
        </div>
      </div>

      {/* Review Title */}
      <h3 className="text-lg font-bold text-purple-900 mb-3 font-cinzel">
        {review.title}
      </h3>

      {/* Review Content */}
      <div className="mb-4">
        <p className="text-gray-700 font-crimson leading-relaxed">
          {showFullReview ? review.comment : truncateText(review.comment)}
        </p>
        {review.comment.length > 300 && (
          <button
            onClick={() => setShowFullReview(!showFullReview)}
            className="text-purple-600 hover:text-purple-800 font-medium mt-2 text-sm transition-colors"
          >
            {showFullReview ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>

      {/* Recommendation Badge */}
      {review.recommended && (
        <div className="mb-4">
          <span className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            <SafeIcon icon={FiThumbsUp} className="h-3 w-3 mr-1" />
            Recommends this place
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <button
          onClick={handleHelpful}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
            isHelpful
              ? 'bg-purple-100 text-purple-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <SafeIcon icon={FiThumbsUp} className="h-4 w-4" />
          <span className="text-sm font-medium">
            Helpful ({review.helpful + (isHelpful ? 1 : 0)})
          </span>
        </button>

        <button
          onClick={() => onReport?.(review.id)}
          className="flex items-center space-x-1 text-gray-400 hover:text-red-500 transition-colors"
        >
          <SafeIcon icon={FiFlag} className="h-4 w-4" />
          <span className="text-sm">Report</span>
        </button>
      </div>
    </motion.div>
  );
};

export default UserReview;