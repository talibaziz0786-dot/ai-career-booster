import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Checkout({ cart, setCart }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "COD",
  });

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    // 🔴 VALIDATION
    if (
      !form.address ||
      !form.city ||
      !form.postalCode ||
      !form.country
    ) {
      toast.error("Please fill all fields ❌");
      return;
    }

    setLoading(true); // ✅ start loading

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/orders",
        {
          orderItems: cart,
          shippingAddress: {
            address: form.address,
            city: form.city,
            postalCode: form.postalCode,
            country: form.country,
          },
          paymentMethod: form.paymentMethod,
          totalPrice: total,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Order placed successfully ✅");

      setCart([]);
      navigate("/success");

    } catch (err) {
      console.error(err);
       console.log(err.response?.data);
      toast.error("Order failed ❌");
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {/* FORM */}
      <input
        name="address"
        placeholder="Address"
        className="border p-2 w-full mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        onChange={handleChange}
      />

      <input
        name="city"
        placeholder="City"
        className="border p-2 w-full mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        onChange={handleChange}
      />

      <input
        name="postalCode"
        placeholder="Postal Code"
        className="border p-2 w-full mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        onChange={handleChange}
      />

      <input
        name="country"
        placeholder="Country"
        className="border p-2 w-full mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        onChange={handleChange}
      />

      {/* PAYMENT METHOD */}
      <div className="mb-4">
        <label className="block font-medium mb-2">
          Payment Method
        </label>

        <select
          name="paymentMethod"
          className="border p-2 w-full rounded-lg"
          onChange={handleChange}
        >
          <option value="COD">Cash on Delivery</option>
          <option value="ONLINE">Online Payment</option>
        </select>
      </div>

      <h2 className="text-xl font-bold mb-4">
        Total: ₹{total}
      </h2>

      <button
        onClick={placeOrder}
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-lg hover:scale-105 transition flex justify-center items-center"
      >
        {loading ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
}