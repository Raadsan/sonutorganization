export type ExportMember = {
  id: number;
  fullName: string;
  motherName: string;
  gender: string;
  dateOfBirth: string;
  placeOfBirth: string;
  bloodType: string;
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
  emergencyPhone2?: string | null;
  emergencyEmail: string;
  membershipCategory: string | null;
  status: string;
  createdAt: string;
};

const COLUMNS: { key: keyof ReturnType<typeof memberToRow>; label: string }[] = [
  { key: "id", label: "#" },
  { key: "fullName", label: "Full Name" },
  { key: "motherName", label: "Title / Mother Name" },
  { key: "gender", label: "Gender" },
  { key: "dateOfBirth", label: "Date of Birth" },
  { key: "placeOfBirth", label: "Place of Birth" },
  { key: "bloodType", label: "Blood Type" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "district", label: "District" },
  { key: "membershipCategory", label: "Membership Category" },
  { key: "subject", label: "Subject" },
  { key: "teachingStatus", label: "Education Level" },
  { key: "fieldOfStudy", label: "Field of Study" },
  { key: "teachingLevel", label: "Teaching Level" },
  { key: "institutionName", label: "Institution" },
  { key: "institutionLocation", label: "Institution Location" },
  { key: "emergencyName", label: "Emergency Name" },
  { key: "emergencyPhone", label: "Emergency Phone" },
  { key: "emergencyPhone2", label: "Emergency Phone 2" },
  { key: "emergencyEmail", label: "Emergency Email" },
  { key: "status", label: "Status" },
  { key: "createdAt", label: "Registered Date" },
];

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value || "";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function stamp() {
  return new Date().toISOString().slice(0, 10);
}

function safeFileName(name: string) {
  return name.replace(/[^\w\- ]+/g, "").trim().replace(/\s+/g, "-") || "Member";
}

