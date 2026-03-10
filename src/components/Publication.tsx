import React from 'react';
import { motion } from 'motion/react';
import { FileText, Scale, FileCheck, Landmark, Briefcase, BookOpen, Calendar } from 'lucide-react';

// ============================================================================
// Publication Section Component
// ============================================================================
// This component provides links to important legal documents and resources.
// It categorizes publications (e.g., Company Law, Tax Law) and lists them with icons.
// ============================================================================

// NOTE: To make the links work, replace the '#' in the 'link' property 
// with your actual URL (e.g., 'https://example.com/document.pdf' or '/documents/law.pdf').
// The links are configured to open in a new tab automatically.
const publicationCategories = [
  {
    category: 'Company Law',
    icon: Scale,
    items: [
      { title: 'Myanmar Companies law', link: '#' },
      { title: 'Foreign Investment Law', link: '#' },
      { title: 'Director Guide', link: '#' },
      { title: 'Special Economic Zone Law', link: '#' }
    ]
  },
  {
    category: 'Tax Law',
    icon: FileCheck,
    items: [
      { title: 'Union Taxation Law 2024', link: '#' },
      { title: 'Union Taxation Law 2025', link: '#' },
      { title: 'Tax Administration Law', link: '#' },
      { title: 'Income Tax Law', link: '#' },
      { title: 'Commercial Tax Law', link: '#' },
      { title: 'Stamp Duty Act', link: '#' },
      { title: 'WHT Noification', link: '#' }
    ]
  },
  {
    category: 'CBM',
    icon: Landmark,
    items: [
      { title: 'Foreign Exchange Management law', link: '#' },
      { title: 'Export Income Remittance', link: '#' }
    ]
  },
  {
    category: 'MOC',
    icon: Briefcase,
    items: [
      { title: 'MOC', link: '#' }
    ]
  },
  {
    category: 'Labor',
    icon: BookOpen,
    items: [
      { title: 'SSB', link: '#' },
      { title: 'labor law', link: '#' },
      { title: 'Minimum wages law', link: '#' },
      { title: 'Factory Act', link: '#' }
    ]
  },
  {
    category: 'Other',
    icon: Calendar,
    items: [
      { title: 'Myanmar Calendar', link: 'https://myanmarcalendar.com/' }
    ]
  }
];

export default function Publication() {
  return (
    <section id="publication" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-4 block">
            Insights & Resources
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Publications & Laws
          </h2>
          <p className="text-gray-300 text-lg">
            Access important legal documents, tax laws, and other regulatory resources.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publicationCategories.map((cat, index) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col h-full bg-white/5 border border-white/10 p-8 rounded-sm hover:border-brand-gold/50 transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/10 rounded-sm">
                  <cat.icon className="text-brand-gold w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {cat.category}
                </h3>
              </div>
              
              <ul className="space-y-4 flex-grow">
                {cat.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 group">
                    <FileText className="w-4 h-4 text-brand-gold/70 mt-1 flex-shrink-0 group-hover:text-brand-gold transition-colors" />
                    <a 
                      href={item.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-brand-gold transition-colors text-sm leading-relaxed underline-offset-4 hover:underline"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
