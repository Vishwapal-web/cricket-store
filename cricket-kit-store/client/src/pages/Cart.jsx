import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const updateQuantity = (id, type) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        const newQty = type === "inc" ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    });

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-green-400 text-center mb-8">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-slate-300">Cart is empty</p>
      ) : (
        <>
          <div className="grid gap-6 max-w-5xl mx-auto">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center"
              >
                <img
                  src={item.image || "https://via.placeholder.com/150"}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-green-400">
                    {item.name}
                  </h2>
                  <p className="text-slate-300 mt-1">₹ {item.price}</p>
                  <p className="text-slate-400">Qty: {item.quantity}</p>

                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => updateQuantity(item.id, "dec")}
                      className="bg-yellow-500 px-4 py-1 rounded"
                    >
                      -
                    </button>

                    <button
                      onClick={() => updateQuantity(item.id, "inc")}
                      className="bg-green-500 px-4 py-1 rounded"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="bg-red-500 px-4 py-1 rounded"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto mt-10 bg-slate-900 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-yellow-400">
              Total: ₹ {totalAmount}
            </h2>

            <button
              onClick={() => navigate("/checkout")}
              className="mt-5 bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-bold"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;