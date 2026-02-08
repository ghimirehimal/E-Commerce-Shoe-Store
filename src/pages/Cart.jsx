import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from '../apps/Reducers/CartSlice';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { ShoppingCart } from 'lucide-react';

function Cart() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart || { items: [] });
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 mt-36">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <ShoppingCart className="mx-auto h-24 w-24 text-gray-400 mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet. Start shopping and fill it up!</p>
          <div className="space-y-4">
            <Link to="/product" className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200">
              Browse Products
            </Link>
            <Link to="/wishlist" className="block w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition duration-200">
              View Wishlist
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = items.reduce((sum, it) => sum + Number(it.finalPrice) * it.quantity, 0);

  // Voucher and discount state
  const [voucherCode, setVoucherCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  // Mock voucher codes and their discount percentages
  const validVouchers = {
    'SAVE10': 10,
    'DISCOUNT20': 20,
    'OFFER15': 15,
    'PROMO5': 5
  };

  // Calculate total quantity
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  // Shipping logic: Free shipping over Rs. 500 OR over 5 items
  // Otherwise Rs. 50, but reduce by Rs. 5 for every additional item after 2
  const baseShipping = subtotal > 500 || totalQuantity >= 5 ? 0 : 50;
  const quantityDiscount = totalQuantity > 2 ? (totalQuantity - 2) * 5 : 0;
  const shipping = Math.max(0, baseShipping - quantityDiscount);

  const applyVoucher = () => {
    const code = voucherCode.toUpperCase().trim();
    if (validVouchers[code]) {
      const discountPercent = validVouchers[code];
      const discountAmount = (subtotal * discountPercent) / 100;
      setDiscountPercentage(discountPercent);
      setAppliedDiscount(discountAmount);
      setVoucherCode('');
    } else {
      alert('Invalid voucher code');
    }
  };

  const removeVoucher = () => {
    setDiscountPercentage(0);
    setAppliedDiscount(0);
  };

  const total = subtotal + shipping - appliedDiscount;

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please log in to proceed with checkout');
      navigate('/login');
      return;
    }

    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    // Create order object
    const newOrder = {
      id: `ORD${Date.now()}`,
      customerName: user.name || user.email.split('@')[0],
      customerEmail: user.email,
      products: items.map(item => ({
        id: item._id,
        title: item.title,
        quantity: item.quantity,
        price: item.finalPrice
      })),
      totalAmount: total,
      status: 'Pending',
      paymentStatus: 'Unpaid',
      paymentMethod: null,
      orderDate: new Date().toISOString().split('T')[0],
      deliveryDate: null,
      shippingAddress: 'Default Address' // In a real app, this would come from user profile
    };

    // Load existing orders
    const storedOrders = localStorage.getItem('userOrders');
    const existingOrders = storedOrders ? JSON.parse(storedOrders) : [];

    // Add new order
    const updatedOrders = [...existingOrders, newOrder];
    localStorage.setItem('userOrders', JSON.stringify(updatedOrders));

    // Clear cart
    dispatch(clearCart());

    toast.success('Order placed successfully! Please complete payment in Orders section.');
    navigate('/orders');
  };

  return (
    <div className="p-8 max-w-6xl mx-auto mt-36">
      <h2 className="text-3xl mb-6">Your Cart</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Items list */}
        <div className="md:col-span-2 flex flex-col">
          {items.map((item) => (
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

                  <div className="px-4 py-2 bg-background text-text rounded">{item.quantity}</div>

                  <button
                    onClick={() => dispatch(increaseQuantity(item._id))}
                    className="viewdetails-btn"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>

                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="viewdetails-btn ml-4"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="text-text font-semibold">Rs. {Number(item.finalPrice) * item.quantity}</p>
                <p className="text-muted text-sm">(item total)</p>
              </div>
            </div>
          ))}

          <div className="mt-6 flex justify-between">
            <button onClick={() => dispatch(clearCart())} className="viewdetails-btn">Clear Cart</button>
            <Link to="/" className="viewdetails-btn">Continue Shopping</Link>
          </div>
        </div>

        {/* Order summary */}
        <aside className="bg-surface p-6 rounded h-fit">
          <h4 className="text-xl mb-4">Order Summary</h4>

          {/* Voucher Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-text mb-2">Have a Voucher?</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                placeholder="Enter voucher code"
                className="flex-1 px-3 py-2 border border-background rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                onClick={applyVoucher}
                className="viewdetails-btn px-4 py-2 text-sm"
              >
                Apply
              </button>
            </div>
            {discountPercentage > 0 && (
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-green-600">Discount ({discountPercentage}%)</span>
                <button
                  onClick={removeVoucher}
                  className="text-red-500 hover:text-red-700 text-xs"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-muted">Subtotal</span>
              <span className="text-text">Rs. {subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted">Shipping</span>
              <span className="text-text">
                {shipping === 0 ? 'Free' : `Rs. ${shipping}`}
              </span>
            </div>

            {appliedDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>- Rs. {appliedDiscount.toFixed(2)}</span>
              </div>
            )}

            <div className="border-t pt-2">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold">Total</span>
                <span className="text-xl font-semibold text-primary">Rs. {total.toFixed(2)}</span>
              </div>
            </div>

            <button onClick={handleCheckout} className="buynow-btn w-full mt-4">Proceed to Checkout</button>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Cart