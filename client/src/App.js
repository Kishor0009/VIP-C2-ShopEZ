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
       
        <Route path="/product/:id" element={<ProductDetails />}
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;