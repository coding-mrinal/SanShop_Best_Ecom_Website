// src/components/common/ValueProposition.jsx
import React from 'react';
// Icons imported but no longer used in the card rendering
import { Truck, RotateCw, ShieldCheck, Headset } from 'lucide-react';

const ValueProposition = () => {
  const propositions = [
    {
      // icon: <Truck className="h-10 w-10" />, // Icon removed from data
      headline: "Free & Fast Shipping",
      text: "On all orders over $50. We deliver across the country in 3-5 business days.",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      darkBgGradient: "from-blue-900/20 to-cyan-900/20"
    },
    {
      // icon: <RotateCw className="h-10 w-10" />, // Icon removed from data
      headline: "Easy Returns",
      text: "Not satisfied? Return your product within 30 days for a hassle-free exchange or refund.",
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
      darkBgGradient: "from-emerald-900/20 to-teal-900/20"
    },
    {
      // icon: <ShieldCheck className="h-10 w-10" />, // Icon removed from data
      headline: "Secure Payments",
      text: "We accept all major credit cards, PayPal, and Apple Pay with 100% secure transactions.",
      gradient: "from-purple-500 to-indigo-500",
      bgGradient: "from-purple-50 to-indigo-50",
      darkBgGradient: "from-purple-900/20 to-indigo-900/20"
    },
    {
      // icon: <Headset className="h-10 w-10" />, // Icon removed from data
      headline: "24/7 Support",
      text: "Our customer support team is here to help you around the clock via chat, email, or phone.",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50",
      darkBgGradient: "from-orange-900/20 to-red-900/20"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-slate-100 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          {/* Enhanced main title font style */}
          <h2 className="text-4xl md:text-5xl font-bold font-serif bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
            Why Choose Us?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">Experience the difference with our premium service</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {propositions.map((prop, index) => (
            <div 
              key={index} 
              className="group relative bg-white dark:bg-slate-800 rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${prop.bgGradient} dark:${prop.darkBgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className="relative z-10">
                {/* Icon container removed, padding adjusted */}
                <div className="mb-4"></div> 
                {/* Enhanced headline font style */}
                <h3 className="text-2xl font-bold font-serif mb-4 text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-white transition-colors">
                  {prop.headline}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                  {prop.text}
                </p>
              </div>
              <div className={`absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br ${prop.gradient} opacity-10 rounded-full transform group-hover:scale-150 transition-transform duration-700`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;