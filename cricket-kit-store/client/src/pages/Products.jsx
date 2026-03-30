import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.log("Fetch Products Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
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

  const categories = ["All", ...new Set(products.map((p) => p.category).filter(Boolean))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-green-400 text-center mb-8">
        Our Products
      </h1>

      {/* Search + Filter */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 mb-10">
        <input
          type="text"
          placeholder="Search cricket products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 rounded-xl bg-slate-900 border border-slate-700 outline-none"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 rounded-xl bg-slate-900 border border-slate-700 outline-none"
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Loading */}
      {loading ? (
        <p className="text-center text-slate-300 text-lg">Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-slate-400 text-lg">No products found</p>
      ) : (
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-slate-900 p-5 rounded-2xl shadow-lg hover:scale-[1.02] transition"
            >
              <img
                src={product.image || "https://via.placeholder.com/300"}
                alt={product.name}
                className="w-full h-56 object-cover rounded-xl mb-4"
              />

              <h2 className="text-2xl font-bold text-green-400">{product.name}</h2>
              <p className="text-yellow-400 font-bold text-lg mt-2">₹ {product.price}</p>
              <p className="text-slate-300 mt-2">{product.category}</p>
              <p className="text-slate-400 mt-2 line-clamp-2">{product.description}</p>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-semibold"
                >
                  Add to Cart
                </button>

                <Link
                  to={`/product/${product.id}`}
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;