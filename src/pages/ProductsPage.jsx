import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Grid, List } from 'lucide-react';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import { allProducts, priceRanges } from '../data/products';

const ProductsPage = () => {
  const [filters, setFilters] = useState({ category: 'all', priceRange: 'all', brand: 'all', rating: 0, inStock: false, search: '' });
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  useEffect(() => setCurrentPage(1), [filters, sortBy]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts.filter(p => {
      if (filters.category !== 'all' && p.category !== filters.category) return false;
      if (filters.priceRange !== 'all') {
        const range = priceRanges.find(r => r.id === filters.priceRange);
        if (range && (p.price < range.min || p.price > range.max)) return false;
      }
      if (filters.brand !== 'all') {
        const brandName = filters.brand.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
        if (!p.brand.includes(brandName)) return false;
      }
      if (filters.rating > 0 && p.rating < filters.rating) return false;
      if (filters.inStock && !p.inStock) return false;
      if (filters.search && !p.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    });

    switch (sortBy) {
      case 'price-low': return filtered.sort((a, b) => a.price - b.price);
      case 'price-high': return filtered.sort((a, b) => b.price - a.price);
      case 'rating': return filtered.sort((a, b) => b.rating - a.rating);
      case 'newest': return filtered.sort((a, b) => b.id - a.id);
      default: return filtered;
    }
  }, [filters, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const ProductCard = ({ product }) => (
    <div className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group ${viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''} hover:scale-105`}>
      <div className={`relative ${viewMode === 'list' ? 'sm:w-1/3' : ''}`}>
        <img src="https://placehold.co/300x300" alt={product.name} className={`w-full object-cover ${viewMode === 'list' ? 'h-full sm:h-48' : 'h-48'}`} />
        {!product.inStock && <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-medium">Out of Stock</div>}
        {product.originalPrice > product.price && <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-medium">Sale</div>}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
      </div>
      <div className={`p-6 ${viewMode === 'list' ? 'sm:w-2/3' : ''}`}>
        <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white line-clamp-2">{product.name}</h3>
        <p className={`text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2 ${viewMode === 'list' ? 'sm:line-clamp-none' : ''}`}>{product.description}</p>
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />)}
          </div>
          <span className="text-gray-600 dark:text-gray-300 text-sm ml-1">({product.reviewCount})</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">${product.price}</span>
            {product.originalPrice > product.price && <span className="text-sm text-gray-500 dark:text-gray-400 line-through ml-2">${product.originalPrice}</span>}
          </div>
          <span className="text-xs bg-pink-100 dark:bg-cyan-900/20 text-pink-600 dark:text-cyan-300 px-2 py-1 rounded-full">{product.brand}</span>
        </div>
        <div className="flex gap-2">
          <Link to={`/products/${product.id}`} className="flex-1 text-center border border-pink-400 text-pink-600 hover:text-pink-700 hover:border-pink-500 hover:shadow-[0_0_15px] hover:shadow-pink-200/40 dark:border-cyan-400 dark:text-cyan-300 dark:hover:text-cyan-200 dark:hover:border-cyan-300 dark:hover:shadow-[0_0_15px] dark:hover:shadow-cyan-500/20 py-2 px-4 rounded-xl font-medium transition-all duration-300">
            View Details
          </Link>
          <button
            disabled={!product.inStock}
            className={`border p-2 rounded-xl transition-all duration-300 ${product.inStock ? 'border-pink-400 text-pink-600 hover:text-pink-700 hover:border-pink-500 hover:shadow-[0_0_15px] hover:shadow-pink-200/40 dark:border-cyan-400 dark:text-cyan-300 dark:hover:text-cyan-200 dark:hover:border-cyan-300 dark:hover:shadow-[0_0_15px] dark:hover:shadow-cyan-500/20 hover:scale-105' : 'border-gray-300 text-gray-400 cursor-not-allowed dark:border-gray-600 dark:text-gray-500'}`}
            onClick={() => console.log(`Added ${product.name} to cart`)}
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 transition-all duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">Our Products</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Discover our carefully curated collection of premium products</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <Filters filters={filters} onFiltersChange={setFilters} isOpen={filtersOpen} onToggle={() => setFiltersOpen(!filtersOpen)} productsCount={filteredAndSortedProducts.length} />
          </div>
          <div className="lg:w-3/4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center gap-4 flex-wrap">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border border-pink-400 dark:border-cyan-400 rounded-xl px-4 py-2 bg-white/70 dark:bg-gray-800/70 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-cyan-400">
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
                <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} className="border border-pink-400 dark:border-cyan-400 rounded-xl px-4 py-2 bg-white/70 dark:bg-gray-800/70 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-cyan-400">
                  <option value={9}>9 per page</option>
                  <option value={12}>12 per page</option>
                  <option value={18}>18 per page</option>
                  <option value={24}>24 per page</option>
                </select>
                <div className="flex border border-pink-400 dark:border-cyan-400 rounded-xl overflow-hidden">
                  <button onClick={() => setViewMode('grid')} className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-pink-500 text-white dark:bg-cyan-500' : 'text-pink-600 dark:text-cyan-300 hover:bg-pink-50 dark:hover:bg-cyan-900/20'}`}><Grid className="h-5 w-5" /></button>
                  <button onClick={() => setViewMode('list')} className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-pink-500 text-white dark:bg-cyan-500' : 'text-pink-600 dark:text-cyan-300 hover:bg-pink-50 dark:hover:bg-cyan-900/20'}`}><List className="h-5 w-5" /></button>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Page {currentPage} of {totalPages} <span className="hidden sm:inline">({filteredAndSortedProducts.length} total products)</span>
              </p>
            </div>

            {currentProducts.length > 0 ? (
              <>
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                  {currentProducts.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={filteredAndSortedProducts.length} itemsPerPage={itemsPerPage} onPageChange={handlePageChange} />
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No products found</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Try adjusting your filters or search terms</p>
                <button onClick={() => { setFilters({ category: 'all', priceRange: 'all', brand: 'all', rating: 0, inStock: false, search: '' }); setCurrentPage(1); }} className="border border-pink-400 text-pink-600 hover:text-pink-700 hover:border-pink-500 dark:border-cyan-400 dark:text-cyan-300 dark:hover:text-cyan-200 dark:hover:border-cyan-300 px-6 py-3 rounded-xl font-medium transition-all duration-300">
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;