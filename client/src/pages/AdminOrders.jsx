import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/orders/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Order status updated");
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-green-400 text-center mb-8">Admin Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-slate-300">No orders found</p>
      ) : (
        <div className="max-w-7xl mx-auto grid gap-8">
          {orders.map((order) => (
            <div key={order.id} className="bg-slate-900 p-6 rounded-2xl shadow-lg">
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-yellow-400">Order #{order.id}</h2>
                  <p className="text-slate-300">Customer: {order.user_name}</p>
                  <p className="text-slate-400">Email: {order.email}</p>
                  <p className="text-slate-400">Phone: {order.phone}</p>
                  <p className="text-slate-400">Address: {order.address}, {order.city}, {order.pincode}</p>
                </div>

                <div className="mt-4 md:mt-0">
                  <p className="text-green-400 font-bold text-xl">₹ {order.total_amount}</p>
                  <p className="text-slate-300 mt-2">Status: {order.status}</p>

                  <select
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    value={order.status}
                    className="mt-3 bg-slate-800 border border-slate-700 p-2 rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {order.items.map((item) => (
                  <div key={item.id} className="bg-slate-800 p-4 rounded-xl flex gap-4 items-center">
                    <img
                      src={item.image || "https://via.placeholder.com/100"}
                      alt={item.product_name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div>
                      <h3 className="font-bold text-green-400">{item.product_name}</h3>
                      <p>Qty: {item.quantity}</p>
                      <p>₹ {item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminOrders;