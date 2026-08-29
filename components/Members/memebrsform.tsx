"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  User, Phone, Send, ChevronRight, ChevronLeft,
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

type FormField = keyof FormData;
type FormErrors = Partial<Record<FormField, string>>;

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

const STEP_FIELDS: Record<number, FormField[]> = {
  1: ["fullName", "motherName", "gender", "bloodType", "dateOfBirth", "placeOfBirth", "teacherImage"],
  2: ["phone", "email", "district"],
  3: ["subject", "teachingStatus", "fieldOfStudy", "teachingLevel", "institutionName", "institutionLocation"],
  4: ["emergencyName", "emergencyPhone", "emergencyEmail"],
};

const TODAY = new Date().toISOString().slice(0, 10);
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const VALID_IMAGE_TYPES = ["image/jpeg", "image/png"];
const NAME_PATTERN = /^[\p{L}\p{M}]+(?:[ '\u2019-][\p{L}\p{M}]+)*$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

function sanitizeName(value: string) {
  return value
    .replace(/[^\p{L}\p{M} '\u2019-]/gu, "")
    .replace(/\s{2,}/g, " ")
    .replace(/^[ '\u2019-]+/, "")
    .slice(0, 100);
}

function sanitizeText(value: string, allowNumbers = false) {
  const sanitized = allowNumbers
    ? value.replace(/[^\p{L}\p{M}\d .,'\u2019()&/+\-]/gu, "")
    : value.replace(/[^\p{L}\p{M} .,'\u2019()&/+\-]/gu, "");

  return sanitized
    .replace(/\s{2,}/g, " ")
    .replace(/^[\s.,'\u2019()&/+\-]+/, "")
    .slice(0, 120);
}

function sanitizeEmail(value: string) {
  const cleaned = value
    .replace(/\s/g, "")
    .replace(/[^a-zA-Z0-9@._+\-]/g, "")
    .slice(0, 254);
  const [localPart, ...domainParts] = cleaned.split("@");

  return domainParts.length > 0
    ? `${localPart}@${domainParts.join("")}`
    : localPart;
}

function validateField(field: FormField, value: string | File | null): string {
  if (field === "teacherImage") {
    if (!(value instanceof File)) return "Please upload a teacher photo.";
    if (!VALID_IMAGE_TYPES.includes(value.type)) return "Only JPG and PNG images are allowed.";
    if (value.size > MAX_IMAGE_SIZE) return "The photo must be 10 MB or smaller.";
    return "";
  }

  const text = typeof value === "string" ? value.trim() : "";
  if (!text) return "This field is required.";

  switch (field) {
    case "fullName":
    case "motherName":
    case "emergencyName":
      if (text.length < 3 || !NAME_PATTERN.test(text)) {
        return "Use letters only and enter a valid full name.";
      }
      return "";
    case "phone":
    case "emergencyPhone":
      return /^\d{9}$/.test(text) ? "" : "Enter exactly 9 digits after +252.";
    case "email":
    case "emergencyEmail":
      return EMAIL_PATTERN.test(text) ? "" : "Enter a valid email, for example name@example.com.";
    case "dateOfBirth":
      if (Number.isNaN(Date.parse(text))) return "Enter a valid date of birth.";
      return text <= TODAY ? "" : "Date of birth cannot be in the future.";
    case "gender":
      return ["Male", "Female"].includes(text) ? "" : "Choose a valid gender.";
    case "bloodType":
      return ["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"].includes(text)
        ? ""
        : "Choose a valid blood type.";
    case "teachingStatus":
      return ["University", "Secondary", "Middle", "Primary", "TVET"].includes(text)
        ? ""
        : "Choose a valid education level.";
    case "teachingLevel":
      return ["Level 1", "Level 2", "Level 3", "University Level", "TVET"].includes(text)
        ? ""
        : "Choose a valid class level.";
    default:
      return text.length >= 2 ? "" : "Enter at least 2 characters.";
  }
}

function Field({
  label, htmlFor, error, subLabel, required = true, children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  subLabel?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-gray-800">
        {label}
        {subLabel && <span className="ml-1 text-xs font-normal text-gray-400">/ {subLabel}</span>}
        {required && <span className="ml-1 text-[#F4313F]">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="flex items-center gap-1 text-xs text-[#F4313F]">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

const inputCls =
  "block w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/60 focus:bg-white focus:ring-2 focus:ring-[#1E0D79]/20 focus:border-[#1E0D79] outline-none transition-all text-sm placeholder:text-gray-400";
const selectCls = inputCls + " appearance-none cursor-pointer";
const invalidInputCls = " border-[#F4313F] bg-red-50/40 focus:border-[#F4313F] focus:ring-[#F4313F]/15";

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MembersForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (field: Exclude<FormField, "teacherImage">, value: string) => {
    setData((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;

      const next = { ...current };
      const error = validateField(field, value);
      if (error) next[field] = error;
      else delete next[field];
      return next;
    });
  };

  const fieldProps = (field: FormField) => ({
    id: field,
    name: field,
    "aria-invalid": Boolean(errors[field]),
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
    onBlur: () => {
      const value = data[field];
      const normalizedValue = typeof value === "string" ? value.trim() : value;

      if (typeof normalizedValue === "string" && normalizedValue !== value) {
        setData((current) => ({ ...current, [field]: normalizedValue }));
      }

      const error = validateField(field, normalizedValue);
      setErrors((current) => {
        const next = { ...current };
        if (error) next[field] = error;
        else delete next[field];
        return next;
      });
    },
  });

  const inputClass = (field: FormField, isSelect = false, extra = "") =>
    `${isSelect ? selectCls : inputCls}${errors[field] ? invalidInputCls : ""}${extra}`;

  const validateFields = (fields: FormField[]) => {
    let firstInvalid: FormField | null = null;
    const checkedErrors: FormErrors = {};

    fields.forEach((field) => {
      const error = validateField(field, data[field]);
      if (error) {
        checkedErrors[field] = error;
        firstInvalid ??= field;
      }
    });

    setErrors((current) => {
      const next = { ...current };
      fields.forEach((field) => delete next[field]);
      return { ...next, ...checkedErrors };
    });

    return firstInvalid;
  };

  const focusField = (field: FormField) => {
    window.setTimeout(() => document.getElementById(field)?.focus(), 300);
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateField("teacherImage", file);
    if (error) {
      setData((current) => ({ ...current, teacherImage: null }));
      setErrors((current) => ({ ...current, teacherImage: error }));
      setPreview(null);
      e.target.value = "";
      return;
    }

    if (preview) URL.revokeObjectURL(preview);
    setData((d) => ({ ...d, teacherImage: file }));
    setErrors((current) => {
      const next = { ...current };
      delete next.teacherImage;
      return next;
    });
    setPreview(URL.createObjectURL(file));
  };

  const next = () => {
    const firstInvalid = validateFields(STEP_FIELDS[step]);
    if (firstInvalid) {
      focusField(firstInvalid);
      toast.error("Please correct the highlighted fields before continuing.");
      return;
    }

    setStep((s) => Math.min(s + 1, 4));
  };
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allFields = Object.values(STEP_FIELDS).flat();
    const firstInvalid = validateFields(allFields);
    if (firstInvalid) {
      const invalidStep = Number(
        Object.entries(STEP_FIELDS).find(([, fields]) => fields.includes(firstInvalid))?.[0] ?? 1,
      );
      setStep(invalidStep);
      focusField(firstInvalid);
      toast.error("Please correct the highlighted fields before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Append all string fields
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "teacherImage") {
          formData.append(key, (value as string).trim());
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
      if (res.ok && result.success) {
        setSubmitted(true);
        toast.success("Application submitted successfully!");
      } else {
        toast.error(result.error || "Failed to submit application");
      }
    } catch {
      toast.error("An error occurred during submission");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Tab content ─────────────────────────────────────────────────────────────
  const tabContent: Record<number, React.ReactNode> = {
    1: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Full Name" htmlFor="fullName" error={errors.fullName}>
          <input {...fieldProps("fullName")} type="text" required value={data.fullName}
            onChange={e => set("fullName", sanitizeName(e.target.value))}
            autoComplete="name" maxLength={100}
            placeholder="Enter your full name" className={inputClass("fullName")} />
        </Field>

        <Field label="Mother's Name" htmlFor="motherName" error={errors.motherName}>
          <input {...fieldProps("motherName")} type="text" required value={data.motherName}
            onChange={e => set("motherName", sanitizeName(e.target.value))}
            maxLength={100}
            placeholder="Enter mother's full name" className={inputClass("motherName")} />
        </Field>

        <Field label="Gender" htmlFor="gender" error={errors.gender}>
          <select {...fieldProps("gender")} required value={data.gender}
            onChange={e => set("gender", e.target.value)} className={inputClass("gender", true)}>
            <option value="">Choose Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </Field>

        <Field label="Blood Type" htmlFor="bloodType" error={errors.bloodType}>
          <select {...fieldProps("bloodType")} required value={data.bloodType}
            onChange={e => set("bloodType", e.target.value)} className={inputClass("bloodType", true)}>
            <option value="">Choose Blood Type</option>
            {["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Field>

        <Field label="Date of Birth" htmlFor="dateOfBirth" error={errors.dateOfBirth}>
          <input {...fieldProps("dateOfBirth")} type="date" required value={data.dateOfBirth}
            max={TODAY}
            onChange={e => set("dateOfBirth", e.target.value)} className={inputClass("dateOfBirth")} />
        </Field>

        <Field label="Place of Birth" htmlFor="placeOfBirth" error={errors.placeOfBirth}>
          <input {...fieldProps("placeOfBirth")} type="text" required value={data.placeOfBirth}
            onChange={e => set("placeOfBirth", sanitizeText(e.target.value))}
            maxLength={120}
            placeholder="City / District" className={inputClass("placeOfBirth")} />
        </Field>

        {/* Image upload – full width */}
        <div className="sm:col-span-2">
          <Field label="Teacher Photo" htmlFor="teacherImage" error={errors.teacherImage}>
            <div
              onClick={() => fileRef.current?.click()}
              className={`relative flex items-center gap-4 border-2 border-dashed rounded-2xl p-5 cursor-pointer hover:border-[#1E0D79]/40 hover:bg-[#1E0D79]/5 transition-all ${errors.teacherImage ? "border-[#F4313F] bg-red-50/40" : "border-gray-200"}`}
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
              <input {...fieldProps("teacherImage")} ref={fileRef} type="file"
                accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                className="hidden" onChange={handleImage} />
            </div>
          </Field>
        </div>
      </div>
    ),

    2: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Phone Number" htmlFor="phone" error={errors.phone}>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-sm">+252</span>
            <input {...fieldProps("phone")} type="tel" required value={data.phone}
              onChange={e => set("phone", e.target.value.replace(/\D/g, "").slice(0, 9))}
              inputMode="numeric" autoComplete="tel-national" maxLength={9}
              placeholder="61 XXXXXXX"
              className={inputClass("phone", false, " pl-14")} />
          </div>
        </Field>

        <Field label="Email Address" htmlFor="email" error={errors.email}>
          <input {...fieldProps("email")} type="email" required value={data.email}
            onChange={e => set("email", sanitizeEmail(e.target.value))}
            inputMode="email" autoComplete="email" maxLength={254}
            placeholder="teacher@example.com" className={inputClass("email")} />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Current District of Residence" htmlFor="district" error={errors.district}>
            <input {...fieldProps("district")} type="text" required value={data.district}
              onChange={e => set("district", sanitizeText(e.target.value))}
              autoComplete="address-level2" maxLength={120}
              placeholder="Your current district / city" className={inputClass("district")} />
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
        <Field label="Teaching Subject" htmlFor="subject" error={errors.subject}>
          <input {...fieldProps("subject")} type="text" required value={data.subject}
            onChange={e => set("subject", sanitizeText(e.target.value))}
            maxLength={120}
            placeholder="Mathematics, English, Science..." className={inputClass("subject")} />
        </Field>

        <Field label="Education Level" htmlFor="teachingStatus" error={errors.teachingStatus}>
          <select {...fieldProps("teachingStatus")} required value={data.teachingStatus}
            onChange={e => set("teachingStatus", e.target.value)} className={inputClass("teachingStatus", true)}>
            <option value="">Choose Level</option>
            <option value="University">University</option>
            <option value="Secondary">Secondary School</option>
            <option value="Middle">Middle School</option>
            <option value="Primary">Primary School</option>
            <option value="TVET">TVET / Vocational</option>
          </select>
        </Field>

        <Field label="Field of Study / Specialization" htmlFor="fieldOfStudy" error={errors.fieldOfStudy}>
          <input {...fieldProps("fieldOfStudy")} type="text" required value={data.fieldOfStudy}
            onChange={e => set("fieldOfStudy", sanitizeText(e.target.value))}
            maxLength={120}
            placeholder="e.g., Bachelor of Education" className={inputClass("fieldOfStudy")} />
        </Field>

        <Field label="Class Levels Taught" htmlFor="teachingLevel" error={errors.teachingLevel}>
          <select {...fieldProps("teachingLevel")} required value={data.teachingLevel}
            onChange={e => set("teachingLevel", e.target.value)} className={inputClass("teachingLevel", true)}>
            <option value="">Choose Level</option>
            <option value="Level 1">Level 1 – Primary School (Grades 1-4)</option>
            <option value="Level 2">Level 2 – Middle School (Grades 5-8)</option>
            <option value="Level 3">Level 3 – Secondary School (Grades 9-12)</option>
            <option value="University Level">University Level</option>
            <option value="TVET">TVET / Vocational</option>
          </select>
        </Field>

        <Field label="Institution Name" htmlFor="institutionName" error={errors.institutionName}>
          <input {...fieldProps("institutionName")} type="text" required value={data.institutionName}
            onChange={e => set("institutionName", sanitizeText(e.target.value, true))}
            autoComplete="organization" maxLength={120}
            placeholder="School / University Name" className={inputClass("institutionName")} />
        </Field>

        <Field label="Institution Location" htmlFor="institutionLocation" error={errors.institutionLocation}>
          <input {...fieldProps("institutionLocation")} type="text" required value={data.institutionLocation}
            onChange={e => set("institutionLocation", sanitizeText(e.target.value))}
            maxLength={120}
            placeholder="District / City" className={inputClass("institutionLocation")} />
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
          <Field label="Emergency Contact Name" htmlFor="emergencyName" error={errors.emergencyName}>
            <input {...fieldProps("emergencyName")} type="text" required value={data.emergencyName}
              onChange={e => set("emergencyName", sanitizeName(e.target.value))}
              autoComplete="name" maxLength={100}
              placeholder="Full name of emergency contact" className={inputClass("emergencyName")} />
          </Field>
        </div>

        <Field label="Emergency Contact Phone" htmlFor="emergencyPhone" error={errors.emergencyPhone}>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-sm">+252</span>
            <input {...fieldProps("emergencyPhone")} type="tel" required value={data.emergencyPhone}
              onChange={e => set("emergencyPhone", e.target.value.replace(/\D/g, "").slice(0, 9))}
              inputMode="numeric" autoComplete="tel-national" maxLength={9}
              placeholder="61 XXXXXXX"
              className={inputClass("emergencyPhone", false, " pl-14")} />
          </div>
        </Field>

        <Field label="Emergency Contact Email" htmlFor="emergencyEmail" error={errors.emergencyEmail}>
          <input {...fieldProps("emergencyEmail")} type="email" required value={data.emergencyEmail}
            onChange={e => set("emergencyEmail", sanitizeEmail(e.target.value))}
            inputMode="email" autoComplete="email" maxLength={254}
            placeholder="contact@example.com" className={inputClass("emergencyEmail")} />
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
            <form onSubmit={handleSubmit} noValidate>
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


        </div>
      </section>
    </>
  );
}
