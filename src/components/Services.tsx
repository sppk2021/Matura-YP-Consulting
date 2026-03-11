import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  Shield, 
  FileText, 
  BarChart3, 
  Landmark, 
  Briefcase,
  Search,
  Users,
  Scale,
  Settings,
  XCircle,
  CheckCircle2,
  X,
  ArrowRight,
  LucideIcon
} from 'lucide-react';

// ============================================================================
// Services Section Component
// ============================================================================
// This component lists all the professional services offered by the company.
// It uses a grid layout for service cards and includes a modal to display
// more detailed information about a selected service.
// ============================================================================

const services = [
  {
    title: 'Business Advisory',
    icon: Briefcase,
    description: 'Practical guidance you can rely on—via email, phone, or meetings. We combine technical knowledge with real-world solutions.',
    details: ['Accounting & Taxation', 'Labour & Company Law', 'Updates & Regulations', 'Management Advisory']
  },
  {
    title: 'Tax Related Services',
    icon: Landmark,
    description: 'Strategic tax planning and compliance to minimize liabilities. Comprehensive support for all tax types in Myanmar.',
    details: ['Corporate Income Tax', 'Commercial Tax', 'Personal Income Tax', 'Capital Gain Tax', 'Withholding Tax', 'Stamp Duty', 'Tax Registration & Structuring']
  },
  {
    title: 'Payroll Services',
    icon: Calculator,
    description: 'End-to-end payroll management ensuring accuracy, confidentiality, and compliance with local regulations.',
    details: ['Salary & Benefit Calculation', 'SSB & PIT Management', 'Payslip Preparation', 'Monthly and Yearly PIT Reporting']
  },
  {
    title: 'Financial Audit',
    icon: FileText,
    description: 'Independent examination of financial statements to ensure accuracy and compliance with international standards.',
    details: ['Statutory & Special Audits', 'Compliance Assessment', 'Accounting Policy Review', 'Stakeholder Reporting']
  },
  {
    title: 'Internal Audit',
    icon: Shield,
    description: 'Evaluating internal controls and risk management processes to improve operational efficiency and prevent fraud.',
    details: ['Internal Control Evaluation', 'Risk & Compliance Assessment', 'Fraud Detection', 'Efficiency Recommendations']
  },
  {
    title: 'Accounting Services',
    icon: BarChart3,
    description: 'Accurate and timely financial record-keeping to help you make informed business decisions.',
    details: ['Bookkeeping & Reconciliations', 'Financial Statement Prep', 'Management Reporting', 'System Setup & Support']
  },
  {
    title: 'Business Setup',
    icon: Settings,
    description: 'Complete assistance for company registration and licensing, tailored for both local and foreign investors.',
    details: ['MyCO Registration', 'Business Licenses & Permits', 'Investment Advisory', 'Operational Setup']
  },
  {
    title: 'Mergers & Acquisitions',
    icon: Users,
    description: 'Strategic support for M&A activities, from due diligence to post-transaction integration.',
    details: ['Due Diligence & Valuation', 'Legal/Financial Documentation', 'Integration Planning', 'Risk Analysis']
  },
  {
    title: 'HR Services',
    icon: Users,
    description: 'Developing robust HR frameworks and policies to help your organization manage its most valuable asset.',
    details: ['Employment Contracts', 'HR Policy Development', 'Training & Development', 'Labour Law Alignment']
  },
  {
    title: 'Legal Services',
    icon: Scale,
    description: 'Expert guidance on corporate legal matters and ongoing compliance with Myanmar company laws.',
    details: ['Labour Law Compliance', 'MyCO Filings & Updates', 'Corporate Secretarial', 'Regulatory Advisory']
  },
  {
    title: 'Business Winding up',
    icon: XCircle,
    description: 'Professional support for voluntary winding up and de-registration of companies and overseas branches.',
    details: ['Insolvency Law Advisory', 'DICA/MyCO Filings', 'Tax Clearance Support', 'Asset Remittance Guidance']
  }
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedService]);

  return (
    <section id="services" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-4 block">
            Our Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Comprehensive Audit & Consulting Solutions
          </h2>
          <p className="text-gray-300 text-lg">
            Trusted. Practical. Focused on your business. We provide a wide range of professional 
            services designed to ensure your success and compliance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white/5 p-8 rounded-sm border border-white/10 shadow-sm hover:shadow-2xl hover:border-brand-gold/30 hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
            >
              <div className="w-16 h-16 bg-white/10 flex items-center justify-center rounded-sm mb-8 group-hover:bg-brand-gold transition-colors duration-500">
                <service.icon className="text-brand-gold w-8 h-8 group-hover:text-brand-navy transition-colors duration-500" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-gold transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-300 mb-8 leading-relaxed">
                {service.description}
              </p>

              <div className="mt-auto pt-6 border-t border-white/10">
                <ul className="space-y-3 mb-6">
                  {service.details.slice(0, 2).map((detail) => (
                    <li key={detail} className="flex items-start gap-3 text-sm text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-brand-gold mt-0.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => setSelectedService(service)}
                  className="flex items-center gap-2 text-white font-bold hover:text-brand-gold transition-colors group/btn"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedService && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-brand-navy/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-2xl bg-brand-navy border border-white/20 rounded-sm shadow-2xl z-50 max-h-[90vh] overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <div className="p-6 md:p-12">
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-400 hover:text-white transition-colors bg-brand-navy/80 p-1 rounded-full z-10"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 flex items-center justify-center rounded-sm mb-6 md:mb-8 mt-2 md:mt-0">
                  <selectedService.icon className="text-brand-gold w-6 h-6 md:w-8 md:h-8" />
                </div>

                <h3 id="modal-title" className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {selectedService.title}
                </h3>
                
                <p className="text-gray-300 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
                  {selectedService.description}
                </p>

                <div className="bg-white/5 border border-white/10 p-6 rounded-sm">
                  <h4 className="font-bold text-white mb-4">What's Included:</h4>
                  <ul className="grid sm:grid-cols-2 gap-4">
                    {selectedService.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3 text-gray-300">
                        <CheckCircle2 className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-8 pt-8 border-t border-white/10 flex justify-end gap-4">
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="px-6 py-3 rounded-sm font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    Close
                  </button>
                  <a 
                    href="#contact"
                    onClick={() => setSelectedService(null)}
                    className="bg-brand-gold text-brand-navy px-6 py-3 rounded-sm font-medium hover:bg-white transition-colors inline-flex items-center gap-2"
                  >
                    Inquire Now
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
