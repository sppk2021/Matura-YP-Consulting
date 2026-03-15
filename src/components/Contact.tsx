import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, User, Building2, MessageSquare, HelpCircle, Globe, FileText } from 'lucide-react';

// ============================================================================
// Contact Section Component
// ============================================================================
// This component provides contact information (address, phone, email, hours)
// and a functional contact form for users to send inquiries directly.
// ============================================================================

export default function Contact() {
  const [formData, setFormData] = useState({
    contactPersonName: '',
    companyName: '',
    emailAddress: '',
    communicationChannel: '',
    yoursInquires: '',
    howDidYouKnow: '',
    countryToInvest: '',
    additionalRequests: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/maturayp.company@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            _subject: `New Inquiry from ${formData.contactPersonName} - ${formData.companyName || 'Website'}`,
            "Contact Person Name": formData.contactPersonName,
            "Company Name": formData.companyName || "N/A",
            "Email Address": formData.emailAddress || "N/A",
            "Communication Channel": formData.communicationChannel,
            "Yours Inquires": formData.yoursInquires,
            "How did you know about us": formData.howDidYouKnow || "N/A",
            "Country to invest/operate in": formData.countryToInvest || "N/A",
            "Additional Request(s)": formData.additionalRequests || "N/A",
            _template: "table"
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          contactPersonName: '',
          companyName: '',
          emailAddress: '',
          communicationChannel: '',
          yoursInquires: '',
          howDidYouKnow: '',
          countryToInvest: '',
          additionalRequests: ''
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const inputClasses = "w-full bg-brand-navy/50 border border-white/10 rounded-lg pl-11 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all duration-300 disabled:opacity-50";
  const textareaClasses = "w-full bg-brand-navy/50 border border-white/10 rounded-lg pl-4 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all duration-300 resize-none disabled:opacity-50";

  return (
    <section id="contact" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
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
                <div className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-lg shrink-0 border border-white/5">
                  <MapPin className="text-brand-gold w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1 text-lg">Office Address</h4>
                  <p className="text-gray-300">No. 447, 4th Floor, Lower Pazundaung<br />Road, Pazundaung Township, Yangon, Myanmar.</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-lg shrink-0 border border-white/5">
                  <Phone className="text-brand-gold w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1 text-lg">Phone Number</h4>
                  <p className="text-gray-300">+95-9-266-244-293<br />+95-9-421-121-563</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-lg shrink-0 border border-white/5">
                  <Mail className="text-brand-gold w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1 text-lg">Email Address</h4>
                  <p className="text-gray-300">maturayp.company@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-lg shrink-0 border border-white/5">
                  <Clock className="text-brand-gold w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1 text-lg">Working Hours</h4>
                  <p className="text-gray-300">Mon - Fri: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white/5 border border-white/10 p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-white mb-2 font-serif">Request a Consultation</h3>
              <p className="text-gray-400 text-sm">Fields marked with an asterisk (*) are required.</p>
            </div>
            
            {status === 'success' ? (
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[400px] animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-3">Message Sent Successfully!</h4>
                <p className="text-gray-300 mb-6 max-w-md">
                  Thank you for reaching out. We have received your inquiry and our consulting team will get back to you shortly.
                </p>
                <div className="bg-brand-navy/50 p-4 rounded-lg border border-white/5 text-sm text-brand-gold/90 max-w-md">
                  Note: If this is your first time testing the form, please check your email (maturayp.company@gmail.com) to activate the form submissions.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                {status === 'error' && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3 mb-6 animate-in fade-in slide-in-from-top-2">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-200">There was an error sending your message. Please check your connection and try again.</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="relative">
                    <label htmlFor="contactPersonName" className="block text-sm font-medium text-gray-300 mb-1.5">Contact person name *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <input required type="text" id="contactPersonName" name="contactPersonName" value={formData.contactPersonName} onChange={handleChange} disabled={status === 'submitting'} placeholder="John Doe" className={inputClasses} />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-300 mb-1.5">Company name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Building2 className="h-5 w-5 text-gray-500" />
                      </div>
                      <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} disabled={status === 'submitting'} placeholder="Acme Corp" className={inputClasses} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="relative">
                    <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-300 mb-1.5">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-500" />
                      </div>
                      <input type="email" id="emailAddress" name="emailAddress" value={formData.emailAddress} onChange={handleChange} disabled={status === 'submitting'} placeholder="john@example.com" className={inputClasses} />
                    </div>
                  </div>

                  <div className="relative">
                    <label htmlFor="communicationChannel" className="block text-sm font-medium text-gray-300 mb-1.5">Communication Channel *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <MessageSquare className="h-5 w-5 text-gray-500" />
                      </div>
                      <input required type="text" id="communicationChannel" name="communicationChannel" value={formData.communicationChannel} onChange={handleChange} disabled={status === 'submitting'} placeholder="Email, Phone, WhatsApp..." className={inputClasses} />
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="yoursInquires" className="block text-sm font-medium text-gray-300 mb-1.5">Your Inquiries *</label>
                  <textarea required id="yoursInquires" name="yoursInquires" value={formData.yoursInquires} onChange={handleChange} disabled={status === 'submitting'} placeholder="Please describe how we can help you..." rows={4} className={textareaClasses}></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="relative">
                    <label htmlFor="howDidYouKnow" className="block text-sm font-medium text-gray-300 mb-1.5">How did you know about us?</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <HelpCircle className="h-5 w-5 text-gray-500" />
                      </div>
                      <input type="text" id="howDidYouKnow" name="howDidYouKnow" value={formData.howDidYouKnow} onChange={handleChange} disabled={status === 'submitting'} placeholder="Referral, Search, etc." className={inputClasses} />
                    </div>
                  </div>

                  <div className="relative">
                    <label htmlFor="countryToInvest" className="block text-sm font-medium text-gray-300 mb-1.5">Country to invest/operate in</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Globe className="h-5 w-5 text-gray-500" />
                      </div>
                      <input type="text" id="countryToInvest" name="countryToInvest" value={formData.countryToInvest} onChange={handleChange} disabled={status === 'submitting'} placeholder="e.g., Singapore, USA" className={inputClasses} />
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="additionalRequests" className="block text-sm font-medium text-gray-300 mb-1.5">Additional Request(s)</label>
                  <textarea id="additionalRequests" name="additionalRequests" value={formData.additionalRequests} onChange={handleChange} disabled={status === 'submitting'} placeholder="Any other details you'd like to share..." rows={2} className={textareaClasses}></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="btn-primary w-full flex items-center justify-center gap-3 group py-4 text-lg mt-8 rounded-xl disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all duration-300 animate-pulse-gold"
                >
                  {status === 'submitting' ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-brand-navy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <>
                      Send Inquiry
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
