// src/pages/ProductDetails.jsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function ProductDetails({
  cart,
  setCart,
}) {

  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  const [selectedImage, setSelectedImage] =
    useState("");

  const [zoomStyle, setZoomStyle] =
    useState({});

  const [rating, setRating] =
    useState(5);

  const [comment, setComment] =
    useState("");

    const [relatedProducts, setRelatedProducts] =
  useState([]);

  // FETCH PRODUCT
  useEffect(() => {

    const fetchProduct =
      async () => {

        const { data } =
          await axios.get(
            `http://localhost:5000/api/products/${id}`
          );

        setProduct(data);

        setSelectedImage(
          data.images?.[0]
        );
      const related =
  await axios.get(
    "http://localhost:5000/api/products"
  );

const filtered =
  related.data.filter(
    (item) =>
      item.category ===
        data.category &&
      item._id !== data._id
  );

setRelatedProducts(filtered);
      };

    fetchProduct();

  }, [id]);

  // ADD TO CART
  const addToCart = () => {

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

  // SUBMIT REVIEW
  const submitReview =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.post(
          `http://localhost:5000/api/products/${id}/reviews`,
          {
            rating,
            comment,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        toast.success(
          "Review Added ✅"
        );

        window.location.reload();

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
            "Review Failed"
        );
      }
    };

  if (!product)
    return (
      <h2 className="pt-32 text-center">
        Loading...
      </h2>
    );

  return (

    <div
      className="
        pt-32
        min-h-screen
        bg-white
        dark:bg-zinc-950
        text-black
        dark:text-white
        transition-colors
        duration-300
        px-6
        pb-20
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
          grid
          md:grid-cols-2
          gap-12
        "
      >

        {/* LEFT */}
        <div>

          {/* MAIN IMAGE */}
          <div
            className="
              overflow-hidden
              rounded-[35px]
              bg-white
              dark:bg-zinc-900
            "
          >

            <img
              src={selectedImage}
              alt={product.name}
              className="
                w-full
                h-125
                object-cover
                transition-transform
                duration-200
                cursor-zoom-in
              "
              style={zoomStyle}
              onMouseMove={(e) => {

                const {
                  left,
                  top,
                  width,
                  height,
                } =
                  e.target.getBoundingClientRect();

                const x =
                  ((e.clientX - left) /
                    width) *
                  100;

                const y =
                  ((e.clientY - top) /
                    height) *
                  100;

                setZoomStyle({
                  transformOrigin:
                    `${x}% ${y}%`,
                  transform:
                    "scale(2)",
                });
              }}
              onMouseLeave={() => {
                setZoomStyle({
                  transform:
                    "scale(1)",
                });
              }}
            />
          </div>

          {/* THUMBNAILS */}
          <div className="mt-6">

            <Swiper
              spaceBetween={12}
              slidesPerView={4}
            >

              {product.images?.map(
                (img, index) => (

                  <SwiperSlide
                    key={index}
                  >

                    <img
                      src={img}
                      alt=""
                      onClick={() =>
                        setSelectedImage(
                          img
                        )
                      }
                      className={`
                        h-28
                        w-full
                        object-cover
                        rounded-2xl
                        cursor-pointer
                        border-2
                        transition
                        ${
                          selectedImage ===
                          img
                            ? "border-black dark:border-white"
                            : "border-transparent"
                        }
                      `}
                    />

                  </SwiperSlide>
                )
              )}

            </Swiper>

          </div>
        </div>

        {/* RIGHT */}
        <div>

          <p
            className="
              inline-block
              bg-black
              text-white
              dark:bg-white
              dark:text-black
              px-4
              py-2
              rounded-full
              text-sm
              mb-6
            "
          >
            {product.category}
          </p>

          <h1
            className="
              text-5xl
              font-black
              leading-tight
            "
          >
            {product.name}
          </h1>

          <p
            className="
              text-4xl
              font-black
              mt-6
            "
          >
            ₹{product.price}
          </p>

          {/* RATING */}
          <div
            className="
              flex
              items-center
              gap-2
              mt-6
            "
          >

            {Array.from({
              length: Math.round(
                product.rating || 0
              ),
            }).map((_, i) => (

              <Star
                key={i}
                size={22}
                fill="currentColor"
              />

            ))}

            <span
              className="
                text-gray-500
                dark:text-gray-400
              "
            >
              (
              {product.numReviews}
              {" "}
              Reviews )
            </span>

          </div>

          <p
            className="
              text-gray-600
              dark:text-gray-400
              leading-relaxed
              mt-8
              text-lg
            "
          >
            {product.description}
          </p>

          <div
            className="
              mt-10
              flex
              items-center
              gap-4
            "
          >

            <button
              onClick={addToCart}
              className="
                bg-black
                dark:bg-white
                dark:text-black
                text-white
                px-10
                py-4
                rounded-full
                text-lg
                font-bold
                hover:scale-105
                transition
              "
            >
              Add To Cart
            </button>

            <div
              className="
                border
                border-zinc-300
                dark:border-zinc-700
                px-6
                py-4
                rounded-full
              "
            >
              Stock:
              {" "}
              {product.countInStock}
            </div>

          </div>
        </div>
      </div>

      {/* REVIEWS SECTION */}

      <div
        className="
          max-w-7xl
          mx-auto
          mt-20
          bg-zinc-100
          dark:bg-zinc-900
          p-8
          rounded-[35px]
        "
      >

        <h2
          className="
            text-3xl
            font-black
            mb-8
          "
        >
          Customer Reviews
        </h2>

        {/* ADD REVIEW */}

        <div className="mb-12">

          <select
            value={rating}
            onChange={(e) =>
              setRating(
                e.target.value
              )
            }
            className="
              border
              border-zinc-300
              dark:border-zinc-700
              bg-white
              dark:bg-black
              p-4
              rounded-2xl
              w-full
              mb-4
            "
          >

            <option value="5">
              ⭐⭐⭐⭐⭐
            </option>

            <option value="4">
              ⭐⭐⭐⭐
            </option>

            <option value="3">
              ⭐⭐⭐
            </option>

            <option value="2">
              ⭐⭐
            </option>

            <option value="1">
              ⭐
            </option>

          </select>

          <textarea
            value={comment}
            onChange={(e) =>
              setComment(
                e.target.value
              )
            }
            placeholder="Write your review..."
            className="
              border
              border-zinc-300
              dark:border-zinc-700
              bg-white
              dark:bg-black
              p-4
              rounded-2xl
              w-full
              h-36
              outline-none
            "
          />

          <button
            onClick={submitReview}
            className="
              mt-4
              bg-black
              dark:bg-white
              dark:text-black
              text-white
              px-8
              py-4
              rounded-2xl
              font-bold
              hover:scale-105
              transition
            "
          >
            Submit Review
          </button>

        </div>

        {/* REVIEW LIST */}

        <div className="space-y-8">

          {product.reviews?.length === 0 ? (

            <p>
              No Reviews Yet
            </p>

          ) : (

            product.reviews?.map(
              (review) => (

                <div
                  key={review._id}
                  className="
                    border-b
                    border-zinc-300
                    dark:border-zinc-700
                    pb-8
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >

                    {Array.from({
                      length:
                        review.rating,
                    }).map((_, i) => (

                      <Star
                        key={i}
                        size={18}
                        fill="currentColor"
                      />

                    ))}

                  </div>

                  <h3
                    className="
                      font-bold
                      mt-3
                      text-lg
                    "
                  >
                    {review.name}
                  </h3>

                  <p
                    className="
                      text-gray-600
                      dark:text-gray-400
                      mt-2
                    "
                  >
                    {review.comment}
                  </p>

                </div>
              )
            )
          )}

        </div>
      </div>
      {/* RELATED PRODUCTS */}

<div className="mt-24">

  <h2
    className="
      text-3xl
      font-black
      mb-10
    "
  >
    Related Products
  </h2>

  <div
    className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-4
      gap-6
    "
  >
    {relatedProducts
      .slice(0, 4)
      .map((item) => (

        <ProductCard
          key={item._id}
          product={item}
          cart={cart}
          setCart={setCart}
        />
      ))}
  </div>
</div>
    </div>
  );
}