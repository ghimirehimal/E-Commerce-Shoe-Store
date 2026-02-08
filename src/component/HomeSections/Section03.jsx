import React from "react";
import shoeimg from "../../assets/images/Banner/banner04.png"


function Section03() {
  return (
    <section className="container mx-auto px-4 md:px-0   text-text">
      {/* Hero Banner */}
      <div className="relative overflow-hidden  bg-background">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-12 px-8 py-12 md:px-26 md:py-26">
          
          {/* Left Content */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-6xl font-bold leading-tight">
              Newbalance Running <br /> Sneakers
            </h1>
            <p className=" text-justify">
            Shoes that transform your body language and attitude.
            Experience unmatched comfort, modern design, and performance 
            that moves with you—every single step. Built to boost confidence, 
            engineered for all-day wear, and styled to stand out wherever you go. 
            This isn’t just footwear—it’s how you show up.

            </p>

            <button className="mt-4 inline-block border-b border-white pb-1 text-sm font-semibold hover:opacity-80 transition">
              SHOP NOW
            </button>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center md:justify-end">
            <img
              src={shoeimg}
              alt="Running Shoe"
              className="w-70 md:w-160 drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

  
    </section>
  );
}

export default Section03;
