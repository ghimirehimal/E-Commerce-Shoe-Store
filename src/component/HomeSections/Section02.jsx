import React, { useState } from "react";
import mockProducts from "../../data/mockproducts";
import ProductCard from "../product/ProductCard";

function Section02() {
  const navItems = [ "Men", "Women", "Unisex", "Casual"];
  const [activeCategory, setActiveCategory] = useState("Men");
  const [visibleCount, setVisibleCount] = useState(4);

  // FILTER LOGIC 
  const filteredProducts =
    mockProducts.find(item => item.category === activeCategory)
      ?.products || [];

  // Products to display
  const visibleProducts = filteredProducts.slice(0, visibleCount);

  // Load more handler
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  
  return (
    <div className="px-8 mx-auto container py-12">
      {/* Heading */}
      <div className="flex justify-center mb-6">
        <h2 className="text-2xl md:text-4xl font-semibold text-text">
          Hamro Ramro
        </h2>
      </div>

      {/* Navigation tabs */}
      <ul className="flex justify-center gap-4 md:gap-10 mb-8 text-l">
        {navItems.map(item => (
          <li
            key={item}
            onClick={() => setActiveCategory(item)}
            className={`cursor-pointer font-medium transition-colors duration-300 ${
              activeCategory === item ? "text-text border-b-3 border-text" : "text-primary hover: transition pb-2"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>

      {/* Products grid */}
      {visibleProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Load More button */}
          {visibleCount < filteredProducts.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 bg-primary text-white rounded-md font-medium hover:bg-[#081243] transition"
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">No products found</p>
      )}
    </div>
  );
}

export default Section02;
