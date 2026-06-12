import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import NavbarComponent from "./components/NavbarComponent";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AddProduct from "./pages/AddProduct";
import AdminOrders from "./pages/AdminOrders";
import AdminUsers from "./pages/AdminUsers";

import { ToastContainer } from "react-toastify";
import { useState } from "react";


function App() {

  const [searchTerm, setSearchTerm] = useState("");

  return (

    <BrowserRouter>

      <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>

        <NavbarComponent 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <ToastContainer />

        <div className="flex-grow-1">
          <Routes>

            <Route path="/" element={ <Home searchTerm={searchTerm} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />    
            <Route path="/product/:id" element={<ProductDetails />}/>
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/users" element={<AdminUsers />} />

          </Routes>
        </div>

        <footer className="page-footer text-center">
          <div className="container">
            <p className="mb-1">
              <strong>ShopEZ</strong> — Shop Smarter, Faster and Easier
            </p>
            <small>&copy; {new Date().getFullYear()} ShopEZ. All rights reserved.</small>
          </div>
        </footer>

      </div>

    </BrowserRouter>
  );
}

export default App;