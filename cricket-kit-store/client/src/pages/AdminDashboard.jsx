import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-green-400 mb-8">Admin Dashboard</h1>

      <div className="grid gap-6 w-full max-w-md">
        <Link
          to="/admin/products"
          className="bg-slate-900 hover:bg-slate-800 p-6 rounded-2xl text-center text-xl font-semibold border border-slate-700"
        >
          Manage Products
        </Link>

        <Link
          to="/admin/orders"
          className="bg-slate-900 hover:bg-slate-800 p-6 rounded-2xl text-center text-xl font-semibold border border-slate-700"
        >
          Manage Orders
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;