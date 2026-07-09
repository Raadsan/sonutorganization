import Link from 'next/link';
import { Users, Handshake, BookOpen, TrendingUp, UserCheck } from 'lucide-react';
import { prisma } from '@/lib/db';

export default async function DashboardPage() {
  const [leaderCount, partnerCount, blogCount, publishedCount, memberCount] = await Promise.all([
    prisma.leader.count(),
    prisma.partner.count(),
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
      color: 'from-blue-500 to-blue-700',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
    {
      label: 'Partners',
      value: partnerCount,
      icon: Handshake,
      href: '/admin/dashboard/partners',
      color: 'from-green-500 to-green-700',
      bg: 'bg-green-500/10',
      border: 'border-green-500/20',
    },
    {
      label: 'Blog Posts',
      value: blogCount,
      icon: BookOpen,
      href: '/admin/dashboard/blog',
      color: 'from-purple-500 to-purple-700',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
    },
    {
      label: 'Published',
      value: publishedCount,
      icon: TrendingUp,
      href: '/admin/dashboard/blog',
      color: 'from-orange-500 to-orange-700',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/20',
    },
    {
      label: 'Members',
      value: memberCount,
      icon: UserCheck,
      href: '/admin/dashboard/members',
      color: 'from-indigo-500 to-indigo-700',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Overview</h2>
        <p className="text-gray-400 mt-1">Manage your site content from here</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className={`${stat.bg} ${stat.border} border rounded-xl p-5 hover:scale-105 transition-transform duration-200 group`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
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
          { href: '/admin/dashboard/members', label: 'Manage Members', desc: 'Review member applications', icon: UserCheck },
          { href: '/admin/dashboard/blog', label: 'Manage Blog', desc: 'Create and publish posts', icon: BookOpen },
        ].map((item) => {

          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-center gap-4 hover:border-gray-600 transition-colors duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-gray-300" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">{item.label}</p>
                <p className="text-gray-400 text-xs mt-0.5">{item.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
