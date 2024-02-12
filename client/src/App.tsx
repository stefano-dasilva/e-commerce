import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/components/Login";
import Register from "./pages/register/components/Register";
import Profile from "./pages/profile/components/Profile";
import Cart from "./pages/cart/components/Cart";
import Buy from "./pages/buy/components/Buy";
import Home from "./pages/home/components/Home";
import Layout from "./layout/Layout";
import Products from "./pages/products/components/Products";
import PurchaseDetail from "./pages/purchasedetail/components/PurchaseDetail";

function App() {
  return (
    <div className="App">

    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route  element={<Layout />}>
          <Route path= "/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/products" element={<Products />} />
          <Route path="/purchasedetail" element={<PurchaseDetail />} />
        </Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
