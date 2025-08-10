// src/components/home/ShopByCategory.jsx
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

// Function to generate a unique Picsum URL with a random seed
// Note: Using Picsum might sometimes lead to issues like 403/429 errors or Cloudflare blocks.
// Consider having a local fallback image or a different image service if problems persist.
const generateRandomCategoryImageURL = (id, width = 300, height = 200) => {
  const seed = `category_${id}_${Math.floor(Math.random() * 10000)}`;
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
};

// Fallback image URL in case Picsum fails
const FALLBACK_CATEGORY_IMAGE = "https://placehold.co/300x200?text=Category+Image";

const ShopByCategory = () => {
  const scrollContainerRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const categories = [
    // Original Categories
    { id: 1, name: "Electronics", image: generateRandomCategoryImageURL(1), slug: "electronics", gradient: "from-indigo-500 to-purple-600" },
    { id: 2, name: "Clothing", image: generateRandomCategoryImageURL(2), slug: "clothing", gradient: "from-pink-500 to-rose-600" },
    { id: 3, name: "Home & Kitchen", image: generateRandomCategoryImageURL(3), slug: "home-kitchen", gradient: "from-emerald-500 to-teal-600" },
    { id: 4, name: "Beauty", image: generateRandomCategoryImageURL(4), slug: "beauty", gradient: "from-amber-500 to-orange-600" },
    // New Categories with Aesthetic Schemes
    { id: 5, name: "Sports & Outdoors", image: generateRandomCategoryImageURL(5), slug: "sports-outdoors", gradient: "from-blue-500 to-cyan-500" },
    { id: 6, name: "Books & Media", image: generateRandomCategoryImageURL(6), slug: "books-media", gradient: "from-violet-500 to-purple-500" },
    { id: 7, name: "Toys & Games", image: generateRandomCategoryImageURL(7), slug: "toys-games", gradient: "from-red-500 to-pink-500" },
    { id: 8, name: "Health & Wellness", image: generateRandomCategoryImageURL(8), slug: "health-wellness", gradient: "from-green-500 to-emerald-500" },
    { id: 9, name: "Automotive", image: generateRandomCategoryImageURL(9), slug: "automotive", gradient: "from-gray-600 to-blue-gray-500" },
    { id: 10, name: "Jewelry", image: generateRandomCategoryImageURL(10), slug: "jewelry", gradient: "from-yellow-500 to-amber-300" },
  ];

  // Check scroll position to show/hide buttons
  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      // Add a small tolerance for floating point inaccuracies
      const tolerance = 1;
      setShowLeftButton(scrollLeft > tolerance);
      setShowRightButton(scrollLeft + clientWidth < scrollWidth - tolerance);
    }
  };

  // Handle scroll event
  const handleScroll = () => {
    checkScrollButtons();
  };

  // Scroll left or right
  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      // Calculate width of one item plus its gap for smoother scrolling
      // Approximate gap sizes: xs=12px (3*4), sm=16px (4*4), md=20px (5*4)
      // This is a simplified calculation, actual gap might vary slightly with responsive changes
      const gapXs = 3 * 4; // 3 * theme spacing unit (4px)
      const gapSm = 4 * 4; // 4 * theme spacing unit (4px)
      const gapMd = 5 * 4; // 5 * theme spacing unit (4px)

      let itemWidth;
      if (window.innerWidth >= 768) { // md breakpoint
        itemWidth = (container.clientWidth - gapMd * 4) / 5; // 5 items, 4 gaps
      } else if (window.innerWidth >= 640) { // sm breakpoint
        itemWidth = (container.clientWidth - gapSm * 3) / 4; // 4 items, 3 gaps (fallback if less than 5 fit)
      } else {
         itemWidth = (container.clientWidth - gapXs * 1) / 2; // 2 items, 1 gap (fallback if less than 5 fit)
      }
      const scrollAmount = itemWidth + (window.innerWidth >= 768 ? gapMd : (window.innerWidth >= 640 ? gapSm : gapXs));

      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Add event listeners for scroll and resize
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', checkScrollButtons);
      // Initial check
      checkScrollButtons();
    }

    // Cleanup
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', checkScrollButtons);
    };
  }, []);

  return (
    <section className="py-10 sm:py-14 md:py-16 bg-gradient-to-br from-white via-gray-50 to-slate-100 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif leading-snug bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2 sm:mb-3">
            Shop by Category
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">Discover amazing products in every category</p>
        </div>

        {/* Horizontal Scroll Container with Navigation Buttons */}
        <div className="relative">
          {/* Left Scroll Button */}
          {showLeftButton && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800/80 text-gray-800 dark:text-white p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {/* Scrollable Content Area */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto pb-4 hide-scrollbar scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide scrollbar for Firefox and IE/Edge
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none; /* Hide scrollbar for Chrome/Safari/Opera */
              }
            `}</style>
            {/* Grid adjusted to show 5 items by default on larger screens */}
            <div
              className="grid grid-flow-col auto-cols-[minmax(calc((100%-12px)/2),1fr)] sm:auto-cols-[minmax(calc((100%-16px)/3),1fr)] md:auto-cols-[minmax(calc((100%-20px)*0.2-4px),1fr)] gap-3 sm:gap-4 md:gap-5 px-1 snap-x snap-mandatory"
              onScroll={handleScroll}
            >
              {categories.map((category) => (
                <div key={category.id} className="snap-center flex-shrink-0">
                  <Link
                    to={`/category/${category.slug}`}
                    className="group block overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] h-full"
                  >
                    <div className="relative pb-[75%]"> {/* Aspect ratio 4:3 */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90`}></div>
                      <img
                        src={category.image}
                        alt={category.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        // Simplified fallback to a static placeholder
                        onError={(e) => {
                          e.target.src = FALLBACK_CATEGORY_IMAGE;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                        <h3 className="text-white text-sm sm:text-base md:text-lg font-bold mb-1">{category.name}</h3>
                        <div className="flex items-center text-white/90 text-[0.65rem] sm:text-xs">
                          <span>Explore</span>
                          <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 ml-1 transform group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Right Scroll Button */}
          {showRightButton && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800/80 text-gray-800 dark:text-white p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
              aria-label="Scroll Right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;