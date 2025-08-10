// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Package } from 'lucide-react';

const Footer = () => {
  // Array for cleaner link mapping
  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
  ];

  const customerServiceLinks = [
    { to: '/faq', label: 'FAQs' },
    { to: '/shipping', label: 'Shipping Policy' },
    { to: '/returns', label: 'Returns & Exchanges' },
    { to: '/privacy', label: 'Privacy Policy' },
  ];

  return (
    <footer className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300">
      <div className="container mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-2 rounded-lg">
                <Package className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                SanShop
              </span>
            </Link>
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400">
              Your one-stop destination for all your shopping needs. Quality products at affordable prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 transition">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Instagram" className="text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 transition">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-sm md:text-base text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Customer Service</h4>
            <ul className="space-y-2">
              {customerServiceLinks.map(link => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-sm md:text-base text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-0.5 text-teal-500 dark:text-teal-400 flex-shrink-0" />
                <span className="text-sm md:text-base text-slate-500 dark:text-slate-400">123 Shopping Street, Retail City, 700001</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-teal-500 dark:text-teal-400 flex-shrink-0" />
                <span className="text-sm md:text-base text-slate-500 dark:text-slate-400">+91 987 654 3210</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-teal-500 dark:text-teal-400 flex-shrink-0" />
                <span className="text-sm md:text-base text-slate-500 dark:text-slate-400">support@shopease.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 mt-8 md:mt-10 pt-6 md:pt-8 text-center text-sm md:text-base text-slate-500 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;