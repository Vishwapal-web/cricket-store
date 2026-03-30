import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Buy Premium <span className="text-green-400">Cricket Kits</span> Online
          </h1>
          <p className="text-slate-300 mt-6 text-lg leading-8">
            Shop bats, gloves, pads, helmets, jerseys and complete cricket gear
            with a modern shopping experience.
          </p>

          <div className="mt-8 flex gap-4 flex-wrap">
            <Link
              to="/products"
              className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-bold"
            >
              Shop Now
            </Link>

            <Link
              to="/signup"
              className="border border-slate-600 hover:border-green-400 px-6 py-3 rounded-xl font-bold"
            >
              Create Account
            </Link>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-4 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1593341646782-e0b495cff86d?q=80&w=1200&auto=format&fit=crop"
            alt="Cricket Kit"
            className="w-full h-[420px] object-cover rounded-2xl"
          />
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-4xl font-bold text-center text-green-400 mb-12">
          Why Choose Us?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-900 p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-yellow-400 mb-3">Premium Quality</h3>
            <p className="text-slate-300">
              Best quality cricket equipment for beginners and professionals.
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-yellow-400 mb-3">Fast Delivery</h3>
            <p className="text-slate-300">
              Get your products delivered quickly and safely at your doorstep.
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-yellow-400 mb-3">Trusted Store</h3>
            <p className="text-slate-300">
              Secure shopping experience with easy ordering and admin management.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;