import Link from "next/link";
import {
  BadgeCheck,
  Users,
  Handshake,
  BookOpen,
  TrendingUp,
  UserCheck,
  CalendarDays,
} from "lucide-react";
import { prisma } from "@/lib/db";
import DashboardCharts from "@/components/admin/DashboardCharts";

function shortCategory(value: string | null) {
  if (!value) return "Unknown";
  const base = value.split("+")[0].trim();
  if (base.toLowerCase().includes("full member")) return "Full Member";
  if (base.toLowerCase().includes("supporting")) return "Supporting";
  if (base.toLowerCase().includes("honourable") || base.toLowerCase().includes("honorable"))
    return "Honourable";
  if (base.toLowerCase().includes("retired")) return "Retired";
  if (base.toLowerCase().includes("xubin buuxda")) return "Full Member";
  if (base.toLowerCase().includes("taageere")) return "Supporting";
  if (base.toLowerCase().includes("sharafeed")) return "Honourable";
  if (base.toLowerCase().includes("hawlgab")) return "Retired";
  return base.length > 18 ? `${base.slice(0, 18)}…` : base;
}

export default async function DashboardPage() {
  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  const [
    leaderCount,
    partnerCount,
    affiliateCount,
    blogCount,
    publishedCount,
    memberCount,
    eventCount,
    pendingMembers,
    approvedMembers,
    rejectedMembers,
    recentMembers,
    allMembersForCategory,
  ] = await Promise.all([
    prisma.leader.count(),
    prisma.partner.count(),
    prisma.affiliate.count(),
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { isPublished: true } }),
    prisma.member.count(),
    prisma.event.count(),
    prisma.member.count({ where: { status: "PENDING" } }),
    prisma.member.count({ where: { status: "APPROVED" } }),
    prisma.member.count({ where: { status: "REJECTED" } }),
    prisma.member.findMany({
      where: { createdAt: { gte: sixMonthsAgo } },
      select: { createdAt: true },
      orderBy: { createdAt: "asc" },
    }),
    prisma.member.findMany({
      select: { membershipCategory: true },
    }),
  ]);

  // Build last 6 months trend
  const monthKeys: { key: string; label: string }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    monthKeys.push({
      key: `${d.getFullYear()}-${d.getMonth()}`,
      label: d.toLocaleString("en-US", { month: "short" }),
    });
  }

  const trendMap = new Map(monthKeys.map((m) => [m.key, 0]));
  recentMembers.forEach((member) => {
    const d = new Date(member.createdAt);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    if (trendMap.has(key)) {
      trendMap.set(key, (trendMap.get(key) || 0) + 1);
    }
  });

  const memberTrend = monthKeys.map((m) => ({
    month: m.label,
    members: trendMap.get(m.key) || 0,
  }));

  const memberStatus = [
    { name: "Pending", value: pendingMembers, color: "#EAB308" },
    { name: "Approved", value: approvedMembers, color: "#22C55E" },
    { name: "Rejected", value: rejectedMembers, color: "#D92936" },
  ];

  const contentOverview = [
    { name: "Leaders", value: leaderCount, fill: "#1E0D79" },
    { name: "Partners", value: partnerCount, fill: "#D92936" },
    { name: "Affiliates", value: affiliateCount, fill: "#4338CA" },
    { name: "Blog", value: blogCount, fill: "#0EA5E9" },
    { name: "Events", value: eventCount, fill: "#F59E0B" },
    { name: "Members", value: memberCount, fill: "#10B981" },
  ];

  const categoryCounts = new Map<string, number>();
  allMembersForCategory.forEach((member) => {
    const label = shortCategory(member.membershipCategory);
    categoryCounts.set(label, (categoryCounts.get(label) || 0) + 1);
  });

  const membershipCategories = Array.from(categoryCounts.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  const stats = [
    {
      label: "Leadership",
      value: leaderCount,
      icon: Users,
      href: "/admin/dashboard/leadership",
      iconBg: "bg-[#1E0D79]",
      accent: "bg-[#1E0D79]",
      border: "border-[#1E0D79]/15",
    },
    {
      label: "Partners",
      value: partnerCount,
      icon: Handshake,
      href: "/admin/dashboard/partners",
      iconBg: "bg-[#D92936]",
      accent: "bg-[#D92936]",
      border: "border-[#D92936]/15",
    },
    {
      label: "Affiliates",
      value: affiliateCount,
      icon: BadgeCheck,
      href: "/admin/dashboard/affiliates",
      iconBg: "bg-[#1E0D79]",
      accent: "bg-[#1E0D79]",
      border: "border-[#1E0D79]/15",
    },
    {
      label: "Blog Posts",
      value: blogCount,
      icon: BookOpen,
      href: "/admin/dashboard/blog",
      iconBg: "bg-[#D92936]",
      accent: "bg-[#D92936]",
      border: "border-[#D92936]/15",
    },
    {
      label: "Published",
      value: publishedCount,
      icon: TrendingUp,
      href: "/admin/dashboard/blog",
      iconBg: "bg-[#1E0D79]",
      accent: "bg-[#1E0D79]",
      border: "border-[#1E0D79]/15",
    },
    {
      label: "Members",
      value: memberCount,
      icon: UserCheck,
      href: "/admin/dashboard/members",
      iconBg: "bg-[#D92936]",
      accent: "bg-[#D92936]",
      border: "border-[#D92936]/15",
    },
    {
      label: "Events",
      value: eventCount,
      icon: CalendarDays,
      href: "/admin/dashboard/events",
      iconBg: "bg-[#1E0D79]",
      accent: "bg-[#1E0D79]",
      border: "border-[#1E0D79]/15",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-extrabold text-[#1E0D79]">Overview</h2>
        <p className="mt-1 text-slate-500">Manage your site content from here</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className={`group relative overflow-hidden rounded-2xl border bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${stat.border}`}
            >
              <div className={`absolute inset-x-0 top-0 h-1 ${stat.accent}`} />
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                  <p className="mt-1 text-3xl font-extrabold text-slate-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`admin-on-brand flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-md ${stat.iconBg}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Charts */}
      <DashboardCharts
        memberTrend={memberTrend}
        memberStatus={memberStatus}
        contentOverview={contentOverview}
        membershipCategories={membershipCategories}
      />

      {/* Quick links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            href: "/admin/dashboard/leadership",
            label: "Manage Leadership",
            desc: "Add or edit team members",
            icon: Users,
          },
          {
            href: "/admin/dashboard/partners",
            label: "Manage Partners",
            desc: "Add or edit partners",
            icon: Handshake,
          },
          {
            href: "/admin/dashboard/affiliates",
            label: "Manage Affiliates",
            desc: "Add or edit affiliate logos",
            icon: BadgeCheck,
          },
          {
            href: "/admin/dashboard/members",
            label: "Manage Members",
            desc: "Review member applications",
            icon: UserCheck,
          },
          {
            href: "/admin/dashboard/blog",
            label: "Manage Blog",
            desc: "Create and publish posts",
            icon: BookOpen,
          },
          {
            href: "/admin/dashboard/events",
            label: "Manage Events",
            desc: "Add or edit events",
            icon: CalendarDays,
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center gap-4 rounded-2xl border border-[#E6E8F0] bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1E0D79]/30 hover:shadow-md"
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#1E0D79]/8 transition-colors group-hover:bg-[#1E0D79]">
                <Icon className="h-5 w-5 text-[#1E0D79] transition-colors group-hover:text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{item.label}</p>
                <p className="mt-0.5 text-xs text-slate-500">{item.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
