import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const data = {
    values: [
      ["Quality First", "We never compromise on quality. Every product in our store is carefully selected and tested to ensure it meets our high standards.", "rose"],
      ["Customer Focus", "Our customers are at the heart of everything we do. We're committed to providing exceptional service and support at every touchpoint.", "amber"],
      ["Sustainability", "We're committed to responsible business practices that protect our planet and support our communities for future generations.", "emerald"]
    ],
    team: [
      ["Alex Morgan", "CEO & Founder", "Former e-commerce consultant with a passion for sustainable business practices.", "507003211169-0a1dd7228f2d"],
      ["Taylor Kim", "Head of Marketing", "Digital marketing expert with 10+ years of experience in retail brands.", "573496359142-b8d87734a5a2"],
      ["Jordan Smith", "Lead Developer", "Full-stack developer passionate about creating seamless shopping experiences.", "519085360753-af0119f7cbe7"],
      ["Casey Williams", "Customer Success", "Dedicated to ensuring every customer has an exceptional experience with ShopEase.", "551836022-d5d88e9218df"]
    ],
    testimonials: [
      ["Sarah Johnson", "Regular Customer", "ShopEase has completely transformed my online shopping experience. The quality is exceptional and their customer service is unmatched.", "494790108755-2616b612b786"],
      ["Michael Chen", "Eco Shopper", "I love that ShopEase prioritizes sustainable products. It's my go-to for eco-friendly items without compromising on style or quality.", "507003211169-0a1dd7228f2d"],
      ["Emma Rodriguez", "Gift Shopper", "The unique selection at ShopEase makes it perfect for finding special gifts. Every recipient has been delighted with their presents!", "544005313-94ddf0286df2"]
    ],
    features: [
      ["Curated selection of high-quality, ethically sourced products", "Focus on sustainable and eco-friendly options", "Partnership with small businesses and independent creators", "Rigorous quality testing for all products"],
      ["Access to unique products you won't find elsewhere", "Peace of mind with our 30-day satisfaction guarantee", "Personalized recommendations based on your preferences", "Fast, reliable shipping with carbon-neutral options"]
    ],
    stats: [["2023", "Eco-Friendly Retailer Award"], ["4.8/5", "Customer Satisfaction Rating"], ["10K+", "Happy Customers"], ["500+", "Curated Products"]]
  };

  const S = ({ c = "py-20", children }) => <section className={c}>{children}</section>;
  const C = ({ c = "", children }) => <div className={`container mx-auto px-4 max-w-6xl ${c}`}>{children}</div>;
  const H = ({ s, t, c = "blue" }) => (
    <div className="text-center mb-16">
      <span className={`text-sm font-semibold text-${c}-600 dark:text-${c}-400 uppercase tracking-wider`}>{s}</span>
      <h2 className="text-4xl md:text-5xl font-bold mt-2 text-gray-900 dark:text-white">{t}</h2>
      <div className={`w-24 h-1 bg-gradient-to-r from-${c}-500 to-${c === 'blue' ? 'indigo' : c === 'rose' ? 'amber' : 'violet'}-500 mx-auto mt-6 rounded-full`} />
    </div>
  );

  const bgStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='7' r='1'/%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3Ccircle cx='7' cy='53' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
  };

  const noiseStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
  };

  const orbs = [
    ["top-1/4 left-1/4", "96", "violet", "0"],
    ["top-3/4 right-1/4", "80", "sky", "1s"],
    ["top-1/2 left-3/4", "64", "emerald", "2s"],
    ["bottom-1/4 left-1/2", "72", "amber", "0.5s"]
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <div className="fixed inset-0 -z-50 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-violet-50/30 to-sky-50 dark:from-slate-950 dark:via-violet-950/50 dark:to-slate-900" />
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025]" style={bgStyle} />
        <div className="absolute inset-0 opacity-[0.008] dark:opacity-[0.015] mix-blend-overlay" style={noiseStyle} />
        {orbs.map(([pos, size, color, delay], i) => (
          <div key={i} className={`absolute ${pos} w-${size} h-${size} bg-gradient-radial from-${color}-200/20 to-transparent dark:from-${color}-600/10 rounded-full blur-3xl animate-pulse`} style={{ animationDelay: delay }} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent dark:via-white/[0.02]" />
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-violet-100/10 to-transparent dark:via-violet-900/5" />
      </div>

      <div className="relative z-10">
        <S c="relative py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-100/40 via-sky-50/30 to-emerald-50/20 dark:from-violet-900/20 dark:via-sky-900/10 dark:to-emerald-900/10 backdrop-blur-sm" />
          <C c="text-center max-w-4xl relative z-10">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-sky-600 to-emerald-600 dark:from-violet-400 dark:via-sky-400 dark:to-emerald-400 tracking-tight">Our Story</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-sky-500 dark:from-violet-400 dark:to-sky-400 mx-auto mb-6 rounded-full" />
            <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">Discover the journey behind ShopEase and our passion for bringing you exceptional products.</p>
          </C>
        </S>

        <S>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/[0.02] backdrop-blur-sm" />
          <C c="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="mb-6">
                  <span className="text-sm font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wider">Our Journey</span>
                  <h2 className="text-4xl md:text-5xl font-bold mt-2 text-slate-900 dark:text-white">The ShopEase Story</h2>
                </div>
                <div className="space-y-6 text-slate-700 dark:text-slate-300">
                  {[["The Why:", "Founded in 2015, ShopEase was born from a simple frustration: the difficulty of finding quality products at fair prices online. Our founder, Alex Morgan, experienced this firsthand while searching for eco-friendly home goods and realized there was a gap in the market."],
                    ["The When & How:", "What started as a small operation from a home office has grown into a comprehensive online marketplace. We've expanded from just 50 products to over 500 curated items across multiple categories, serving thousands of customers worldwide."],
                    ["The Who:", "Our diverse team of passionate individuals brings together expertise in e-commerce, sustainable sourcing, customer experience, and technology. We're united by our commitment to making quality products accessible to everyone."]
                  ].map(([t, d], i) => (
                    <p key={i} className="text-lg leading-relaxed"><span className="font-semibold text-violet-600 dark:text-violet-400">{t}</span> {d}</p>
                  ))}
                </div>
              </div>
              <div className="relative overflow-hidden">
                <div className="bg-gradient-to-br from-violet-100/50 to-sky-100/50 dark:from-violet-900/30 dark:to-sky-900/30 border-2 border-dashed border-violet-200 dark:border-violet-700 rounded-2xl w-full h-96 overflow-hidden backdrop-blur-sm">
                  <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Our team working together" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-80" />
                <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full opacity-80" />
              </div>
            </div>
          </C>
        </S>

        <S c="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-100/40 via-amber-50/30 to-emerald-100/40 dark:from-rose-900/20 dark:via-amber-900/10 dark:to-emerald-900/20 backdrop-blur-sm" />
          <C c="relative z-10">
            <H s="What Drives Us" t="Mission & Values" c="rose" />
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Mission</h3>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">To make quality products accessible to everyone while fostering sustainable practices and building lasting relationships with our customers and communities.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.values.map(([t, d, c], i) => (
                <div key={i} className="group relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-white/20 dark:border-slate-700/50">
                  <div className={`h-1 w-full bg-gradient-to-r from-${c}-400 dark:from-${c}-500 to-transparent`} />
                  <div className="p-8">
                    <div className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r from-${c}-100 dark:from-${c}-900/50 to-transparent mb-6`}>
                      <h3 className={`text-xl font-bold text-${c}-600 dark:text-${c}-400`}>{t}</h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{d}</p>
                  </div>
                  <div className={`h-1 w-full bg-gradient-to-l from-${c}-400 dark:from-${c}-500 to-transparent`} />
                </div>
              ))}
            </div>
          </C>
        </S>

        <S>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-50/20 to-transparent dark:via-sky-900/10 backdrop-blur-sm" />
          <C c="relative z-10">
            <H s="What Sets Us Apart" t="Our Unique Approach" c="sky" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {data.features.map((list, i) => (
                <div key={i} className={`bg-gradient-to-br ${i ? 'from-violet-100/50 to-fuchsia-100/50 dark:from-violet-900/30 dark:to-fuchsia-900/30' : 'from-sky-100/50 to-violet-100/50 dark:from-sky-900/30 dark:to-violet-900/30'} backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/20 dark:border-slate-700/50`}>
                  <h3 className={`text-2xl font-bold ${i ? 'text-violet-600 dark:text-violet-400' : 'text-sky-600 dark:text-sky-400'} mb-4`}>
                    {i ? 'Benefits For You' : 'What Makes Our Products Special'}
                  </h3>
                  <ul className="space-y-4 text-slate-700 dark:text-slate-300">
                    {list.map((item, j) => (
                      <li key={j} className="flex items-start">
                        <div className={`flex-shrink-0 h-6 w-6 rounded-full ${i ? 'bg-violet-100 dark:bg-violet-900/50' : 'bg-sky-100 dark:bg-sky-900/50'} flex items-center justify-center mr-3`}>
                          <div className={`h-2 w-2 rounded-full ${i ? 'bg-violet-500 dark:bg-violet-400' : 'bg-sky-500 dark:bg-sky-400'}`} />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </C>
        </S>

        <S c="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-100/40 to-violet-100/40 dark:from-sky-900/20 dark:to-violet-900/20 backdrop-blur-sm" />
          <C c="relative z-10">
            <H s="The People Behind ShopEase" t="Meet Our Team" c="sky" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.team.map(([n, r, b, img], i) => (
                <div key={i} className="group text-center">
                  <div className="relative mb-6 overflow-hidden">
                    <div className="rounded-2xl w-40 h-40 mx-auto overflow-hidden border-4 border-white/50 dark:border-slate-700/50 shadow-lg group-hover:shadow-2xl transition-all duration-300 backdrop-blur-sm">
                      <img src={`https://images.unsplash.com/photo-1${img}?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80`} alt={n} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0 rounded-2xl border-4 border-transparent group-hover:border-sky-200 dark:group-hover:border-sky-800 transition-colors duration-300 pointer-events-none" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{n}</h3>
                  <p className="text-sky-600 dark:text-sky-400 font-medium mb-3">{r}</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{b}</p>
                </div>
              ))}
            </div>
          </C>
        </S>

        <S>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-50/20 to-transparent dark:via-amber-900/10 backdrop-blur-sm" />
          <C c="relative z-10">
            <H s="What People Say" t="Customer Love" c="amber" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {data.testimonials.map(([n, r, q, img], i) => (
                <div key={i} className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/20 dark:border-slate-700/50">
                  <div className="flex items-center mb-6">
                    <img src={`https://images.unsplash.com/photo-1${img}?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80`} alt={n} className="w-16 h-16 rounded-full object-cover mr-4" />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{n}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{r}</p>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 italic">"{q}"</p>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-amber-100/50 to-orange-100/50 dark:from-amber-900/30 dark:to-orange-900/30 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/20 dark:border-slate-700/50">
              <h3 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">Awards & Recognition</h3>
              <div className="flex flex-wrap justify-center items-center gap-8">
                {data.stats.map(([v, l], i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">{v}</div>
                    <div className="text-slate-700 dark:text-slate-300">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </C>
        </S>

        <S c="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/40 via-teal-50/30 to-sky-100/40 dark:from-emerald-900/20 dark:via-teal-900/10 dark:to-sky-900/20 backdrop-blur-sm" />
          {[["top-1/4 left-1/4", "emerald"], ["bottom-1/4 right-1/4", "teal"]].map(([p, c], i) => (
            <div key={i} className={`absolute ${p} w-64 h-64 rounded-full bg-${c}-300/20 dark:bg-${c}-500/10 blur-3xl animate-pulse pointer-events-none`} style={{ animationDelay: i ? '1s' : '0' }} />
          ))}
          <C c="text-center relative z-10 max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white tracking-tight">Ready to Start Shopping?</h2>
            <p className="text-xl text-slate-700 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">Join thousands of satisfied customers and discover amazing products at unbeatable prices.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/products" className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-emerald-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">Shop Now</Link>
              <Link to="/newsletter" className="inline-block bg-transparent border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transform hover:scale-105 transition-all duration-300">Join Newsletter</Link>
            </div>
          </C>
        </S>
      </div>
    </div>
  );
};

export default AboutPage;