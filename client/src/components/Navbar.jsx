import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalItems);
  };

  useEffect(() => {
    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    alert("Logged out successfully");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="bg-slate-950 border-b border-slate-800 text-white px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-400">
          CricketKit Store
        </Link>

        {/* Right Side */}
        <div className="flex flex-wrap gap-5 items-center text-sm md:text-base">
          <Link to="/" className="hover:text-green-400">Home</Link>
          <Link to="/products" className="hover:text-green-400">Products</Link>
          <Link to="/cart" className="hover:text-green-400">Cart ({cartCount})</Link>

          {token && (
            <Link to="/my-orders" className="hover:text-green-400">My Orders</Link>
          )}

          {user?.role === "admin" && (
            <>
              <Link to="/admin" className="hover:text-green-400">Admin</Link>
              <Link to="/admin/products" className="hover:text-green-400">Manage Products</Link>
              <Link to="/admin/orders" className="hover:text-green-400">Manage Orders</Link>
            </>
          )}

          {!token ? (
            <>
              <Link to="/login" className="hover:text-green-400">Login</Link>
              <Link to="/signup" className="hover:text-green-400">Signup</Link>
            </>
          ) : (
            <>
              {/* User Info */}
              <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl text-center">
                <p className="text-green-400 font-semibold">
                  Hi, {user?.name || user?.username || "User"} 👋
                </p>
                <p className="text-xs text-slate-400 capitalize">
                  {user?.role || "customer"}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;