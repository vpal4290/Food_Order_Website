import React, { useState } from "react"
import Navbar from "./components/Navbar/Navbar"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Cart from "./pages/Cart/Cart"
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder"
import Footer from "./components/Footer/Footer"
import Login from "./components/Loginpopup/Login"
import Verify from "./pages/verify/Verify"
import Myorder from "./pages/MyOrders/Myorder"

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin}></Navbar>
        <Routes>
          <Route path="/" element={<Home />}>
          </Route>
          <Route path="/cart" element={<Cart />}>
          </Route>
          <Route path="/order" element={<PlaceOrder />}>
          </Route>
          <Route path="/cart" element={<Cart />}>
          </Route>
          <Route path="/verify" element={<Verify />}></Route>
          <Route path="/myOrders" element={<Myorder/>}></Route>
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
