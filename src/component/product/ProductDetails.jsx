import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaRegHeart, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { ShoppingCart, ArrowLeft, Truck, Shield, RotateCcw } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../apps/Reducers/CartSlice';
import { addTowish } from '../../apps/Reducers/wishList';
import { useAuth } from '../../contexts/AuthContext';
import { useReviews } from '../../contexts/ReviewsContext';
import mockProducts from '../../data/mockproducts';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth();
  const { getProductReviews, getProductAverageRating, getProductRatingDistribution, addReview, markReviewHelpful } = useReviews();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingDistribution, setRatingDistribution] = useState({});
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    title: '',
    comment: ''
  });
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    // Find product by ID from all categories
    const allProducts = mockProducts.flatMap(category => category.products);
    const foundProduct = allProducts.find(p => p._id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedSize(foundProduct.availableSizes?.[0] || '');
      setSelectedColor(foundProduct.colors?.[0] || '');
    }
  }, [id]);

  const handleWishlist = () => {
    if (product) {
      dispatch(addTowish(product));
    }
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, selectedSize, selectedColor, quantity }));
    }
  };

  const handleBuyNow = () => {
    if (product) {
      dispatch(addToCart({ ...product, selectedSize, selectedColor, quantity }));
      navigate('/cart');
    }
  };

  // Reviews functions
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!reviewForm.title.trim() || !reviewForm.comment.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const newReview = addReview(product._id, {
      userId: user.id,
      userName: user.name,
      rating: reviewForm.rating,
      title: reviewForm.title,
      comment: reviewForm.comment,
      verified: true // Assuming verified purchase for now
    });

    // Update local state
    setReviews(prev => [...prev, newReview]);
    setAverageRating(getProductAverageRating(product._id));
    setRatingDistribution(getProductRatingDistribution(product._id));

    // Reset form
    setReviewForm({ rating: 5, title: '', comment: '' });
    setShowReviewForm(false);
  };

  const handleHelpfulClick = (reviewId) => {
    markReviewHelpful(product._id, reviewId);
    // Update local state
    setReviews(prev => prev.map(review =>
      review.id === reviewId
        ? { ...review, helpful: review.helpful + 1 }
        : review
    ));
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300" />);
    }

    return stars;
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Product not found</p>
          <button
            onClick={() => navigate('/product')}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button and Collection Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/product')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Shop
        </button>

        {/* View Other Collections */}
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/product?category=sneakers')}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
          >
            View Sneakers
          </button>
          <button
            onClick={() => navigate('/product?category=shoes')}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
          >
            View Shoes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={images[activeImage]}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded border-2 overflow-hidden ${
                    activeImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-4 md:space-y-6">
          {/* Title and Brand */}
          <div>
            <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
              <div className="flex items-center">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviewsCount} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-gray-900">
              Rs. {product.finalPrice}
            </span>
            {product.discount > 0 && (
              <>
                <span className="text-lg text-gray-500 line-through">
                  Rs. {product.price}
                </span>
                <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
                  {product.discount}% OFF
                </span>
              </>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Specifications */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900">Material</h4>
              <p className="text-gray-600">{product.material}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Sole Material</h4>
              <p className="text-gray-600">{product.soleMaterial}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Fit Type</h4>
              <p className="text-gray-600">{product.fitType}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Weight</h4>
              <p className="text-gray-600">{product.weight}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Origin</h4>
              <p className="text-gray-600">{product.origin}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Gender</h4>
              <p className="text-gray-600">{product.gender}</p>
            </div>
          </div>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Features</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Size Selection */}
          {product.availableSizes && product.availableSizes.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Size</h4>
              <div className="flex flex-wrap gap-2">
                {product.availableSizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded ${
                      selectedSize === size
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Color</h4>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded ${
                      selectedColor === color
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Quantity</h4>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
              >
                -
              </button>
              <span className="px-4 py-1 border border-gray-300 rounded">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 relative">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-900 py-3 px-6 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            >
              <ShoppingCart size={20} className="group-hover:rotate-12 transition-transform" />
              <span className="group-hover:font-semibold">Add to Cart</span>
            </button>
            <button
              onClick={handleWishlist}
              className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:scale-110 hover:shadow-md group relative overflow-hidden"
            >
              <FaRegHeart className="text-pink-500 group-hover:text-red-500 group-hover:scale-125 transition-all" size={20} />
              <div className="absolute inset-0 bg-pink-100 opacity-0 group-hover:opacity-30 transition-opacity rounded-lg"></div>
            </button>
          </div>

          <button
            onClick={handleBuyNow}
            disabled={!product.inStock}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-xl group relative overflow-hidden"
          >
            <span className="relative z-10 group-hover:font-bold">Buy Now</span>
            <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
          </button>

          {/* Additional Info */}
          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center gap-3">
              <Truck className="text-green-600" size={20} />
              <div>
                <p className="font-semibold text-gray-900">Free Delivery</p>
                <p className="text-sm text-gray-600">{product.deliveryInfo}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="text-blue-600" size={20} />
              <div>
                <p className="font-semibold text-gray-900">Easy Returns</p>
                <p className="text-sm text-gray-600">{product.returnPolicy}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="text-purple-600" size={20} />
              <div>
                <p className="font-semibold text-gray-900">Secure Payment</p>
                <p className="text-sm text-gray-600">Accepted: {product.paymentMethods?.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12 border-t pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Rating Summary */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Customer Reviews</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="text-4xl font-bold text-gray-900 mr-4">
                  {averageRating || product?.rating || 0}
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    {renderStars(averageRating || product?.rating || 0)}
                  </div>
                  <p className="text-sm text-gray-600">
                    Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map(star => (
                  <div key={star} className="flex items-center text-sm">
                    <span className="w-3">{star}</span>
                    <FaStar className="text-yellow-400 mx-1" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{
                          width: `${reviews.length > 0 ? (ratingDistribution[star] || 0) / reviews.length * 100 : 0}%`
                        }}
                      ></div>
                    </div>
                    <span className="w-6 text-right">{ratingDistribution[star] || 0}</span>
                  </div>
                ))}
              </div>

              {/* Write Review Button */}
              <button
                onClick={() => isAuthenticated ? setShowReviewForm(!showReviewForm) : navigate('/login')}
                className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isAuthenticated ? 'Write a Review' : 'Login to Write Review'}
              </button>
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2">
            {/* Sort Options */}
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-lg font-semibold text-gray-900">
                Reviews ({reviews.length})
              </h4>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>

            {/* Review Form */}
            {showReviewForm && (
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h5 className="text-lg font-semibold mb-4">Write Your Review</h5>
                <form onSubmit={handleReviewSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating
                    </label>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                          className="mr-1"
                        >
                          <FaStar
                            className={star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'}
                            size={24}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {reviewForm.rating} star{reviewForm.rating !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Review Title
                    </label>
                    <input
                      type="text"
                      value={reviewForm.title}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Summarize your experience"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Review
                    </label>
                    <textarea
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Share your thoughts about this product"
                      required
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Submit Review
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Reviews List */}
            <div className="space-y-6">
              {sortedReviews.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No reviews yet. Be the first to write a review!</p>
                </div>
              ) : (
                sortedReviews.map(review => (
                  <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                          <span className="text-sm font-semibold text-gray-700">
                            {review.userName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{review.userName}</p>
                          <div className="flex items-center">
                            {renderStars(review.rating)}
                            <span className="ml-2 text-sm text-gray-600">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                            {review.verified && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
                    <p className="text-gray-700 mb-4">{review.comment}</p>

                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleHelpfulClick(review.id)}
                        className="flex items-center text-sm text-gray-600 hover:text-gray-800"
                      >
                        <span className="mr-1">👍</span>
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
