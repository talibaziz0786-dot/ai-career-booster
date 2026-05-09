import { motion } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Star,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function ProductCard({
  product,
  cart,
  setCart,
  wishlist = [],
  setWishlist,
}) {

  const addToCart = (e) => {
    e.preventDefault();

    const exist = cart.find(
      (x) => x._id === product._id
    );

    if (exist) {
      setCart(
        cart.map((x) =>
          x._id === product._id
            ? {
                ...exist,
                qty: exist.qty + 1,
              }
            : x
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          qty: 1,
        },
      ]);
    }
  };

  const wishlistExist = wishlist?.find(
  (x) => x._id === product._id
);

const wishlistHandler = (e) => {
  e.preventDefault();

  if (wishlistExist) {
    setWishlist(
      wishlist.filter(
        (x) => x._id !== product._id
      )
    );
  } else {
    setWishlist?.([
  ...wishlist,
  product,
]);
  }
};

  return (
    <Link to={`/product/${product._id}`}>
      <motion.div
      initial={{
  opacity: 0,
  y: 40,
}}

animate={{
  opacity: 1,
  y: 0,
}}
      whileHover={{
  y: -10,
  scale: 1.02,
  rotateX: 4,
}}
        transition={{
          duration: 0.3,
        }}
        className="
          group
          relative
         bg-white
dark:bg-zinc-900
          backdrop-blur-2xl
          rounded-4xl
          overflow-hidden
          border
          border-white/20
          dark:border-zinc-800
          shadow-lg
          hover:shadow-2xl
          transition-all
          duration-500
        "
      >

        {/* IMAGE */}
        <div className="relative overflow-hidden">

          <img
            src={
              product.images?.[0]
            }
            alt={product.name}
            className="
              h-72
              w-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-110
            "
          />

          {/* OVERLAY */}
          <div
            className="
              absolute
              inset-0
              bg-black/0
              group-hover:bg-black/10
              transition
            "
          />

          {/* WISHLIST */}
         <button
  onClick={wishlistHandler}
  className="
    absolute
    top-4
    right-4
    bg-white/80
    dark:bg-black/50
    backdrop-blur-xl
    p-3
    rounded-full
    shadow-lg
    hover:scale-110
    transition
  "
>
  <Heart
    size={18}
    fill={wishlistExist ? "red" : "transparent"}
    className={
      wishlistExist
        ? "text-red-500"
        : "text-black dark:text-white"
    }
  />
</button>

          {/* CATEGORY */}
          <div
            className="
              absolute
              bottom-4
              left-4
              bg-black/80
              backdrop-blur-xl
              text-white
              text-xs
              px-4
              py-2
              rounded-full
              tracking-wide
            "
          >
            {product.category}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6">

          {/* TITLE */}
          <h2
            className="
             text-xl
font-bold
tracking-tight
text-black
dark:text-white
transition-colors
            "
          >
            {product.name}
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              text-sm
              text-gray-500
              dark:text-gray-400
              mt-3
              leading-relaxed
              line-clamp-2
            "
          >
            {product.description}
          </p>

          {/* RATING */}
          <div
            className="
              flex
              items-center
              gap-1
              mt-4
            "
          >
            <Star
              size={16}
              fill="currentColor"
            />
            <Star
              size={16}
              fill="currentColor"
            />
            <Star
              size={16}
              fill="currentColor"
            />
            <Star
              size={16}
              fill="currentColor"
            />
            <Star
              size={16}
              className="text-gray-300"
            />

            <span
              className="
                text-sm
                text-gray-500
                ml-2
              "
            >
              4.0
            </span>
          </div>

          {/* PRICE */}
          <div
            className="
              flex
              items-center
              justify-between
              mt-6
            "
          >

            <div>
              <p
                className="
                  text-xs
                  text-gray-400
                "
              >
                Starting from
              </p>

              <h3
                className="
                 text-2xl
                  font-black
                  text-black
                  dark:text-white
                "
              >
                ₹{product.price}
              </h3>
            </div>

            {/* ADD BUTTON */}
            <button
              onClick={addToCart}
              className="
                flex
                items-center
                gap-2
              bg-black
              dark:bg-white
              text-white
              dark:text-black
                px-5
                py-3
                rounded-full
                hover:scale-105
                active:scale-95
                transition
                shadow-xl
              "
            >
              <ShoppingBag
                size={18}
              />
              Add
            </button>

          </div>
        </div>
      </motion.div>
    </Link>
  );
}