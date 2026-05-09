import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Admin from "./pages/Admin";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [dark, setDark] = useState(
  localStorage.getItem("theme") === "dark"
);

const [search, setSearch] = useState("");

const [wishlist, setWishlist] = useState(
  JSON.parse(localStorage.getItem("wishlist")) || []
);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
  localStorage.setItem(
    "wishlist",
    JSON.stringify(wishlist)
  );
}, [wishlist]);

  useEffect(() => {
  if (dark) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}, [dark]);

  return (
    <BrowserRouter>
    <Navbar
  cart={cart}
  dark={dark}
  setDark={setDark}
  search={search}
  setSearch={setSearch}
  wishlist={wishlist}
/>

      <Routes>

       <Route
  path="/"
  element={
    <Products
      cart={cart}
      setCart={setCart}
      search={search}
      wishlist={wishlist}
      setWishlist={setWishlist}
    />
  }
/>
    
    <Route
  path="/wishlist"
  element={
    <Wishlist
      wishlist={wishlist}
      setWishlist={setWishlist}
      cart={cart}
      setCart={setCart}
    />
  }
/>

          <Route path="/login" element={<Login />} />
        <Route
          path="/cart"
          element={<Cart cart={cart} setCart={setCart} />}
        />
        <Route
  path="/checkout"
  element={<Checkout cart={cart} setCart={setCart} />}
/>

    <Route path="/success" element={<Success />} />
    <Route path="/admin" element={<Admin />} />
    <Route path="/product/:id" element={
    <ProductDetails
      cart={cart} setCart={setCart}/> }/>

      <Route
        path="/dashboard"
        element={<AdminDashboard />}
      />

      </Routes>
    </BrowserRouter>
  );
}

export default App;