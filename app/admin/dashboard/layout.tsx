'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import {
  LayoutDashboard,
  Users,
  Handshake,
  BookOpen,
  CalendarDays,
  LogOut,
  Menu,
  X,
  ChevronRight,
  UserCheck,
  BadgeCheck,
} from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/dashboard/leadership', label: 'Leadership', icon: Users },
  { href: '/admin/dashboard/partners', label: 'Partners', icon: Handshake },
  { href: '/admin/dashboard/affiliates', label: 'Affiliates', icon: BadgeCheck },
  { href: '/admin/dashboard/members', label: 'Members', icon: UserCheck },
  { href: '/admin/dashboard/blog', label: 'Blog', icon: BookOpen },
  { href: '/admin/dashboard/events', label: 'Events', icon: CalendarDays },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await axios.post('/api/auth/logout');
    router.push('/admin/login');
  };

  return (
    <div className="admin-light flex min-h-screen bg-[#F7F8FC] text-slate-900">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-[#E6E8F0] bg-white shadow-sm transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-[#E6E8F0] px-6">
          <div className="flex items-center gap-3">
            <div className="admin-on-brand flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#1E0D79] to-[#D92936] text-sm font-bold text-white shadow-md shadow-[#1E0D79]/20">
              S
            </div>
            <div>
              <p className="text-sm font-bold text-[#1E0D79]">Sount.org</p>
              <p className="text-xs text-slate-500">Admin Panel</p>
            </div>
          </div>
          <button
            className="ml-auto text-slate-500 transition-colors hover:text-[#1E0D79] lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200
                  ${isActive
                    ? 'admin-on-brand bg-[#1E0D79] text-white shadow-md shadow-[#1E0D79]/20'
                    : 'text-slate-600 hover:bg-[#1E0D79]/5 hover:text-[#1E0D79]'
                  }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {item.label}
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-[#E6E8F0] p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-[#D92936]/10 hover:text-[#D92936]"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="flex h-16 items-center gap-4 border-b border-[#E6E8F0] bg-white px-4 shadow-sm lg:px-6">
          <button
            className="text-slate-600 transition-colors hover:text-[#1E0D79] lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="font-bold capitalize text-[#1E0D79]">
              {navItems.find((n) => n.href === pathname)?.label || 'Admin'}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="admin-on-brand flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#1E0D79] to-[#D92936] text-sm font-bold text-white shadow-md shadow-[#1E0D79]/20">
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-[#F7F8FC] p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
