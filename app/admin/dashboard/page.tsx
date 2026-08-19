import Link from 'next/link';
import { BadgeCheck, Users, Handshake, BookOpen, TrendingUp, UserCheck } from 'lucide-react';
import { prisma } from '@/lib/db';

export default async function DashboardPage() {
  const [leaderCount, partnerCount, affiliateCount, blogCount, publishedCount, memberCount] = await Promise.all([
    prisma.leader.count(),
    prisma.partner.count(),
    prisma.affiliate.count(),
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { isPublished: true } }),
    prisma.member.count(),
  ]);

  const stats = [
    {
      label: 'Leadership',
      value: leaderCount,
      icon: Users,
      href: '/admin/dashboard/leadership',
      iconBg: 'bg-[#1E0D79]',
      accent: 'bg-[#1E0D79]',
      border: 'border-[#1E0D79]/15',
    },
    {
      label: 'Partners',
      value: partnerCount,
      icon: Handshake,
      href: '/admin/dashboard/partners',
      iconBg: 'bg-[#D92936]',
      accent: 'bg-[#D92936]',
      border: 'border-[#D92936]/15',
    },
    {
      label: 'Affiliates',
      value: affiliateCount,
      icon: BadgeCheck,
      href: '/admin/dashboard/affiliates',
      iconBg: 'bg-[#1E0D79]',
      accent: 'bg-[#1E0D79]',
      border: 'border-[#1E0D79]/15',
    },
    {
      label: 'Blog Posts',
      value: blogCount,
      icon: BookOpen,
      href: '/admin/dashboard/blog',
      iconBg: 'bg-[#D92936]',
      accent: 'bg-[#D92936]',
      border: 'border-[#D92936]/15',
    },
    {
      label: 'Published',
      value: publishedCount,
      icon: TrendingUp,
      href: '/admin/dashboard/blog',
      iconBg: 'bg-[#1E0D79]',
      accent: 'bg-[#1E0D79]',
      border: 'border-[#1E0D79]/15',
    },
    {
      label: 'Members',
      value: memberCount,
      icon: UserCheck,
      href: '/admin/dashboard/members',
      iconBg: 'bg-[#D92936]',
      accent: 'bg-[#D92936]',
      border: 'border-[#D92936]/15',
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
                  <p className="mt-1 text-3xl font-extrabold text-slate-900">{stat.value}</p>
                </div>
                <div className={`admin-on-brand flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-md ${stat.iconBg}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { href: '/admin/dashboard/leadership', label: 'Manage Leadership', desc: 'Add or edit team members', icon: Users },
          { href: '/admin/dashboard/partners', label: 'Manage Partners', desc: 'Add or edit partners', icon: Handshake },
          { href: '/admin/dashboard/affiliates', label: 'Manage Affiliates', desc: 'Add or edit affiliate logos', icon: BadgeCheck },
          { href: '/admin/dashboard/members', label: 'Manage Members', desc: 'Review member applications', icon: UserCheck },
          { href: '/admin/dashboard/blog', label: 'Manage Blog', desc: 'Create and publish posts', icon: BookOpen },
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
