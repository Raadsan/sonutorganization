"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import {
  Loader2, Search, Trash2, CheckCircle, XCircle, Clock,
  X, User, Phone, Mail, MapPin, Droplets, Calendar,
  BookOpen, Building2, AlertCircle, GraduationCap, ChevronRight,
} from "lucide-react";

// ─── Full Member type ─────────────────────────────────────────────────────────
type Member = {
  id: number;
  fullName: string;
  motherName: string;
  gender: string;
  dateOfBirth: string;
  placeOfBirth: string;
  bloodType: string;
  teacherImageUrl: string | null;
  phone: string;
  email: string;
  district: string;
  subject: string;
  teachingStatus: string;
  fieldOfStudy: string;
  teachingLevel: string;
  institutionName: string;
  institutionLocation: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyEmail: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  adminNote: string | null;
  createdAt: string;
};

// ─── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: Member["status"] }) {
  const cfg = {
    APPROVED: { cls: "bg-green-500/10 text-green-400 border-green-500/20", icon: <CheckCircle className="w-3.5 h-3.5" /> },
    REJECTED: { cls: "bg-red-500/10 text-red-400 border-red-500/20",   icon: <XCircle   className="w-3.5 h-3.5" /> },
    PENDING:  { cls: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20", icon: <Clock className="w-3.5 h-3.5" /> },
  }[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.cls}`}>
      {cfg.icon} {status}
    </span>
  );
}

// ─── Info row ─────────────────────────────────────────────────────────────────
function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 w-7 h-7 rounded-lg bg-gray-800 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-gray-400" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm text-gray-200 font-medium break-words">{value}</p>
      </div>
    </div>
  );
}

// ─── Detail panel ─────────────────────────────────────────────────────────────
function MemberPanel({
  member, onClose, onStatusChange, onDelete,
}: {
  member: Member;
  onClose: () => void;
  onStatusChange: (id: number, status: string) => void;
  onDelete: (id: number) => void;
}) {
  const initials = member.fullName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-gray-900 border-l border-gray-800 flex flex-col shadow-2xl overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 z-10 bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {member.teacherImageUrl ? (
              <Image
                src={member.teacherImageUrl}
                alt={member.fullName}
                width={40}
                height={40}
                unoptimized
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1E0D79] to-[#D92936] flex items-center justify-center text-white font-bold text-sm">
                {initials}
              </div>
            )}
            <div>
              <h3 className="text-white font-bold text-lg leading-tight">{member.fullName}</h3>
              <p className="text-gray-400 text-xs">{member.institutionName}</p>
            </div>
          </div>
          <button onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status bar */}
        <div className="px-6 py-3 flex items-center gap-3 bg-gray-950/50 border-b border-gray-800">
          <StatusBadge status={member.status} />
          <span className="text-gray-500 text-xs ml-auto">
            Registered: {new Date(member.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
          </span>
        </div>

        {/* Body */}
        <div className="flex-1 px-6 py-6 space-y-8">

          {/* Personal */}
          <section>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <User className="w-3.5 h-3.5" /> Xogta Shakhsiga / Personal Info
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow icon={User}     label="Magaca / Full Name"           value={member.fullName} />
              <InfoRow icon={User}     label="Magaca Hooyo / Mother Name"   value={member.motherName} />
              <InfoRow icon={User}     label="Jinsiga / Gender"             value={member.gender} />
              <InfoRow icon={Droplets} label="Nooca Dhiigaaga / Blood Type" value={member.bloodType} />
              <InfoRow icon={Calendar} label="Taariikhda Dhalashada / DOB"  value={member.dateOfBirth} />
              <InfoRow icon={MapPin}   label="Goobta Dhalashada / Birthplace" value={member.placeOfBirth} />
            </div>
          </section>

          <div className="border-t border-gray-800" />

          {/* Contact */}
          <section>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" /> Xiriirka / Contact Info
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow icon={Phone}  label="Taleefanka / Phone"   value={member.phone} />
              <InfoRow icon={Mail}   label="Email"                value={member.email} />
              <InfoRow icon={MapPin} label="Degmada / District"   value={member.district} />
            </div>
          </section>

          <div className="border-t border-gray-800" />

          {/* Professional */}
          <section>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" /> Xirfadda / Professional Info
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow icon={BookOpen}      label="Maadada / Subject"             value={member.subject} />
              <InfoRow icon={GraduationCap} label="Heerka Waxbarasho / Level"     value={member.teachingLevel} />
              <InfoRow icon={BookOpen}      label="Takhasuska / Field of Study"   value={member.fieldOfStudy} />
              <InfoRow icon={GraduationCap} label="Status of Teaching"            value={member.teachingStatus} />
              <InfoRow icon={Building2}     label="Magaca Xarunta / Institution"  value={member.institutionName} />
              <InfoRow icon={MapPin}        label="Goobta Xarunta / Location"     value={member.institutionLocation} />
            </div>
          </section>

          <div className="border-t border-gray-800" />

          {/* Emergency */}
          <section>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5" /> Xaaladda Deg-degta / Emergency
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow icon={User}  label="Magaca / Name"   value={member.emergencyName} />
              <InfoRow icon={Phone} label="Taleefan / Phone" value={member.emergencyPhone} />
              <InfoRow icon={Mail}  label="Email"            value={member.emergencyEmail} />
            </div>
          </section>
        </div>

        {/* Footer actions */}
        <div className="sticky bottom-0 bg-gray-900 border-t border-gray-800 px-6 py-4 flex flex-wrap items-center gap-3">
          {member.status !== "APPROVED" && (
            <button
              onClick={() => onStatusChange(member.id, "APPROVED")}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-colors"
            >
              <CheckCircle className="w-4 h-4" /> Approve
            </button>
          )}
          {member.status !== "REJECTED" && (
            <button
              onClick={() => onStatusChange(member.id, "REJECTED")}
              className="flex-1 flex items-center justify-center gap-2 bg-red-700 hover:bg-red-600 text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-colors"
            >
              <XCircle className="w-4 h-4" /> Reject
            </button>
          )}
          {member.status !== "PENDING" && (
            <button
              onClick={() => onStatusChange(member.id, "PENDING")}
              className="flex items-center justify-center gap-2 bg-yellow-700/40 hover:bg-yellow-600/40 text-yellow-300 text-sm font-semibold py-2.5 px-4 rounded-xl transition-colors"
            >
              <Clock className="w-4 h-4" /> Set Pending
            </button>
          )}
          <button
            onClick={() => { onDelete(member.id); onClose(); }}
            className="p-2.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
            title="Delete application"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function MembersAdminPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"ALL" | "PENDING" | "APPROVED" | "REJECTED">("ALL");
  const [selected, setSelected] = useState<Member | null>(null);

  useEffect(() => {
    let isCurrent = true;

    axios
      .get<{ success: boolean; members: Member[] }>("/api/members")
      .then(({ data }) => {
        if (isCurrent && data.success) {
          setMembers(data.members);
        }
      })
      .catch(() => {
        if (isCurrent) {
          toast.error("Failed to load members");
        }
      })
      .finally(() => {
        if (isCurrent) {
          setLoading(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  const handleStatusChange = async (id: number, status: string) => {
    try {
      const res = await axios.patch(`/api/members/${id}`, { status });
      if (res.data.success) {
        toast.success(`Status updated to ${status}`);
        // update locally too
        setMembers(prev => prev.map(m => m.id === id ? { ...m, status: status as Member["status"] } : m));
        setSelected(prev => prev?.id === id ? { ...prev, status: status as Member["status"] } : prev);
      }
    } catch { toast.error("Failed to update status"); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this application permanently?")) return;
    try {
      const res = await axios.delete(`/api/members/${id}`);
      if (res.data.success) {
        toast.success("Application deleted");
        setMembers(prev => prev.filter(m => m.id !== id));
        setSelected(null);
      }
    } catch { toast.error("Failed to delete"); }
  };

  const counts = {
    ALL: members.length,
    PENDING: members.filter(m => m.status === "PENDING").length,
    APPROVED: members.filter(m => m.status === "APPROVED").length,
    REJECTED: members.filter(m => m.status === "REJECTED").length,
  };

  const filtered = members.filter(m => {
    const matchesSearch =
      m.fullName.toLowerCase().includes(search.toLowerCase()) ||
      m.phone.includes(search) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.district.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "ALL" || m.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <Toaster position="top-right" richColors />

      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-white">Membership Applications</h2>
          <p className="text-gray-400 mt-1">Review, approve, or reject member registrations</p>
        </div>

        {/* Status filter tabs */}
        <div className="flex flex-wrap gap-2">
          {(["ALL", "PENDING", "APPROVED", "REJECTED"] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                filterStatus === s
                  ? s === "APPROVED" ? "bg-green-500 border-green-500 text-white"
                  : s === "REJECTED" ? "bg-red-500 border-red-500 text-white"
                  : s === "PENDING"  ? "bg-yellow-500 border-yellow-500 text-black"
                  : "bg-white border-white text-gray-900"
                  : "bg-transparent border-gray-700 text-gray-400 hover:border-gray-500"
              }`}
            >
              {s} ({counts[s]})
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, email, phone, or district…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-950/60">
                  <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">#</th>
                  <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Member</th>
                  <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Contact</th>
                  <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Subject</th>
                  <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">District</th>
                  <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="p-10 text-center">
                      <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto" />
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-10 text-center text-gray-500">
                      No applications found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((m, i) => {
                    const initials = m.fullName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
                    return (
                      <tr
                        key={m.id}
                        className="hover:bg-gray-800/40 transition-colors cursor-pointer"
                        onClick={() => setSelected(m)}
                      >
                        <td className="p-4 text-gray-500 text-sm">{i + 1}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {m.teacherImageUrl ? (
                              <Image
                                src={m.teacherImageUrl}
                                alt={m.fullName}
                                width={36}
                                height={36}
                                unoptimized
                                className="h-9 w-9 shrink-0 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1E0D79] to-[#D92936] flex items-center justify-center text-white text-xs font-bold shrink-0">
                                {initials}
                              </div>
                            )}
                            <div>
                              <p className="text-white text-sm font-semibold">{m.fullName}</p>
                              <p className="text-gray-500 text-xs">{m.gender}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="text-gray-300 text-sm">{m.phone}</p>
                          <p className="text-gray-500 text-xs truncate max-w-[160px]">{m.email}</p>
                        </td>
                        <td className="p-4 text-gray-300 text-sm">{m.subject}</td>
                        <td className="p-4 text-gray-400 text-sm">{m.district}</td>
                        <td className="p-4"><StatusBadge status={m.status} /></td>
                        <td className="p-4 text-gray-500 text-xs whitespace-nowrap">
                          {new Date(m.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={e => { e.stopPropagation(); setSelected(m); }}
                            className="p-2 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                            title="View full details"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {!loading && filtered.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-800 text-xs text-gray-500">
              Showing {filtered.length} of {members.length} applications
            </div>
          )}
        </div>
      </div>

      {/* Detail panel */}
      {selected && (
        <MemberPanel
          member={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}
