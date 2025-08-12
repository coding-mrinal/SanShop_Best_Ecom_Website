import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, ArrowRight, Mail } from "lucide-react";

const CategoriesPage = () => {
  const [email, setEmail] = useState("");

  const categories = [
    {
      id: "electronics",
      name: "Electronics",
      image: "https://placehold.co/400x300",
      description: "Latest gadgets and devices for your digital lifestyle",
      productCount: 128,
      featuredProducts: [
        { id: 1, name: "Wireless Headphones", price: 99.99, image: "https://placehold.co/150x150" },
        { id: 2, name: "Smart Watch", price: 199.99, image: "https://placehold.co/150x150" },
        { id: 3, name: "Bluetooth Speaker", price: 79.99, image: "https://placehold.co/150x150" },
      ],
    },
    {
      id: "clothing",
      name: "Clothing",
      image: "https://placehold.co/400x300",
      description: "Fashionable apparel for men, women, and kids",
      productCount: 256,
      featuredProducts: [
        { id: 4, name: "Cotton T-Shirt", price: 19.99, image: "https://placehold.co/150x150" },
        { id: 5, name: "Denim Jeans", price: 59.99, image: "https://placehold.co/150x150" },
        { id: 6, name: "Winter Jacket", price: 89.99, image: "https://placehold.co/150x150" },
      ],
    },
    {
      id: "home-kitchen",
      name: "Home & Kitchen",
      image: "https://placehold.co/400x300",
      description: "Everything you need to make your house a home",
      productCount: 192,
      featuredProducts: [
        { id: 7, name: "Coffee Maker", price: 49.99, image: "https://placehold.co/150x150" },
        { id: 8, name: "Blender", price: 39.99, image: "https://placehold.co/150x150" },
        { id: 9, name: "Cookware Set", price: 129.99, image: "https://placehold.co/150x150" },
      ],
    },
    {
      id: "beauty",
      name: "Beauty",
      image: "https://placehold.co/400x300",
      description: "Skincare, makeup, and personal care products",
      productCount: 87,
      featuredProducts: [
        { id: 10, name: "Moisturizer", price: 24.99, image: "https://placehold.co/150x150" },
        { id: 11, name: "Lipstick Set", price: 19.99, image: "https://placehold.co/150x150" },
        { id: 12, name: "Hair Dryer", price: 39.99, image: "https://placehold.co/150x150" },
      ],
    },
    {
      id: "sports",
      name: "Sports & Outdoors",
      image: "https://placehold.co/400x300",
      description: "Gear and equipment for your active lifestyle",
      productCount: 143,
      featuredProducts: [
        { id: 13, name: "Yoga Mat", price: 29.99, image: "https://placehold.co/150x150" },
        { id: 14, name: "Running Shoes", price: 79.99, image: "https://placehold.co/150x150" },
        { id: 15, name: "Water Bottle", price: 19.99, image: "https://placehold.co/150x150" },
      ],
    },
    {
      id: "books",
      name: "Books",
      image: "https://placehold.co/400x300",
      description: "Bestsellers and classics for every reader",
      productCount: 201,
      featuredProducts: [
        { id: 16, name: "Fiction Novel", price: 14.99, image: "https://placehold.co/150x150" },
        { id: 17, name: "Cookbook", price: 24.99, image: "https://placehold.co/150x150" },
        { id: 18, name: "Self-Help", price: 19.99, image: "https://placehold.co/150x150" },
      ],
    },
    {
      id: "toys-games",
      name: "Toys & Games",
      image: "https://placehold.co/400x300",
      description: "Fun and educational toys for kids of all ages",
      productCount: 95,
      featuredProducts: [
        { id: 19, name: "Board Game", price: 29.99, image: "https://placehold.co/150x150" },
        { id: 20, name: "Building Blocks", price: 39.99, image: "https://placehold.co/150x150" },
        { id: 21, name: "Action Figure", price: 14.99, image: "https://placehold.co/150x150" },
      ],
    },
    {
      id: "jewelry",
      name: "Jewelry",
      image: "https://placehold.co/400x300",
      description: "Elegant pieces for every occasion",
      productCount: 64,
      featuredProducts: [
        { id: 22, name: "Gold Necklace", price: 129.99, image: "https://placehold.co/150x150" },
        { id: 23, name: "Silver Earrings", price: 49.99, image: "https://placehold.co/150x150" },
        { id: 24, name: "Diamond Ring", price: 299.99, image: "https://placehold.co/150x150" },
      ],
    },
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
    alert("Thank you for subscribing!");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/80 dark:from-gray-900 dark:via-slate-800 dark:to-indigo-900"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-pink-300/30 to-rose-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 -left-32 w-80 h-80 bg-gradient-to-br from-blue-300/25 to-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-br from-emerald-300/20 to-teal-400/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-gradient-to-br from-purple-300/25 to-violet-400/20 rounded-full blur-3xl animate-pulse delay-3000"></div>
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]" style={{ backgroundImage: `radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.4) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.4) 0%, transparent 50%)`, backgroundSize: "400px 400px" }}></div>
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.01]" style={{ backgroundImage: "radial-gradient(circle, rgba(99, 102, 241, 0.8) 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
        <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="lines" patternUnits="userSpaceOnUse" width="100" height="100">
                <path d="M0,50 Q25,20 50,50 T100,50" stroke="rgba(99, 102, 241, 0.3)" fill="none" strokeWidth="1" />
                <path d="M0,25 Q25,55 50,25 T100,25" stroke="rgba(168, 85, 247, 0.3)" fill="none" strokeWidth="1" />
                <path d="M0,75 Q25,45 50,75 T100,75" stroke="rgba(236, 72, 153, 0.3)" fill="none" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#lines)" />
          </svg>
        </div>
      </div>

      <div className="relative">
        <div className="bg-white/10 dark:bg-gray-900/20 backdrop-blur-xl h-full"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-600/20 to-pink-500/20 backdrop-blur-md border border-white/20"></div>
        <div className="relative z-10 container mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
            Discover Our World
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-800 dark:text-gray-200">
            Explore premium collections across all categories and find exactly what inspires you
          </p>
          <Link
            to="/products"
            className="inline-flex items-center border-2 border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 px-8 py-4 rounded-full font-semibold text-lg hover:border-purple-600 hover:text-purple-600 dark:hover:border-purple-400 dark:hover:text-purple-400 hover:scale-105 transition duration-300 backdrop-blur-sm bg-white/20 hover:bg-white/30"
          >
            Shop All Collections
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our curated collections designed for your lifestyle
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 border border-white/20"
              >
                <Link to={`/category/${category.id}`}>
                  <div className="relative h-56">
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white text-2xl font-bold mb-2">{category.name}</h3>
                      <p className="text-gray-200 text-sm">{category.productCount} products</p>
                    </div>
                  </div>
                </Link>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{category.description}</p>
                  <div className="flex justify-between items-center mb-6">
                    <Link
                      to={`/category/${category.id}`}
                      className="inline-flex items-center border-2 border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 px-4 py-2 rounded-lg hover:border-purple-600 hover:text-purple-600 dark:hover:border-purple-400 dark:hover:text-purple-400 transition font-medium backdrop-blur-sm bg-white/10 hover:bg-white/20"
                    >
                      Shop Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                    <h4 className="font-semibold mb-3 text-gray-800 dark:text-white">Featured Products</h4>
                    <div className="space-y-3">
                      {category.featuredProducts.map((product) => (
                        <div key={product.id} className="flex items-center group">
                          <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                          <div className="ml-3 flex-grow">
                            <h5 className="text-sm font-medium text-gray-800 dark:text-white">{product.name}</h5>
                            <p className="text-indigo-600 dark:text-indigo-400 font-semibold">${product.price}</p>
                          </div>
                          <button className="bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 p-2 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/70 transition opacity-0 group-hover:opacity-100">
                            <ShoppingCart className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-[2px]">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl h-full"></div>
          </div>
          <div className="relative z-10 p-12 text-center">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Stay in the Loop
            </h2>
            <p className="text-xl mb-8 text-gray-700 dark:text-gray-300">
              Be the first to know about new arrivals, exclusive deals, and special offers
            </p>
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
              <div className="flex gap-4">
                <div className="flex-grow relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 border-2 border-gray-200 dark:border-gray-600 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="border-2 border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:border-purple-600 hover:text-purple-600 hover:scale-105 transition duration-300 backdrop-blur-sm bg-white/10 hover:bg-white/20"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-sm mt-4 text-gray-600 dark:text-gray-400">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;