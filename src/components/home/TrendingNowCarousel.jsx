import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const generateRandomImageURL = (id, width = 300, height = 300) => {
  const seed = `product_${id}_${Math.floor(Math.random() * 10000)}`;
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
};

const mockTrendingProductsData = [
  {
    id: 101, name: "Wireless Noise Cancelling Headphones", price: "129.99", originalPrice: "199.99",
    image: generateRandomImageURL(101), rating: 4.7, reviewCount: 342
  },
  {
    id: 102, name: "Smart Fitness Tracker Watch", price: "89.99", originalPrice: "129.99",
    image: generateRandomImageURL(102), rating: 4.5, reviewCount: 218
  },
  {
    id: 103, name: "Portable Bluetooth Speaker", price: "59.99", originalPrice: "89.99",
    image: generateRandomImageURL(103), rating: 4.8, reviewCount: 156
  },
  {
    id: 104, name: "Ultra-HD Action Camera", price: "199.99", originalPrice: "299.99",
    image: generateRandomImageURL(104), rating: 4.6, reviewCount: 97
  },
  {
    id: 105, name: "Ergonomic Gaming Mouse", price: "49.99", originalPrice: "79.99",
    image: generateRandomImageURL(105), rating: 4.9, reviewCount: 284
  },
  {
    id: 106, name: "Smart Home Hub", price: "149.99", originalPrice: "199.99",
    image: generateRandomImageURL(106), rating: 4.4, reviewCount: 178
  },
  {
    id: 107, name: "Robot Vacuum Cleaner", price: "299.99", originalPrice: "399.99",
    image: generateRandomImageURL(107), rating: 4.6, reviewCount: 205
  },
  {
    id: 108, name: "4K Streaming Device", price: "49.99", originalPrice: "69.99",
    image: generateRandomImageURL(108), rating: 4.3, reviewCount: 412
  },
];

const cls = (darkMode, light, dark) => (darkMode ? dark : light);

