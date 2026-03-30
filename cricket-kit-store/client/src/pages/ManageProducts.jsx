import { useEffect, useState } from "react";
import axios from "axios";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: ""
  });
  const [editId, setEditId] = useState(null);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.log("Fetch Products Error:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Add or Update Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      if (editId) {
        // UPDATE
        await axios.put(
          `http://localhost:5000/api/products/${editId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        alert("Product updated successfully");
      } else {
        // ADD
        await axios.post("http://localhost:5000/api/products", formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        alert("Product added successfully");
      }

      setFormData({
        name: "",
        price: "",
        image: "",
        description: "",
        category: ""
      });
      setEditId(null);
      fetchProducts();
    } catch (error) {
      console.log("Submit Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category
    });
    setEditId(product.id);
  };

  // Delete product
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.log("Delete Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-green-400 text-center mb-8">
        Manage Products
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-slate-900 p-6 rounded-2xl shadow-lg mb-10"
      >
        <h2 className="text-2xl font-bold mb-6 text-yellow-400">
          {editId ? "Edit Product" : "Add Product"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 rounded-lg bg-slate-800 border border-slate-700"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="p-3 rounded-lg bg-slate-800 border border-slate-700"
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="p-3 rounded-lg bg-slate-800 border border-slate-700"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="p-3 rounded-lg bg-slate-800 border border-slate-700"
          />
        </div>

        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full mt-4 p-3 rounded-lg bg-slate-800 border border-slate-700"
        ></textarea>

        <button
          type="submit"
          className="mt-6 bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-bold"
        >
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Product List */}
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-slate-900 p-5 rounded-2xl shadow-lg"
          >
            <img
              src={product.image || "https://via.placeholder.com/300"}
              alt={product.name}
              className="w-full h-52 object-cover rounded-xl mb-4"
            />

            <h3 className="text-2xl font-bold text-green-400">{product.name}</h3>
            <p className="text-yellow-400 font-bold text-lg mt-2">₹ {product.price}</p>
            <p className="text-slate-300 mt-2">{product.category}</p>
            <p className="text-slate-400 mt-2">{product.description}</p>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => handleEdit(product)}
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-semibold"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageProducts;