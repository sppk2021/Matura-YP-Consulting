import React from 'react';
import { MapPin, Phone, Mail, Clock, Send, ExternalLink } from 'lucide-react';

// ============================================================================
// Contact Section Component
// ============================================================================
// This component provides contact information (address, phone, email, hours)
// and a functional contact form for users to send inquiries directly.
// ============================================================================

export default function Contact() {
  return (
    <section id="contact" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <span className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-4 block">
              Contact Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Get in Touch with Our Experts
            </h2>
            <p className="text-lg text-gray-300 mb-12 leading-relaxed">
              Have questions about our services or need a consultation? Our team is ready to assist you. 
              Fill out the form or reach out via our contact details.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-sm shrink-0">
                  <MapPin className="text-brand-gold w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1 text-lg">Office Address</h4>
                  <p className="text-gray-300">123 Financial Plaza, Suite 500<br />Business District, City 10110</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-sm shrink-0">
                  <Phone className="text-brand-gold w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1 text-lg">Phone Number</h4>
                  <p className="text-gray-300">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-sm shrink-0">
                  <Mail className="text-brand-gold w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1 text-lg">Email Address</h4>
                  <p className="text-gray-300">info@trustedaudit.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-sm shrink-0">
                  <Clock className="text-brand-gold w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1 text-lg">Working Hours</h4>
                  <p className="text-gray-300">Mon - Fri: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-10 rounded-sm flex flex-col justify-center h-full">
            <h3 className="text-2xl font-bold text-white mb-6">Send an Inquiry</h3>
            <p className="text-gray-300 mb-8">
              We'd love to hear from you. Please use our inquiry form to provide details about your project or questions, and our team will get back to you within 24 hours.
            </p>
            
            <a 
              href="https://forms.gle/your-google-form-link-here" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary w-full flex items-center justify-center gap-2 group py-4 text-lg"
            >
              Open Inquiry Form
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
