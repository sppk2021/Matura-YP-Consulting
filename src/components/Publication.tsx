import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FileText, Scale, FileCheck, Landmark, Briefcase, BookOpen, Calendar } from 'lucide-react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

// ============================================================================
// Publication Section Component
// ============================================================================
// This component provides links to important legal documents and resources.
// It categorizes publications (e.g., Company Law, Tax Law) and lists them with icons.
// ============================================================================

const categoryIcons: { [key: string]: any } = {
  'Company Law': Scale,
  'Tax Law': FileCheck,
  'CBM': Landmark,
  'MOC': Briefcase,
  'Labor': BookOpen,
  'Other': Calendar
};

const defaultPublications = [
  {
    category: 'Company Law',
    items: [
      { title: 'Myanmar Companies law', link: 'https://www.myco.dica.gov.mm/documentation/mm/MCL.en-US.pdf' },
      { title: 'Foreign Investment Law', link: 'https://meriyadh.org/wp-content/uploads/2024/05/foreign-investment-law.pdf' },
      { title: 'Director Guide', link: 'https://www.myco.dica.gov.mm/documentation/mm/DirectorGuide.en-US.pdf' },
      { title: 'Special Economic Zone Law', link: 'https://myanmartradeportal.gov.mm/kcfinder/upload/files/myanmarspecialeconomiczonelaw.pdf' }
    ]
  },
  {
    category: 'Tax Law',
    items: [
      { title: 'Union Taxation Law 2024', link: 'https://www.ird.gov.mm/storage/laws/6749808ac558b-Union_taxation_law_2024.pdf' },
      { title: 'Union Taxation Law 2025', link: 'https://www.ird.gov.mm/storage/laws/68396e3861e76-Union%20taxation%20law%202025%20.pdf' },
      { title: 'Tax Administration Law', link: 'https://www.ird.gov.mm/storage/laws/673ac30979f47-TAL%20Law.pdf' },
      { title: 'Income Tax Law', link: 'https://www.ird.gov.mm/storage/laws/67233b988a4d7-IT%20%E1%80%A5%E1%80%95%E1%80%92%E1%80%B1.pdf' },
      { title: 'Commercial Tax Law', link: 'https://www.ird.gov.mm/storage/laws/672338de2af53-CT%20%E1%80%A5%E1%80%95%E1%80%92%E1%80%B1.pdf' },
      { title: 'Stamp Duty Act', link: 'https://www.ird.gov.mm/storage/laws/673ab6b374b08-Myanmar_Stamp_Act_Update_0.pdf' },
      { title: 'WHT Notification', link: 'https://www.ird.gov.mm/storage/pamphlets/672342b45a0b3.WT.pdf' }
    ]
  },
  {
    category: 'CBM',
    items: [
      { title: 'Foreign Exchange Management law', link: 'https://www.cbm.gov.mm/sites/default/files/law_0.pdf' }
    ]
  },
  {
    category: 'MOC',
    items: [
      { title: 'MOC (wholesale and retail noti:)', link: 'https://www.myanmartradeportal.gov.mm/uploads/legals/2019/5/25-2018(Permitting%20the%20JV%20for%20Whole%20Sale%20and%20Retail).pdf' }
    ]
  },
  {
    category: 'Labor',
    items: [
      { title: 'SSB', link: 'https://myanmar.gov.mm/documents/20143/0/8.Social-Security-Law-2012.pdf/dca488e3-d436-2af7-2b8c-eb200efcfbc9?t=1676884635030' },
      { title: 'labor law', link: 'https://www.mol.gov.mm/laws-and-regulations/' },
      { title: 'Minimum wages law', link: 'https://www.mol.gov.mm/wp-content/uploads/2014/05/4.Minimum-Wages-Law-2013-.pdf' },
      { title: 'Factory Act', link: 'https://www.burmalibrary.org/sites/burmalibrary.org/files/obl/docs19/1951-Factories_Act-bu.pdf' }
    ]
  },
  {
    category: 'Other',
    items: [
      { title: 'Myanmar Calendar', link: 'https://myanmarcalendar.com/' }
    ]
  }
];

export default React.memo(function Publication() {
  const [publications, setPublications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'publications'), orderBy('category', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const pubsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Group by category
      const grouped = pubsData.reduce((acc: any[], curr: any) => {
        const existing = acc.find(a => a.category === curr.category);
        if (existing) {
          existing.items.push({ title: curr.title, link: curr.link });
        } else {
          acc.push({ category: curr.category, items: [{ title: curr.title, link: curr.link }] });
        }
        return acc;
      }, []);

      setPublications(grouped.length > 0 ? grouped : defaultPublications);
      setLoading(false);
    }, (err) => {
      console.error("Error loading publications:", err);
      setPublications(defaultPublications);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
          {publications.map((cat, index) => {
            const Icon = categoryIcons[cat.category] || Calendar;
            return (
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
                    <Icon className="text-brand-gold w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {cat.category}
                  </h3>
                </div>
                
                <ul className="space-y-4 flex-grow">
                  {cat.items.map((item: any) => (
                    <li key={`${cat.category}-${item.title}`} className="flex items-start gap-3 group">
                      <FileText className="w-4 h-4 text-brand-gold/70 mt-1 flex-shrink-0 group-hover:text-brand-gold transition-colors" />
                      <a 
                        href={item.link} 
                        target={item.link !== '#' ? "_blank" : undefined}
                        rel={item.link !== '#' ? "noopener noreferrer" : undefined}
                        className="text-gray-300 hover:text-brand-gold transition-colors text-sm leading-relaxed underline-offset-4 hover:underline"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
