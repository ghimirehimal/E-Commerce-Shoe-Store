import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Section01() {
  const { banners } = useSelector(state => state.banner);

  // Filter active banners and check scheduling
  const activeBanners = banners.filter(banner => {
    if (!banner.isActive) return false;

    const now = new Date();
    const startDate = banner.startDate ? new Date(banner.startDate) : null;
    const endDate = banner.endDate ? new Date(banner.endDate) : null;

    if (startDate && now < startDate) return false;
    if (endDate && now > endDate) return false;

    return true;
  });

  const slides = activeBanners.length > 0 ? activeBanners : banners.slice(0, 3);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="hero-bg text-white relative overflow-hidden mt-22">
      {/* Slider */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full shrink-0 relative">
            <img
              src={slide.image}
              alt={slide.title}
                className="w-full h-65 sm:h-85 md:h-105 lg:h-125 xl:h-145 object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 "></div>

            {/* Text on Image */}
            <div className="absolute inset-0 flex items-center">
              <div className="ml-6 sm:ml-10 md:ml-25 text-white ">
                <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold leading-tight">
                  {slide.title}
                </h2>
                <p className="mt-2 text-xl sm:text-2xl md:text-3xl font-semibold">
                  {slide.discount}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-6 h-2 rounded-full transition-all ${
              idx === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Section01;
