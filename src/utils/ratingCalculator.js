// Rating calculation logic based on product attributes
export const calculateProductRating = (product) => {
  let ratingScore = 0;
  let maxScore = 50; // Maximum possible score

  // Price factor (higher price = potentially higher rating, but with diminishing returns)
  const priceFactor = Math.min(product.price / 200, 1) * 10; // Max 10 points for price up to $200
  ratingScore += priceFactor;

  // Discount factor (higher discount = slightly higher rating due to perceived value)
  const discountFactor = (product.discount / 100) * 5; // Max 5 points for 100% discount
  ratingScore += discountFactor;

  // Features factor (more features = higher rating)
  const featuresFactor = Math.min(product.features.length * 2, 8); // Max 8 points for features
  ratingScore += featuresFactor;

  // Origin factor (local products get slight boost)
  const originFactor = product.origin === "Made in Nepal" ? 3 : 1;
  ratingScore += originFactor;

  // Stock status factor (in stock = slight boost)
  const stockFactor = product.inStock ? 2 : 0;
  ratingScore += stockFactor;

  // Material quality factor (premium materials get higher rating)
  const premiumMaterials = ["Leather", "Memory Foam", "Knit Mesh"];
  const materialFactor = premiumMaterials.some(material =>
    product.material.includes(material) || product.soleMaterial.includes(material)
  ) ? 4 : 2;
  ratingScore += materialFactor;

  // Brand reputation factor (some brands get higher base rating)
  const premiumBrands = ["UrbanWalk", "RunX", "BoldWear", "PowerFit"];
  const brandFactor = premiumBrands.includes(product.brand) ? 3 : 1;
  ratingScore += brandFactor;

  // Calculate final rating (1-5 stars)
  const calculatedRating = Math.max(1, Math.min(5, (ratingScore / maxScore) * 5));

  // Round to 1 decimal place
  return Math.round(calculatedRating * 10) / 10;
};

// Generate reviews count based on rating and other factors
export const calculateReviewsCount = (product, calculatedRating) => {
  // Base reviews count
  let baseReviews = 50;

  // Higher rated products tend to have more reviews
  const ratingMultiplier = calculatedRating / 5;
  baseReviews *= ratingMultiplier;

  // Popular brands get more reviews
  const popularBrands = ["UrbanWalk", "RunX", "DailyStep"];
  if (popularBrands.includes(product.brand)) {
    baseReviews *= 1.5;
  }

  // Price affects review count (more expensive = more reviews)
  const priceMultiplier = Math.min(product.price / 100, 2);
  baseReviews *= priceMultiplier;

  // Add some randomness (±20%)
  const randomFactor = 0.8 + (Math.random() * 0.4);
  baseReviews *= randomFactor;

  return Math.round(baseReviews);
};

// Get rating distribution for detailed view
export const getRatingDistribution = (rating, totalReviews) => {
  const baseDistribution = {
    5: Math.max(1, Math.round(totalReviews * (rating >= 4.5 ? 0.4 : rating >= 4 ? 0.25 : 0.15))),
    4: Math.max(1, Math.round(totalReviews * (rating >= 4 ? 0.35 : 0.25))),
    3: Math.max(1, Math.round(totalReviews * 0.25)),
    2: Math.max(1, Math.round(totalReviews * 0.1)),
    1: Math.max(1, Math.round(totalReviews * 0.05))
  };

  // Adjust distribution based on overall rating
  const adjustmentFactor = rating / 5;
  Object.keys(baseDistribution).forEach(star => {
    if (parseInt(star) <= Math.floor(rating)) {
      baseDistribution[star] = Math.round(baseDistribution[star] * (1 + adjustmentFactor));
    } else {
      baseDistribution[star] = Math.round(baseDistribution[star] * (1 - adjustmentFactor));
    }
  });

  return baseDistribution;
};

// Calculate average rating from distribution
export const calculateAverageRating = (distribution) => {
  const totalReviews = Object.values(distribution).reduce((sum, count) => sum + count, 0);
  const weightedSum = Object.entries(distribution).reduce((sum, [stars, count]) => {
    return sum + (parseInt(stars) * count);
  }, 0);

  return totalReviews > 0 ? Math.round((weightedSum / totalReviews) * 10) / 10 : 0;
};
