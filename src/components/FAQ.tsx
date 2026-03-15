import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { faqCategories } from '../constants/faq';

// ============================================================================
// FAQ Section Component
// ============================================================================

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faqs" className="section-padding relative bg-brand-navy overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-gold/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-brand-gold/5 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-4 block"
          >
            Common Questions
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-lg max-w-2xl mx-auto"
          >
            Find answers to common questions about company registration, investment, and taxation in Myanmar.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Category Tabs */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 gap-2 scrollbar-hide" role="tablist">
                {faqCategories.map((category, index) => (
                  <button
                    key={category.title}
                    role="tab"
                    aria-selected={activeCategory === index}
                    onClick={() => {
                      setActiveCategory(index);
                      setActiveIndex(null); // Reset active FAQ when switching categories
                    }}
                    className={`relative flex items-center gap-4 px-6 py-4 rounded-sm font-medium transition-all text-left whitespace-nowrap lg:whitespace-normal w-full group min-w-[200px] lg:min-w-0 ${
                      activeCategory === index
                        ? 'text-brand-navy'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {activeCategory === index && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-brand-gold rounded-sm"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <category.icon className={`w-5 h-5 relative z-10 transition-colors ${
                      activeCategory === index ? 'text-brand-navy' : 'text-brand-gold group-hover:text-brand-gold'
                    }`} />
                    <span className="relative z-10">{category.title}</span>
                  </button>
                ))}
              </div>
              
              <div className="hidden lg:block mt-12 p-6 border border-white/10 bg-white/5 rounded-sm">
                <h4 className="text-white font-bold mb-2">Need more help?</h4>
                <p className="text-sm text-gray-400 mb-4">
                  If you can't find the answer you're looking for, please don't hesitate to contact our team.
                </p>
                <a 
                  href="#contact" 
                  className="text-brand-gold text-sm font-bold hover:underline inline-flex items-center gap-1"
                >
                  Contact Us Now →
                </a>
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="mb-6 lg:hidden">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    {React.createElement(faqCategories[activeCategory].icon, { className: "w-6 h-6 text-brand-gold" })}
                    {faqCategories[activeCategory].title}
                  </h3>
                </div>

                {faqCategories[activeCategory].faqs.map((faq, index) => (
                  <div 
                    key={faq.question} 
                    className={`bg-white/5 border transition-all duration-300 rounded-sm overflow-hidden ${
                      activeIndex === index ? 'border-brand-gold/50 ring-1 ring-brand-gold/20' : 'border-white/10'
                    }`}
                  >
                    <button
                      onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                      className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-white/10 transition-colors"
                      aria-expanded={activeIndex === index}
                    >
                      <span className={`text-lg font-bold pr-8 transition-colors ${
                        activeIndex === index ? 'text-brand-gold' : 'text-white'
                      }`}>
                        {faq.question}
                      </span>
                      <div className={`flex-shrink-0 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                        {activeIndex === index ? (
                          <Minus className="text-brand-gold w-5 h-5" />
                        ) : (
                          <Plus className="text-brand-gold w-5 h-5" />
                        )}
                      </div>
                    </button>
                    <AnimatePresence>
                      {activeIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-8 pb-6 text-gray-300 leading-relaxed border-t border-white/10 pt-4">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-sm text-gray-400 italic">
                <span className="text-brand-gold font-bold">Disclaimer:</span> Content in this section is sourced from various official government websites and public resources.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
