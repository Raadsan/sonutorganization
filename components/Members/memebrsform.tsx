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
  { id: 1, label: "Xogta Shakhsiga", sub: "Personal Info", icon: User },
  { id: 2, label: "Xiriirka", sub: "Contact Info", icon: Phone },
  { id: 3, label: "Xirfadda", sub: "Professional", icon: BookOpen },
  { id: 4, label: "Xaaladda Deg-degta", sub: "Emergency", icon: AlertCircle },
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
        <Field label="Magaca" subLabel="Full Name">
          <input type="text" required value={data.fullName}
            onChange={e => set("fullName", e.target.value)}
            placeholder="Magacaaga oo dhamays tiran" className={inputCls} />
        </Field>

        <Field label="Magaca Hooyo" subLabel="Mother Name">
          <input type="text" required value={data.motherName}
            onChange={e => set("motherName", e.target.value)}
            placeholder="Magaca Hooyadaa" className={inputCls} />
        </Field>

        <Field label="Jinsiga" subLabel="Gender">
          <select required value={data.gender}
            onChange={e => set("gender", e.target.value)} className={selectCls}>
            <option value="">Dooro / Choose</option>
            <option value="Rag">Rag / Male</option>
            <option value="Dumar">Dumar / Female</option>
          </select>
        </Field>

        <Field label="Nooca Dhiigaaga" subLabel="Blood Type">
          <select required value={data.bloodType}
            onChange={e => set("bloodType", e.target.value)} className={selectCls}>
            <option value="">Dooro / Choose</option>
            {["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Field>

        <Field label="Taariikhda Dhalashada" subLabel="Date of Birth">
          <input type="date" required value={data.dateOfBirth}
            onChange={e => set("dateOfBirth", e.target.value)} className={inputCls} />
        </Field>

        <Field label="Goobta Dhalashada" subLabel="Place of Birth">
          <input type="text" required value={data.placeOfBirth}
            onChange={e => set("placeOfBirth", e.target.value)}
            placeholder="Magaalada / Degmada" className={inputCls} />
        </Field>

        {/* Image upload – full width */}
        <div className="sm:col-span-2">
          <Field label="Sawirka Macalinka" subLabel="Teacher Photo">
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
                  {data.teacherImage ? data.teacherImage.name : "Guji si aad sawir u soo rarido"}
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
        <Field label="Taleefanka" subLabel="Phone Number">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-sm">+252</span>
            <input type="tel" required value={data.phone}
              onChange={e => set("phone", e.target.value)}
              placeholder="61 XXXXXXX"
              className={inputCls + " pl-14"} />
          </div>
        </Field>

        <Field label="Email" subLabel="Your Email">
          <input type="email" required value={data.email}
            onChange={e => set("email", e.target.value)}
            placeholder="macallin@example.com" className={inputCls} />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Degmada aad hadda ku nooshahay" subLabel="Your District">
            <input type="text" required value={data.district}
              onChange={e => set("district", e.target.value)}
              placeholder="Degmadaada / Magaalada" className={inputCls} />
          </Field>
        </div>

        {/* Info card */}
        <div className="sm:col-span-2 bg-[#1E0D79]/5 rounded-2xl p-5 border border-[#1E0D79]/10">
          <p className="text-xs text-[#1E0D79] font-semibold mb-2">📌 Xusuusin / Note</p>
          <p className="text-xs text-gray-600 leading-relaxed">
            Xiriirka aad bixiso ayaa loo isticmaali doonaa xaqiijinta codsigaaga iyo
            wadahadallada mustaqbalka ee Ururka. Fadlan hubi inaad xog sax ah bixinayso.
          </p>
        </div>
      </div>
    ),

    3: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Maadada Macallinka uu dhigo" subLabel="Your Subject">
          <input type="text" required value={data.subject}
            onChange={e => set("subject", e.target.value)}
            placeholder="Xisaab, Ingiriisi, Sayniska..." className={inputCls} />
        </Field>

        <Field label="Heerka Waxbarasho" subLabel="Status of Teaching">
          <select required value={data.teachingStatus}
            onChange={e => set("teachingStatus", e.target.value)} className={selectCls}>
            <option value="">Dooro / Choose</option>
            <option value="Jaamacad">Jaamacad / University</option>
            <option value="Dugsi Sare">Dugsi Sare / Secondary</option>
            <option value="Dugsi Dhexe">Dugsi Dhexe / Middle</option>
            <option value="Dugsi Hoose">Dugsi Hoose / Primary</option>
            <option value="TVET">TVET / Vocational</option>
          </select>
        </Field>

        <Field label="Takhasuska" subLabel="Field of Study">
          <input type="text" required value={data.fieldOfStudy}
            onChange={e => set("fieldOfStudy", e.target.value)}
            placeholder="Takhasuska waxbarashadaada" className={inputCls} />
        </Field>

        <Field label="Heerkee wax ka dhigtaa" subLabel="Teaching Level">
          <select required value={data.teachingLevel}
            onChange={e => set("teachingLevel", e.target.value)} className={selectCls}>
            <option value="">Dooro / Choose</option>
            <option value="Heer 1">Heer 1 – Dugsi Hoose (Grades 1-4)</option>
            <option value="Heer 2">Heer 2 – Dugsi Dhexe (Grades 5-8)</option>
            <option value="Heer 3">Heer 3 – Dugsi Sare (Grades 9-12)</option>
            <option value="Heer Jaamacad">Heer Jaamacad / University</option>
            <option value="TVET">TVET / Vocational</option>
          </select>
        </Field>

        <Field label="Magaca Xarunta" subLabel="Name of Institution">
          <input type="text" required value={data.institutionName}
            onChange={e => set("institutionName", e.target.value)}
            placeholder="Magaca Dugsiga / Jaamacadda" className={inputCls} />
        </Field>

        <Field label="Goobta Xarunta" subLabel="Location of Institution">
          <input type="text" required value={data.institutionLocation}
            onChange={e => set("institutionLocation", e.target.value)}
            placeholder="Degmada / Magaalada" className={inputCls} />
        </Field>
      </div>
    ),

    4: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2 bg-[#F4313F]/5 rounded-2xl p-5 border border-[#F4313F]/10">
          <p className="text-xs text-[#F4313F] font-semibold mb-2">⚠️ Xaaladda Deg-degta / Emergency Contact</p>
          <p className="text-xs text-gray-600 leading-relaxed">
            Qofka aan la xiriiri karin xaaladda degdegta. Fadlan buuxi macluumaadkan si buuxa.
          </p>
        </div>

        <div className="sm:col-span-2">
          <Field label="Magaca Qofka Lagala xiriiri karo" subLabel="Emergency Contact Name">
            <input type="text" required value={data.emergencyName}
              onChange={e => set("emergencyName", e.target.value)}
              placeholder="Magaca qofka xiriirka" className={inputCls} />
          </Field>
        </div>

        <Field label="Teleefanka Xaaladda" subLabel="Emergency Contact Phone">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-sm">+252</span>
            <input type="tel" required value={data.emergencyPhone}
              onChange={e => set("emergencyPhone", e.target.value)}
              placeholder="61 XXXXXXX"
              className={inputCls + " pl-14"} />
          </div>
        </Field>

        <Field label="Email Xaaladda" subLabel="Emergency Contact Email">
          <input type="email" required value={data.emergencyEmail}
            onChange={e => set("emergencyEmail", e.target.value)}
            placeholder="xiriir@example.com" className={inputCls} />
        </Field>

        {/* Membership requirements */}
        <div className="sm:col-span-2 space-y-3">
          <p className="text-sm font-bold text-gray-800">
            Shuruudaha Xubinnimada / Requirements for Membership
          </p>
          {[
            "Inaad tahay macallin ka howlgala xarun waxbarasho rasmi ah.",
            "Inaad buuxisid foomka codsiga xubinnimada si buuxa oo sax ah.",
            "Inaad bixiso lacagta xubinnimada bil walba oo ah $3.",
            "Inaad bixiso lacagta kaarka aqoonsiga (ID Card) oo ah $5 (Sanad waliba).",
            "Inaad diyaar u tahay inaad ka qaybqaadato kulamada, tababarada, iyo hawlaha ururka.",
            "Inaad ilaalin doonto Xeerarka iyo qiyamka ururka.",
          ].map((req, i) => (
            <div key={i} className="flex items-start gap-3 text-xs text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-[#1E0D79] shrink-0 mt-0.5" />
              <span>{req}</span>
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div className="sm:col-span-2 bg-gray-50 rounded-xl p-4 text-xs text-gray-500 leading-relaxed border border-gray-100">
          <span className="font-semibold text-gray-700">Xiriir:</span>{" "}
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
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Codsigaaga Waa La Helay!</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-2">
              Application Received! Waad ku mahadsantahay. Kooxdayadu waxay dib kugu soo xiriiri doontaa
              si ay u xaqiijiyaan xubinnimadaada.
            </p>
            <p className="text-xs text-gray-400 mt-4">
              Xiriir: +252616478844 · info@sonut.org.so
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
            KU SOO BIIR URURKA
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1E0D79] mb-3 font-serif">
            Xogta Hubinta
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Ku Soo Biir Ururka Macallimiinta Qaranka Soomaaliyeed — Foomkan waxaa loogu talagalay
            uruurinta xogta Macallimiinta ee doonaya xubinnimada rasmi ah.
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
                  <p className="text-xs text-gray-400 font-medium">Tallaabo {step} / {TABS.length}</p>
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
                Hore
              </button>

              {step < 4 ? (
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1E0D79] text-white px-7 py-2.5 text-sm font-bold shadow-md shadow-[#1E0D79]/20 hover:bg-[#1E0D79]/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Xiga
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
                      Gudbi Codsiga
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
          Wixi Faahfaahin ah kala xirir{" "}
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
