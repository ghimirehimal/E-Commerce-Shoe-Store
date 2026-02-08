import React from 'react';
import { Link } from 'react-router';
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
<div className="relative w-full h-full bg-background text-text container">
  
      {/* Footer content above animation */}
      <footer className="relative z-10 text-text  container mx-auto px-8 md:px-12 py-6 md:py-10 md:pt-20">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row gap-25">
          {/* Brand */}
          <div className="lg:w-2/5">
            <h2 className="text-2xl font-bold ">JUTTA LAGANI</h2>
           <p className="mt-4 text-sm  leading-relaxed text-justify">
            Step into style with Jutaa lagani – premium shoes crafted for unmatched comfort, durability, and fashion-forward design. 
            Every pair is carefully handmade using high-quality materials, combining modern trends with timeless craftsmanship. 
            Join thousands of satisfied customers and experience the perfect blend of style and comfort today!
          </p>

          </div>

          {/* Follow Us */}
          <div className="lg:w-1/5">
            <h3 className="text-sm font-semibold  mb-2">Follow Us</h3>
            <p className="text-sm  text-justify">
              Join the Jutta Lagani community and never miss out on our latest collections, exclusive offers, and style tips. 
            </p>
            <div className="mt-4 flex gap-4">
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 transition-colors text-xl"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="text-sky-500 hover:text-sky-700 transition-colors text-xl"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-pink-500 hover:text-pink-700 transition-colors text-xl"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

            </div>

          
          </div>

          {/* Contact */}
          <div className="lg:w-2/5">
            <h3 className="text-sm font-semibold  mb-2">Contact Us</h3>
            <p className="text-sm ">
             Jutta Lagani HQ . Sainamaina -10 saljhandi, <br />
              <span className="font-medium">Phone:</span> +977 9816413787 <br />
              <span className="font-medium">Email:</span> support@juttalagani.com
            </p>
          </div>
        </div>

      
      {/* Links Section */}
      <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-bold  uppercase tracking-wider">Quick Links</h3>
          <ul className="mt-4 space-y-3 text-sm ">
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Home</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Shop</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">New Arrivals</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Best Sellers</li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="text-sm font-bold  uppercase tracking-wider">Customer Care</h3>
          <ul className="mt-4 space-y-3 text-sm ">
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Contact Us</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">FAQs</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Shipping & Delivery</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Returns & Exchanges</li>
          </ul>
        </div>

        {/* My Account */}
        <div>
          <h3 className="text-sm font-bold  uppercase tracking-wider">My Account</h3>
          <ul className="mt-4 space-y-3 text-sm ">
            <li className="hover:text-blue-600 cursor-pointer transition-colors">
              <Link to="/login">Login / Register</Link>
            </li>

            <li className="hover:text-blue-600 cursor-pointer transition-colors">Order History</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Wishlist</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Track Order</li>
          </ul>
        </div>

        {/* Promotions */}
        <div>
          <h3 className="text-sm font-bold  uppercase tracking-wider">Promotions</h3>
          <ul className="mt-4 space-y-3 text-sm ">
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Gift Cards</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Special Offers</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Newsletter Signup</li>
            <li className="hover:text-blue-600 cursor-pointer transition-colors">Affiliate Program</li>
          </ul>
        </div>
      </div>


        {/* Bottom */}
        <div className="mt-16 border-t pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Shoe Store. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Footer;
