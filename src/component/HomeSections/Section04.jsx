import React, { useEffect, useState } from "react";
import section04 from "../../data/section04";
import ProductCard from "../product/ProductCard";

function Section04() {
  const ITEMS_DESKTOP = 4;
  const ITEMS_MOBILE = 4; // ✅ 2x2 on mobile

  const [itemsPerSlide, setItemsPerSlide] = useState(ITEMS_DESKTOP);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Responsive logic
  useEffect(() => {
    const handleResize = () => {
      const newItems =
        window.innerWidth < 768 ? ITEMS_MOBILE : ITEMS_DESKTOP;

      setItemsPerSlide(newItems);
      setCurrentSlide(0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Split into slides
  const slides = [];
  for (let i = 0; i < section04.length; i += itemsPerSlide) {
    slides.push(section04.slice(i, i + itemsPerSlide));
  }

  // Auto slide
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev + 1 >= slides.length ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="px-4 mx-auto container py-12 overflow-hidden">
      {/* Title */}
      <div className="flex justify-center mb-6 md:mb-8">
        <h2 className="text-xl md:text-4xl font-semibold text-text">
          Featured Products
        </h2>
      </div>

      {/* Slider */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="min-w-full shrink-0 px-2 md:px-4"
          >
            <div className="grid grid-cols-2 md:grid-cols-4">
              {slide.map((product) => (
                <div key={product._id} className="p-2 md:p-3">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-3 mt-5 md:mt-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 w-4 rounded-sm transition ${
              index === currentSlide
                ? "bg-text"
                : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Section04;
