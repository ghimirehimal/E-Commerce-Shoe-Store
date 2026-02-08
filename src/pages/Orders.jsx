import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import mockOrders from '../data/mockOrders';
import { FaWallet, FaCreditCard, FaMobile, FaUniversity } from 'react-icons/fa';
import toast from 'react-hot-toast';

function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    // Load orders from localStorage or use mockOrders
    const storedOrders = localStorage.getItem('userOrders');
    let allOrders = storedOrders ? JSON.parse(storedOrders) : mockOrders;

    // Filter orders for the current user
    let userOrders = allOrders.filter(order => order.customerEmail === user.email);

    // If no orders found, create sample orders for demo
    if (userOrders.length === 0) {
      const sampleOrders = mockOrders.slice(0, 2).map(order => ({
        ...order,
        customerEmail: user.email,
        customerName: user.name || user.email.split('@')[0],
        id: `ORD${Date.now()}${Math.random().toString(36).substr(2, 9)}`
      }));
      userOrders = sampleOrders;
      // Save to localStorage
      const updatedAllOrders = [...allOrders, ...sampleOrders];
      localStorage.setItem('userOrders', JSON.stringify(updatedAllOrders));
    }

    setOrders(userOrders);
  }, [user]);

  const handlePayment = (orderId, paymentMethod) => {
    // Simulate payment success
    toast.success(`Payment successful via ${paymentMethod}!`);

    // Update order status
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          paymentStatus: 'Paid',
          paymentMethod: paymentMethod,
          status: order.status === 'Pending' ? 'Processing' : order.status
        };
      }
      return order;
    });

    setOrders(updatedOrders);
    localStorage.setItem('userOrders', JSON.stringify(updatedOrders));
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Please log in to view your orders</h2>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">No orders found</h2>
        <p className="text-gray-600">You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="space-y-6">
        {orders.map(order => (
          <div key={order.id} className="bg-white shadow-md rounded-lg p-6">
            <div className="flex flex-col md:flex-row justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">Order #{order.id}</h3>
                <p className="text-gray-600">Ordered on: {order.orderDate}</p>
                <p className="text-gray-600">Status: <span className={`font-medium ${order.status === 'Delivered' ? 'text-green-600' : order.status === 'Processing' ? 'text-blue-600' : 'text-yellow-600'}`}>{order.status}</span></p>
                <p className="text-gray-600">Payment: <span className={`font-medium ${order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>{order.paymentStatus}</span></p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">Total: Rs. {order.totalAmount}</p>
                <p className="text-sm text-gray-600">Shipping to: {order.shippingAddress}</p>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Products:</h4>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {order.products.map(product => (
                  <li key={product.id}>{product.title} (Qty: {product.quantity}) - Rs. {product.price}</li>
                ))}
              </ul>
            </div>

            {order.paymentStatus !== 'Paid' && (
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Complete Payment</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button
                    onClick={() => handlePayment(order.id, 'eSewa')}
                    className="flex items-center justify-center gap-2 bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition"
                  >
                    <FaWallet /> eSewa
                  </button>
                  <button
                    onClick={() => handlePayment(order.id, 'Khalti')}
                    className="flex items-center justify-center gap-2 bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 transition"
                  >
                    <FaCreditCard /> Khalti
                  </button>
                  <button
                    onClick={() => handlePayment(order.id, 'IME Pay')}
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                  >
                    <FaMobile /> IME Pay
                  </button>
                  <button
                    onClick={() => handlePayment(order.id, 'Banking')}
                    className="flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
                  >
                    <FaUniversity /> Banking
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
