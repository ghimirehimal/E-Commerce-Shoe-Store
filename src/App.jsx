import React from 'react'
import { Toaster } from "react-hot-toast";
import { Route,Routes } from 'react-router'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import MyProfile from './pages/MyProfile';
import Products from './pages/Products';
import ProductDetails from "./component/product/ProductDetails";
import Orders from './pages/Orders';
import WishList from './pages/WishList';
import Cart from './pages/Cart';
import ProtectedRoute from './hoc/ProtectedRoutes';
import AdminProtectedRoutes from './hoc/AdminProtectedRoutes';
import AdminLayouts from './layouts/AdminLayouts';
import Dashboard from './Admin/Dashboard';
import Users from './Admin/Users';
import Banner from './Admin/Banner';
import AdminProducts from './Admin/Products';
import AdminOrders from './Admin/Orders';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {


  return (
  <>
  <Toaster position="top-center" />
  <ToastContainer position="top-right" />
  <Routes>
    <Route path="/" element={<MainLayout/>}>
      <Route index element={<Home/>}/>
      <Route path="about" element={<About/>}/>
      <Route path="contact" element={<Contact/>}/>
      <Route path="orders" element={<Orders/>}/>
      <Route path="product" element={<Products/>}/>
      <Route path="product/:id" element={<ProductDetails />} />
      <Route path="profile" element={<ProtectedRoute><MyProfile/></ProtectedRoute>}/>

      <Route path="wishlist" element={<ProtectedRoute><WishList/></ProtectedRoute>}/>
      <Route path="cart" element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
    </Route>

    <Route path="/login" element={<LoginPage/>} />
    <Route path="/signup" element={<SignupPage/> }/>

    <Route path="/admin" element={<AdminLayouts/>}>
      <Route index element={<Dashboard />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="users" element={<Users />} />
      <Route path="banner" element={<Banner />} />
      <Route path="products" element={<AdminProducts />} />
      <Route path="orders" element={<AdminOrders />} />
    </Route>

  </Routes>


  </>
  )
}

export default App