const TrendingNowCarousel = () => {
  const extendedProducts = [...mockTrendingProductsData, ...mockTrendingProductsData];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { darkMode } = useTheme();
  const totalSlides = mockTrendingProductsData.length;

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentSlide(prev => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentSlide(prev => prev - 1);
  }, []);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentSlide >= totalSlides) setCurrentSlide(0);
    if (currentSlide < 0) setCurrentSlide(totalSlides - 1);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const navigate = (direction) => {
    if (direction === 'next') nextSlide();
    else prevSlide();
  };

  const themeClasses = {
    background: cls(darkMode, 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100', 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900'),
    title: cls(darkMode, 'from-blue-600 to-purple-600', 'from-teal-400 to-blue-400'),
    subtitle: cls(darkMode, 'text-slate-600', 'text-gray-300'),
    card: cls(darkMode, 'bg-white/90 border-white/20', 'bg-gray-800/90 border-gray-700/50'),
    cardRing: cls(darkMode, 'ring-black/5', 'ring-white/10'),
    text: cls(darkMode, 'text-slate-900', 'text-white'),
    textMuted: cls(darkMode, 'text-slate-500', 'text-gray-400'),
    badge: cls(darkMode, 'bg-red-100 text-red-700', 'bg-red-900/50 text-red-300'),
    discount: cls(darkMode, 'bg-green-100 text-green-700', 'bg-green-900/50 text-green-300'),
    shopNowButton: cls(
      darkMode,
      'border border-purple-300/80 text-purple-600 hover:border-purple-400 hover:text-purple-700 hover:shadow-[0_0_8px_-2px] hover:shadow-purple-300/50 bg-white',
      'border border-purple-500/50 text-purple-300 hover:border-purple-400 hover:text-purple-200 hover:shadow-[0_0_8px_-2px] hover:shadow-purple-500/30 bg-gray-900'
    ),
    navButton: cls(darkMode, 'bg-white/80 hover:bg-white text-slate-800', 'bg-gray-800/80 hover:bg-gray-700 text-white'),
    exploreButton: cls(
      darkMode,
      'border border-purple-300/80 text-purple-600 hover:border-purple-400 hover:text-purple-700 hover:shadow-[0_0_8px_-2px] hover:shadow-purple-300/50 bg-white',
      'border border-purple-500/50 text-purple-300 hover:border-purple-400 hover:text-purple-200 hover:shadow-[0_0_8px_-2px] hover:shadow-purple-500/30 bg-gray-900'
    )
  };

  const ProductCard = ({ product }) => (
    <div className="flex-shrink-0 w-full">
      <div className={`backdrop-blur-xl rounded-2xl p-6 md:p-8 lg:p-10 flex flex-col md:flex-row items-center ${themeClasses.card} border`}>
        <div className="md:w-2/5 mb-6 md:mb-0 flex justify-center relative">
          <div className={`absolute inset-0 rounded-xl blur-xl opacity-30 ${cls(darkMode, 'bg-gradient-to-r from-blue-400 to-purple-400', 'bg-gradient-to-r from-teal-400 to-blue-500')}`}></div>
          <img
            src={product.image}
            alt={product.name}
            className={`relative w-36 h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 object-contain rounded-xl shadow-xl hover:scale-105 transition-transform duration-300 ${cls(darkMode, 'bg-white', 'bg-gray-700')}`}
            onError={(e) => { e.target.src = generateRandomImageURL(`fallback_${product.id}`); }}
          />
        </div>
        <div className="md:w-3/5 md:pl-8 text-center md:text-left">
          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.65rem] md:text-xs font-semibold mb-3 ${themeClasses.badge}`}>TRENDING</div>
          <h3 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 leading-tight ${themeClasses.text}`}>{product.name}</h3>
          <div className="flex items-center justify-center md:justify-start mb-4">
            <div className="flex text-amber-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 md:h-5 md:w-5 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
              ))}
            </div>
            <span className={`font-semibold mr-2 text-sm md:text-base ${cls(darkMode, 'text-slate-700', 'text-gray-200')}`}>{product.rating}</span>
            <span className={`text-xs md:text-sm ${themeClasses.textMuted}`}>({product.reviewCount} reviews)</span>
          </div>
          <div className="mb-5">
            <span className={`text-2xl md:text-3xl lg:text-4xl font-bold ${themeClasses.text}`}>${product.price}</span>
            <span className={`line-through ml-3 md:ml-4 text-base md:text-lg lg:text-xl ${themeClasses.textMuted}`}>${product.originalPrice}</span>
            <div className={`inline-block ml-3 md:ml-4 px-1.5 py-0.5 md:px-2 md:py-1 rounded text-[0.65rem] md:text-xs font-bold ${themeClasses.discount}`}>
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
          </div>
          <Link
            to={`/product/${product.id}`}
            className={`inline-flex items-center px-5 py-2.5 md:px-6 md:py-3 rounded-lg md:rounded-xl font-bold text-base md:text-lg transition-all duration-300 hover:scale-105 ${themeClasses.shopNowButton} shadow-md md:shadow-lg`}
          >
            Shop Now <ChevronRight className="ml-1.5 h-4 w-4 md:ml-2 md:h-5 md:w-5" />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <section className={`py-14 sm:py-16 md:py-20 ${themeClasses.background}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r ${themeClasses.title} bg-clip-text text-transparent mb-3`}>
            Trending Now
          </h2>
          <p className={`text-sm sm:text-base md:text-lg ${themeClasses.subtitle}`}>Discover what's hot in tech right now</p>
        </div>

        <div className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)} onMouseLeave={() => setIsAutoPlaying(true)}>
          <div className={`overflow-hidden rounded-2xl shadow-2xl ring-1 ${themeClasses.cardRing}`}>
            <div
              className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedProducts.map((product, index) => (
                <ProductCard key={`${product.id}-${Math.floor(index / totalSlides)}`} product={product} />
              ))}
            </div>
          </div>

          <button onClick={() => navigate('prev')}
            className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 rounded-full p-2 md:p-3 transition-all duration-300 shadow-md md:shadow-lg hover:shadow-xl hover:scale-110 ${themeClasses.navButton} backdrop-blur-sm`}
            aria-label="Previous product">
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <button onClick={() => navigate('next')}
            className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 rounded-full p-2 md:p-3 transition-all duration-300 shadow-md md:shadow-lg hover:shadow-xl hover:scale-110 ${themeClasses.navButton} backdrop-blur-sm`}
            aria-label="Next product">
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </div>

        {/* Updated "Explore All Trends" button with neon glow effect */}
        <div className="text-center mt-10 sm:mt-12">
          <Link
            to="/products"
            className={`inline-flex items-center px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-lg md:text-xl transition-all duration-300 hover:scale-105 ${themeClasses.exploreButton} shadow-lg hover:shadow-xl`}
          >
            <TrendingUp className="mr-2 h-5 w-5 md:mr-3 md:h-6 md:w-6" /> Explore All Trends
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingNowCarousel;