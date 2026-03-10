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
      { title: 'Myanmar Companies law', link: 'https://www.myco.dica.gov.mm/documentation/mm/MCL.en-US.pdf' },
      { title: 'Foreign Investment Law', link: 'https://meriyadh.org/wp-content/uploads/2024/05/foreign-investment-law.pdf' },
      { title: 'Director Guide', link: 'https://www.myco.dica.gov.mm/documentation/mm/DirectorGuide.en-US.pdf' },
      { title: 'Special Economic Zone Law', link: 'https://www.thilawasez.gov.mm/page/sez' }
    ]
  },
  {
    category: 'Tax Law',
    icon: FileCheck,
    items: [
      { title: 'Union Taxation Law 2024', link: 'https://www.ird.gov.mm/storage/laws/6749808ac558b-Union_taxation_law_2024.pdf' },
      { title: 'Union Taxation Law 2025', link: 'https://www.ird.gov.mm/storage/laws/68396e3861e76-Union%20taxation%20law%202025%20.pdf' },
      { title: 'Tax Administration Law', link: 'https://www.ird.gov.mm/storage/laws/673ac30979f47-TAL%20Law.pdf' },
      { title: 'Income Tax Law', link: 'https://www.ird.gov.mm/storage/laws/67233b988a4d7-IT%20%E1%80%A5%E1%80%95%E1%80%92%E1%80%B1.pdf' },
      { title: 'Commercial Tax Law', link: 'https://www.ird.gov.mm/storage/laws/672338de2af53-CT%20%E1%80%A5%E1%80%95%E1%80%92%E1%80%B1.pdf' },
      { title: 'Stamp Duty Act', link: 'https://www.ird.gov.mm/storage/laws/673ab6b374b08-Myanmar_Stamp_Act_Update_0.pdf' },
      { title: 'WHT Notification', link: '#' }
    ]
  },
  {
    category: 'CBM',
    icon: Landmark,
    items: [
      { title: 'Foreign Exchange Management law', link: 'https://www.cbm.gov.mm/sites/default/files/law_0.pdf' },
      { title: 'Export Income Remittance', link: '#' }
    ]
  },
  {
    category: 'MOC',
    icon: Briefcase,
    items: [
      { title: 'MOC (wholesale and retail noti:)', link: 'https://www.myanmartradeportal.gov.mm/uploads/legals/2019/5/25-2018(Permitting%20the%20JV%20for%20Whole%20Sale%20and%20Retail).pdf' }
    ]
  },
  {
    category: 'Labor',
    icon: BookOpen,
    items: [
      { title: 'SSB', link: 'https://myanmar.gov.mm/documents/20143/0/8.Social-Security-Law-2012.pdf/dca488e3-d436-2af7-2b8c-eb200efcfbc9?t=1676884635030' },
      { title: 'labor law', link: 'https://www.mol.gov.mm/laws-and-regulations/' },
      { title: 'Minimum wages law', link: 'https://www.mol.gov.mm/wp-content/uploads/2014/05/4.Minimum-Wages-Law-2013-.pdf' },
      { title: 'Factory Act', link: 'https://www.burmalibrary.org/sites/burmalibrary.org/files/obl/docs19/1951-Factories_Act-bu.pdf' }
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
                {cat.items.map((item) => (
                  <li key={item.title} className="flex items-start gap-3 group">
                    <FileText className="w-4 h-4 text-brand-gold/70 mt-1 flex-shrink-0 group-hover:text-brand-gold transition-colors" />
                    <a 
                      href={item.link} 
                      target={item.link !== '#' ? "_blank" : undefined}
                      rel={item.link !== '#' ? "noopener noreferrer" : undefined}
                      onClick={(e) => {
                        if (item.link === '#') {
                          e.preventDefault();
                        }
                      }}
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
