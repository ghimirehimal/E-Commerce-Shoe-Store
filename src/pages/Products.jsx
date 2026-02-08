  import React, { useState, useMemo } from 'react';
import ProductCard from '../component/product/ProductCard';
import mockProducts from '../data/mockproducts';

function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceSort, setPriceSort] = useState('low-to-high');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sliderValue, setSliderValue] = useState(500);

  // Flatten products from all categories
  const allProducts = useMemo(() => {
    return mockProducts.flatMap(category => category.products);
  }, []);

  // Get price range for slider
  const priceRangeLimits = useMemo(() => {
    const prices = allProducts.map(p => p.finalPrice);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }, [allProducts]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.gender === selectedCategory);
    }

    // Filter by price range
    if (priceRange.min !== '') {
      filtered = filtered.filter(product => product.finalPrice >= parseInt(priceRange.min));
    }
    if (priceRange.max !== '') {
      filtered = filtered.filter(product => product.finalPrice <= parseInt(priceRange.max));
    }

    // Filter by slider (max price)
    filtered = filtered.filter(product => product.finalPrice <= sliderValue);

    // Sort by price
    filtered.sort((a, b) => {
      if (priceSort === 'low-to-high') {
        return a.finalPrice - b.finalPrice;
      } else {
        return b.finalPrice - a.finalPrice;
      }
    });

    return filtered;
  }, [allProducts, selectedCategory, priceSort, priceRange, sliderValue]);

  const categories = ['All', 'Women', 'Men', 'Unisex'];

  const handlePriceInputChange = (type, value) => {
    setPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Sidebar */}
        <div className="lg:w-1/4 bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Filters</h2>

          {/* Gender/Category Filter */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Gender</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Price Sort */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Sort by Price</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setPriceSort('low-to-high')}
                className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-all ${
                  priceSort === 'low-to-high'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Low to High
              </button>
              <button
                onClick={() => setPriceSort('high-to-low')}
                className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-all ${
                  priceSort === 'high-to-low'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                High to Low
              </button>
            </div>
          </div>

          {/* Price Range Inputs */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Price Range</h3>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => handlePriceInputChange('min', e.target.value)}
                className="w-1/2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => handlePriceInputChange('max', e.target.value)}
                className="w-1/2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Price Slider */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
              Max Price: Rs. {sliderValue}
            </h3>
            <input
              type="range"
              min={priceRangeLimits.min}
              max={priceRangeLimits.max}
              value={sliderValue}
              onChange={(e) => setSliderValue(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Rs. {priceRangeLimits.min}</span>
              <span>Rs. {priceRangeLimits.max}</span>
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => {
              setSelectedCategory('All');
              setPriceSort('low-to-high');
              setPriceRange({ min: '', max: '' });
              setSliderValue(priceRangeLimits.max);
            }}
            className="w-full bg-red-500 text-white py-2 rounded font-medium hover:bg-red-600 transition"
          >
            Clear All Filters
          </button>
        </div>

        {/* Products Section */}
        <div className="lg:w-3/4">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Shop Shoes ({filteredProducts.length} items)
            </h1>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">No products found matching your filters.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setPriceSort('low-to-high');
                  setPriceRange({ min: '', max: '' });
                  setSliderValue(priceRangeLimits.max);
                }}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
