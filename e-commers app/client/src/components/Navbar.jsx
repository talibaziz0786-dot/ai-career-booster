import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Moon,
  Sun,
  Search,
  Heart,
} from "lucide-react";

export default function Navbar({
  cart,
  dark,
  setDark,
  search,
  setSearch,
  wishlist = [],
}) {
  const token = localStorage.getItem("token");

  return (
    <header
      className="
      fixed
      top-0
      left-0
      w-full
      z-50
      border-b
      border-white/10
     bg-white/80
dark:bg-zinc-950/80
      backdrop-blur-2xl
      shadow-sm
    "
    >
      <nav
        className="
        max-w-7xl
        mx-auto
        px-6
        py-4
        flex
        items-center
        justify-between
      "
      >
        {/* LOGO */}
        <Link
          to="/"
         className="
text-2xl
font-black
tracking-tight
text-black
dark:text-white
transition-colors
"
        >
          🛍️ LuxeStore
        </Link>

        {/* SEARCH */}
        <div className="hidden md:flex flex-1 px-10">
          <div className="relative w-full max-w-xl">
            <Search
              size={18}
              className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
            />

           <input
  type="text"
  placeholder="Search products..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
 className="
w-full
pl-12
pr-4
py-3
rounded-full
border
border-zinc-300
dark:border-zinc-700
bg-white
dark:bg-zinc-900
text-black
dark:text-white
placeholder:text-gray-400
outline-none
transition
"
/>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
           className="
text-black
dark:text-white
hover:opacity-70
transition
"
          >
            Home
          </Link>

          {!token && (
            <Link
              to="/login"
             className="
text-black
dark:text-white
hover:opacity-70
transition
"
            >
              Login
            </Link>
          )}

          {token && (
            <Link
              to="/admin"
             className="
text-black
dark:text-white
hover:opacity-70
transition
"
            >
              Admin
            </Link>
          )}

          {/* DASHBOARD */}

          <Link
  to="/dashboard"
  className="hover:opacity-70 transition"
>
  Dashboard
</Link>

          {/* CART */}
          <Link
            to="/cart"
            className="
            relative
            p-2
            rounded-full
            hover:bg-black/5
            transition
          "
          >
            <ShoppingBag size={24} />

            <span
              className="
              absolute
              -top-1
              -right-1
              bg-black
              text-white
              text-xs
              h-5
              w-5
              rounded-full
              flex
              items-center
              justify-center
            "
            >
              {cart.length}
            </span>
          </Link>


          <Link
  to="/wishlist"
  className="
    relative
    p-2
    rounded-full
    hover:bg-black/5
    transition
  "
>
  <Heart size={24} />

  <span
    className="
      absolute
      -top-1
      -right-1
      bg-red-500
      text-white
      text-xs
      h-5
      w-5
      rounded-full
      flex
      items-center
      justify-center
    "
  >
    {wishlist.length}
     </span>
</Link>

          {/* DARK MODE */}
          <button
            onClick={() => setDark(!dark)}
            className="
            p-2
            rounded-full
            hover:bg-black/5
            transition
          "
          >
            {dark ? (
              <Sun size={22} />
            ) : (
              <Moon size={22} />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}