// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import axios from 'axios';
// import {Users} from "Admin/Users"

// const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5173";
// function Users() {
//   const { allUsers, setAllUsers } = useAuth();
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterRole, setFilterRole] = useState('All');

//   useEffect(() => {
//     setUsers(allUsers);
//   }, [allUsers]);

//   // Filter users based on search and role
//   const filteredUsers = users.filter(user => {
//     const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesRole = filterRole === 'All' || user.role === filterRole;
//     return matchesSearch && matchesRole;
//   });

//   const handleStatusChange = (userId, newStatus) => {
//     const updatedUsers = users.map(user =>
//       user.id === userId ? { ...user, status: newStatus } : user
//     );
//     setUsers(updatedUsers);
//     setAllUsers(updatedUsers);
//     localStorage.setItem('allUsers', JSON.stringify(updatedUsers));
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
//           Add New User
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="bg-white p-4 rounded-lg shadow mb-6">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1">
//             <input
//               type="text"
//               placeholder="Search by name or email..."
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <div>
//             <select
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               value={filterRole}
//               onChange={(e) => setFilterRole(e.target.value)}
//             >
//               <option value="All">All Roles</option>
//               <option value="User">User</option>
//               <option value="Admin">Admin</option>
//               <option value="Staff">Staff</option>
//               <option value="Manager">Manager</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Users Table */}
//       <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full table-auto">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredUsers.map((user) => (
//                 <tr key={user.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-medium text-gray-900">{user.name}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowraap">
//                     <div className="text-sm text-gray-500">{user.email}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">{user.age}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                       user.role === 'Admin' ? 'bg-red-100 text-red-800' :
//                       user.role === 'Manager' ? 'bg-purple-100 text-purple-800' :
//                       user.role === 'Staff' ? 'bg-blue-100 text-blue-800' :
//                       'bg-gray-100 text-gray-800'
//                     }`}>
//                       {user.role}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                       user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                     }`}>
//                       {user.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joinDate}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.ordersCount}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <select
//                       className="px-2 py-1 border border-gray-300 rounded text-xs"
//                       value={user.status}
//                       onChange={(e) => handleStatusChange(user.id, e.target.value)}
//                     >
//                       <option value="Active">Active</option>
//                       <option value="Inactive">Inactive</option>
//                     </select>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Summary */}
//       <div className="mt-6 bg-white p-4 rounded-lg shadow">
//         <p className="text-sm text-gray-600">
//           Showing {filteredUsers.length} of {users.length} users
//         </p>
//       </div>
//     </div>
//   );
// }
// export default Users;


import React,{useState, useEffect} from 'react'
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5173";
function Users() {
    const [users, setUsers] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please login again.");
        }

        const response = await axios.get(`${BASE_URL}/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        
        setUsers(response.data);
      } catch (err) {
        console.error("Failed to load users:", err.message);
        setUsers([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center font-semibold">
        Loading users...
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center font-semibold">
        No users found.
      </div>
    );
  }
  return (
    <div className = "flex flex-col bg-green-300">
      <table>
        <caption> Welcome to the Users Information </caption>
        <thead>
            <tr>
                <th> Name </th>
                <th> Email </th>
                <th> Age</th>
                <th> Address</th>
                <th> Phone Number</th>
                <th> Role </th>
            </tr>
        </thead>
        <tbody>
                {
                    users.map((user)=>(
                        <tr key={user._id} className = "bg-amber-100">
                            <td className = "px-3 py-4"> {user.name}</td>
                            <td className = "px-4 py-3"> {user.email}</td>
                            <td className = "px-4 py-3"> {user.age}</td>
                            <td className = "px-4 py-3"> {user.address}</td>
                            <td className = "px-4 py-3"> {user.phone}</td>
                            <td className = "px-4 py-3"> {user.role}</td>
                              
                           
                        </tr>
                    ))
                }
        </tbody>
      </table>
    </div>
  )
}

export default Users;

