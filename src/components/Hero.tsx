import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Target, Eye } from 'lucide-react';

// ============================================================================
// Hero Section Component
// ============================================================================
// This is the main landing section of the website. It features a background
// image with a dark overlay, the main value proposition, and a call-to-action.
// It uses framer-motion for entrance animations.
// ============================================================================

export default React.memo(function Hero() {
  return (
    <section id="home" className="relative min-h-[calc(100vh-72px)] flex items-center overflow-hidden py-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070" 
          alt="Modern office building" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          fetchPriority="high"
          loading="eager"
        />
        <div className="absolute inset-0 bg-brand-navy/90 mix-blend-multiply"></div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            y: [0, 30, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <span className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-2 block">
              Simple Values, Global Vision
            </span>
            <div className="w-20 h-px bg-brand-gold/40 mb-4"></div>
            <p className="text-brand-gold font-serif italic text-lg mb-8">
              Clients' Success is Our Success
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold leading-tight mb-6">
              Welcome to <br />
              <span className="text-brand-gold italic text-3xl md:text-5xl lg:text-6xl">Matura YP Consulting & Audit Co., Ltd.</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl">
              At Matura YP Consulting & Audit Co., Ltd., we are backed by a team of experienced professionals 
              with a strong belief that "Client success is our success." Our vision is to become 
              your trusted partner.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a 
                href="#contact" 
                className="btn-primary flex items-center justify-center gap-2 group animate-pulse-gold"
              >
                Send Inquiry
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a 
                href="#services" 
                className="btn-outline border-white text-white hover:bg-white hover:text-brand-navy flex items-center justify-center"
              >
                Our Services
              </a>
            </div>
          </motion.div>

          {/* Right Column: Introduction Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-white/10 backdrop-blur-md p-8 md:p-10 rounded-2xl border border-white/20 text-white shadow-2xl relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Commitment to Transparency & Compliance
                </h2>
                <p className="text-gray-300 mb-8 leading-relaxed text-sm md:text-base">
                  Founded on the principles of integrity and professional excellence, our company has been a cornerstone for businesses navigating complex financial landscapes. We believe that a robust audit is not just a regulatory requirement, but a strategic tool for business improvement.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-brand-gold/20 rounded-lg shrink-0">
                      <Target className="text-brand-gold w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">Commitment to clients</h4>
                      <p className="text-sm text-gray-300 mt-1">At Matura YP, we don't just provide services— we build partnerships. Every client receives honest, reliable, and tailored solutions guided by transparency, professional ethics, and a genuine commitment to your sustainable growth.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-brand-gold/20 rounded-lg shrink-0">
                      <Eye className="text-brand-gold w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">Vision</h4>
                      <p className="text-sm text-gray-300 mt-1">To become a trusted international consulting and audit firm—empowering businesses through integrity, innovation, and strategic insight. We create lasting value for clients and communities across borders.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/20 flex items-center gap-4">
                  <div className="text-4xl font-bold text-brand-gold">15+</div>
                  <div className="text-sm uppercase tracking-widest font-bold text-gray-300">Years of<br/>Experience</div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white/50 rounded-full"></div>
        </div>
      </div>
    </section>
  );
});
