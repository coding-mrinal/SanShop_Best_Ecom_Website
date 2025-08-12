import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Star, ShoppingCart, Heart, X, Share2, Filter, SortAsc, Eye, Check, Undo, Grid, List, Facebook, Twitter, Mail, Copy, ChevronDown } from 'lucide-react';

const WishlistPage = () => {
  const { user } = useUser();
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('dateAdded');
  const [filterBy, setFilterBy] = useState('all');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [recentlyMoved, setRecentlyMoved] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    setWishlistItems([
      { id: 1, name: "Premium Headphones", price: 199.99, originalPrice: 249.99, image: "/api/placeholder/300/300", rating: 4.5, inStock: true, onSale: true, dateAdded: "2023-10-27" },
      { id: 2, name: "Wireless Keyboard", price: 89.99, originalPrice: null, image: "/api/placeholder/300/300", rating: 4.2, inStock: true, onSale: false, dateAdded: "2023-10-26" },
      { id: 3, name: "Smart Watch", price: 299.99, originalPrice: 349.99, image: "/api/placeholder/300/300", rating: 4.8, inStock: false, onSale: true, dateAdded: "2023-10-25" },
      { id: 4, name: "Bluetooth Speaker", price: 129.99, originalPrice: null, image: "/api/placeholder/300/300", rating: 4.0, inStock: true, onSale: false, dateAdded: "2023-10-24" },
    ]);
  }, []);

  const filteredItems = wishlistItems.filter(item => 
    filterBy === 'all' || 
    (filterBy === 'inStock' && item.inStock) || 
    (filterBy === 'onSale' && item.onSale)
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price': return a.price - b.price;
      case 'name': return a.name.localeCompare(b.name);
      case 'availability': return b.inStock - a.inStock;
      default: return new Date(b.dateAdded) - new Date(a.dateAdded);
    }
  });

  const removeFromWishlist = (id) => setWishlistItems(items => items.filter(item => item.id !== id));
  
  const moveToCart = (item) => {
    setRecentlyMoved(item);
    setShowConfirmation(true);
  };

  const confirmMoveToCart = () => {
    if (recentlyMoved) removeFromWishlist(recentlyMoved.id);
    setShowConfirmation(false);
    setRecentlyMoved(null);
  };

  const undoMoveToCart = () => {
    setShowConfirmation(false);
    setRecentlyMoved(null);
  };

  const shareWishlist = (platform) => {
    const url = `${window.location.origin}/wishlist/shared/${user?.id}`;
    const text = "Check out my wishlist!";
    switch (platform) {
      case 'facebook': window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`); break;
      case 'twitter': window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`); break;
      case 'email': window.open(`mailto:?subject=${encodeURIComponent("My Wishlist")}&body=${encodeURIComponent(`Check out my wishlist: ${url}`)}`); break;
      case 'copy': navigator.clipboard.writeText(url); break;
      default: break;
    }
    setShowShareModal(false);
  };

  const renderDropdown = (options, currentValue, setValue, showDropdown, setShowDropdown) => (
    showDropdown && (
      <div className="absolute top-12 left-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-10 min-w-[160px]">
        {options.map(option => (
          <button
            key={option.value}
            onClick={() => { setValue(option.value); setShowDropdown(false); }}
            className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              currentValue === option.value ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    )
  );

  const renderProductCard = (item) => (
    <div key={item.id} className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
      <div className="relative">
        <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
        <button onClick={() => removeFromWishlist(item.id)} className="absolute top-3 right-3 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
          <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </button>
        {item.onSale && <div className="absolute top-3 left-3 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded">SALE</div>}
        <div className="absolute bottom-3 left-3 flex items-center bg-black/70 text-white text-xs px-2 py-1 rounded">
          <Star className="h-3 w-3 fill-current text-yellow-400 mr-1" /> {item.rating}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-1">{item.name}</h3>
        <div className="flex items-center mb-3">
          <span className="text-xl font-bold text-gray-900 dark:text-gray-100">${item.price.toFixed(2)}</span>
          {item.originalPrice && <span className="ml-2 text-gray-500 dark:text-gray-400 line-through">${item.originalPrice.toFixed(2)}</span>}
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => moveToCart(item)}
            disabled={!item.inStock}
            className={`py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center ${
              item.inStock 
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="h-4 w-4 mr-2" /> {item.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
          <Link to={`/product/${item.id}`} className="py-3 px-4 border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
            <Eye className="h-4 w-4 mr-2" />View
          </Link>
        </div>
      </div>
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50/80 via-gray-100/50 to-gray-200/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 px-4 sm:px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-md mx-auto bg-white dark:bg-gray-900 backdrop-blur-sm p-10 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg mb-6">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">My Wishlist</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Please log in to view your wishlist</p>
            <Link to="/login" className="group relative w-full flex justify-center py-3.5 px-4 border-2 border-blue-500 text-sm font-semibold rounded-xl text-blue-600 dark:text-blue-300 bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/30 dark:focus:ring-offset-gray-900 shadow-sm hover:shadow-blue-500/10 transition-all duration-300 hover:border-blue-600 dark:border-blue-400 dark:hover:border-blue-300 hover:scale-[1.01]">
              Log In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50/80 via-gray-100/50 to-gray-200/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 px-4 sm:px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-md mx-auto bg-white dark:bg-gray-900 backdrop-blur-sm p-10 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg mb-6">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Your Wishlist is Empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Start adding items you love to your wishlist</p>
            <Link to="/products" className="group relative w-full flex justify-center py-3.5 px-4 border-2 border-blue-500 text-sm font-semibold rounded-xl text-blue-600 dark:text-blue-300 bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/30 dark:focus:ring-offset-gray-900 shadow-sm hover:shadow-blue-500/10 transition-all duration-300 hover:border-blue-600 dark:border-blue-400 dark:hover:border-blue-300 hover:scale-[1.01]">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/80 via-gray-100/50 to-gray-200/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 sm:px-6">
      <div className="container mx-auto">
        {showConfirmation && recentlyMoved && (
          <div className="fixed top-4 right-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-4 z-50 max-w-sm">
            <div className="flex items-center mb-2">
              <Check className="h-5 w-5 text-green-600 mr-2" />
              <span className="font-semibold text-gray-900 dark:text-gray-100">Added to Cart!</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">"{recentlyMoved.name}" has been moved to your cart.</p>
            <div className="flex space-x-2">
              <button onClick={confirmMoveToCart} className="flex-1 py-2 px-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all text-sm font-medium">
                Confirm
              </button>
              <button onClick={undoMoveToCart} className="flex-1 py-2 px-3 border-2 border-gray-500 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-sm font-medium">
                <Undo className="h-4 w-4 inline mr-1" />Undo
              </button>
            </div>
          </div>
        )}

        {showShareModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-sm w-full border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Share Wishlist</h3>
                <button onClick={() => setShowShareModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-3">
                <button onClick={() => shareWishlist('facebook')} className="w-full flex items-center justify-center py-3 px-4 border-2 border-blue-500 text-blue-600 dark:text-blue-300 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all font-medium">
                  <Facebook className="h-4 w-4 mr-2" />Facebook
                </button>
                <button onClick={() => shareWishlist('twitter')} className="w-full flex items-center justify-center py-3 px-4 border-2 border-sky-500 text-sky-600 dark:text-sky-300 rounded-xl hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all font-medium">
                  <Twitter className="h-4 w-4 mr-2" />Twitter
                </button>
                <button onClick={() => shareWishlist('email')} className="w-full flex items-center justify-center py-3 px-4 border-2 border-gray-500 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all font-medium">
                  <Mail className="h-4 w-4 mr-2" />Email
                </button>
                <button onClick={() => shareWishlist('copy')} className="w-full flex items-center justify-center py-3 px-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all font-medium">
                  <Copy className="h-4 w-4 mr-2" />Copy Link
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">My Wishlist</h1>
              <p className="text-gray-600 dark:text-gray-400">{sortedItems.length} items</p>
            </div>
            <button onClick={() => setShowShareModal(true)} className="inline-flex items-center py-3 px-6 border-2 border-pink-500 text-pink-600 dark:text-pink-300 rounded-xl hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all font-medium hover:scale-[1.01]">
              <Share2 className="h-4 w-4 mr-2" />Share Wishlist
            </button>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button onClick={() => setShowSortDropdown(!showSortDropdown)} className="inline-flex items-center py-2 px-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all font-medium">
                  <SortAsc className="h-4 w-4 mr-2" />Sort<ChevronDown className="h-4 w-4 ml-2" />
                </button>
                {renderDropdown(
                  [{ value: 'dateAdded', label: 'Date Added' }, { value: 'price', label: 'Price' }, { value: 'name', label: 'Name' }, { value: 'availability', label: 'Availability' }],
                  sortBy, setSortBy, showSortDropdown, setShowSortDropdown
                )}
              </div>
              <div className="relative">
                <button onClick={() => setShowFilterDropdown(!showFilterDropdown)} className="inline-flex items-center py-2 px-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all font-medium">
                  <Filter className="h-4 w-4 mr-2" />Filter<ChevronDown className="h-4 w-4 ml-2" />
                </button>
                {renderDropdown(
                  [{ value: 'all', label: 'All Items' }, { value: 'inStock', label: 'In Stock' }, { value: 'onSale', label: 'On Sale' }],
                  filterBy, setFilterBy, showFilterDropdown, setShowFilterDropdown
                )}
              </div>
            </div>
            <div className="flex border-2 border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden">
              <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                <Grid className="h-5 w-5" />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedItems.map(renderProductCard)}
          </div>
        ) : (
          <div className="space-y-6">
            {sortedItems.map(item => (
              <div key={item.id} className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col sm:flex-row">
                <div className="sm:w-1/3">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 sm:w-2/3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-1">{item.name}</h3>
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < Math.floor(item.rating) ? 'fill-current text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
                          ))}
                        </div>
                        <span className="ml-2 text-gray-600 dark:text-gray-400 text-sm">{item.rating}</span>
                      </div>
                    </div>
                    <button onClick={() => removeFromWishlist(item.id)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex items-center mb-4">
                    <span className="text-xl font-bold text-gray-900 dark:text-gray-100">${item.price.toFixed(2)}</span>
                    {item.originalPrice && <span className="ml-2 text-gray-500 dark:text-gray-400 line-through">${item.originalPrice.toFixed(2)}</span>}
                    {item.onSale && <span className="ml-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded">SALE</span>}
                    <span className={`ml-2 text-xs px-2 py-1 rounded ${item.inStock ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`}>
                      {item.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => moveToCart(item)}
                      disabled={!item.inStock}
                      className={`py-2 px-4 rounded-xl transition-all duration-300 flex items-center ${
                        item.inStock 
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" /> {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <Link to={`/product/${item.id}`} className="py-2 px-4 border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 flex items-center">
                      <Eye className="h-4 w-4 mr-2" />View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link to="/products" className="inline-flex items-center py-3 px-8 border-2 border-blue-500 text-blue-600 dark:text-blue-300 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all font-medium hover:scale-[1.01]">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;