function memberToRow(member: ExportMember) {
  return {
    id: String(member.id),
    fullName: member.fullName || "",
    motherName: member.motherName || "",
    gender: member.gender || "",
    dateOfBirth: member.dateOfBirth || "",
    placeOfBirth: member.placeOfBirth || "",
    bloodType: member.bloodType || "",
    phone: member.phone || "",
    email: member.email || "",
    district: member.district || "",
    membershipCategory: member.membershipCategory || "",
    subject: member.subject || "",
    teachingStatus: member.teachingStatus || "",
    fieldOfStudy: member.fieldOfStudy || "",
    teachingLevel: member.teachingLevel || "",
    institutionName: member.institutionName || "",
    institutionLocation: member.institutionLocation || "",
    emergencyName: member.emergencyName || "",
    emergencyPhone: member.emergencyPhone || "",
    emergencyPhone2: member.emergencyPhone2 || "",
    emergencyEmail: member.emergencyEmail || "",
    status: member.status || "",
    createdAt: formatDate(member.createdAt),
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

/** Excel-compatible spreadsheet (.xls via HTML table — opens in Excel / Sheets) */
export function exportMembersToExcel(
  members: ExportMember[],
  filename = `SONUT-Members-${stamp()}.xls`,
) {
  const rows = members.map(memberToRow);
  const header = COLUMNS.map((c) => `<th>${escapeHtml(c.label)}</th>`).join("");
  const body = rows
    .map(
      (row) =>
        `<tr>${COLUMNS.map((c) => `<td>${escapeHtml(String(row[c.key] ?? ""))}</td>`).join("")}</tr>`,
    )
    .join("");

  const html = `
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:x="urn:schemas-microsoft-com:office:excel"
      xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="UTF-8" /></head>
<body>
<table border="1">
  <thead><tr>${header}</tr></thead>
  <tbody>${body}</tbody>
</table>
</body>
</html>`;

  downloadBlob(
    new Blob(["\uFEFF" + html], { type: "application/vnd.ms-excel;charset=utf-8;" }),
    filename,
  );
}

export function exportMemberToExcel(member: ExportMember) {
  exportMembersToExcel(
    [member],
    `SONUT-Member-${safeFileName(member.fullName)}-${stamp()}.xls`,
  );
}

function openPrintablePdf(title: string, bodyHtml: string, filenameHint: string) {
  // Use a hidden iframe so browsers don't block it as a popup
  const existing = document.getElementById("sonut-pdf-frame");
  if (existing) existing.remove();

  const iframe = document.createElement("iframe");
  iframe.id = "sonut-pdf-frame";
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.cssText =
    "position:fixed;right:0;bottom:0;width:0;height:0;border:0;opacity:0;pointer-events:none;";
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument || iframe.contentWindow?.document;
  if (!doc) {
    iframe.remove();
    throw new Error("Could not prepare PDF preview.");
  }

  doc.open();
  doc.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(title)}</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: Arial, Helvetica, sans-serif; color: #111; margin: 24px; }
    h1 { color: #1E0D79; font-size: 20px; margin: 0 0 4px; }
    .meta { color: #666; font-size: 12px; margin-bottom: 18px; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; }
    th, td { border: 1px solid #ccc; padding: 6px 8px; text-align: left; vertical-align: top; }
    th { background: #1E0D79; color: #fff; }
    tr:nth-child(even) td { background: #f6f6fa; }
    h2 { color: #1E0D79; font-size: 14px; margin: 20px 0 8px; }
    .hint { margin-top: 16px; font-size: 11px; color: #888; }
    @media print {
      .hint { display: none; }
      body { margin: 10mm; }
    }
  </style>
</head>
<body>
  <h1>${escapeHtml(title)}</h1>
  <p class="meta">Exported: ${escapeHtml(new Date().toLocaleString())} · File: ${escapeHtml(filenameHint)}</p>
  ${bodyHtml}
  <p class="hint">Tip: In the print dialog choose <strong>Save as PDF</strong> / <strong>Microsoft Print to PDF</strong>.</p>
</body>
</html>`);
  doc.close();

  const triggerPrint = () => {
    try {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    } finally {
      // Keep iframe briefly so print dialog can finish loading
      window.setTimeout(() => iframe.remove(), 60_000);
    }
  };

  // Wait a tick so content is ready before printing
  if (iframe.contentWindow?.document.readyState === "complete") {
    window.setTimeout(triggerPrint, 300);
  } else {
    iframe.onload = () => window.setTimeout(triggerPrint, 300);
  }
}

export function exportMembersToPdf(members: ExportMember[]) {
  const filenameHint = `SONUT-Members-${stamp()}.pdf`;
  const head = `
    <tr>
      <th>#</th><th>Full Name</th><th>Gender</th><th>Phone</th><th>Email</th>
      <th>Membership</th><th>Subject</th><th>District</th><th>Status</th><th>Registered</th>
    </tr>`;
  const body = members
    .map((m, i) => {
      const row = memberToRow(m);
      return `<tr>
        <td>${i + 1}</td>
        <td>${escapeHtml(row.fullName)}</td>
        <td>${escapeHtml(row.gender)}</td>
        <td>${escapeHtml(row.phone)}</td>
        <td>${escapeHtml(row.email)}</td>
        <td>${escapeHtml(row.membershipCategory)}</td>
        <td>${escapeHtml(row.subject)}</td>
        <td>${escapeHtml(row.district)}</td>
        <td>${escapeHtml(row.status)}</td>
        <td>${escapeHtml(row.createdAt)}</td>
      </tr>`;
    })
    .join("");

  openPrintablePdf(
    "SONUT — Membership Applications",
    `<p class="meta">Total members: ${members.length}</p><table><thead>${head}</thead><tbody>${body}</tbody></table>`,
    filenameHint,
  );
}

export function exportMemberToPdf(member: ExportMember) {
  const row = memberToRow(member);
  const sections: { title: string; fields: [string, string][] }[] = [
    {
      title: "Personal Info",
      fields: [
        ["Full Name", row.fullName],
        ["Title / Mother Name", row.motherName],
        ["Gender", row.gender],
        ["Date of Birth", row.dateOfBirth],
        ["Place of Birth", row.placeOfBirth],
        ["Blood Type", row.bloodType],
      ],
    },
    {
      title: "Contact Info",
      fields: [
        ["Phone", row.phone],
        ["Email", row.email],
        ["District", row.district],
      ],
    },
    {
      title: "Professional & Membership",
      fields: [
        ["Membership Category", row.membershipCategory],
        ["Subject", row.subject],
        ["Education Level", row.teachingStatus],
        ["Field of Study", row.fieldOfStudy],
        ["Teaching Level", row.teachingLevel],
        ["Institution", row.institutionName],
        ["Institution Location", row.institutionLocation],
        ["Status", row.status],
        ["Registered", row.createdAt],
      ],
    },
    {
      title: "Emergency Contact",
      fields: [
        ["Name", row.emergencyName],
        ["Phone 1", row.emergencyPhone],
        ["Phone 2", row.emergencyPhone2],
        ["Email", row.emergencyEmail],
      ],
    },
  ];

  const html = sections
    .map(
      (section) => `
      <h2>${escapeHtml(section.title)}</h2>
      <table>
        <thead><tr><th>Field</th><th>Value</th></tr></thead>
        <tbody>
          ${section.fields
            .map(
              ([label, value]) =>
                `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`,
            )
            .join("")}
        </tbody>
      </table>`,
    )
    .join("");

  openPrintablePdf(
    `SONUT — Member Profile: ${member.fullName}`,
    html,
    `SONUT-Member-${safeFileName(member.fullName)}-${stamp()}.pdf`,
  );
}
