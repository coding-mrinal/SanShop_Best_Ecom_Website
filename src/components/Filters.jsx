import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Filter, X, Star } from 'lucide-react';
import { categories, brands, priceRanges } from '../data/products';

const Filters = ({ filters, onFiltersChange, isOpen, onToggle, productsCount }) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true, price: true, brand: false, rating: false, availability: false
  });

  const toggleSection = (section) => setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  const handleFilterChange = (filterType, value) => onFiltersChange(prev => ({ ...prev, [filterType]: value }));
  const clearAllFilters = () => onFiltersChange({ category: 'all', priceRange: 'all', brand: 'all', rating: 0, inStock: false, search: '' });
  const hasActiveFilters = () => filters.category !== 'all' || filters.priceRange !== 'all' || filters.brand !== 'all' || filters.rating > 0 || filters.inStock || filters.search;

  const FilterSection = ({ title, isExpanded, onToggle, children }) => (
    <div className="border-b border-gray-200 dark:border-gray-600 pb-4">
      <button onClick={onToggle} className="flex items-center justify-between w-full text-left font-medium text-gray-800 dark:text-white hover:text-pink-600 dark:hover:text-cyan-300 transition-colors">
        <span>{title}</span>
        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {isExpanded && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );

  // Define filter sections configuration
  const filterSections = [
    { key: 'category', title: 'Category', items: categories, type: 'radio', filterKey: 'category' },
    { key: 'price', title: 'Price Range', items: priceRanges, type: 'radio', filterKey: 'priceRange' },
    { key: 'brand', title: 'Brand', items: brands, type: 'radio', filterKey: 'brand' },
    {
      key: 'rating',
      title: 'Rating',
      items: [...[4, 3, 2, 1].map(r => ({ id: r, name: r, display: <div className="flex items-center"><div className="flex text-yellow-400">{[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < r ? 'fill-current' : ''}`} />)}</div><span className="ml-1 text-sm text-gray-700 dark:text-gray-300">& up</span></div> })), { id: 0, name: 'All Ratings', display: 'All Ratings' }],
      type: 'radio',
      filterKey: 'rating',
      valueTransform: (v) => parseInt(v)
    },
    {
      key: 'availability',
      title: 'Availability',
      items: [{ id: 'inStock', name: 'In Stock Only', display: 'In Stock Only' }],
      type: 'checkbox',
      filterKey: 'inStock'
    }
  ];

  const renderItem = (section, item) => {
    const isRadio = section.type === 'radio';
    const isChecked = isRadio ? filters[section.filterKey] === item.id : filters[section.filterKey];
    const handleChange = isRadio
      ? (e) => handleFilterChange(section.filterKey, section.valueTransform ? section.valueTransform(e.target.value) : e.target.value)
      : (e) => handleFilterChange(section.filterKey, e.target.checked);

    return (
      <label key={item.id} className={`flex items-center ${isRadio ? 'justify-between cursor-pointer' : 'cursor-pointer'} hover:bg-pink-50 dark:hover:bg-cyan-900/10 p-2 rounded-lg transition-colors`}>
        <div className="flex items-center">
          <input
            type={section.type}
            name={section.filterKey}
            value={isRadio ? item.id : undefined}
            checked={isChecked}
            onChange={handleChange}
            className={`w-4 h-4 text-pink-600 dark:text-cyan-400 border-gray-300 dark:border-gray-600 focus:ring-pink-500 dark:focus:ring-cyan-400 ${section.type === 'checkbox' ? 'rounded' : ''}`}
          />
          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{item.display || item.name}</span>
        </div>
        {item.count !== undefined && (
          <span className="text-xs bg-pink-100 dark:bg-cyan-900/20 text-pink-600 dark:text-cyan-300 px-2 py-1 rounded-full">
            {item.count}
          </span>
        )}
      </label>
    );
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={onToggle}
          className="flex items-center justify-between w-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-pink-400 dark:border-cyan-400 text-pink-600 dark:text-cyan-300 px-4 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-[0_0_15px] hover:shadow-pink-200/40 dark:hover:shadow-cyan-500/20"
        >
          <span className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filters {hasActiveFilters() && `(${Object.values(filters).filter(v => v && v !== 'all' && v !== 0 && v !== '').length})`}
          </span>
          <span className="text-sm bg-pink-100 dark:bg-cyan-900/20 px-2 py-1 rounded-full">{productsCount} items</span>
        </button>
      </div>

      {/* Filter Panel */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block`}>
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl sticky top-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center"><Filter className="h-5 w-5 mr-2" />Filters</h3>
            {hasActiveFilters() && (
              <button onClick={clearAllFilters} className="text-sm text-pink-600 dark:text-cyan-300 hover:text-pink-700 dark:hover:text-cyan-200 flex items-center transition-colors">
                <X className="h-4 w-4 mr-1" /> Clear All
              </button>
            )}
          </div>
          <div className="space-y-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search Products</label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Search by name..."
                className="w-full px-3 py-2 border border-pink-400 dark:border-cyan-400 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-cyan-400 transition-all"
              />
            </div>

            {/* Dynamic Filter Sections */}
            {filterSections.map(section => (
              <FilterSection
                key={section.key}
                title={section.title}
                isExpanded={expandedSections[section.key]}
                onToggle={() => toggleSection(section.key)}
              >
                {section.items.map(item => renderItem(section, item))}
              </FilterSection>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Showing <span className="font-semibold text-pink-600 dark:text-cyan-300">{productsCount}</span> products
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;