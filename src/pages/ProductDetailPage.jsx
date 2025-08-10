import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, ArrowLeft } from 'lucide-react';
import { allProducts } from '../data/products';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  const product = allProducts.find(p => p.id === parseInt(id));
  const relatedProducts = allProducts.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 3);

  const images = ['https://placehold.co/600x600', 'https://placehold.co/600x600/efefef', 'https://placehold.co/600x600/dedede'];
  const specifications = {
    electronics: { 'Brand': 'Premium Tech', 'Model': product?.name, 'Warranty': '2 years', 'Weight': '250g', 'Dimensions': '15 x 10 x 5 cm' },
    clothing: { 'Material': '100% Cotton', 'Care': 'Machine wash cold', 'Origin': 'Made in USA', 'Fit': 'Regular', 'Size Range': 'XS - XXL' },
    home: { 'Material': 'Premium Quality', 'Dimensions': '20 x 15 x 10 cm', 'Weight': '1.2 kg', 'Warranty': '1 year', 'Care': 'Easy maintenance' },
    beauty: { 'Type': 'Premium Quality', 'Ingredients': 'Natural & Organic', 'Skin Type': 'All skin types', 'Cruelty Free': 'Yes', 'Shelf Life': '24 months' }
  }[product?.category] || { 'Brand': 'Premium Tech', 'Model': product?.name, 'Warranty': '2 years', 'Weight': '250g', 'Dimensions': '15 x 10 x 5 cm' }; // Default specs

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Product Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">The product you're looking for doesn't exist.</p>
          <Link to="/products" className="border border-pink-400 text-pink-600 hover:text-pink-700 hover:border-pink-500 hover:shadow-[0_0_15px] hover:shadow-pink-200/40 dark:border-cyan-400 dark:text-cyan-300 dark:hover:text-cyan-200 dark:hover:border-cyan-300 dark:hover:shadow-[0_0_15px] dark:hover:shadow-cyan-500/20 px-6 py-3 rounded-xl font-medium transition-all duration-300">Back to Products</Link>
        </div>
      </div>
    );
  }

  const renderStars = (filledCount) => [...Array(5)].map((_, i) => <Star key={i} className={`h-5 w-5 ${i < Math.floor(filledCount) ? 'fill-current' : ''}`} />);
  const handleAddToCart = () => console.log(`Added ${quantity} of ${product.name} to cart`);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 transition-all duration-300">
      <div className="container mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center mb-6 border border-pink-400 text-pink-600 hover:text-pink-700 hover:border-pink-500 hover:shadow-[0_0_15px] hover:shadow-pink-200/40 dark:border-cyan-400 dark:text-cyan-300 dark:hover:text-cyan-200 dark:hover:border-cyan-300 dark:hover:shadow-[0_0_15px] dark:hover:shadow-cyan-500/20 px-4 py-2 rounded-xl font-medium transition-all duration-300">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Products
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="mb-4"><img src={images[selectedImage]} alt={product.name} className="w-full h-96 object-cover rounded-2xl shadow-lg" /></div>
            <div className="flex space-x-4">
              {images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)} className={`w-20 h-20 rounded-xl overflow-hidden transition-all duration-200 ${selectedImage === i ? 'border-2 border-pink-500 shadow-lg shadow-pink-200/40 dark:border-cyan-300 dark:shadow-cyan-500/20' : 'border-2 border-pink-400 hover:border-pink-500 hover:shadow-[0_0_15px] hover:shadow-pink-200/40 dark:border-cyan-400 dark:hover:border-cyan-300 dark:hover:shadow-[0_0_15px] dark:hover:shadow-cyan-500/20'}`}>
                  <img src={img} alt={`Product ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          {/* Info */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">{renderStars(product.rating)}</div>
              <span className="text-gray-600 dark:text-gray-300 ml-2">({product.reviewCount} reviews)</span>
            </div>
            <div className="mb-6">
              <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">${product.price}</span>
              {product.originalPrice > product.price && <span className="text-xl text-gray-500 dark:text-gray-400 line-through ml-3">${product.originalPrice}</span>}
            </div>
            <div className="mb-6">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${product.inStock ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'}`}>
                {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-8">{product.description}</p>
            <div className="mb-8">
              <h3 className="font-semibold mb-3 text-gray-800 dark:text-white">Key Features:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((f, i) => <li key={i} className="flex items-center text-gray-700 dark:text-gray-300"><span className="h-2 w-2 bg-indigo-500 rounded-full mr-2"></span>{f}</li>)}
              </ul>
            </div>
            {product.inStock && (
              <div className="flex items-center mb-8">
                <span className="mr-4 text-gray-700 dark:text-gray-300">Quantity:</span>
                <div className="flex items-center bg-white dark:bg-gray-700 border border-pink-400 dark:border-cyan-400 rounded-xl">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 text-pink-600 hover:text-pink-700 dark:text-cyan-300 dark:hover:text-cyan-200 rounded-l-xl transition-colors hover:bg-pink-50 dark:hover:bg-cyan-900/20">-</button>
                  <span className="px-4 py-2 text-gray-800 dark:text-white">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-2 text-pink-600 hover:text-pink-700 dark:text-cyan-300 dark:hover:text-cyan-200 rounded-r-xl transition-colors hover:bg-pink-50 dark:hover:bg-cyan-900/20">+</button>
                </div>
              </div>
            )}
            <div className="flex flex-wrap gap-4 mb-8">
              {product.inStock && <button onClick={handleAddToCart} className="flex items-center border border-pink-400 text-pink-600 hover:text-pink-700 hover:border-pink-500 hover:shadow-[0_0_15px] hover:shadow-pink-200/40 dark:border-cyan-400 dark:text-cyan-300 dark:hover:text-cyan-200 dark:hover:border-cyan-300 dark:hover:shadow-[0_0_15px] dark:hover:shadow-cyan-500/20 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"><ShoppingCart className="mr-2" /> Add to Cart</button>}
              <button className="flex items-center border border-pink-400 text-pink-600 hover:text-pink-700 hover:border-pink-500 hover:shadow-[0_0_15px] hover:shadow-pink-200/40 dark:border-cyan-400 dark:text-cyan-300 dark:hover:text-cyan-200 dark:hover:border-cyan-300 dark:hover:shadow-[0_0_15px] dark:hover:shadow-cyan-500/20 px-6 py-3 rounded-xl font-medium transition-all duration-300"><Heart className="mr-2" /> Wishlist</button>
              <button className="flex items-center border border-pink-400 text-pink-600 hover:text-pink-700 hover:border-pink-500 hover:shadow-[0_0_15px] hover:shadow-pink-200/40 dark:border-cyan-400 dark:text-cyan-300 dark:hover:text-cyan-200 dark:hover:border-cyan-300 dark:hover:shadow-[0_0_15px] dark:hover:shadow-cyan-500/20 px-6 py-3 rounded-xl font-medium transition-all duration-300"><Share2 className="mr-2" /> Share</button>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
              <div className="flex items-center mb-4"><Truck className="h-5 w-5 text-green-500 mr-2" /><span className="text-green-600 dark:text-green-400 font-medium">Free shipping on orders over $50</span></div>
              <div className="flex items-center"><Shield className="h-5 w-5 text-blue-500 mr-2" /><span className="text-blue-600 dark:text-blue-400 font-medium">2-year warranty included</span></div>
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="mt-16 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-600">
            <nav className="flex space-x-8 px-8">
              {['description', 'specifications', 'reviews'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`py-4 px-1 border-b-2 font-medium capitalize transition-colors ${activeTab === tab ? 'border-pink-500 text-pink-600 dark:border-cyan-400 dark:text-cyan-300' : 'border-transparent text-pink-400 hover:text-pink-600 hover:border-pink-300 dark:text-cyan-400 dark:hover:text-cyan-300 dark:hover:border-cyan-500'}`}>
                  {tab} {tab === 'reviews' && `(${product.reviewCount})`}
                </button>
              ))}
            </nav>
          </div>
          <div className="p-8">
            {activeTab === 'description' && <div className="text-gray-700 dark:text-gray-300"><p className="mb-4">{product.description}</p><p>This premium {product.name.toLowerCase()} delivers exceptional quality and performance. Crafted with attention to detail and using high-quality materials, it's designed to meet your needs and exceed your expectations.</p></div>}
            {activeTab === 'specifications' && <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{Object.entries(specifications).map(([k, v]) => <div key={k} className="flex justify-between border-b border-gray-200 dark:border-gray-600 pb-2"><span className="font-medium text-gray-800 dark:text-white">{k}</span><span className="text-gray-600 dark:text-gray-300">{v}</span></div>)}</div>}
            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center mb-6">
                  <div className="text-4xl font-bold mr-4 text-gray-800 dark:text-white">{product.rating}</div>
                  <div>
                    <div className="flex text-yellow-400 mb-1">{renderStars(product.rating)}</div>
                    <p className="text-gray-600 dark:text-gray-300">Based on {product.reviewCount} reviews</p>
                  </div>
                </div>
                <div className="space-y-6">
                  {[1, 2, 3].map(r => (
                    <div key={r} className="border-b border-gray-200 dark:border-gray-600 pb-6">
                      <div className="flex justify-between mb-2"><h4 className="font-semibold text-gray-800 dark:text-white">Customer #{r}</h4><span className="text-gray-500 dark:text-gray-400">{r} days ago</span></div>
                      <div className="flex text-yellow-400 mb-2">{renderStars(5)}</div>
                      <p className="text-gray-700 dark:text-gray-300">Great {product.name.toLowerCase()}! Excellent quality and fast shipping. Highly recommend to anyone looking for a reliable product.</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(rp => (
                <Link key={rp.id} to={`/product/${rp.id}`}>
                  <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105">
                    <img src="https://placehold.co/300x300" alt={rp.name} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">{rp.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-800 dark:text-white">${rp.price}</span>
                        <button className="border border-pink-400 text-pink-600 hover:text-pink-700 hover:border-pink-500 hover:shadow-[0_0_15px] hover:shadow-pink-200/40 dark:border-cyan-400 dark:text-cyan-300 dark:hover:text-cyan-200 dark:hover:border-cyan-300 dark:hover:shadow-[0_0_15px] dark:hover:shadow-cyan-500/20 p-2 rounded-full transition-all duration-300 hover:scale-105"><ShoppingCart className="h-5 w-5" /></button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;