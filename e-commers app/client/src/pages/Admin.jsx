// src/pages/Admin.jsx

import { useState } from "react";
import axios from "axios";
import imageCompression from "browser-image-compression";

export default function Admin() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    images: [],
    description: "",
    category: "Clothes",
    countInStock: "",
  });

  const [uploading, setUploading] =
    useState(false);

  // 🔥 IMAGE UPLOAD
 const uploadFileHandler = async (e) => {

  const files = Array.from(e.target.files);

  if (!files.length) return;

  try {

    setUploading(true);

    const uploadedImages = [];

    for (const file of files) {

      // ✅ IMAGE COMPRESS
      const compressedFile =
        await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        });

      const formData = new FormData();

   formData.append(
  "images",
  compressedFile
);

      const { data } = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    uploadedImages.push(
  ...data.images
);
    }

    setForm((prev) => ({
      ...prev,
      images: [
        ...(prev.images || []),
        ...uploadedImages,
      ],
    }));

    setUploading(false);

  } catch (error) {

    console.error(error);

    setUploading(false);

    alert(
      "Image Upload Failed ❌"
    );
  }
};

  // 🔥 INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  // 🔥 ADD PRODUCT
 const addProduct = async () => {
  try {

    const token =
      localStorage.getItem("token");

    // ✅ FIX DATA TYPES
    const productData = {
      ...form,
      price: Number(form.price),
      countInStock: Number(form.countInStock),
    };

    console.log(productData);

    await axios.post(
      "http://localhost:5000/api/products",
      productData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Product Added ✅");

    // RESET
    setForm({
      name: "",
      price: "",
      images: [],
      description: "",
      category: "Clothes",
      countInStock: "",
    });

  } catch (error) {

    console.error(error);

    alert("Add Product Failed ❌");
  }
};

  return (
    <div className="pt-32 p-6 max-w-3xl mx-auto">

      <div
        className="
        bg-white
        dark:bg-zinc-900
        shadow-2xl
        rounded-[40px]
        p-8
        border
        border-zinc-200
        dark:border-zinc-800
      "
      >
        <h1
          className="
          text-4xl
          font-black
          mb-8
        "
        >
          Admin Panel
        </h1>

        {/* NAME */}
        <input
          name="name"
          value={form.name}
          placeholder="Product Name"
          onChange={handleChange}
          className="
            border
            p-4
            w-full
            mb-4
            rounded-2xl
            outline-none
          "
        />

        {/* PRICE */}
        <input
          name="price"
          value={form.price}
          placeholder="Price"
          onChange={handleChange}
          className="
            border
            p-4
            w-full
            mb-4
            rounded-2xl
            outline-none
          "
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          value={form.description}
          placeholder="Description"
          onChange={handleChange}
          className="
            border
            p-4
            w-full
            mb-4
            rounded-2xl
            outline-none
            h-32
          "
        />

        {/* IMAGE PREVIEW */}
        {form.images.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            {form.images.map(
              (img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="preview"
                  className="
                    w-full
                    h-44
                    object-cover
                    rounded-3xl
                    border
                  "
                />
              )
            )}
          </div>
        )}

        {/* IMAGE UPLOAD */}
        <label
          className="
          flex
          flex-col
          items-center
          justify-center
          w-full
          h-56
          border-2
          border-dashed
          rounded-[35px]
          cursor-pointer
          bg-zinc-50
          dark:bg-zinc-950
          hover:border-black
          transition
          overflow-hidden
          mb-6
        "
        >
          <div className="text-center">
            <h2
              className="
              text-2xl
              font-bold
            "
            >
              Upload Product Images
            </h2>

            <p
              className="
              text-sm
              text-gray-500
              mt-2
            "
            >
              Drag & Drop or Click
            </p>
          </div>

         <input
  type="file"
  multiple
  accept="image/*"
  onChange={uploadFileHandler}
  className="hidden"
/>
        </label>

        {/* LOADING */}
        {uploading && (
          <div className="mb-6">

            <div
              className="
              w-full
              h-3
              bg-gray-200
              rounded-full
              overflow-hidden
            "
            >
              <div
                className="
                h-full
                bg-black
                animate-pulse
                w-full
              "
              />
            </div>

            <p className="mt-2 text-sm">
              Uploading Images...
            </p>

          </div>
        )}

        {/* CATEGORY */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="
            border
            p-4
            w-full
            mb-4
            rounded-2xl
            outline-none
          "
        >
          <option>Clothes</option>
          <option>Shoes</option>
          <option>Jewellery</option>
          <option>Electronics</option>
          <option>Mobiles</option>
          <option>Laptops</option>
          <option>Watches</option>
          <option>Beauty</option>
          <option>Perfumes</option>
          <option>Bags</option>
          <option>Home</option>
          <option>Kitchen</option>
          <option>Sports</option>
          <option>Books</option>
          <option>Toys</option>
          <option>Grocery</option>
        </select>

        {/* STOCK */}
        <input
          name="countInStock"
          value={form.countInStock}
          placeholder="Stock"
          onChange={handleChange}
          className="
            border
            p-4
            w-full
            mb-6
            rounded-2xl
            outline-none
          "
        />

        {/* BUTTON */}
        <button
          onClick={addProduct}
          className="
            w-full
            bg-black
            text-white
            py-4
            rounded-2xl
            text-lg
            font-bold
            hover:scale-[1.02]
            transition
          "
        >
          Add Product
        </button>

      </div>
    </div>
  );
}