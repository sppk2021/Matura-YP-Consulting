import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, Building2, TrendingUp, Receipt } from 'lucide-react';

// ============================================================================
// FAQ Section Component
// ============================================================================
// This section displays frequently asked questions categorized by topic.
// It uses an accordion style layout (expand/collapse) for the answers.
// ============================================================================

const faqCategories = [
  {
    title: 'Company Registration',
    icon: Building2,
    faqs: [
      {
        question: 'What types of companies may be registered in Myanmar?',
        answer: 'There are three main types of companies which can be registered under the Myanmar Companies Law of 2017. They are a company limited by shares, a company limited by guarantee or an unlimited company.'
      },
      {
        question: 'What is the company registration fee?',
        answer: 'The company registration fee is 300,000 Kyats for all types of private companies and 2,500,000 Kyats for public companies.'
      },
      {
        question: 'How long does it take until a company incorporation certificate is issued?',
        answer: 'The company incorporating certificate will be issued after payment of the registration fees to DICA.'
      },
      {
        question: 'What is the minimum capital requirement when registering a company?',
        answer: 'There is no minimum capital requirement when registering a company in Myanmar. Minimum requirement for banking, Insurance and securities companies should refer to the Central Bank of Myanmar, and Ministry of Planning and Finance.'
      },
      {
        question: 'When registering a company as a joint venture, are there any provisions regarding the share proportion or the percentage applicable to foreign investors?',
        answer: 'According to Myanmar Companies Law, there is no restrictions regarding the share proportion for joint ventures between Myanmar Citizens and foreigners.'
      },
      {
        question: 'What are the minimum and maximum number of shareholders in a private company and in a public company?',
        answer: 'In a private company, the number of shareholders may range from a minimum of one to maximum of fifty. Public limited-liability companies must have a minimum of one to maximum of unlimited shareholders.'
      },
      {
        question: 'Can companies begin operations immediately after registration?',
        answer: 'Unless further licenses are required from other relevant ministries and/or departments, private companies may being operations immediately after they have received their company incorporation certificate. Public companies must apply for a Certificate for Commencement of Business instead of prospectus before they can being operations. After getting a Certificate for Commencement of Business, they can start the operation and after submitting the prospectus, they can invite the public share equities.'
      },
      {
        question: 'How long is a company registration certificate valid?',
        answer: 'Company registration certificate has no validity.'
      }
    ]
  },
  {
    title: 'Investment Application',
    icon: TrendingUp,
    faqs: [
      {
        question: 'What are the exemptions and reliefs when an investor is investing in Myanmar?',
        answer: 'For the purpose of supporting the development of the Union by allowing investment in sectors which need to be developed, and for the proportionate development of Regions and States, tax exemptions or reliefs can be granted to investors on a case-by-case basis. These can take the form of exemptions and reliefs from income tax, customs duty or internal taxes and the right to depreciation for the purpose of income tax assessment. Details on exemptions and reliefs applicable to investors are stipulated in sections 74, 75, 76, 77 and 78 of the Myanmar Investment Law.'
      },
      {
        question: 'How does an investor get the right to use land?',
        answer: 'An investor who obtains a Permit or an Endorsement under the MIL can get a long term land lease from private owners for private owned land/building or from the relevant government organizations for the state-owned land/buildings. The initial leasing period is up to 50 years and it can be extended twice for 10 years respectively (a total of 20 years). Therefore, to get the right to use land, it is required that the investor undergo either the MIC Permit process or endorsement application process.'
      },
      {
        question: 'Is it allowed to export 100% of crops produced by JV investment?',
        answer: 'It is allowed to export 100% of crops produced by JV investment.'
      },
      {
        question: 'Can foreign investor make foreign investment in wood-based industry with 100% foreign equity?',
        answer: 'Wood based industry can be applied with 100% foreign investment. According to the Notifications No-86/2017, wood-based industry which uses raw materials from natural forest are being suspended.'
      },
      {
        question: 'Is manufacturing of alcoholic beverages allowed or not? If not, provide an elaboration on how the procedure is and, can a foreign investor wholly invest in manufacturing of alcoholic beverages?',
        answer: 'Manufacturing of alcoholic beverages is allowed. But it is necessary to submit a letter that investor wants to invest in this kind of business. According to the Notification No.15/2017, an investor can apply for MIC permit/endorsement for the manufacturing of alcoholic beverages, however, prior enquires to the ministries and departments in concern should be made as it is necessary to obtain the approval and comments from those organizations. Manufacturing of alcoholic beverages could be carried out only in the form of JV, with at least 20 % of the investment made by the local partner.'
      },
      {
        question: 'Can a foreign investor make 100% FDI in production of canned food?',
        answer: 'Production of canned food can only be carried out in the form of JV.'
      },
      {
        question: 'Can wholly foreign-owned investment be carried out for livestock business?',
        answer: 'According to the Notification No. 15/2017, livestock business can be carried out the in the form of joint venture with any Myanmar citizen or wholly foreign owned investment, with the approval of the relevant Ministry.'
      },
      {
        question: 'Can investment for international schools do as a foreign owned company?',
        answer: 'Yes, Investor can invest for as a foreign owned company. It needs recommendations of Ministry of Education.'
      },
      {
        question: 'Can investment for private hospitals and clinics be available as foreign investment?',
        answer: 'Yes.'
      },
      {
        question: 'Can investment for retail and wholesale businesses do as a foreign owned company?',
        answer: 'Yes. Foreigners can invest as a foreign owned company. And it needs the recommendations of Ministry of Commerce.'
      },
      {
        question: 'Can investment for minimarkets and convenience store?',
        answer: 'This kind of business can be invested by foreign investors excluding the total floor area less than up to 10,000 square feet or 929 square meters.'
      },
      {
        question: 'Can investment for warehouse and bonded warehouse services do as a foreign owned company?',
        answer: 'Currently, only investment for warehouse can do as a foreign owned company. Bonded warehouse investment cannot be granted.'
      }
    ]
  },
  {
    title: 'Tax',
    icon: Receipt,
    faqs: [
      {
        question: 'What types of taxes do businesses in Myanmar need to consider?',
        answer: 'Most businesses in Myanmar are required to comply with several key tax types, including: Corporate Income Tax (CIT), Commercial Tax (CT), Withholding Tax (WHT), Personal Income Tax (PIT) for employees, Stamp Duty, and Specific Goods Tax (SGT) — applies to certain imported or locally manufactured goods such as alcohol, tobacco, vehicles, fuel, gemstones, etc. Depending on the business activity, additional taxes, sector-specific requirements, or licenses may apply.'
      },
      {
        question: 'Do I need to register my business for tax when I incorporate it?',
        answer: 'Yes. After company incorporation, you must register for Taxpayer Identification Number (TIN) with the Internal Revenue Department (IRD). This is required before conducting business.'
      },
      {
        question: 'What is Corporate Income Tax (CIT) in Myanmar?',
        answer: 'Corporate Income Tax is the tax on a company’s profits. The standard CIT rate for most companies is 22%. Businesses must file annual tax returns and make quarterly advance tax payments based on estimated profit.'
      },
      {
        question: 'What is Commercial Tax (CT)?',
        answer: 'Commercial Tax is similar to a sales tax and applies to the sale of goods, provision of services, and imports. CT rates vary by industry, with many services subject to 5% CT. Not all businesses are required to pay CT, but those that do must register and file monthly CT returns.'
      },
      {
        question: 'Do all businesses need to register for Commercial Tax?',
        answer: 'Not necessarily. CT registration depends on the nature of your business and whether your activities fall under taxable goods or services. However, many service providers must register even at startup.'
      },
      {
        question: 'What is Withholding Tax (WHT), and when do I need to deduct it?',
        answer: 'Withholding Tax is deducted at the time of payment to suppliers or individuals. Businesses must deduct WHT on certain payments, such as: Service fees, Royalties, Interest Payment, Rent Payments, and Payments to non-residents. After deducting, the business must remit the WHT to the IRD on behalf of the payee.'
      },
      {
        question: 'What are my responsibilities related to employee taxes?',
        answer: 'Employers must: Calculate and file Personal Income Tax (PIT) for employees, Deduct the correct tax amount monthly, File annual salary statements, and Ensure Social Security Board (SSB) contributions if applicable.'
      },
      {
        question: 'How often do businesses need to file tax returns?',
        answer: 'Tax filing frequency depends on the tax type: Corporate Income Tax: Annually, plus quarterly payments. Commercial Tax: Quarterly, Annually, plus monthly payments. Employee PIT: Monthly. Specific Goods Tax (SGT): Monthly payments and quarterly tax returns. On-time filing is essential to avoid penalties.'
      },
      {
        question: 'What deductions or expenses are allowable for Corporate Income Tax?',
        answer: 'In general, expenses that are necessarily incurred for business operations are deductible. Common deductible expenses include: Staff salaries, Office rent, Utilities, Business-related travel, Depreciation, and Cost of goods sold. Some expenses, such as personal expenses, donations (Donations are not deductible unless made to IRD-approved organizations with proper documentation, and the allowable amount is limited).'
      },
      {
        question: 'What happens if I fail to file taxes on time?',
        answer: 'Late filing or non-compliance can result in: Penalties, Interest charges, Potential tax audits, and Suspensions in doing business with government organizations. Timely compliance is strongly recommended.'
      },
      {
        question: 'Do foreign-owned companies follow the same tax rules?',
        answer: 'Yes. Foreign and local companies follow the same tax laws. However, foreign companies may have additional requirements, such as: Withholding tax obligations toward overseas payments, and Special documentation for cross-border transactions.'
      },
      {
        question: 'Can I outsource my tax and accounting work?',
        answer: 'Absolutely. Many businesses—especially new startups—choose to outsource to ensure compliance with Myanmar tax laws, avoid penalties, and maintain accurate financial records.'
      }
    ]
  }
];

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
