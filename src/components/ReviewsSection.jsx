import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import UserReview from './UserReview';
import ReviewForm from './ReviewForm';
import { getReviewsForRestaurant, submitReview } from '../data/reviews';

const { FiStar, FiEdit3, FiFilter, FiTrendingUp } = FiIcons;

const ReviewsSection = ({ restaurantId }) => {
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, [restaurantId, sortBy, filterRating]);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const reviewsData = await getReviewsForRestaurant(restaurantId, {
        sortBy,
        filterRating
      });
      setReviews(reviewsData);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (reviewData) => {
    try {
      const newReview = await submitReview(reviewData);
      setReviews(prev => [newReview, ...prev]);
      setShowReviewForm(false);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleHelpful = (reviewId) => {
    setReviews(prev => 
      prev.map(review => 
        review.id === reviewId 
          ? { ...review, helpful: review.helpful + 1 }
          : review
      )
    );
  };

  const handleReport = (reviewId) => {
    // In a real app, this would send a report to moderators
    console.log('Review reported:', reviewId);
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <SafeIcon
        key={i}
        icon={FiStar}
        className={`h-5 w-5 ${
          i < Math.floor(rating) ? 'text-amber-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const filteredReviews = reviews.filter(review => {
    if (filterRating === 'all') return true;
    return review.rating === parseInt(filterRating);
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-purple-900 mb-4 font-cinzel">
            Noble Reviews
          </h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 font-crimson">
            What fellow nobles say about this establishment
          </p>
        </motion.div>

        {/* Reviews Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-purple-100"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Average Rating */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-4 mb-4">
                <span className="text-5xl font-bold text-purple-900 font-cinzel">
                  {calculateAverageRating()}
                </span>
                <div>
                  <div className="flex items-center space-x-1 mb-2">
                    {renderStars(calculateAverageRating())}
                  </div>
                  <p className="text-gray-600 font-crimson">
                    Based on {reviews.length} reviews
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowReviewForm(true)}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-cinzel font-semibold hover:bg-purple-700 transition-colors"
              >
                <SafeIcon icon={FiEdit3} className="h-4 w-4" />
                <span>Write a Review</span>
              </button>
            </div>

            {/* Rating Distribution */}
            <div>
              <h3 className="text-lg font-bold text-purple-900 mb-4 font-cinzel">
                Rating Distribution
              </h3>
              {Object.entries(getRatingDistribution()).reverse().map(([rating, count]) => (
                <div key={rating} className="flex items-center space-x-3 mb-2">
                  <span className="text-sm font-medium text-gray-600 w-8">
                    {rating}★
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-amber-400 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: reviews.length > 0 ? `${(count / reviews.length) * 100}%` : '0%'
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Review Form */}
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <ReviewForm
              restaurantId={restaurantId}
              onSubmit={handleSubmitReview}
              onCancel={() => setShowReviewForm(false)}
            />
          </motion.div>
        )}

        {/* Filters and Sort */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <SafeIcon icon={FiFilter} className="h-5 w-5 text-purple-600" />
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-crimson"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-4">
              <SafeIcon icon={FiTrendingUp} className="h-5 w-5 text-purple-600" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-crimson"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <UserReview
                  review={review}
                  onHelpful={handleHelpful}
                  onReport={handleReport}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiStar} className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-600 mb-2 font-cinzel">
                No Reviews Yet
              </h3>
              <p className="text-gray-500 font-crimson">
                Be the first to share your royal experience!
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;