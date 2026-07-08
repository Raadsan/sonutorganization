"use client";

import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function MembersForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000); // reset after 5s
    }, 1500);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            BECOME A MEMBER
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-primary mb-4">
            Register With Us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Join thousands of educators nationwide. Let's work together to build a stronger, more united teaching profession in Somalia.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden"
        >
          <div className="grid md:grid-cols-5">
            {/* Left side: Information */}
            <div className="md:col-span-2 bg-primary p-8 md:p-10 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 font-serif">Why Join Us?</h3>
                <p className="text-primary-foreground/80 leading-relaxed text-sm mb-8">
                  As a member of SONUT, you gain access to a wide range of benefits designed to support your professional growth and personal well-being.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold mb-1">Strong Community</h4>
                      <p className="text-xs text-primary-foreground/70 leading-relaxed">Connect and collaborate with experienced educators across the country.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold mb-1">National Recognition</h4>
                      <p className="text-xs text-primary-foreground/70 leading-relaxed">Be part of an internationally recognized union that advocates for your rights.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Form */}
            <div className="md:col-span-3 p-8 md:p-10">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Form</h3>
                <p className="text-muted-foreground text-sm">Fill out the details below to apply for membership.</p>
              </div>

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 text-green-800 p-6 rounded-2xl border border-green-100 flex flex-col items-center justify-center text-center py-12 h-full"
                >
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <User className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Application Received!</h4>
                  <p className="text-sm max-w-sm mx-auto">Thank you for registering. Our team will review your application and contact you shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-gray-700">Full Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          required
                          className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-gray-700">Email Address</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          required
                          className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          required
                          className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                          placeholder="+252 61 XXXXXXX"
                        />
                      </div>
                    </div>

                    {/* Region */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-gray-700">Region</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                          required
                          defaultValue=""
                          className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm appearance-none"
                        >
                          <option value="" disabled>Select Region</option>
                          <option value="Banaadir">Banaadir</option>
                          <option value="Galmudug">Galmudug</option>
                          <option value="Hirshabelle">Hirshabelle</option>
                          <option value="Jubaland">Jubaland</option>
                          <option value="Puntland">Puntland</option>
                          <option value="South West">South West</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">Why do you want to join?</label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 pointer-events-none">
                        <MessageSquare className="h-5 w-5 text-gray-400" />
                      </div>
                      <textarea
                        rows={3}
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm resize-none"
                        placeholder="Tell us briefly about your teaching background..."
                      ></textarea>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-xl transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Submit Application
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
