"use client";

import { motion } from "framer-motion";
import {
    Phone,
    Mail,
    MapPin,
    Send,
    User,
    MessageSquare,
    ChevronDown,
    ExternalLink,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";
import { useState } from "react";

const googleMapsPlaceUrl = "https://www.google.com/maps/place/Somali+National+Union+of+Teachers+(+SONUT+)/@2.0422266,45.3222358,17z/data=!3m1!4b1!4m6!3m5!1s0x3d58438b9d0d4a4d:0xae9f850cd842fd3f!8m2!3d2.0422212!4d45.3248107!16s%2Fg%2F11kqjn7730?entry=ttu&g_ep=EgoyMDI2MTAyMC4wIKXMDSoASAFQAw%3D%3D";

const contactInfo = [
    {
        icon: Phone,
        title: "Phone Number",
        value: "+252 61 5625633",
        href: "tel:+252615625633",
    },
    {
        icon: Mail,
        title: "Support Email",
        value: "support@sonut.org.so",
        href: "mailto:support@sonut.org.so",
    },
    {
        icon: MapPin,
        title: "Address",
        value: "Howl-Wadaag District, Mogadishu, Somalia",
        href: googleMapsPlaceUrl,
        external: true,
    },
];

export default function ContactForm() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        inquiryType: "General Inquiry",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Khalad ayaa dhacay intii farriinta la dirayay.");
            }

            setSubmitted(true);
            setFormData({
                fullName: "",
                email: "",
                inquiryType: "General Inquiry",
                subject: "",
                message: "",
            });
            setTimeout(() => setSubmitted(false), 8000);
        } catch (err: any) {
            console.error("Submission failed:", err);
            setErrorMessage(err.message || "Farriinta lama diri karin. Fadlan hubi xiriirkaaga ama toos noogu soo dir support@sonut.org.so");
        } finally {
            setIsSubmitting(false);
        }
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
                        Have a question or want to learn more about SONUT? We&apos;d love to hear from you.
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
                                            target={item.external ? "_blank" : undefined}
                                            rel={item.external ? "noopener noreferrer" : undefined}
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
                                <p className="text-muted-foreground text-sm">
                                    Waxii xog ah waxaa si toos ah loogu dirayaa <span className="font-semibold text-primary">support@sonut.org.so</span>.
                                </p>
                            </div>

                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center text-center py-16"
                                >
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-5">
                                        <CheckCircle2 className="w-8 h-8" />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h4>
                                    <p className="text-muted-foreground text-sm max-w-sm mb-4">
                                        Mahadsanid! Farriintaada si guul leh ayaa loo diray waxaana loo gudbiyay <span className="font-medium text-gray-800">support@sonut.org.so</span>.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setSubmitted(false)}
                                        className="text-xs font-semibold text-primary hover:underline"
                                    >
                                        Farriin kale dir (Send another message)
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {errorMessage && (
                                        <div className="flex items-center gap-2 p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl">
                                            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                                            <span>{errorMessage}</span>
                                        </div>
                                    )}

                                    <div className="grid sm:grid-cols-2 gap-5">
                                        {/* Name */}
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-gray-700">Full Name *</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.fullName}
                                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                    placeholder="Your name"
                                                    className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-gray-700">Email Address *</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder="you@example.com"
                                                    className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Inquiry Type */}
                                    <div className="space-y-1.5">
                                        <label htmlFor="inquiryType" className="text-sm font-semibold text-gray-700">
                                            Inquiry Type
                                        </label>
                                        <div className="relative">
                                            <select
                                                id="inquiryType"
                                                name="inquiryType"
                                                value={formData.inquiryType}
                                                onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                                                className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2.5 pr-10 text-sm text-gray-900 outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
                                            >
                                                <option value="General Inquiry">General Inquiry</option>
                                                <option value="Membership">Membership</option>
                                                <option value="Technical Support">Technical Support</option>
                                                <option value="Complaint">Complaint</option>
                                                <option value="Suggestion">Suggestion</option>
                                            </select>
                                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        </div>
                                    </div>

                                    {/* Subject */}
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-700">Subject *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            placeholder="How can we help you?"
                                            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        />
                                    </div>

                                    {/* Message */}
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-700">Message *</label>
                                        <div className="relative">
                                            <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                                            <textarea
                                                rows={4}
                                                required
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                placeholder="Write your message here..."
                                                className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-[#2A1A99] active:scale-[0.98] text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
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
                    className="mt-10 rounded-3xl overflow-hidden shadow-xl shadow-gray-200/60 border border-gray-100 h-80 md:h-96 relative group"
                >
                    {/* Top action badge to open directly in Google Maps */}
                    <div className="absolute top-4 left-4 z-10">
                        <a
                            href={googleMapsPlaceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-gray-800 shadow-md hover:bg-white hover:text-primary transition-all border border-gray-100"
                        >
                            <MapPin className="w-4 h-4 text-red-600" />
                            Open in Maps
                            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                        </a>
                    </div>

                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.294154867499!2d45.3222358!3d2.0422266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3d58438b9d0d4a4d%3A0xae9f850cd842fd3f!2sSomali%20National%20Union%20of%20Teachers%20(%20SONUT%20)!5e0!3m2!1sen!2sso!4v1710000000000!5m2!1sen!2sso"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Somali National Union of Teachers ( SONUT )"
                    />
                </motion.div>
            </div>
        </section>
    );
}
