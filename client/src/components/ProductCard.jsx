function ProductCard({ product }) {
  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const found = existingCart.find((item) => item.id === product.id);

    let updatedCart;

    if (found) {
      updatedCart = existingCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...existingCart, { ...product, quantity: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Product added to cart");
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="bg-slate-900 rounded-2xl shadow-lg overflow-hidden border border-slate-800 hover:scale-105 transition">
      <img
        src={product.image || "https://via.placeholder.com/300x200"}
        alt={product.name}
        className="w-full h-52 object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold text-green-400">{product.name}</h2>
        <p className="text-slate-300 mt-2">{product.description}</p>
        <p className="text-yellow-400 mt-2 font-semibold">₹ {product.price}</p>
        <p className="text-slate-400 text-sm mt-1">Category: {product.category}</p>
        <p className="text-slate-400 text-sm">Stock: {product.stock}</p>

        <button
          onClick={addToCart}
          className="mt-4 w-full bg-green-500 hover:bg-green-600 py-2 rounded-lg font-bold"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;