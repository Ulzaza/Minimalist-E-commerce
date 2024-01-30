import React, { useEffect, useState } from "react";
import { useNavigate, BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import All from "./components/Categories-pages/All";
import Furnitures from "./components/Categories-pages/Furnitures";
import Electronics from "./components/Categories-pages/Electronics";
import Lamps from "./components/Categories-pages/Lamps";
import Kitchen from "./components/Categories-pages/Kitchen";
import Chairs from "./components/Categories-pages/Chairs";
import SkinCare from "./components/Categories-pages/SkinCare";
import ProductPage, { CartContext } from "./pages/ProductPage";

function App() {
  const navigate = useNavigate();
  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    // Redirect to the home page when the component mounts
    navigate("/");
  }, [navigate]);

  const addToCart = (item) => {
    setCartItem([...cartItem, item]);
  };

  // local storage
  useEffect(() => {
    const json = localStorage.getItem("cartItem");
    const savedCart = JSON.parse(json);
    if (savedCart) {
      setCartItem(savedCart);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(cartItem);
    localStorage.setItem("cartItem", json);
  }, [cartItem]);

  return (
    <CartContext.Provider value={{ cartItem, addToCart, setCartItem }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="categories" element={<Categories />}>
            <Route path="all" element={<All />} />
            <Route path="furnitures" element={<Furnitures />} />
            <Route path="electronics" element={<Electronics />} />
            <Route path="lamps" element={<Lamps />} />
            <Route path="kitchen" element={<Kitchen />} />
            <Route path="chairs" element={<Chairs />} />
            <Route path="skin-care" element={<SkinCare />} />
          </Route>
          <Route path="categories/product/:id" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </CartContext.Provider>
  );
}

export default App;
