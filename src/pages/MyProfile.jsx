import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSelector } from 'react-redux';
import { User, Mail, Phone, MapPin, Calendar, ShoppingBag, Heart, Settings } from 'lucide-react';

function MyProfile() {
  const { user } = useAuth();
  const cartCount = useSelector((state) => state.cart.count);
  const wishCount = useSelector((state) => state.wish.items.length);

  // Mock orders data - replace with actual API call
  const [orders] = useState([
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 299.99,
      items: ['Nike Air Max', 'Adidas Ultraboost']
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'In Transit',
      total: 149.50,
      items: ['Puma Sneakers']
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'Processing',
      total: 89.99,
      items: ['Reebok Classic']
    }
  ]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'in transit':
        return 'text-blue-600 bg-blue-100';
      case 'processing':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account and view your orders</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Profile Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-gray-900">{user?.name || 'User'}</h2>
                  <p className="text-gray-600">{user?.role || 'Customer'}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">{user?.email}</span>
                </div>

                {user?.phone && (
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-700">{user.phone}</span>
                  </div>
                )}

                {user?.address && (
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-700">{user.address}</span>
                  </div>
                )}

                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">Joined {user?.joinDate || 'Recently'}</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{cartCount}</div>
                    <div className="text-sm text-gray-600">Cart Items</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{wishCount}</div>
                    <div className="text-sm text-gray-600">Wishlist</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Orders and Activity */}
          <div className="lg:col-span-2 space-y-6">

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <ShoppingBag className="w-6 h-6 mr-2" />
                  Recent Orders
                </h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View All Orders
                </button>
              </div>

              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-gray-900">Order #{order.id}</div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {order.items.join(', ')}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{order.date}</span>
                      <span className="font-semibold text-gray-900">${order.total}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center mb-6">
                <Settings className="w-6 h-6 mr-2" />
                Account Settings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <User className="w-5 h-5 text-gray-400 mr-3" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Edit Profile</div>
                    <div className="text-sm text-gray-600">Update your personal information</div>
                  </div>
                </button>

                <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Addresses</div>
                    <div className="text-sm text-gray-600">Manage delivery addresses</div>
                  </div>
                </button>

                <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart className="w-5 h-5 text-gray-400 mr-3" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Wishlist</div>
                    <div className="text-sm text-gray-600">View saved items</div>
                  </div>
                </button>

                <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <ShoppingBag className="w-5 h-5 text-gray-400 mr-3" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Order History</div>
                    <div className="text-sm text-gray-600">View all past orders</div>
                  </div>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
