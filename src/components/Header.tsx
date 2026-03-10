import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';

// ============================================================================
// Header Component
// ============================================================================
// This component renders the top navigation bar. It includes the company logo,
// desktop navigation links, a call-to-action button, and a mobile menu toggle.
// It also features a scroll effect that changes the background transparency.
// ============================================================================

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Who We Are', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Publication', href: '#publication' },
  { name: 'FAQs', href: '#faqs' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-brand-navy/90 backdrop-blur-lg shadow-lg py-2 border-b border-white/10' 
        : 'bg-brand-navy shadow-md py-3'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-4 group">
          <div className="relative h-16 w-16 bg-white/10 rounded-xl flex items-center justify-center p-1.5 shadow-sm border-[0.5px] border-brand-gold/20 transition-all duration-300 group-hover:border-brand-gold/40 overflow-hidden">
            {/* Subtle Highlight */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
            <img 
              src="https://uploads.onecompiler.io/43924vdyc/44ftcb7wt/logo%202.png" 
              alt="Company Logo" 
              className="h-full w-full object-contain rounded-lg relative z-10"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="font-serif font-bold text-xl md:text-2xl text-white tracking-tight">
            Matura YP Consulting & Audit Co., Ltd.
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className="nav-link text-gray-300 hover:text-white font-semibold"
            >
              {item.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="btn-primary py-2 px-6 text-sm"
          >
            Send Inquiry
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X className="text-white" />
          ) : (
            <Menu className="text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-brand-navy/95 backdrop-blur-xl shadow-xl py-6 px-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 border-b border-white/10">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className="text-gray-300 hover:text-white font-medium py-2 border-b border-white/10"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="btn-primary text-center mt-2"
            onClick={() => setIsOpen(false)}
          >
            Send Inquiry
          </a>
        </div>
      )}
    </header>
  );
}
