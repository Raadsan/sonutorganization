"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, User, MessageSquare } from "lucide-react";
import { useState } from "react";

const contactInfo = [
    {
        icon: Phone,
        title: "Phone Number",
        value: "+252 61 5625633",
        href: "tel:+252615625633",
    },
    {
        icon: Mail,
        title: "Email",
        value: "info@sonut.org.so",
        href: "mailto:info@sonut.org.so",
    },
    {
        icon: MapPin,
        title: "Address",
        value: "Hool-wadaag Distirct, Mogadishu, Somalia",
        href: "#map",
    },
];

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 5000);
        }, 1500);
    };

    return (
        <section className="py-24 bg-[#fafafa] relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-4">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        GET IN TOUCH
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-primary mb-4">
                        Contact Us
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
                        Have a question or want to learn more about SONUT? We'd love to hear from you.
                    </p>
                </div>

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 overflow-hidden"
                >
                    <div className="grid md:grid-cols-5">

                        {/* ── Left: contact info ── */}
                        <div className="md:col-span-2 bg-primary p-8 md:p-10 text-white flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold font-serif mb-3">Get In Touch</h3>
                                <p className="text-white/70 text-sm leading-relaxed mb-10">
                                    Reach out to us through any of the channels below and our team will get back to you as soon as possible.
                                </p>

                                <div className="space-y-7">
                                    {contactInfo.map((item) => (
                                        <a
                                            key={item.title}
                                            href={item.href}
                                            className="flex items-start gap-4 group"
                                        >
                                            <div className="w-11 h-11 rounded-2xl bg-white/10 group-hover:bg-white/20 flex items-center justify-center shrink-0 transition-colors duration-300">
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-white/50 uppercase tracking-wider mb-0.5">
                                                    {item.title}
                                                </p>
                                                <p className="text-sm font-semibold group-hover:text-white/80 transition-colors">
                                                    {item.value}
                                                </p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Decorative dots */}
                            <div className="relative z-10 mt-10 grid grid-cols-5 gap-2 opacity-20">
                                {Array.from({ length: 25 }).map((_, i) => (
                                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
                                ))}
                            </div>
                        </div>

                        {/* ── Right: form ── */}
                        <div className="md:col-span-3 p-8 md:p-10">
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-1">Send Us a Message</h3>
                                <p className="text-muted-foreground text-sm">We'll respond within 24 hours.</p>
                            </div>

                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center text-center py-16"
                                >
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-5">
                                        <Send className="w-7 h-7" />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h4>
                                    <p className="text-muted-foreground text-sm max-w-xs">
                                        Thank you for reaching out. Our team will get back to you shortly.
                                    </p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        {/* Name */}
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-gray-700">Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="Your name"
                                                    className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-gray-700">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                                <input
                                                    type="email"
                                                    required
                                                    placeholder="you@example.com"
                                                    className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Subject */}
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-700">Subject</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="How can we help you?"
                                            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        />
                                    </div>

                                    {/* Message */}
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-700">Message</label>
                                        <div className="relative">
                                            <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                                            <textarea
                                                rows={4}
                                                required
                                                placeholder="Write your message here..."
                                                className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-[#2A1A99] active:scale-[0.98] text-white font-bold py-3 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                Send Message
                                                <Send className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* ── Map ── */}
                <motion.div
                    id="map"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-10 rounded-3xl overflow-hidden shadow-xl shadow-gray-200/60 border border-gray-100 h-80 md:h-96"
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3931.0!2d45.3182!3d2.0469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwMDInNDguOCJOIDQ1wrAxOScwNS41IkU!5e0!3m2!1sen!2sso!4v1234567890"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="SONUT Office Location"
                    />
                </motion.div>
            </div>
        </section>
    );
}
