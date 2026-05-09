export default function Hero() {
  return (
    <section className="mt-6 px-6">
      <div
        className="
        bg-black
        text-white
        rounded-[40px]
        overflow-hidden
        max-w-7xl
        mx-auto
        grid
        md:grid-cols-2
        items-center
      "
      >
        {/* LEFT */}
        <div className="p-10 md:p-16">

          <p className="uppercase tracking-[6px] text-sm text-gray-400">
            Premium Collection
          </p>

          <h1
            className="
            text-5xl
            md:text-7xl
            font-black
            leading-tight
            mt-4
          "
          >
            Luxury
            <br />
            Fashion
          </h1>

          <p className="mt-6 text-gray-300 text-lg max-w-lg">
            Discover premium clothes, shoes and jewellery
            with modern Apple-style shopping experience.
          </p>

          <button
            className="
            mt-8
            bg-white
            text-black
            px-8
            py-4
            rounded-full
            font-semibold
            hover:scale-105
            transition
          "
          >
            Shop Now
          </button>
        </div>

        {/* RIGHT */}
        <div className="h-full">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop"
            alt="fashion"
            className="
              w-full
              h-125
              object-cover
            "
          />
        </div>
      </div>
    </section>
  );
}