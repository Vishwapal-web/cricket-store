import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout() {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        pincode: ""
    });

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(cart);
    }, []);

    const totalAmount = cartItems.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0
    );

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first");
            navigate("/login");
            return;
        }

        try {
            const payload = {
                ...formData,
                totalAmount,
                cartItems
            };

            await axios.post("http://localhost:5000/api/orders", payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            localStorage.removeItem("cart");
            window.dispatchEvent(new Event("cartUpdated"));

            alert("Order placed successfully");
            navigate("/my-orders");
        } catch (error) {
            console.log("ORDER ERROR:", error.response?.data);
            alert(error.response?.data?.message || "Order failed");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
            <h1 className="text-4xl font-bold text-green-400 text-center mb-8">Checkout</h1>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <form
                    onSubmit={handlePlaceOrder}
                    className="bg-slate-900 p-6 rounded-2xl shadow-lg"
                >
                    <h2 className="text-2xl font-bold mb-6">Shipping Details</h2>

                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        onChange={handleChange}
                        className="w-full p-3 mb-4 rounded bg-slate-800 border border-slate-700"
                        required
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        onChange={handleChange}
                        className="w-full p-3 mb-4 rounded bg-slate-800 border border-slate-700"
                        required
                    />

                    <textarea
                        name="address"
                        placeholder="Full Address"
                        onChange={handleChange}
                        className="w-full p-3 mb-4 rounded bg-slate-800 border border-slate-700"
                        required
                    />

                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        onChange={handleChange}
                        className="w-full p-3 mb-4 rounded bg-slate-800 border border-slate-700"
                        required
                    />

                    <input
                        type="text"
                        name="pincode"
                        placeholder="Pincode"
                        onChange={handleChange}
                        className="w-full p-3 mb-4 rounded bg-slate-800 border border-slate-700"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-lg font-bold"
                    >
                        Place Order
                    </button>
                </form>

                <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                    {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between border-b border-slate-700 py-3">
                            <span>{item.name} x {item.quantity}</span>
                            <span>₹ {Number(item.price) * item.quantity}</span>
                        </div>
                    ))}

                    <h3 className="text-2xl font-bold text-yellow-400 mt-6">
                        Total: ₹ {totalAmount}
                    </h3>
                </div>
            </div>
        </div>
    );
}

export default Checkout;