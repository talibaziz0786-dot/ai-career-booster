import { useEffect, useState } from "react";
import { fetchProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import Hero from "../components/Hero";
import { motion } from "framer-motion";

export default function Products({
  cart,
  setCart,
  search,
  wishlist = [],
  setWishlist,
}) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [editProduct, setEditProduct] = useState(null);

  const token = localStorage.getItem("token");

  const isAdmin = token
    ? JSON.parse(atob(token.split(".")[1])).role === "admin"
    : false;

  useEffect(() => {
    fetchProducts().then((data) => {
      console.log("API DATA:", data);
      setProducts(data);
    });
  }, []);

  // 🔥 DELETE FUNCTION (YAHI HONA CHAHIYE ANDAR)
  const deleteHandler = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product Deleted ✅");

      // UI update
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.error(error);
      alert("Delete Failed ❌");
    }
  };

  // Edit handler

  const editHandler = (product) => {
  setEditProduct({ ...product }); // 🔥 copy बनाओ
};
  // UPDATE HANDLER
  const updateHandler = async () => {
  try {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/products/${editProduct._id}`,
      editProduct,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Product Updated ✅");

    // UI refresh
    setProducts(
      products.map((p) =>
        p._id === editProduct._id ? editProduct : p
      )
    );

    setEditProduct(null);
  } catch (error) {
    console.error(error);
    alert("Update Failed ❌");
  }
};

  // FILTER
 const filteredProducts = products.filter(
  (p) => {
    const matchCategory =
      category === "All"
        ? true
        : p.category === category;

    const smartSearch =
  search.toLowerCase();

const matchSearch =
  p.name
    .toLowerCase()
    .includes(smartSearch) ||

  p.category
    .toLowerCase()
    .includes(smartSearch) ||

  p.description
    .toLowerCase()
    .includes(smartSearch);

    return (
      matchCategory && matchSearch
    );
  }
);

 return (
  <>
 <div
  className="
    pt-28
    min-h-screen
    bg-white
    dark:bg-zinc-950
    text-black
    dark:text-white
    transition-colors
    duration-300
  "
>
    {search.trim() === "" && <Hero />}

    <div className="p-6">

      {/* CATEGORY */}
      <div className="flex gap-4 mb-6 flex-wrap">
{[
  "All",
  "Clothes",
  "Shoes",
  "Jewellery",
  "Electronics",
  "Mobiles",
  "Laptops",
  "Watches",
  "Beauty",
  "Perfumes",
  "Bags",
  "Home",
  "Kitchen",
  "Sports",
  "Books",
  "Toys",
  "Grocery",
].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`
  px-4
  py-2
  rounded-full
  border
  transition-all
  duration-300
  ${
    category === cat
      ? "bg-black text-white dark:bg-white dark:text-black"
      : `
        bg-white
        dark:bg-zinc-900
        text-black
        dark:text-white
        border-zinc-300
        dark:border-zinc-700
        hover:bg-black
        hover:text-white
      `
  }
`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      <motion.div
  layout
  className="
    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    gap-6
  "
>
        {filteredProducts.length === 0 ? (
          <h2>No Products Found ❌</h2>
        ) : (
          filteredProducts.map((product) => (
            <div key={product._id}>
              
             <ProductCard
  product={product}
  cart={cart}
  setCart={setCart}
  wishlist={wishlist}
  setWishlist={setWishlist}
/>

              {/* 🔥 DELETE BUTTON (YAHI LAGTA HAI) */}
              {isAdmin && (
                <button
                  onClick={() => deleteHandler(product._id)}
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded w-full"
                >
                  Delete
                </button>
              )}

              {/* Edit button add */}
              {isAdmin && (
  <button
    onClick={() => editHandler(product)}
    className="mt-2 bg-blue-500 text-white px-3 py-1 rounded w-full"
  >
    Edit
  </button>
)}

            </div>
          ))
        )}
      </motion.div>

{editProduct && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg w-96">

      <h2 className="text-xl font-bold mb-4">Edit Product</h2>

      <input
        value={editProduct.name}
        onChange={(e) =>
          setEditProduct({ ...editProduct, name: e.target.value })
        }
        className="border p-2 w-full mb-2"
      />

      <input
        value={editProduct.price}
        onChange={(e) =>
          setEditProduct({ ...editProduct, price: e.target.value })
        }
        className="border p-2 w-full mb-2"
      />

      <input
        value={editProduct.image}
        onChange={(e) =>
          setEditProduct({ ...editProduct, image: e.target.value })
        }
        className="border p-2 w-full mb-2"
      />
       
       <input
  value={editProduct.description}
  onChange={(e) =>
    setEditProduct({ ...editProduct, description: e.target.value })
  }
  className="border p-2 w-full mb-2"
/>

<select
  value={editProduct.category}
  onChange={(e) =>
    setEditProduct({ ...editProduct, category: e.target.value })
  }
  className="border p-2 w-full mb-2"
>
  <option>Clothes</option>
  <option>Shoes</option>
  <option>Jewellery</option>
</select>

<input
  value={editProduct.countInStock}
  onChange={(e) =>
    setEditProduct({
      ...editProduct,
      countInStock: Number(e.target.value),
    })
  }
  className="border p-2 w-full mb-2"
/>
      <button
        onClick={updateHandler}
        className="bg-black text-white px-4 py-2 w-full"
      >
        Update
      </button>

      <button
        onClick={() => setEditProduct(null)}
        className="mt-2 text-red-500 w-full"
      >
        Cancel
      </button>

    </div>
  </div>
)}
   </div>

   </div>
</>

);
}