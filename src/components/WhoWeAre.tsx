import React from 'react';
import { motion } from 'motion/react';
import { Award, Users, BookOpen, Scale } from 'lucide-react';

// ============================================================================
// Who We Are Section Component
// ============================================================================
// This section introduces the company's core values and leadership team.
// It displays a grid of values with icons and detailed profiles of the directors.
// ============================================================================

const values = [
  {
    title: 'Professional Qualifications',
    desc: 'Our team consists of certified public accountants and industry experts with decades of combined experience.',
    icon: Award
  },
  {
    title: 'Industry Experience',
    desc: 'Deep expertise across various sectors including finance, manufacturing, technology, and non-profits.',
    icon: Users
  },
  {
    title: 'Ethical Standards',
    desc: 'Strict adherence to international auditing standards and professional codes of conduct.',
    icon: Scale
  },
  {
    title: 'Continuous Learning',
    desc: 'Staying ahead of regulatory changes and emerging financial trends through ongoing professional development.',
    icon: BookOpen
  }
];

export default React.memo(function WhoWeAre() {
  const directors = [
    {
      name: 'Ms. Naw Phyo Cherry Boy',
      role: 'Director',
      qualifications: 'B.Act, CPA, Dip. IFRS, ASEAN Chartered Professional Accountant (ASEAN CPA)',
      experience: '15+ years of experience with international companies, serving clients across Singapore, Malaysia, and Thailand.',
      expertise: 'Auditing, accounting, taxation, business advisory, company incorporation, labour management, productivity systems. Insolvency Practitioner guiding foreign companies on compliance & restructuring.',
      image: 'https://uploads.onecompiler.io/442aqr2uj/44fxkmwcg/founder%201.jpg'
    },
    {
      name: 'Ms. Yin Yin Min',
      role: 'Director',
      qualifications: 'B.Com, CPA, Dip.IFRs, Dip.FM, DA, DBL, ASEAN Chartered Professional Accountant (ASEAN CPA)',
      experience: '20+ years experience in company law, legal compliance, auditing, and regulatory requirements.',
      expertise: 'Business advisory, accounting, taxation, and labour management. Helps companies operate efficiently and stay compliant. Insolvency Practitioner guiding foreign companies on compliance & restructuring.',
      image: 'https://uploads.onecompiler.io/442aqr2uj/44fxkmwcg/Founder%202.png'
    }
  ];

  return (
    <section id="about" className="section-padding bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-4 block">
              Who We Are
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
              A Team of Dedicated Professionals
            </h2>
            <p className="text-lg text-gray-300 mb-12 leading-relaxed">
              We are more than just auditors; we are your strategic partners. Our leadership team brings together diverse backgrounds from top-tier global accounting firms and specialized industry roles.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 text-left">
              {values.map((item, index) => (
                <div key={item.title} className="flex gap-6 bg-white/5 p-6 rounded-sm border border-white/10">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 flex items-center justify-center rounded-sm">
                    <item.icon className="text-brand-gold w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-white">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Leadership Section */}
        <div className="mt-24">
          <div className="text-center mb-16">
            <span className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-4 block">
              Our Leadership
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Meet Our Directors
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {directors.map((director, index) => (
              <motion.div
                key={director.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white/5 p-6 md:p-8 rounded-sm border border-white/10 hover:border-brand-gold/30 transition-colors"
              >
                <div className="flex flex-col sm:flex-row gap-6 md:gap-8">
                  <div className="sm:w-1/3 shrink-0">
                    <img 
                      src={director.image} 
                      alt={director.name} 
                      className="w-full max-w-[240px] mx-auto sm:max-w-none aspect-[3/4] object-cover rounded-sm"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  </div>
                  <div className="sm:w-2/3">
                    <h3 className="text-2xl font-bold text-brand-gold mb-1">{director.name}</h3>
                    <p className="text-white font-medium mb-1">{director.role}</p>
                    <p className="text-gray-400 text-sm mb-4 italic">{director.qualifications}</p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs uppercase tracking-widest text-brand-gold font-bold mb-1">Experience</h4>
                        <p className="text-gray-300 text-sm leading-relaxed">{director.experience}</p>
                      </div>
                      <div>
                        <h4 className="text-xs uppercase tracking-widest text-brand-gold font-bold mb-1">Expertise</h4>
                        <p className="text-gray-300 text-sm leading-relaxed">{director.expertise}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
