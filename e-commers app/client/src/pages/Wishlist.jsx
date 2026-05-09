import ProductCard from "../components/ProductCard";

export default function Wishlist({
  wishlist,
  setWishlist,
  cart,
  setCart,
}) {
  return (
    <div
      className="
        pt-32
        min-h-screen
        bg-white
        dark:bg-zinc-950
        text-black
        dark:text-white
        p-6
      "
    >
      <h1 className="text-4xl font-black mb-8">
        Wishlist ❤️
      </h1>

      {wishlist.length === 0 ? (
        <h2>No Wishlist Products</h2>
      ) : (
          <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-6
          "
        >
          {wishlist.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              cart={cart}
              setCart={setCart}
              wishlist={wishlist}
              setWishlist={setWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}