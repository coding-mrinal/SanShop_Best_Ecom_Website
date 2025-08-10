// src/components/common/Testimonials.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonialsData = [
  { id: 1, name: "Sarah Johnson", rating: 5, text: "The quality of products exceeded my expectations. Fast shipping and excellent customer service. Will definitely shop here again!", date: "2023-10-15" },
  { id: 2, name: "Michael Chen", rating: 5, text: "I've been a customer for over a year now. The variety of products and competitive prices keep me coming back. Highly recommended!", date: "2023-11-02" },
  { id: 3, name: "Emily Rodriguez", rating: 5, text: "Amazing shopping experience from start to finish. The website is easy to navigate and my order arrived perfectly packaged.", date: "2023-11-20" },
  { id: 4, name: "Ravi Kumar", rating: 4, text: "Good product selection and smooth checkout. Delivery was a bit late, but overall I'm happy!", date: "2023-12-03" },
  { id: 5, name: "Helen Carter", rating: 5, text: "Customer support quickly resolved my issue. I love the rewards program too!", date: "2023-12-11" },
  { id: 6, name: "David Lee", rating: 4, text: "Products are as described. Great deals and regular updates on my order status.", date: "2023-12-25" },
  { id: 7, name: "Priya Sharma", rating: 5, text: "Fantastic quality and fast delivery. The packaging was also very eco-friendly. Impressed!", date: "2024-01-10" },
  { id: 8, name: "James Wilson", rating: 5, text: "Easy returns process and friendly客服. Found exactly what I needed for my project.", date: "2024-01-22" },
  { id: 9, name: "Aisha Mohamed", rating: 4, text: "Great variety of products. The search function is very helpful. Will shop here again.", date: "2024-02-05" },
  { id: 10, name: "Carlos Garcia", rating: 5, text: "The mobile app is super convenient. I can shop anytime, anywhere. Love the exclusive app deals!", date: "2024-02-18" },
];

const Testimonials = () => {
  const testimonialsToShow = 3;
  const extendedTestimonials = [...testimonialsData, ...testimonialsData];
  const totalSets = Math.ceil(testimonialsData.length / testimonialsToShow);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSet = useCallback(() => { setIsTransitioning(true); setCurrentSetIndex(prev => prev + 1); }, []);
  const prevSet = useCallback(() => { setIsTransitioning(true); setCurrentSetIndex(prev => prev - 1); }, []);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentSetIndex >= totalSets) setCurrentSetIndex(0);
    if (currentSetIndex < 0) setCurrentSetIndex(totalSets - 1);
  };

  useEffect(() => {
    const interval = setInterval(nextSet, 5000);
    return () => clearInterval(interval);
  }, [nextSet]);

  const startIndex = currentSetIndex * testimonialsToShow;
  const visibleTestimonials = extendedTestimonials.slice(startIndex, startIndex + testimonialsToShow);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Loved by Thousands of Customers
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to say about their experience.
          </p>
        </div>

        <div className="relative">
          <button onClick={prevSet}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800/80 text-gray-800 dark:text-white p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
            aria-label="Previous Testimonials">
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="overflow-hidden">
            <div
              className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
              style={{ transform: `translateX(-${currentSetIndex * (100 / testimonialsToShow)}%)` }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedTestimonials.map((testimonial, index) => (
                <div key={`${testimonial.id}-${Math.floor(index / testimonialsToShow)}`} className="flex-shrink-0 w-full md:w-1/3 px-2">
                  <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full">
                    <Quote className="absolute top-4 right-4 h-8 w-8 text-indigo-100 dark:text-gray-700" />
                    <div className="flex text-yellow-400 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < testimonial.rating ? 'fill-current' : ''}`} />
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(testimonial.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 border-2 border-dashed border-indigo-300 dark:border-indigo-700 rounded-xl w-12 h-12 flex items-center justify-center">
                        <div className="w-6 h-6 bg-indigo-400 dark:bg-indigo-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={nextSet}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800/80 text-gray-800 dark:text-white p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
            aria-label="Next Testimonials">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;