import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Coin from "./pages/Coin/Coin.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.js";
import Login from "./pages/Login/Login.jsx";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) navigate("/");
      else navigate("/login");
    });
    return () => unsubscribe(); //cleanup
  }, []);

  // Routes i don't want to have navbar and footer
  const hideLayout = location.pathname === "/login";

  return (
    <div className="app">
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/coin/:coinId" element={<Coin />} />
      </Routes>
      {!hideLayout && <Footer />}
    </div>
  );
};

export default App;
