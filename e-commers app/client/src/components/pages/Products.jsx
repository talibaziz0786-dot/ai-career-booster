import { useEffect, useState } from "react";
import { fetchProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";

export default function Products({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  const filteredProducts =
    category === "All"
      ? products
      : products.filter(
          (p) => p.category === category
        );

  return (
    <>
      {/* HERO */}
      <div className="bg-red-500 text-white text-5xl p-20">
  HERO WORKING
</div>

      {/* PRODUCTS */}
      <div className="p-6">

        {/* CATEGORY */}
        <div className="flex gap-4 mb-8 flex-wrap">
          {[
            "All",
            "Clothes",
            "Shoes",
            "Jewellery",
          ].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`
                px-5 py-2 rounded-full border transition
                ${
                  category === cat
                    ? "bg-black text-white"
                    : "hover:bg-black hover:text-white"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-5
          gap-6
        "
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              cart={cart}
              setCart={setCart}
            />
          ))}
        </div>
      </div>
    </>
  );
}