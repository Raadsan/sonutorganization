"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  User, Mail, Phone, MapPin, Send, ChevronRight, ChevronLeft,
  CheckCircle2, Camera, BookOpen, AlertCircle,
} from "lucide-react";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

// ─── Types ───────────────────────────────────────────────────────────────────
type FormData = {
  // Tab 1 – Personal
  fullName: string;
  motherName: string;
  gender: string;
  dateOfBirth: string;
  placeOfBirth: string;
  bloodType: string;
  teacherImage: File | null;
  // Tab 2 – Contact
  phone: string;
  email: string;
  district: string;
  // Tab 3 – Professional
  subject: string;
  teachingStatus: string;
  fieldOfStudy: string;
  teachingLevel: string;
  institutionName: string;
  institutionLocation: string;
  // Tab 4 – Emergency
  emergencyName: string;
  emergencyPhone: string;
  emergencyEmail: string;
};

const INITIAL: FormData = {
  fullName: "", motherName: "", gender: "", dateOfBirth: "",
  placeOfBirth: "", bloodType: "", teacherImage: null,
  phone: "", email: "", district: "",
  subject: "", teachingStatus: "", fieldOfStudy: "",
  teachingLevel: "", institutionName: "", institutionLocation: "",
  emergencyName: "", emergencyPhone: "", emergencyEmail: "",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const TABS = [
  { id: 1, label: "Personal Info", icon: User },
  { id: 2, label: "Contact Info", icon: Phone },
  { id: 3, label: "Professional Details", icon: BookOpen },
  { id: 4, label: "Emergency Contact", icon: AlertCircle },
];

function Field({
  label, subLabel, required = true, children,
}: {
  label: string; subLabel?: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-gray-800">
        {label}
        {subLabel && <span className="ml-1 text-xs font-normal text-gray-400">/ {subLabel}</span>}
        {required && <span className="ml-1 text-[#F4313F]">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "block w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/60 focus:bg-white focus:ring-2 focus:ring-[#1E0D79]/20 focus:border-[#1E0D79] outline-none transition-all text-sm placeholder:text-gray-400";
const selectCls = inputCls + " appearance-none cursor-pointer";

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MembersForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (field: keyof FormData, value: string) =>
    setData((d) => ({ ...d, [field]: value }));

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setData((d) => ({ ...d, teacherImage: file }));
    setPreview(URL.createObjectURL(file));
  };

  const next = () => setStep((s) => Math.min(s + 1, 4));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      
      // Append all string fields
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "teacherImage") {
          formData.append(key, value as string);
        }
      });
      
      // Append image if exists
      if (data.teacherImage) {
        formData.append("teacherImage", data.teacherImage);
      }

      const res = await fetch("/api/members", {
        method: "POST",
        body: formData, // fetch will set the correct multipart boundary automatically
      });

      const result = await res.json();
      if (result.success) {
        setSubmitted(true);
        toast.success("Application submitted successfully!");
      } else {
        toast.error(result.error || "Failed to submit application");
      }
    } catch (error) {
      toast.error("An error occurred during submission");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Tab content ─────────────────────────────────────────────────────────────
  const tabContent: Record<number, React.ReactNode> = {
    1: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Full Name">
          <input type="text" required value={data.fullName}
            onChange={e => set("fullName", e.target.value)}
            placeholder="Enter your full name" className={inputCls} />
        </Field>

        <Field label="Mother's Name">
          <input type="text" required value={data.motherName}
            onChange={e => set("motherName", e.target.value)}
            placeholder="Enter mother's full name" className={inputCls} />
        </Field>

        <Field label="Gender">
          <select required value={data.gender}
            onChange={e => set("gender", e.target.value)} className={selectCls}>
            <option value="">Choose Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </Field>

        <Field label="Blood Type">
          <select required value={data.bloodType}
            onChange={e => set("bloodType", e.target.value)} className={selectCls}>
            <option value="">Choose Blood Type</option>
            {["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Field>

        <Field label="Date of Birth">
          <input type="date" required value={data.dateOfBirth}
            onChange={e => set("dateOfBirth", e.target.value)} className={inputCls} />
        </Field>

        <Field label="Place of Birth">
          <input type="text" required value={data.placeOfBirth}
            onChange={e => set("placeOfBirth", e.target.value)}
            placeholder="City / District" className={inputCls} />
        </Field>

        {/* Image upload – full width */}
        <div className="sm:col-span-2">
          <Field label="Teacher Photo">
            <div
              onClick={() => fileRef.current?.click()}
              className="relative flex items-center gap-4 border-2 border-dashed border-gray-200 rounded-2xl p-5 cursor-pointer hover:border-[#1E0D79]/40 hover:bg-[#1E0D79]/5 transition-all"
            >
              {preview ? (
                <img src={preview} alt="preview"
                  className="w-20 h-20 rounded-xl object-cover shrink-0 shadow" />
              ) : (
                <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                  <Camera className="w-8 h-8 text-gray-400" />
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  {data.teacherImage ? data.teacherImage.name : "Click to upload your photo"}
                </p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG · Max 10 MB</p>
              </div>
              <input ref={fileRef} type="file" accept="image/*"
                className="hidden" onChange={handleImage} />
            </div>
          </Field>
        </div>
      </div>
    ),

    2: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Phone Number">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-sm">+252</span>
            <input type="tel" required value={data.phone}
              onChange={e => set("phone", e.target.value)}
              placeholder="61 XXXXXXX"
              className={inputCls + " pl-14"} />
          </div>
        </Field>

        <Field label="Email Address">
          <input type="email" required value={data.email}
            onChange={e => set("email", e.target.value)}
            placeholder="teacher@example.com" className={inputCls} />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Current District of Residence">
            <input type="text" required value={data.district}
              onChange={e => set("district", e.target.value)}
              placeholder="Your current district / city" className={inputCls} />
          </Field>
        </div>

        {/* Info card */}
        <div className="sm:col-span-2 bg-[#1E0D79]/5 rounded-2xl p-5 border border-[#1E0D79]/10">
          <p className="text-xs text-[#1E0D79] font-semibold mb-2">📌 Note</p>
          <p className="text-xs text-gray-600 leading-relaxed">
            The contact details you provide will be used for application verification and
            future communication from the Union. Please ensure they are accurate.
          </p>
        </div>
      </div>
    ),

    3: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Teaching Subject">
          <input type="text" required value={data.subject}
            onChange={e => set("subject", e.target.value)}
            placeholder="Mathematics, English, Science..." className={inputCls} />
        </Field>

        <Field label="Education Level">
          <select required value={data.teachingStatus}
            onChange={e => set("teachingStatus", e.target.value)} className={selectCls}>
            <option value="">Choose Level</option>
            <option value="University">University</option>
            <option value="Secondary">Secondary School</option>
            <option value="Middle">Middle School</option>
            <option value="Primary">Primary School</option>
            <option value="TVET">TVET / Vocational</option>
          </select>
        </Field>

        <Field label="Field of Study / Specialization">
          <input type="text" required value={data.fieldOfStudy}
            onChange={e => set("fieldOfStudy", e.target.value)}
            placeholder="e.g., Bachelor of Education" className={inputCls} />
        </Field>

        <Field label="Class Levels Taught">
          <select required value={data.teachingLevel}
            onChange={e => set("teachingLevel", e.target.value)} className={selectCls}>
            <option value="">Choose Level</option>
            <option value="Level 1">Level 1 – Primary School (Grades 1-4)</option>
            <option value="Level 2">Level 2 – Middle School (Grades 5-8)</option>
            <option value="Level 3">Level 3 – Secondary School (Grades 9-12)</option>
            <option value="University Level">University Level</option>
            <option value="TVET">TVET / Vocational</option>
          </select>
        </Field>

        <Field label="Institution Name">
          <input type="text" required value={data.institutionName}
            onChange={e => set("institutionName", e.target.value)}
            placeholder="School / University Name" className={inputCls} />
        </Field>

        <Field label="Institution Location">
          <input type="text" required value={data.institutionLocation}
            onChange={e => set("institutionLocation", e.target.value)}
            placeholder="District / City" className={inputCls} />
        </Field>
      </div>
    ),

    4: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2 bg-[#F4313F]/5 rounded-2xl p-5 border border-[#F4313F]/10">
          <p className="text-xs text-[#F4313F] font-semibold mb-2">⚠️ Emergency Contact Details</p>
          <p className="text-xs text-gray-600 leading-relaxed">
            Please provide the details of a contact person we can reach in case of an emergency.
          </p>
        </div>

        <div className="sm:col-span-2">
          <Field label="Emergency Contact Name">
            <input type="text" required value={data.emergencyName}
              onChange={e => set("emergencyName", e.target.value)}
              placeholder="Full name of emergency contact" className={inputCls} />
          </Field>
        </div>

        <Field label="Emergency Contact Phone">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-sm">+252</span>
            <input type="tel" required value={data.emergencyPhone}
              onChange={e => set("emergencyPhone", e.target.value)}
              placeholder="61 XXXXXXX"
              className={inputCls + " pl-14"} />
          </div>
        </Field>

        <Field label="Emergency Contact Email">
          <input type="email" required value={data.emergencyEmail}
            onChange={e => set("emergencyEmail", e.target.value)}
            placeholder="contact@example.com" className={inputCls} />
        </Field>

        {/* Membership requirements */}
        <div className="sm:col-span-2 space-y-3">
          <p className="text-sm font-bold text-gray-800">
            Requirements for Membership
          </p>
          {[
            "You must be an active teacher working in an official educational institution.",
            "You must complete the membership application form fully and accurately.",
            "You must pay a monthly membership fee of $3.",
            "You must pay an annual ID Card issuance fee of $5.",
            "You must be willing to participate in Union meetings, trainings, and activities.",
            "You must respect and adhere to the Union's Constitution and values.",
          ].map((req, i) => (
            <div key={i} className="flex items-start gap-3 text-xs text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-[#1E0D79] shrink-0 mt-0.5" />
              <span>{req}</span>
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div className="sm:col-span-2 bg-gray-50 rounded-xl p-4 text-xs text-gray-500 leading-relaxed border border-gray-100">
          <span className="font-semibold text-gray-700">Contact:</span>{" "}
          +252616478844 · info@sonut.org.so · Howl-wadaag District, Mogadishu – Somalia
        </div>
      </div>
    ),
  };

  // ── Success screen ───────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <section className="py-24 bg-[#fafafa]" id="register">
        <div className="max-w-xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12"
          >
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Application Submitted!</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-2">
              Thank you! Your application has been successfully received. Our team will contact you shortly
              to verify your membership status.
            </p>
            <p className="text-xs text-gray-400 mt-4">
              Contact: +252616478844 · info@sonut.org.so
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  // ── Main form ────────────────────────────────────────────────────────────────
  return (
    <>
      <Toaster position="top-center" richColors />
      <section className="py-20 bg-[#fafafa] relative overflow-hidden" id="register">
      {/* BG blobs */}
      <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#1E0D79]/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#F4313F]/5 blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E0D79]/10 text-[#1E0D79] text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-[#1E0D79] animate-pulse" />
            JOIN THE UNION
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1E0D79] mb-3 font-serif">
            Membership Registration
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Join the Somali National Union of Teachers — This form is for teachers seeking official membership registration.
          </p>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 overflow-hidden"
        >
          {/* ── Tab bar ─────────────────────────────────────────────────────── */}
          <div className="flex border-b border-gray-100 overflow-x-auto scrollbar-none">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = step === tab.id;
              const done = step > tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => tab.id < step && setStep(tab.id)}
                  className={`
                    flex-1 min-w-[120px] flex flex-col items-center gap-1 py-4 px-3 text-xs font-semibold
                    border-b-2 transition-all duration-300 relative
                    ${active
                      ? "border-[#1E0D79] text-[#1E0D79] bg-[#1E0D79]/5"
                      : done
                        ? "border-[#1E0D79]/30 text-[#1E0D79]/60 cursor-pointer hover:bg-gray-50"
                        : "border-transparent text-gray-400 cursor-default"
                    }
                  `}
                >
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center transition-all
                    ${active ? "bg-[#1E0D79] text-white" : done ? "bg-[#1E0D79]/20 text-[#1E0D79]" : "bg-gray-100 text-gray-400"}
                  `}>
                    {done ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span className="hidden sm:block leading-tight text-center">
                    <span className="block text-[10px] opacity-70">{tab.id}.</span>
                    {tab.label}
                  </span>
                  <span className="block sm:hidden text-[10px]">{tab.id}</span>
                </button>
              );
            })}
          </div>

          {/* ── Progress bar ────────────────────────────────────────────────── */}
          <div className="h-1 bg-gray-100">
            <motion.div
              className="h-full bg-gradient-to-r from-[#1E0D79] to-[#F4313F]"
              initial={false}
              animate={{ width: `${((step - 1) / 3) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>

          {/* ── Form body ───────────────────────────────────────────────────── */}
          <form onSubmit={handleSubmit}>
            <div className="p-6 md:p-10">
              {/* Step heading */}
              <div className="mb-7 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1E0D79]/10 flex items-center justify-center">
                  {(() => { const Icon = TABS[step - 1].icon; return <Icon className="w-5 h-5 text-[#1E0D79]" />; })()}
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Step {step} / {TABS.length}</p>
                  <h3 className="text-lg font-bold text-gray-900">{TABS[step - 1].label}</h3>
                </div>
              </div>

              {/* Animated step content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  {tabContent[step]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── Navigation buttons ──────────────────────────────────────── */}
            <div className="px-6 md:px-10 pb-8 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={prev}
                disabled={step === 1}
                className={`
                  inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all
                  ${step === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-[#1E0D79] border border-[#1E0D79]/30 hover:bg-[#1E0D79]/5"}
                `}
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>

              {step < 4 ? (
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1E0D79] text-white px-7 py-2.5 text-sm font-bold shadow-md shadow-[#1E0D79]/20 hover:bg-[#1E0D79]/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#F4313F] text-white px-7 py-2.5 text-sm font-bold shadow-md shadow-[#F4313F]/20 hover:bg-[#F4313F]/90 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Submit Application
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </motion.div>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-400 mt-6">
          For more information, contact{" "}
          <span className="font-semibold text-[#1E0D79]">+252616478844</span> ·{" "}
          <a href="mailto:info@sonut.org.so" className="hover:underline text-[#1E0D79]">
            info@sonut.org.so
          </a>{" "}
          · Howl-wadaag District, Mogadishu – Somalia
        </p>
      </div>
    </section>
    </>
  );
}
