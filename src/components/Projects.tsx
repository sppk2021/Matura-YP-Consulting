import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, X } from 'lucide-react';

// ============================================================================
// Projects Section Component
// ============================================================================
// This section showcases the company's portfolio of past projects.
// It features image cards with hover effects and a modal for detailed case studies.
// ============================================================================

const projects = [
  {
    title: 'Manufacturing Group Audit',
    sector: 'Industrial',
    description: 'Comprehensive group-wide audit for a leading manufacturing firm with international operations.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600',
  },
  {
    title: 'FinTech Risk Assessment',
    sector: 'Technology',
    description: 'Detailed risk analysis and internal control evaluation for a rapidly growing financial technology startup.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600',
  },
  {
    title: 'Non-Profit Compliance',
    sector: 'Social Sector',
    description: 'Ensuring regulatory compliance and financial transparency for a major international NGO.',
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=600',
  },
  {
    title: 'Retail Chain Consulting',
    sector: 'Retail',
    description: 'Strategic business advisory and tax planning for a nationwide retail chain undergoing expansion.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600',
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-4 block">
              Projects
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Delivering Excellence Across Sectors
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="group relative overflow-hidden rounded-xl bg-brand-navy/50 border border-white/10 shadow-lg hover:shadow-2xl hover:border-brand-gold/30 transition-all duration-500 flex flex-col h-[420px] cursor-pointer"
            >
              <div className="relative h-3/5 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 to-transparent opacity-80"></div>
              </div>
              
              <div className="relative flex-1 p-6 flex flex-col justify-between bg-brand-navy/90 backdrop-blur-sm z-10 border-t border-white/5">
                <div>
                  <span className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-2 block">
                    {project.sector}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                <div 
                  className="text-brand-gold text-sm font-bold uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all mt-4 w-fit"
                >
                  View Details <span className="text-lg">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/90 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full text-brand-charcoal transition-colors z-20 shadow-sm"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="md:w-2/5 h-64 md:h-auto relative shrink-0">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
              </div>
              
              <div className="md:w-3/5 p-8 md:p-10 flex flex-col bg-brand-light">
                <span className="text-brand-gold text-sm font-bold uppercase tracking-widest mb-2 block">
                  {selectedProject.sector}
                </span>
                <h3 id="project-modal-title" className="text-3xl md:text-4xl font-bold text-brand-navy mb-6 font-serif leading-tight">
                  {selectedProject.title}
                </h3>
                
                <div className="space-y-6 text-brand-charcoal/80 leading-relaxed">
                  <p className="text-lg font-medium text-brand-navy/80">
                    {selectedProject.description}
                  </p>
                  
                  {/* Placeholder Content for Full Details */}
                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <h4 className="text-xl font-bold text-brand-navy mb-3 font-serif">Project Overview</h4>
                    <p className="mb-4">
                      [Placeholder] This section will contain a detailed overview of the project, including the client's initial challenges, the scope of work, and the specific methodologies applied by our consulting team to address their needs.
                    </p>
                    
                    <h4 className="text-xl font-bold text-brand-navy mb-3 font-serif mt-6">Key Outcomes</h4>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                      <li>[Placeholder] Achieved a 25% reduction in operational inefficiencies.</li>
                      <li>[Placeholder] Successfully navigated complex regulatory compliance frameworks.</li>
                      <li>[Placeholder] Implemented robust internal control systems.</li>
                    </ul>
                    
                    <div className="bg-brand-navy/5 p-4 rounded-lg mt-8 border border-brand-navy/10">
                      <p className="italic text-sm text-brand-navy/70">
                        "The consulting team provided exceptional insights that transformed our financial operations." - [Placeholder Client Name]
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="btn-primary"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
