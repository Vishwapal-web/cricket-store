import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      const foundProduct = res.data.find((item) => item.id === Number(id));
      setProduct(foundProduct);
    } catch (error) {
      console.log("Fetch Product Error:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [id]);

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      cart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert("Product added to cart");
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center">
        <p className="text-lg text-slate-300">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 bg-slate-900 p-8 rounded-3xl shadow-xl">
        <div>
          <img
            src={product.image || "https://via.placeholder.com/500"}
            alt={product.name}
            className="w-full h-[450px] object-cover rounded-2xl"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-green-400">{product.name}</h1>
          <p className="text-yellow-400 text-2xl font-bold mt-4">₹ {product.price}</p>
          <p className="text-slate-300 mt-4 text-lg">Category: {product.category}</p>

          <p className="text-slate-400 mt-6 leading-8">
            {product.description || "No description available for this product."}
          </p>

          <button
            onClick={handleAddToCart}
            className="mt-8 bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-bold"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;