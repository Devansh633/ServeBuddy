import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage"
import Login from "./pages/login"
import Signup from "./pages/signup"
import Menu from "./pages/menu"
import {CartProvider} from "./cart/contextreducer"
import Owner from "./pages/owner";
import RequireAuth from './RequireAuth'
import RequireAuth2 from "./RequireAuth2";

function App() {
  return (
    <div>
      <CartProvider>
      <Routes>
        <Route path="/" element={<RequireAuth2><HomePage /></RequireAuth2>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/owner" element={<RequireAuth><Owner /></RequireAuth>} />
      </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
