import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../apps/Reducers/CartSlice";
import { addTowish } from "../../apps/Reducers/wishList";
import { useReviews } from "../../contexts/ReviewsContext";
import mockProducts from "../../data/mockproducts";
import section04 from "../../data/section04";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getProductAverageRating, getProductReviews } = useReviews();

  // Get real-time rating from reviews
  const averageRating = getProductAverageRating(product._id) || product.rating || 0;
  const reviewCount = getProductReviews(product._id).length || product.reviewsCount || 0;
  
  const handleWishlist = () => {
    dispatch(addTowish(product));
  };

  const handleCart = () => {
      dispatch(addToCart(product));
    console.log("Add to cart:", product._id);
  };

  const handleBuyNow = () => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  const productLink = `/product/${product._id}`;

  return (
    <div className="card relative flex flex-col items-center p-4">
      {/* Image */}
      <div className="w-24 h-36 sm:w-32 sm:h-44 md:w-48 md:h-60 lg:w-56 lg:h-72 flex items-center justify-center overflow-hidden rounded-lg bg-gray-50 border-2 border-gray-200 mb-2 relative group cursor-pointer">
        <img
          src={product.image}
          alt={product.title}
          className="max-w-full max-h-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-125 group-hover:rotate-1"
        />

        {/* Wishlist + Cart */}
        <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={handleWishlist}
          className="p-2 bg-background rounded-full shadow hover:bg-pink-100"
        >
          <FaRegHeart className="text-pink-500 size-3 md:size-4" />
        </button>

        <button
          onClick={handleCart}
          className="p-2 bg-background rounded-full shadow hover:bg-blue-100"
        >
          <ShoppingCart className="size-3 md:size-4" />
        </button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-2 text-center">
        <h3 className="text-sm font-semibold">{product.title}</h3>
        <div className="flex items-center justify-center mb-1">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`text-xs ${i < Math.floor(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
            />
          ))}
          <span className="text-xs text-gray-600 ml-1">
            ({reviewCount})
          </span>
        </div>
        <p className="text-xs text-gray-600">
          Rs. {product.finalPrice}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-4 flex flex-nowrap gap-2">
        <Link to={productLink}>
          <button className="btn-outline whitespace-nowrap">
            View Details
          </button>
        </Link>

        <button
          onClick={handleBuyNow}
          className="btn-primary whitespace-nowrap"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
