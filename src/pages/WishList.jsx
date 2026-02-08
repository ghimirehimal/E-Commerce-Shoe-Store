import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { removeFromwish, increaseQuantity, decreaseQuantity, clearwish } from '../apps/Reducers/wishList';
import { addToCart } from '../apps/Reducers/CartSlice';
import { Heart } from 'lucide-react';

function WishList() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.wish || { items: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 mt-36">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <Heart className="mx-auto h-24 w-24 text-red-400 mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added anything to your wishlist yet. Start adding favorites!</p>
          <div className="space-y-4">
            <Link to="/product" className="block w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition duration-200">
              Browse Products
            </Link>
            <Link to="/cart" className="block w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition duration-200">
              View Cart
            </Link>
          </div>
        </div>
      </div>
    );
  }



  const totalItems = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalValue = items.reduce((sum, item) => sum + Number(item.finalPrice) * (item.quantity || 1), 0);

  // Filter and sort items
  const filteredItems = items
    .filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'price-low') {
        return Number(a.finalPrice) - Number(b.finalPrice);
      } else if (sortBy === 'price-high') {
        return Number(b.finalPrice) - Number(a.finalPrice);
      }
      return 0;
    });

  const moveToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(removeFromwish(item._id));
  };

  return (
    <div className="p-8 max-w-6xl mx-auto mt-36">
      <h2 className="text-3xl mb-6">Your Wishlist</h2>

      {/* Search and Sort Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search wishlist..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="name">Sort by Name</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Items list */}
        <div className="md:col-span-2 flex flex-col">
          {filteredItems.map((item) => (
            <div key={item._id} className="flex items-center gap-4 p-4 bg-surface rounded mb-4">
              <img src={item.image} alt={item.title} className="w-24 h-24 object-contain rounded" />

              <div className="flex-1">
                <h3 className="text-text font-semibold">{item.title}</h3>
                <p className="text-muted text-sm">Rs. {item.finalPrice}</p>

                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={() => { if (item.quantity > 1) dispatch(decreaseQuantity(item._id)); }}
                    className={`viewdetails-btn ${item.quantity === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    aria-label="Decrease quantity"
                    title={item.quantity > 1 ? 'Decrease quantity' : 'Minimum quantity is 1'}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>

                  <div className="px-4 py-2 bg-background text-text rounded">{item.quantity || 1}</div>

                  <button
                    onClick={() => dispatch(increaseQuantity(item._id))}
                    className="viewdetails-btn"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>

                  <button
                    onClick={() => dispatch(removeFromwish(item._id))}
                    className="viewdetails-btn ml-4"
                  >
                    Remove
                  </button>

                  <button
                    onClick={() => moveToCart(item)}
                    className="buynow-btn ml-4"
                  >
                    Move to Cart
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="text-text font-semibold">Rs. {Number(item.finalPrice) * (item.quantity || 1)}</p>
                <p className="text-muted text-sm">(item total)</p>
              </div>
            </div>
          ))}

          <div className="mt-6 flex justify-between">
            <button onClick={() => dispatch(clearwish())} className="viewdetails-btn">Clear Wishlist</button>
            <Link to="/" className="viewdetails-btn">Continue Shopping</Link>
          </div>
        </div>


      </div>
    </div>
  );
}

export default WishList;