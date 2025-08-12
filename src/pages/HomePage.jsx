import React from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight, Sparkles } from "lucide-react";
import TrendingNowCarousel from "../components/home/TrendingNowCarousel";
import ShopByCategory from "../components/home/ShopByCategory";
import ValueProposition from "../components/common/ValueProposition";
import Testimonials from "../components/common/Testimonials";
import { useTheme } from '../context/ThemeContext';

const generateRandomImageURL = (id, width = 150, height = 150) => {
  const seed = `product_${id}_${Math.floor(Math.random() * 10000)}`;
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
};

const HomePage = () => {
  const { darkMode } = useTheme();

  const cls = (light, dark) => (darkMode ? dark : light);

  const productNames = [
    "Wireless Bluetooth Headphones", "Smart Fitness Tracker Watch", "Portable Bluetooth Speaker",
    "Ergonomic Gaming Mouse", "Ultra-HD Action Camera", "Stainless Steel Water Bottle",
    "Wireless Charging Pad", "Noise-Cancelling Earbuds", "Smart Home Security Camera",
    "LED Desk Lamp with Wireless Charger", "Mechanical Gaming Keyboard", "10000mAh Power Bank",
    "Wireless Earbuds Pro", "Smart Digital Alarm Clock", "Reusable Silicone Food Bags",
    "Cordless Handheld Vacuum", "4K HDMI Cable (10ft)", "Adjustable Laptop Stand",
    "Memory Foam Travel Pillow", "Wireless Phone Car Mount", "Electric Wine Opener",
    "LED Strip Lights with Remote", "Stainless Steel Coffee Travel Mug", "Foldable Bluetooth Keyboard",
    "High-Speed SSD Storage Drive", "Wireless Presenter Remote", "UV Phone Sanitizer",
    "Rechargeable AA Batteries Kit", "Smart Plug Outlet Timer", "Portable Mini Projector",
    "Robot Vacuum Cleaner", "Noise-Masking Sleep Earbuds", "Smart Thermostat",
    "Instant Pot Duo 7-in-1", "Wireless Gaming Keyboard", "Fitness Resistance Bands Set",
    "Digital Picture Frame", "Bluetooth Karaoke Microphone", "Electric Toothbrush Set"
  ];

  const featuredProducts = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1, name: productNames[i],
    price: (Math.random() * 100 + 10).toFixed(2), originalPrice: (Math.random() * 150 + 20).toFixed(2),
    image: generateRandomImageURL(i + 1),
    rating: (Math.random() * 1.5 + 3.5).toFixed(1), reviewCount: Math.floor(Math.random() * 500) + 50,
    isHot: Math.random() > 0.6, isFeatured: true,
  }));

  const newArrivals = Array.from({ length: 6 }, (_, i) => ({
    id: i + 13, name: productNames[i + 12],
    price: (Math.random() * 120 + 15).toFixed(2), originalPrice: (Math.random() * 180 + 25).toFixed(2),
    image: generateRandomImageURL(i + 13),
    rating: (Math.random() * 2 + 3).toFixed(1), reviewCount: Math.floor(Math.random() * 100) + 5,
    isNew: true, releaseDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
  }));

  const ProductCard = ({ product, type = "featured" }) => (
    <div className="group bg-white dark:bg-slate-700 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:scale-[1.02] border border-gray-100 dark:border-gray-700">
      <div className="relative pb-[100%]">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = generateRandomImageURL(`fallback_${product.id}`); }}
        />
        <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 flex flex-col gap-1">
          <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-[0.55rem] xs:text-[0.6rem] sm:text-[0.65rem] font-bold px-1.5 py-0.5 rounded-full shadow">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
          {type === "featured" && product.isHot && (
            <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white text-[0.55rem] xs:text-[0.6rem] sm:text-[0.65rem] font-bold px-1.5 py-0.5 rounded-full shadow flex items-center">🔥 HOT</div>
          )}
          {type === "new" && product.isNew && (
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-[0.55rem] xs:text-[0.6rem] sm:text-[0.65rem] font-bold px-1.5 py-0.5 rounded-full shadow flex items-center">✨ NEW</div>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-2 sm:p-3">
        <h3 className="font-semibold xs:font-bold text-[0.7rem] xs:text-xs sm:text-sm mb-1.5 sm:mb-2 leading-tight line-clamp-2 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center mb-1.5 sm:mb-2">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${i < Math.floor(product.rating) ? "fill-current" : ""}`} />
            ))}
          </div>
          <span className="text-gray-500 dark:text-gray-400 text-[0.55rem] xs:text-[0.6rem] sm:text-xs ml-1 font-medium">
            {product.rating} ({product.reviewCount})
          </span>
        </div>
        <div className="flex items-center justify-between mb-2 sm:mb-2.5">
          <div>
            <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">${product.price}</span>
            <span className="text-gray-400 dark:text-gray-500 line-through text-[0.55rem] xs:text-[0.6rem] sm:text-xs ml-1">
              ${product.originalPrice}
            </span>
          </div>
        </div>
        <button
          className={`w-full py-1.5 sm:py-2 rounded-md sm:rounded-lg transition-all duration-300 shadow-sm hover:shadow-md text-[0.6rem] xs:text-[0.65rem] sm:text-xs font-medium border ${
            cls(
              'text-blue-600 hover:text-blue-800 hover:bg-blue-50 border-blue-600/30 hover:border-blue-800/50', // Light theme
              'text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 border-blue-400/30 hover:border-blue-300/50'  // Dark theme
            )
          }`}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );

  const ProductSection = ({ title, products, type, gradientFrom, gradientTo, linkTo }) => (
    <section className="py-10 sm:py-14 md:py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-800 dark:via-gray-800 dark:to-slate-900">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold font-serif leading-snug bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent mb-2 sm:mb-3`}>
            {title}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">
            {type === "featured" ? "Handpicked items just for you" : "Latest additions to our collection"}
          </p>
        </div>
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 xs:gap-2.5 sm:gap-3">
          {products.map((product) => (<ProductCard key={product.id} product={product} type={type} />))}
        </div>
        <div className="text-center mt-8 sm:mt-10">
          <Link
            to={linkTo}
            className={`inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 font-bold text-sm sm:text-base rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 border ${
              cls(
                'text-blue-600 hover:text-blue-800 hover:bg-blue-50 border-blue-600/30 hover:border-blue-800/50', // Light theme
                'text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 border-blue-400/30 hover:border-blue-300/50'  // Dark theme
              )
            }`}
          >
            View All
            <ArrowRight className="ml-1.5 h-3.5 w-3.5 sm:ml-2 sm:h-4 sm:w-4" />
          </Link>
        </div>
      </div>
    </section>
  );

  return (
    <div>
      <TrendingNowCarousel />
      <ShopByCategory />
      <ProductSection title="Featured Products" products={featuredProducts} type="featured"
        gradientFrom="from-blue-600" gradientTo="to-purple-600 dark:from-blue-400 dark:to-purple-400" linkTo="/products/featured" />
      <ProductSection title="New Arrivals" products={newArrivals} type="new"
        gradientFrom="from-emerald-600" gradientTo="to-teal-600 dark:from-emerald-400 dark:to-teal-400" linkTo="/products/new-arrivals" />
      <ValueProposition />
      <Testimonials />
    </div>
  );
};

export default HomePage;