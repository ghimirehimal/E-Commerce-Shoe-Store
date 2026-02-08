import React from 'react';

function Dashboard() {
  const stats = [
    {
      title: 'Total Users',
      value: '0',
      subtitle: '0 active',
      color: 'bg-blue-500',
      icon: '👥'
    },
    {
      title: 'Total Orders',
      value: '0',
      subtitle: '0 delivered',
      color: 'bg-green-500',
      icon: '📦'
    },
    {
      title: 'Total Revenue',
      value: '$0',
      subtitle: 'All time',
      color: 'bg-yellow-500',
      icon: '💰'
    },
    {
      title: 'Total Products',
      value: '0',
      subtitle: 'In inventory',
      color: 'bg-purple-500',
      icon: '🛍️'
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's an overview of your store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.subtitle}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color} text-white text-2xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
          <button className="text-blue-600 hover:text-blue-800 font-medium">View All</button>
        </div>

        <div className="text-center py-8 text-gray-500">
          <p>No orders yet</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <span className="mr-2">📦</span>
            Add New Product
          </button>
          <button className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <span className="mr-2">👤</span>
            Add New User
          </button>
          <button className="flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <span className="mr-2">📊</span>
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
