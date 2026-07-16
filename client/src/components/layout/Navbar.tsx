import { Link } from "react-router-dom";
import { Menu, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useThemeStore } from "../../store/theme-store";
import { useAuthStore } from "../../store/auth-store";

export default function Navbar() {
  const { theme, toggleTheme } = useThemeStore();

  const [isOpen, setIsOpen] = useState(false);

  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  const logout = useAuthStore(
    (state) => state.logout
  );


  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-5">
        <div className="
                flex
                h-20
                items-center
                justify-between

                rounded-3xl
                px-5
                border
                border-slate-200

                bg-white/90

                shadow-2xl

                backdrop-blur-xl

                dark:border-white/10
                dark:bg-slate-900/60
                ">

          <Link
            to="/"
            className="text-xl font-bold text-slate-900 dark:text-white"
          >
            CareerBoost AI
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              to="/"
              className="text-slate-700 dark:text-slate-300"
            >
              Home
            </Link>

           <button
  type="button"
  onClick={() => {
    document
      .getElementById("features")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }}
  className="text-slate-700 dark:text-slate-300"
>
  Features
</button>

<button
  type="button"
  onClick={() => {
    document
      .getElementById("pricing")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }}
  className="text-slate-700 dark:text-slate-300"
>
  Pricing
</button>

           
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Toggle Theme"
              title="Toggle Theme"
              onClick={toggleTheme}
              className="rounded-xl border border-slate-300 p-2 text-slate-900 dark:border-white/10 dark:text-white"
            >
              {theme === "dark" ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>

            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="hidden rounded-xl border border-white/10 px-4 py-2 text-slate-900 transition hover:bg-slate-100 dark:text-white md:block"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="hidden rounded-xl bg-cyan-500 px-5 py-2 text-white transition hover:bg-cyan-400 md:block"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className="hidden rounded-xl bg-cyan-500 px-5 py-2 text-white md:block"
                >
                  Dashboard
                </Link>

                <button
                  type="button"
                  aria-label="Logout"
                  title="Logout"
                  onClick={logout}
                  className="hidden rounded-xl bg-red-500 px-5 py-2 text-white md:block"
                >
                  Logout
                </button>
              </>
            )}

           <button
  type="button"
  aria-label="Open Menu"
  title="Open Menu"
  onClick={() =>
    setIsOpen(!isOpen)
  }
  className="md:hidden"
>
  <Menu />
</button>
          </div>
        </div>
      </div>

      
       {isOpen && (
  <div
    className="
      absolute
      left-0
      right-0
      top-24
      mx-4
      rounded-3xl
      border
      border-white/10
      bg-slate-900
      p-6
      md:hidden
    "
  >
    <div className="flex flex-col gap-4">
      <Link
        to="/"
        className="text-white"
      >
        Home
      </Link>

      <button
  type="button"
  onClick={() => {
    setIsOpen(false);

    document
      .getElementById("features")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }}
  className="text-left text-white"
>
  Features
</button>

<button
  type="button"
  onClick={() => {
    setIsOpen(false);

    document
      .getElementById("pricing")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }}
  className="text-left text-white"
>
  Pricing
</button>

      <Link
        to="/login"
        className="text-white"
      >
        Login
      </Link>

      <Link
        to="/register"
        className="text-white"
      >
        Sign Up
      </Link>

      <Link
        to="/dashboard"
        className="text-white"
      >
        Dashboard
      </Link>
    </div>
  </div>
)}
    </header>
  );
}