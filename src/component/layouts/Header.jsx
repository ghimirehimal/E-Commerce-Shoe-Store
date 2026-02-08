import React, { useState } from "react";
import { User } from "lucide-react";
import { CiMail } from "react-icons/ci";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { BsCart } from "react-icons/bs";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../../contexts/AuthContext";

function Header() {
    const cartCount = useSelector((state) => state.cart.count);
    const wishCount = useSelector((state) => state.wish.items.length);
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <div className="bg-background shadow-sm">

    <header className="text-sm fixed top-0 left-0 right-0 z-50 bg-background shadow-sm">

      {/* TOP BAR */}
      <div className="container flex flex-col gap-2 px-3 sm:px-3 md:px-12  py-2 text-black md:flex-row md:justify-between md:items-center">

        {/* Contact info */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-1 md:gap-4 cursor-pointer sm:px-6">
                <CiMail />
                <a href="mailto:hetkofurniture@gmail.com">
                  <p>supporthamroramro@.com</p>
                </a>
              </div>
              <div className="flex items-center gap-1">
                <MdOutlinePhoneInTalk className="cursor-pointer" />
                <a href="tel:+1234567890"> +977 9745946999</a>
              </div>
            </div>


        {/* Right actions */}
        <div className="flex items-center gap-8 text-text">

          {/* Language selector */}
          <div className="relative group">
            <button className="flex items-center gap-1 font-medium hover:text-secondary transition-colors">
              English
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute right-0 mt-2 w-32 bg-surface border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
              <button className="w-full px-4 py-2 text-left hover:bg-primary hover:text-white rounded-lg transition-colors">English</button>
              <button className="w-full px-4 py-2 text-left hover:bg-primary hover:text-white rounded-lg transition-colors">नेपाली</button>
            </div>
          </div>

          {/* Wishlist */}
          <Link to="/wishlist" className="relative flex items-center gap-1">
            <span className="hidden md:inline">Wishlist</span>
            <FaRegHeart />
            {wishCount > 0 && (
              <span className="absolute -top-2 -right-2 h-4 w-4 text-xs flex items-center justify-center text-white bg-red-500 rounded-full">
                {wishCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative h-10 w-10 flex items-center justify-center">
            <BsCart />
             {cartCount > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 text-xs flex items-center justify-center text-white bg-red-500 rounded-full">
                {cartCount}
              </span>)}
                
          </Link>

          {/* Profile */}
          {isAuthenticated() ? (
            <div className="relative group">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-1 font-medium hover:text-blue-600 transition-colors cursor-pointer"
              >
                <User size={18} className="hover:scale-110 transition-transform" />
                <span>{user?.name || 'Profile'}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''} group-hover:rotate-180`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {(profileDropdownOpen || true) && (
                <div className={`absolute right-0 mt-2 w-48 bg-background border rounded-md shadow-lg z-50 transition-all duration-300 ${
                  profileDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'
                }`}>
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-primary rounded-md transition-colors relative overflow-hidden"
                  >
                    <span className="relative z-10">My Profile</span>
                    <div className="absolute inset-0 bg-primary opacity-0 hover:opacity-20 transition-opacity"></div>
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      navigate('/');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-red-100 rounded-md transition-colors relative overflow-hidden"
                  >
                    <span className="relative z-10">Logout</span>
                    <div className="absolute inset-0 bg-red-500 opacity-0 hover:opacity-20 transition-opacity"></div>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="hover:underline">Login</Link>
              <span>/</span>
              <Link to="/signup" className="hover:underline">Sign Up</Link>
            </div>
          )}
        </div>
      </div>

      {/* NAV BAR */}
      <div className="container mx-auto flex items-center justify-between px-3 sm:px-3 md:px-12 h-14">

        <Link to="/" className="text-2xl font-bold tracking-wide text-gradient">
          Jutta Lagani
        </Link>

        <nav className="hidden md:flex items-center gap-16 text-sm font-medium text-text">
          {["/", "/product", "/contact", "/orders"].map((path, i) => {
            const labels = ["HOME", "SHOP", "CONTACT", "ORDERS"];
            return (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-text font-semibold"
                    : "hover:border-b-2 hover:border-text pb-1"
                }
              >
                {labels[i]}
              </NavLink>
            );
          })}
        </nav>
      </div>

    </header>
    </div>
  );
}

export default Header;
