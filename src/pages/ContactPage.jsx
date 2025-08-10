import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle, HelpCircle, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    { icon: MapPin, title: "Our Location", content: "123 Shopping Street\nRetail City, RC 10001\nUnited States", color: "teal" },
    { icon: Phone, title: "Phone Numbers", content: "Customer Support: +1 (555) 123-4567\nSales Inquiries: +1 (555) 987-6543", color: "cyan" },
    { icon: Mail, title: "Email Addresses", content: "Support: support@shopease.com\nSales: sales@shopease.com\nPartnerships: partners@shopease.com", color: "violet" },
    { icon: Clock, title: "Business Hours", content: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed", color: "rose" },
    { icon: MessageCircle, title: "Response Time", content: "We typically respond within 24-48 hours during business days.\nFor urgent matters, please call us directly.", color: "amber" }
  ];

  const faqs = [
    { q: "How long does shipping take?", a: "Standard shipping typically takes 3-5 business days. Express shipping options are available for 1-2 day delivery." },
    { q: "What is your return policy?", a: "We offer a 30-day return policy on all items. Items must be in new, unused condition with all original packaging." },
    { q: "How can I track my order?", a: "Once your order ships, you'll receive a tracking number via email. You can track your package on our website or the carrier's site." },
    { q: "Do you offer international shipping?", a: "Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by destination." }
  ];

  const socials = [
    { name: "Facebook", icon: "f", bg: "border-blue-400 text-blue-500 hover:bg-blue-500 hover:border-blue-500" },
    { name: "Twitter", icon: "𝕏", bg: "border-slate-600 text-slate-600 hover:bg-slate-600 hover:border-slate-600" },
    { name: "Instagram", icon: "📷", bg: "border-pink-400 text-pink-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:border-transparent" },
    { name: "LinkedIn", icon: "in", bg: "border-blue-500 text-blue-600 hover:bg-blue-600 hover:border-blue-600" }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-teal-950"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-teal-200/30 to-cyan-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 right-20 w-80 h-80 bg-gradient-to-r from-violet-200/25 to-purple-300/25 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/3 w-72 h-72 bg-gradient-to-r from-rose-200/20 to-pink-300/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-r from-amber-200/25 to-yellow-300/25 rounded-full blur-3xl animate-pulse delay-3000"></div>
        <div className="absolute inset-0 opacity-5 dark:opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="geometric" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                <circle cx="60" cy="60" r="2" fill="currentColor" className="text-teal-500"/>
                <path d="M30,30 L90,30 L90,90 L30,90 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400"/>
                <circle cx="30" cy="30" r="1.5" fill="currentColor" className="text-violet-400"/>
                <circle cx="90" cy="90" r="1.5" fill="currentColor" className="text-rose-400"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#geometric)"/>
          </svg>
        </div>
      </div>
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-teal-100/30 via-transparent to-violet-100/20 dark:from-teal-900/30 dark:to-violet-900/20"></div>

      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/95 via-cyan-600/95 to-violet-600/95 dark:from-teal-700/95 dark:via-cyan-800/95 dark:to-violet-800/95"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_var(--tw-gradient-stops))] from-rose-400/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_var(--tw-gradient-stops))] from-amber-300/25 via-transparent to-transparent"></div>
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="wave" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                  <path d="M0,100 Q50,50 100,100 T200,100" stroke="white" strokeWidth="2" fill="none"/>
                  <path d="M0,150 Q50,100 100,150 T200,150" stroke="white" strokeWidth="1.5" fill="none" opacity="0.7"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#wave)"/>
            </svg>
          </div>
        </div>
        <div className="absolute inset-0">
          <div className="absolute top-16 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-bounce delay-300"></div>
          <div className="absolute top-20 right-1/3 w-24 h-24 bg-cyan-200/20 rounded-full blur-lg animate-bounce delay-700"></div>
          <div className="absolute bottom-20 left-1/5 w-40 h-40 bg-teal-200/15 rounded-full blur-2xl animate-bounce delay-1000"></div>
          <div className="absolute bottom-32 right-1/4 w-28 h-28 bg-violet-200/20 rounded-full blur-xl animate-bounce delay-1300"></div>
          <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-white/60 rounded-full animate-ping"></div>
          <div className="absolute top-1/3 right-1/5 w-1.5 h-1.5 bg-cyan-200/80 rounded-full animate-ping delay-500"></div>
          <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-teal-200/70 rounded-full animate-ping delay-1000"></div>
          <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-white/70 rounded-full animate-ping delay-1500"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-7xl md:text-8xl font-bold mb-10 bg-gradient-to-r from-white via-cyan-100 to-teal-100 bg-clip-text text-transparent drop-shadow-2xl animate-fade-in">
            Get in Touch
          </h1>
          <p className="text-2xl md:text-3xl max-w-4xl mx-auto text-cyan-50/90 mb-12 leading-relaxed font-light">
            We'd love to hear from you! Our team is here to help with any questions, concerns, or exciting collaborations.
          </p>
          <div className="flex justify-center space-x-4 mb-8">
            <div className="w-16 h-2 bg-gradient-to-r from-teal-300 to-cyan-300 rounded-full shadow-lg"></div>
            <div className="w-12 h-2 bg-gradient-to-r from-cyan-300 to-violet-300 rounded-full shadow-lg"></div>
            <div className="w-20 h-2 bg-gradient-to-r from-violet-300 to-rose-300 rounded-full shadow-lg"></div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-24 relative z-10">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Contact Information */}
          <div>
            <h2 className="text-4xl font-bold mb-16 text-slate-800 dark:text-white">Contact Information</h2>
            <div className="space-y-12">
              {contactInfo.map((item, i) => (
                <div key={i} className="group flex items-start hover:transform hover:scale-105 transition-all duration-500">
                  <div className={`p-6 rounded-2xl mr-8 bg-gradient-to-br from-${item.color}-50 via-white to-${item.color}-100/50 dark:from-${item.color}-900/20 dark:via-slate-800 dark:to-${item.color}-800/20 group-hover:shadow-2xl group-hover:shadow-${item.color}-200/25 transition-all duration-300 border border-${item.color}-200/30 dark:border-${item.color}-700/30`}>
                    <item.icon className={`h-9 w-9 text-${item.color}-600 dark:text-${item.color}-400`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">{item.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Interactive Map */}
            <div className="mt-20 bg-gradient-to-br from-teal-50 via-white to-cyan-50 dark:from-slate-800 dark:via-slate-700 dark:to-teal-900/30 border-2 border-dashed border-teal-300 dark:border-teal-600 rounded-3xl w-full h-80 flex items-center justify-center group hover:border-solid hover:shadow-2xl hover:shadow-teal-200/25 transition-all duration-500">
              <div className="text-center">
                <MapPin className="h-24 w-24 text-teal-500 dark:text-teal-400 mx-auto mb-8 group-hover:scale-110 transition-transform duration-300" />
                <p className="text-teal-600 dark:text-teal-400 font-semibold text-xl">Interactive Map Coming Soon</p>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Explore our location in detail</p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <h2 className="text-4xl font-bold mb-16 text-slate-800 dark:text-white">Send a Message</h2>
            <form onSubmit={handleSubmit} className="backdrop-blur-lg bg-white/80 dark:bg-slate-800/80 p-12 rounded-3xl shadow-2xl border border-white/30 dark:border-slate-700/30">
              {['name', 'email', 'subject'].map((field) => (
                <div key={field} className="mb-8">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4 capitalize">{field}</label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-slate-200/50 dark:border-slate-600/50 rounded-xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 dark:bg-slate-700/50 dark:text-white transition-all duration-300 backdrop-blur-sm"
                    placeholder={field === 'email' ? 'your@email.com' : field === 'subject' ? 'How can we help?' : 'Your Full Name'}
                  />
                </div>
              ))}
              <div className="mb-12">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Message</label>
                <textarea
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-slate-200/50 dark:border-slate-600/50 rounded-xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 dark:bg-slate-700/50 dark:text-white transition-all duration-300 backdrop-blur-sm"
                  placeholder="Tell us how we can help you..."
                />
              </div>
              <button
                type="submit"
                className="w-full border-2 border-transparent bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-border text-white py-5 rounded-xl font-semibold text-lg hover:from-teal-600 hover:to-cyan-700 transform hover:scale-105 hover:shadow-2xl hover:shadow-teal-300/25 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10 flex items-center justify-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Send Message
                </span>
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-40">
          <div className="text-center mb-24">
            <div className="flex items-center justify-center mb-10">
              <div className="p-4 bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 rounded-2xl mr-4">
                <HelpCircle className="h-12 w-12 text-violet-600 dark:text-violet-400" />
              </div>
              <h2 className="text-5xl font-bold text-slate-800 dark:text-white">FAQ</h2>
            </div>
            <p className="text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">Quick answers to common questions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {faqs.map((faq, i) => (
              <div key={i} className="group backdrop-blur-lg bg-white/70 dark:bg-slate-800/70 p-12 rounded-3xl shadow-xl hover:shadow-2xl border border-white/40 dark:border-slate-700/40 transition-all duration-500 hover:transform hover:-translate-y-4">
                <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">{faq.q}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-20">
            <button className="inline-flex items-center px-10 py-5 border-2 border-violet-500 text-violet-600 dark:text-violet-400 rounded-xl font-semibold text-lg hover:bg-violet-500 hover:text-white transition-all duration-300 group backdrop-blur-sm">
              <HelpCircle className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
              Visit Help Center
            </button>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-40 backdrop-blur-lg bg-gradient-to-r from-teal-50/80 via-cyan-50/80 to-violet-50/80 dark:from-slate-800/80 dark:via-slate-800/80 dark:to-slate-900/80 rounded-3xl p-20 shadow-2xl border border-white/30 dark:border-slate-700/30">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center mb-10">
              <div className="p-4 bg-gradient-to-br from-cyan-100 to-teal-100 dark:from-cyan-900/30 dark:to-teal-900/30 rounded-2xl mr-4">
                <Share2 className="h-12 w-12 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h2 className="text-5xl font-bold text-slate-800 dark:text-white">Follow Us</h2>
            </div>
            <p className="text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">Stay connected for updates, exclusive offers, and behind-the-scenes content</p>
          </div>
          <div className="flex justify-center space-x-12">
            {socials.map((social, i) => (
              <button 
                key={i} 
                className={`w-24 h-24 border-2 ${social.bg} hover:text-white rounded-2xl flex items-center justify-center font-bold text-2xl hover:scale-110 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 backdrop-blur-sm`}
                aria-label={social.name}
              >
                {social.icon}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;