import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5174";

function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { adminLogin } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/login`, formData);
      const res = response.data;

      // Check if the user is an admin
      if (res.user.role === 'admin' || res.user.role === 'seller') {
        // Use AuthContext adminLogin function
        const adminData = {
          id: res.user.id,
          name: res.user.name,
          email: res.user.email,
          role: res.user.role,
        };

        adminLogin(adminData, res.token);

        // Redirect to admin dashboard
        navigate("/admin");
      } else {
        toast.error("Access denied. Admin credentials required.");
      }

    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid admin credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white p-6 sm:p-8 rounded-md shadow-md border border-blue-400">
        <h2 className="text-2xl font-bold text-center mb-2">Admin Login</h2>
        <p className="text-sm text-center mb-6 text-gray-500">
          Please login using your admin account details below.
        </p>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="email"
                placeholder="admin@test.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full border rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0A174E]"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="block text-sm font-semibold mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="******"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full border rounded-md pl-10 pr-10 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0A174E]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full viewdetails-btn py-3 rounded-md mt-2"
          >
            Login as Admin
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Not an admin?
          <a href="/login" className="text-primary ml-1 hover:underline">
            User Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default AdminLoginPage;
