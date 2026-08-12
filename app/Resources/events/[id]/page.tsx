import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft, Calendar, MapPin, Clock, Share2,
  ChevronRight, Users, ExternalLink,
} from "lucide-react";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

function isPast(date: Date) {
  return date < new Date();
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatShortDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params;
  const eventId = parseInt(id);

  if (isNaN(eventId)) notFound();

  const event = await prisma.event.findUnique({ where: { id: eventId } });

  if (!event || !event.isPublished) notFound();

  const past = isPast(event.startDate);
  const isSameDay =
    event.startDate.toDateString() === event.endDate.toDateString();

  // Fetch related events (other published events, max 3)
  const related = await prisma.event.findMany({
    where: { isPublished: true, id: { not: eventId } },
    orderBy: { startDate: "asc" },
    take: 3,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb nav */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-2 text-sm">
          <Link
            href="/"
            className="text-gray-400 hover:text-primary transition-colors"
          >
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-300" />
          <Link
            href="/Resources/events"
            className="text-gray-400 hover:text-primary transition-colors"
          >
            Events
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-300" />
          <span className="text-gray-700 font-medium truncate max-w-[200px]">
            {event.title}
          </span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-[40vh] md:h-[55vh] overflow-hidden">
        {event.coverImageUrl ? (
          <Image
            src={event.coverImageUrl}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/80 to-blue-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Overlay content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                past
                  ? "bg-gray-500/80 text-white"
                  : "bg-green-500/90 text-white"
              }`}
            >
              {past ? "Past Event" : "Upcoming Event"}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight drop-shadow-lg">
            {event.title}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left — description */}
          <div className="lg:col-span-2">
            <Link
              href="/Resources/events"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Events
            </Link>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-serif">
                About This Event
              </h2>
              <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
                {event.description.split("\n").map((para, i) =>
                  para.trim() ? (
                    <p key={i} className="mb-4">
                      {para}
                    </p>
                  ) : (
                    <br key={i} />
                  )
                )}
              </div>
            </div>

            {/* Share */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <Share2 className="w-4 h-4" /> Share this event
              </h3>
              <div className="flex items-center gap-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    `https://sonut.org/Resources/events/${event.id}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1877F2]/10 text-[#1877F2] text-sm font-semibold hover:bg-[#1877F2] hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    `https://sonut.org/Resources/events/${event.id}`
                  )}&text=${encodeURIComponent(event.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/10 text-black text-sm font-semibold hover:bg-black hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                  Twitter
                </a>
              </div>
            </div>
          </div>

          {/* Right — details sidebar */}
          <div className="space-y-5">
            {/* Event Info Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-br from-primary to-blue-800 px-6 py-5">
                <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-1">
                  Event Details
                </p>
                <p className="text-white font-bold text-lg leading-snug">
                  {event.title}
                </p>
              </div>

              <div className="p-6 space-y-5">
                {/* Date */}
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                      Date
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {formatDate(event.startDate)}
                    </p>
                    {!isSameDay && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        to {formatDate(event.endDate)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Time */}
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                      Time
                    </p>
                    <p className="text-sm font-semibold text-gray-900">{event.time}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                      Location
                    </p>
                    <p className="text-sm font-semibold text-gray-900">{event.location}</p>
                  </div>
                </div>

                {/* Organizer */}
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                      Organizer
                    </p>
                    <p className="text-sm font-semibold text-gray-900">SONUT</p>
                    <p className="text-xs text-gray-500">
                      Somali National Union of Teachers
                    </p>
                  </div>
                </div>

                {!past && (
                  <Link
                    href="/join"
                    className="block w-full text-center bg-primary hover:bg-[#2A1A99] text-white font-bold py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] text-sm"
                  >
                    Register Interest
                  </Link>
                )}
              </div>
            </div>

            {/* Add to Calendar */}
            {!past && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <p className="text-sm font-bold text-gray-700 mb-3">Add to Calendar</p>
                <a
                  href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                    event.title
                  )}&dates=${event.startDate
                    .toISOString()
                    .replace(/[-:]/g, "")
                    .slice(0, 15)}Z/${event.endDate
                    .toISOString()
                    .replace(/[-:]/g, "")
                    .slice(0, 15)}Z&location=${encodeURIComponent(
                    event.location
                  )}&details=${encodeURIComponent(event.description.slice(0, 200))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl border border-gray-200 hover:border-primary hover:text-primary text-gray-600 text-sm font-medium transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Google Calendar
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Related Events */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
              Other Events
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((ev) => {
                const evPast = isPast(ev.startDate);
                return (
                  <Link
                    key={ev.id}
                    href={`/Resources/events/${ev.id}`}
                    className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    <div className="relative h-40 overflow-hidden bg-gray-100">
                      {ev.coverImageUrl ? (
                        <Image
                          src={ev.coverImageUrl}
                          alt={ev.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/30 to-blue-200" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <span
                        className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                          evPast
                            ? "bg-gray-500/80 text-white"
                            : "bg-green-500/90 text-white"
                        }`}
                      >
                        {evPast ? "Past" : "Upcoming"}
                      </span>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-2">
                        {ev.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-auto">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatShortDate(ev.startDate)}
                        <span className="mx-1 text-gray-300">·</span>
                        <MapPin className="w-3.5 h-3.5" />
                        {ev.location}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary to-blue-900 text-center px-6 py-14 sm:px-12 sm:py-16 shadow-2xl">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-5 blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-500 opacity-20 blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                Be Part of SONUT&apos;s Mission
              </h2>
              <p className="text-blue-100 text-lg max-w-xl mx-auto mb-8">
                Join the Somali National Union of Teachers and participate in
                events, workshops, and advocacy programs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/join"
                  className="w-full sm:w-auto px-8 py-4 bg-white text-primary font-bold rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300"
                >
                  Join SONUT
                </Link>
                <Link
                  href="/Resources/events"
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  All Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
