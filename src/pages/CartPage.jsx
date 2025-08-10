import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  X, Plus, Minus, ShoppingCart, Heart, Shield, 
  Truck, Clock, Tag, CreditCard, Lock, CheckCircle
} from 'lucide-react';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [savedForLater, setSavedForLater] = useState([]);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const moveToSavedForLater = (item) => {
    setSavedForLater([...savedForLater, item]);
    removeFromCart(item.id);
  };

  const moveBackToCart = (item) => {
    setSavedForLater(savedForLater.filter(saved => saved.id !== item.id));
    // Add back to cart logic here
  };

  const Button = ({ variant = 'outline', color = 'gray', size = 'md', icon: Icon, children, className = '', ...props }) => {
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2.5',
      lg: 'px-6 py-3 text-lg'
    };

    const colorClasses = {
      gray: 'border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800',
      indigo: 'border-indigo-500 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-300 dark:hover:bg-indigo-900/20',
      red: 'border-red-500 text-red-600 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-900/20',
      green: 'border-green-500 text-green-600 hover:bg-green-50 dark:text-green-300 dark:hover:bg-green-900/20'
    };

    const filledClasses = {
      gray: 'bg-gray-600 text-white border-gray-600 hover:bg-gray-700',
      indigo: 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700',
      red: 'bg-red-600 text-white border-red-600 hover:bg-red-700',
      green: 'bg-green-600 text-white border-green-600 hover:bg-green-700'
    };

    const baseClasses = `inline-flex items-center justify-center border rounded-xl font-medium transition-all duration-200 ${sizeClasses[size]}`;
    const variantClasses = variant === 'filled' ? filledClasses[color] : colorClasses[color];

    return (
      <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
        {Icon && <Icon className="h-4 w-4 mr-2" />}
        {children}
      </button>
    );
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50/80 via-gray-100/50 to-gray-200/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white dark:bg-gray-900 p-12 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 text-center">
          <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6">
            <ShoppingCart className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Looks like you haven't added anything to your cart yet</p>
          <Link to="/products">
            <Button variant="filled" color="indigo" size="lg" className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/80 via-gray-100/50 to-gray-200/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 sm:px-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Shopping Cart</h1>
          <p className="text-gray-600 dark:text-gray-400">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="xl:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              {items.map((item, index) => (
                <div key={item.id} className={`p-6 ${index !== items.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''}`}>
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Product Image */}
                    <div className="w-full sm:w-32 h-32 flex-shrink-0">
                      <img 
                        src={item.image || 'https://placehold.co/128x128'} 
                        alt={item.name} 
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">{item.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">SKU: PRD-{item.id.toString().padStart(6, '0')}</p>
                          <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">${item.price.toFixed(2)}</p>
                        </div>
                        <Button 
                          color="red" 
                          size="sm"
                          icon={X}
                          onClick={() => removeFromCart(item.id)}
                          className="flex-shrink-0"
                        />
                      </div>
                      
                      {/* Quantity and Actions */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-xl">
                            <button 
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-l-xl"
                            >
                              <Minus className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                            </button>
                            <span className="px-4 py-2 font-medium text-gray-900 dark:text-gray-100 min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-r-xl"
                            >
                              <Plus className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                            </button>
                          </div>
                          
                          <Button 
                            icon={Heart}
                            size="sm"
                            onClick={() => moveToSavedForLater(item)}
                          >
                            Save for Later
                          </Button>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          <div className="flex items-center text-sm text-green-600 dark:text-green-300 mt-1">
                            <Truck className="h-4 w-4 mr-1" />
                            Free delivery by Mon, Aug 5
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Continue Shopping */}
            <div className="mt-6">
              <Link to="/products">
                <Button icon={ShoppingCart}>← Continue Shopping</Button>
              </Link>
            </div>

            {/* Saved for Later */}
            {savedForLater.length > 0 && (
              <div className="mt-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Saved for Later</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedForLater.map(item => (
                    <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                      <img src={item.image} alt={item.name} className="w-full h-24 object-cover rounded-lg mb-3" />
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">{item.name}</h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">${item.price.toFixed(2)}</p>
                      <Button size="sm" color="indigo" onClick={() => moveBackToCart(item)} className="w-full">
                        Move to Cart
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Order Summary</h2>
              
              {/* Price Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal ({items.length} item{items.length !== 1 ? 's' : ''})</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <Truck className="h-4 w-4 mr-1" />
                    <span>Shipping</span>
                  </div>
                  <span className="text-green-600 dark:text-green-300 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Estimated Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between text-lg font-bold text-gray-900 dark:text-gray-100">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Estimated Delivery */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 mb-6">
                <div className="flex items-center text-green-600 dark:text-green-300 mb-2">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="font-medium">Estimated Delivery</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Monday, August 5th - Wednesday, August 7th</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Free standard shipping on orders over $25</p>
              </div>
              
              {/* Checkout Button */}
              <Button 
                variant="filled" 
                color="indigo" 
                size="lg" 
                className="w-full mb-4"
                icon={Lock}
              >
                Secure Checkout
              </Button>
              
              {/* Security Information */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-6">
                <div className="flex items-center text-gray-700 dark:text-gray-300 mb-3">
                  <Shield className="h-5 w-5 mr-2 text-green-500" />
                  <span className="font-medium">Secure Checkout</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {['VISA', 'MASTERCARD', 'PAYPAL', 'APPLE PAY'].map(method => (
                      <div key={method} className="bg-white dark:bg-gray-700 px-2 py-1 rounded text-xs font-medium border border-gray-200 dark:border-gray-600">
                        {method}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                    SSL Secured
                  </div>
                </div>
              </div>
              
              {/* Coupon Code */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  <Tag className="h-4 w-4 inline mr-1" />
                  Discount Code
                </label>
                <div className="flex">
                  <input 
                    type="text" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code" 
                    className="flex-grow px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-l-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                  />
                  <Button 
                    color="gray" 
                    className="rounded-l-none border-l-0"
                  >
                    Apply
                  </Button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Have a gift card? <button className="text-indigo-600 dark:text-indigo-300 hover:underline">Apply here</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
