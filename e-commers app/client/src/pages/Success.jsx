import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="h-[80vh] flex flex-col justify-center items-center text-center bg-gray-50">
      
      <h1 className="text-3xl font-semibold mb-4">
        🎉 Order Placed Successfully
      </h1>

      <p className="text-gray-500 mb-6">
        Thank you for shopping with us. Your order is being processed.
      </p>

      <Link to="/">
        <button className="bg-black text-white px-6 py-2 rounded-full">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
}