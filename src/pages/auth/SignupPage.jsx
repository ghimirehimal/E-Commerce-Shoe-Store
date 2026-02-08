import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5174";

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    age: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(`${BASE_URL}/api/signup`,formData);
    const res = response.data;

    toast.success(res.message || "Signup successful!", {
      autoClose: 3000,
    });

    setFormData({
      name: "",
      phone: "",
      address: "",
      age: "",
      email: "",
      password: "",
    });

    setTimeout(() => navigate("/login"), 3000);

  } catch (err) {
    const message =
      err.response?.data?.message || "Signup failed";

    toast.error(message, { autoClose: 4000 });
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-xl bg-white p-6 sm:p-8 rounded-md shadow-md border border-blue-400">
        <h2 className="text-3xl font-bold text-center mb-4">Sign Up</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Create a new account below.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Name & Phone */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label className="text-sm font-medium">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full pl-12 py-2 border rounded-md"
                  required
                />
              </div>
            </div>

            <div className="flex-1">
              <label className="text-sm font-medium">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full pl-12 py-2 border rounded-md"
                  required
                />
              </div>
            </div>
          </div>

          {/* Address & Age */}
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full py-2 px-3 border rounded-md"
              required
            />

            <input
              type="number"
              placeholder="Age"
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
              className="w-full py-2 px-3 border rounded-md"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full pl-12 py-2 border rounded-md"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full pl-12 pr-12 py-2 border rounded-md"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <button type="submit" className="w-full primary-btn py-2 rounded-md">
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Already have an account?
          <a href="/login" className="text-blue-600 ml-1">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;

