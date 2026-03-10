import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

// ============================================================================
// Footer Component
// ============================================================================
// The footer appears at the bottom of every page. It contains the company logo,
// a brief description, social media links, copyright info, and legal links.
// ============================================================================

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      {/* Wavy SVG Background */}
      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 320" className="w-full h-[40px] md:h-[60px] block" preserveAspectRatio="none">
          <path fill="#2563eb" fillOpacity="0.3" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,122.7C672,96,768,96,864,117.3C960,139,1056,181,1152,192C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          <path fill="#2563eb" fillOpacity="0.6" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          <path fill="#2563eb" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,240C960,245,1056,203,1152,186.7C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="bg-[#2563eb] w-full pb-6 pt-2">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo and Company Name */}
          <div className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 bg-white/10 rounded-lg flex items-center justify-center p-1.5 shadow-sm border-[0.5px] border-white/20 transition-all duration-300 group-hover:bg-white/20 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
              <img 
                src="https://uploads.onecompiler.io/43924vdyc/44ftcb7wt/logo%202.png" 
                alt="Company Logo" 
                className="h-full w-full object-contain rounded-md relative z-10"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-serif font-bold text-lg tracking-tight text-white">
              Matura YP Consulting & Audit Co., Ltd.
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm font-medium text-white/90">
            <a href="#home" className="hover:text-brand-gold transition-colors">Home</a>
            <a href="#about" className="hover:text-brand-gold transition-colors">About</a>
            <a href="#services" className="hover:text-brand-gold transition-colors">Services</a>
            <a href="#contact" className="hover:text-brand-gold transition-colors">Contact</a>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-gold hover:scale-110 transition-all duration-300" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-gold hover:scale-110 transition-all duration-300" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-gold hover:scale-110 transition-all duration-300" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-gold hover:scale-110 transition-all duration-300" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto px-6 mt-6 pt-4 border-t border-white/20 text-center text-white/70 text-xs">
          © {new Date().getFullYear()} Matura YP Consulting & Audit Co., Ltd. | All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
