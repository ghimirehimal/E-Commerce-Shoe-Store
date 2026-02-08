import React, { createContext, useContext, useState, useEffect } from 'react';
import mockReviews from '../data/mockReviews';

const ReviewsContext = createContext();

export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
};

export const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState(mockReviews);
  const [loading, setLoading] = useState(false);

  // Load reviews from localStorage on mount
  useEffect(() => {
    const storedReviews = localStorage.getItem('productReviews');
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    } else {
      localStorage.setItem('productReviews', JSON.stringify(mockReviews));
    }
  }, []);

  // Save reviews to localStorage whenever reviews change
  useEffect(() => {
    localStorage.setItem('productReviews', JSON.stringify(reviews));
  }, [reviews]);

  // Add a new review
  const addReview = (productId, reviewData) => {
    const newReview = {
      id: Date.now(),
      userId: reviewData.userId,
      userName: reviewData.userName,
      userAvatar: reviewData.userAvatar || null,
      rating: reviewData.rating,
      title: reviewData.title,
      comment: reviewData.comment,
      date: new Date().toISOString().split('T')[0],
      verified: reviewData.verified || false,
      helpful: 0,
      images: reviewData.images || []
    };

    setReviews(prevReviews => ({
      ...prevReviews,
      [productId]: [...(prevReviews[productId] || []), newReview]
    }));

    return newReview;
  };

  // Get reviews for a specific product
  const getProductReviews = (productId) => {
    return reviews[productId] || [];
  };

  // Calculate average rating for a product
  const getProductAverageRating = (productId) => {
    const productReviews = getProductReviews(productId);
    if (productReviews.length === 0) return 0;

    const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round((totalRating / productReviews.length) * 10) / 10;
  };

  // Get rating distribution for a product
  const getProductRatingDistribution = (productId) => {
    const productReviews = getProductReviews(productId);
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    productReviews.forEach(review => {
      distribution[review.rating] = (distribution[review.rating] || 0) + 1;
    });

    return distribution;
  };

  // Mark review as helpful
  const markReviewHelpful = (productId, reviewId) => {
    setReviews(prevReviews => ({
      ...prevReviews,
      [productId]: prevReviews[productId].map(review =>
        review.id === reviewId
          ? { ...review, helpful: review.helpful + 1 }
          : review
      )
    }));
  };

  const value = {
    reviews,
    loading,
    addReview,
    getProductReviews,
    getProductAverageRating,
    getProductRatingDistribution,
    markReviewHelpful
  };

  return (
    <ReviewsContext.Provider value={value}>
      {children}
    </ReviewsContext.Provider>
  );
};
