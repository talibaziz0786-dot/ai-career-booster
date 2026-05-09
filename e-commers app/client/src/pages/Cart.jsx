import { Link } from "react-router-dom";

export default function Cart({ cart, setCart }) {
  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item._id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
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
    p-6
  "
>
      <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              className="bg-white
dark:bg-zinc-900 rounded-xl shadow-sm p-4 mb-4 flex justify-between items-center"
            >
              <div>
                <h2 className=" text-xl font-bold text-black dark:text-white">{item.name}</h2>
                <p className="text-gray-500">₹{item.price}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  className="px-2 bg-gray-200
dark:bg-zinc-800
dark:text-white rounded"
                  onClick={() => decreaseQty(item._id)}
                >
                  -
                </button>

                <span>{item.qty}</span>

                <button
                  className="px-2 bg-gray-200
dark:bg-zinc-800
dark:text-white rounded"
                  onClick={() => increaseQty(item._id)}
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <h2 className="
  font-bold
  text-black
  dark:text-white
  bg-white
dark:bg-zinc-900
">
            Total: ₹{total}
          </h2>
          <Link to="/checkout">
  <button className="mt-4bg-black
dark:bg-white
text-white
dark:text-black px-4 py-2 rounded-lg">
    Proceed to Checkout
  </button>
</Link>
        </>
      )}
    </div>
  );
}