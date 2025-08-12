import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  Clock,
  Tag,
  Filter,
  SortAsc,
  Flame,
  Gift,
  TrendingUp,
  Package,
  Zap,
  AlertCircle,
} from "lucide-react";

const DealsPage = () => {
  const deals = [
    {
      id: 1,
      name: "Wireless Headphones Pro",
      description:
        "Premium noise-cancelling headphones with 30-hour battery life",
      price: 79.99,
      originalPrice: 129.99,
      image: "https://placehold.co/300x300",
      rating: 4.5,
      reviewCount: 128,
      discount: 38,
      dealType: "percentage",
      endTime: "2025-08-15T23:59:59",
      category: "Electronics",
      stockCount: 7,
      isFlashSale: true,
      isBestSeller: true,
      tags: ["Limited Time", "Premium"],
      conditions: "Online only",
    },
    {
      id: 2,
      name: "Smart Fitness Watch Bundle",
      description: "Fitness watch + extra straps + charging dock",
      price: 89.99,
      originalPrice: 149.99,
      image: "https://placehold.co/300x300",
      rating: 4.7,
      reviewCount: 96,
      discount: 40,
      dealType: "bundle",
      endTime: "2025-08-10T23:59:59",
      category: "Wearables",
      stockCount: 15,
      isFlashSale: false,
      isBestSeller: false,
      tags: ["Bundle Deal", "3 Items"],
      conditions: "Save $60 vs buying separately",
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      description: "Waterproof portable speaker with deep bass",
      price: 49.99,
      originalPrice: 79.99,
      fixedDiscount: 30,
      image: "https://placehold.co/300x300",
      rating: 4.3,
      reviewCount: 210,
      discount: 37,
      dealType: "fixed",
      endTime: "2025-08-12T23:59:59",
      category: "Audio",
      stockCount: 23,
      isFlashSale: false,
      isBestSeller: true,
      tags: ["Waterproof", "Portable"],
      conditions: "$30 instant savings",
    },
    {
      id: 4,
      name: "Gaming Mouse (Buy 1 Get 1)",
      description: "High-precision gaming mouse with RGB lighting",
      price: 29.99,
      originalPrice: 49.99,
      image: "https://placehold.co/300x300",
      rating: 4.8,
      reviewCount: 87,
      discount: 40,
      dealType: "bogo",
      endTime: "2025-08-08T23:59:59",
      category: "Accessories",
      stockCount: 12,
      isFlashSale: false,
      isBestSeller: false,
      tags: ["BOGO", "Gaming"],
      conditions: "Buy one, get one free - same or lesser value",
    },
    {
      id: 5,
      name: "Portable Charger 20000mAh",
      description: "Fast-charging power bank with dual USB ports",
      price: 19.99,
      originalPrice: 39.99,
      image: "https://placehold.co/300x300",
      rating: 4.6,
      reviewCount: 154,
      discount: 50,
      dealType: "clearance",
      endTime: "2025-08-05T23:59:59",
      category: "Accessories",
      stockCount: 3,
      isFlashSale: true,
      isBestSeller: false,
      tags: ["Clearance", "Last Chance"],
      conditions: "Final sale - no returns",
    },
    {
      id: 6,
      name: "Noise Cancelling Earbuds",
      description: "True wireless earbuds with active noise cancellation",
      price: 59.99,
      originalPrice: 99.99,
      image: "https://placehold.co/300x300",
      rating: 4.4,
      reviewCount: 201,
      discount: 40,
      dealType: "percentage",
      endTime: "2025-08-18T23:59:59",
      category: "Audio",
      stockCount: 28,
      isFlashSale: false,
      isBestSeller: true,
      tags: ["Wireless", "ANC"],
      conditions: "Free shipping included",
    },
  ];
  const categories = [
    { id: "all", name: "All Deals", icon: Package },
    { id: "electronics", name: "Electronics", icon: Zap },
    { id: "wearables", name: "Wearables", icon: Package },
    { id: "audio", name: "Audio", icon: Package },
    { id: "accessories", name: "Accessories", icon: Package },
  ];
  const dealTypes = [
    { id: "all", name: "All Types" },
    { id: "percentage", name: "Percentage Off" },
    { id: "fixed", name: "Fixed Amount Off" },
    { id: "bogo", name: "Buy One Get One" },
    { id: "bundle", name: "Bundle Deals" },
    { id: "clearance", name: "Clearance" },
  ];
  const sortOptions = [
    { id: "newest", name: "Newest First" },
    { id: "discount", name: "Highest Discount" },
    { id: "price-low", name: "Price: Low to High" },
    { id: "price-high", name: "Price: High to Low" },
    { id: "ending-soon", name: "Ending Soon" },
    { id: "rating", name: "Highest Rated" },
  ];
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDealType, setSelectedDealType] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [showFilters, setShowFilters] = useState(false);

  const getFilteredAndSortedDeals = () => {
    let filtered = deals;
    if (selectedCategory !== "all")
      filtered = filtered.filter(
        (d) => d.category.toLowerCase() === selectedCategory
      );
    if (selectedDealType !== "all")
      filtered = filtered.filter((d) => d.dealType === selectedDealType);
    filtered = filtered.filter(
      (d) => d.price >= priceRange[0] && d.price <= priceRange[1]
    );
    switch (sortBy) {
      case "discount":
        return filtered.sort((a, b) => b.discount - a.discount);
      case "price-low":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-high":
        return filtered.sort((a, b) => b.price - a.price);
      case "ending-soon":
        return filtered.sort(
          (a, b) => new Date(a.endTime) - new Date(b.endTime)
        );
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating);
      default:
        return filtered;
    }
  };

  const getTimeRemaining = (endTime) => {
    const total = Date.parse(endTime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return { total, days, hours, minutes, seconds };
  };

  const getDealBadge = (deal) => {
    switch (deal.dealType) {
      case "percentage":
        return {
          text: `${deal.discount}% OFF`,
          color: "bg-red-500",
          icon: Tag,
        };
      case "fixed":
        return {
          text: `$${deal.fixedDiscount} OFF`,
          color: "bg-green-500",
          icon: Tag,
        };
      case "bogo":
        return { text: "BOGO", color: "bg-purple-500", icon: Gift };
      case "bundle":
        return { text: "BUNDLE", color: "bg-blue-500", icon: Package };
      case "clearance":
        return { text: "CLEARANCE", color: "bg-orange-500", icon: AlertCircle };
      default:
        return {
          text: `${deal.discount}% OFF`,
          color: "bg-red-500",
          icon: Tag,
        };
    }
  };

  const filteredDeals = getFilteredAndSortedDeals();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-br from-sky-400 via-indigo-500 to-violet-600 text-white dark:from-sky-600 dark:via-indigo-700 dark:to-violet-800">
        <div className="container mx-auto px-4 py-16 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Mega Deals & Offers
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Unbeatable prices, limited-time offers, and exclusive bundles. Don't
            miss out on savings up to 70% off!
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
            <div className="flex items-center bg-white/10 dark:bg-black/20 px-4 py-2 rounded-full">
              <Flame className="h-4 w-4 mr-2" /> Flash Sales Active
            </div>
            <div className="flex items-center bg-white/10 dark:bg-black/20 px-4 py-2 rounded-full">
              <Gift className="h-4 w-4 mr-2" /> BOGO Offers
            </div>
            <div className="flex items-center bg-white/10 dark:bg-black/20 px-4 py-2 rounded-full">
              <Package className="h-4 w-4 mr-2" /> Bundle Deals
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {/* Filters and Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              {filteredDeals.length} Deals Found
            </h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition text-gray-800 dark:text-gray-200"
              >
                <Filter className="h-4 w-4" /> Filters
              </button>
              <div className="flex items-center gap-2">
                <SortAsc className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {sortOptions.map((o) => (
                    <option
                      key={o.id}
                      value={o.id}
                      className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {o.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((c) => {
              const Icon = c.icon;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                    selectedCategory === c.id
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  <Icon className="h-4 w-4" /> {c.name}
                </button>
              );
            })}
          </div>
          {showFilters && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Deal Type
                  </label>
                  <select
                    value={selectedDealType}
                    onChange={(e) => setSelectedDealType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {dealTypes.map((t) => (
                      <option
                        key={t.id}
                        value={t.id}
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([parseInt(e.target.value), priceRange[1]])
                      }
                      className="flex-1"
                    />
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Quick Filters
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center text-gray-700 dark:text-gray-300">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Flash Sales Only</span>
                    </label>
                    <label className="flex items-center text-gray-700 dark:text-gray-300">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Best Sellers Only</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDeals.map((deal) => {
            const timeRemaining = getTimeRemaining(deal.endTime);
            const isExpired = timeRemaining.total <= 0;
            const dealBadge = getDealBadge(deal);
            const BadgeIcon = dealBadge.icon;
            const buttonText =
              deal.dealType === "bogo"
                ? "Get BOGO Deal"
                : deal.dealType === "bundle"
                ? "View Bundle"
                : "Claim Deal";
            return (
              <div
                key={deal.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative group">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div
                    className={`absolute top-4 left-4 ${dealBadge.color} text-white text-sm font-bold px-3 py-1 rounded-full flex items-center shadow-lg`}
                  >
                    <BadgeIcon className="h-4 w-4 mr-1" /> {dealBadge.text}
                  </div>
                  {deal.isFlashSale && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center animate-pulse">
                      <Flame className="h-3 w-3 mr-1" /> FLASH
                    </div>
                  )}
                  {deal.stockCount <= 10 && (
                    <div className="absolute bottom-4 left-4 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                      Only {deal.stockCount} left!
                    </div>
                  )}
                  {!isExpired &&
                    (deal.isFlashSale || timeRemaining.days <= 2) && (
                      <div className="absolute bottom-4 right-4 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded flex items-center">
                        <Clock className="h-3 w-3 mr-1" />{" "}
                        {timeRemaining.days > 0
                          ? `${timeRemaining.days}d `
                          : ""}
                        {timeRemaining.hours}h {timeRemaining.minutes}m
                      </div>
                    )}
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {deal.isBestSeller && (
                      <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs px-2 py-1 rounded-full flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" /> Best Seller
                      </span>
                    )}
                    {deal.tags.slice(0, 2).map((tag, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg leading-tight pr-2 text-gray-900 dark:text-white">
                      {deal.name}
                    </h3>
                    {isExpired && (
                      <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded whitespace-nowrap">
                        EXPIRED
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                    {deal.description}
                  </p>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(deal.rating) ? "fill-current" : ""
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                      {deal.rating} ({deal.reviewCount} reviews)
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl md:text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                        ${deal.price}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-gray-500 dark:text-gray-400 line-through text-sm">
                          ${deal.originalPrice}
                        </span>
                        <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                          Save ${(deal.originalPrice - deal.price).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  {deal.conditions && (
                    <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4">
                      <p className="text-blue-800 dark:text-blue-200 text-sm font-medium">
                        {deal.conditions}
                      </p>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <Link
                      to={`/products/${deal.id}`}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-800 text-white py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-600 dark:hover:to-purple-700 transition text-center font-medium"
                    >
                      {buttonText}
                    </Link>
                    <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition group">
                      <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* No Results */}
        {filteredDeals.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <Package className="h-24 w-24 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No deals found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your filters to see more deals
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedDealType("all");
                setPriceRange([0, 200]);
              }}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Reset Filters
            </button>
          </div>
        )}
        {/* Newsletter Signup */}
        <div className="mt-16 p-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Never Miss a Deal!
            </h2>
            <p className="text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get exclusive early access to flash sales, BOGO offers, and
              limited-time deals. Join 50,000+ savvy shoppers!
            </p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow px-6 py-4 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-center sm:text-left"
              />
              <div className="p-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                <button className="bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-400 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition transform hover:scale-105 whitespace-nowrap w-full">
                  Get Deals
                </button>
              </div>
            </div>
            <p className="text-sm mt-4 text-gray-500 dark:text-gray-400">
              No spam, unsubscribe anytime. Get deals delivered to your inbox
              daily.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealsPage;
