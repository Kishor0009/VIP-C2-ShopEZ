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

import { ToastContainer } from "react-toastify";


function App() {

  return (

    <BrowserRouter>

      <NavbarComponent />

      <ToastContainer />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />    
        <Route path="/product/:id" element={<ProductDetails />}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/my-orders" element={<MyOrders />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;