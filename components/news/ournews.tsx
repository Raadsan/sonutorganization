"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Calendar,
  ArrowRight,
  User,
  Tag,
  Loader2,
  MapPin,
  Clock,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string | null;
  author: string;
  coverImageUrl: string | null;
  createdAt: string;
  isPublished: boolean;
}

export interface EventItem {
  id: number;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  time: string;
  coverImageUrl: string | null;
  isPublished: boolean;
  createdAt: string;
}

export type FeedItem =
  | ({ kind: "news" } & BlogPost)
  | ({ kind: "event" } & EventItem);

const FALLBACK_NEWS_IMG =
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80";

const FALLBACK_EVENT_IMG =
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80";

function isPastEvent(startDate: string) {
  return new Date(startDate) < new Date();
}

function combineAndSort(posts: BlogPost[], events: EventItem[]): FeedItem[] {
  const publishedPosts: FeedItem[] = (posts || [])
    .filter((p) => p.isPublished)
    .map((p) => ({ ...p, kind: "news" as const }));

  const publishedEvents: FeedItem[] = (events || [])
    .filter((e) => e.isPublished)
    .map((e) => ({ ...e, kind: "event" as const }));

  return [...publishedPosts, ...publishedEvents].sort((a, b) => {
    const dateA = new Date(a.kind === "event" ? a.startDate : a.createdAt).getTime();
    const dateB = new Date(b.kind === "event" ? b.startDate : b.createdAt).getTime();
    return dateB - dateA;
  });
}

export default function OurNews({
  initialPosts = [],
  initialEvents = [],
}: {
  initialPosts?: BlogPost[];
  initialEvents?: EventItem[];
}) {
  const initialCombined = combineAndSort(initialPosts, initialEvents);
  const [items, setItems] = useState<FeedItem[]>(initialCombined);
  const [loading, setLoading] = useState(initialCombined.length === 0);
  const [activeCategory, setActiveCategory] = useState<"all" | "events" | "news" | "announcements">("all");
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogRes, eventsRes] = await Promise.all([
          fetch("/api/admin/blog").then((r) => (r.ok ? r.json() : [])).catch(() => []),
          fetch("/api/admin/events").then((r) => (r.ok ? r.json() : [])).catch(() => []),
        ]);

        const combined = combineAndSort(
          Array.isArray(blogRes) ? blogRes : [],
          Array.isArray(eventsRes) ? eventsRes : []
        );

        setItems(combined);
      } catch (e) {
        console.error("Failed to load news & events data", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const newsCount = items.filter((i) => i.kind === "news").length;
  const eventsCount = items.filter((i) => i.kind === "event").length;

  const filteredItems = items.filter((item) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "events") return item.kind === "event";
    if (activeCategory === "news") return item.kind === "news";
    if (activeCategory === "announcements") return item.kind === "news";
    return true;
  });

  useEffect(() => {
    const cards = cardsRef.current?.children;
    if (!cards || cards.length === 0) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 30, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.08,
      }
    );
  }, [items, activeCategory]);

  return (
    <section ref={sectionRef} className="py-20 md:py-24 bg-[#fafafa] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="news-header text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            MEDIA & UPDATES
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-extrabold text-primary mb-4">
            Latest News &amp; Events
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Stay informed with the latest events, workshops, announcements, and updates from the Somali National Union of Teachers.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center mb-12">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100 flex-wrap justify-center">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeCategory === "all"
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "text-gray-600 hover:text-primary hover:bg-primary/5"
              }`}
            >
              <span>All Updates</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeCategory === "all" ? "bg-white/20 text-white" : "bg-gray-100 text-gray-700"}`}>
                {items.length}
              </span>
            </button>

            <button
              onClick={() => setActiveCategory("events")}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeCategory === "events"
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "text-gray-600 hover:text-primary hover:bg-primary/5"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Events</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeCategory === "events" ? "bg-white/20 text-white" : "bg-gray-100 text-gray-700"}`}>
                {eventsCount}
              </span>
            </button>

            <button
              onClick={() => setActiveCategory("news")}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeCategory === "news"
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "text-gray-600 hover:text-primary hover:bg-primary/5"
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              <span>News</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeCategory === "news" ? "bg-white/20 text-white" : "bg-gray-100 text-gray-700"}`}>
                {newsCount}
              </span>
            </button>

            <button
              onClick={() => setActiveCategory("announcements")}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeCategory === "announcements"
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "text-gray-600 hover:text-primary hover:bg-primary/5"
              }`}
            >
              Announcements
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200 p-8 max-w-lg mx-auto">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Calendar className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {activeCategory === "events" ? "No events found" : "No updates found"}
            </h3>
            <p className="text-muted-foreground text-sm">
              {activeCategory === "events"
                ? "No upcoming or past events published at the moment. Please check back soon."
                : "No articles or updates published in this section yet."}
            </p>
          </div>
        ) : (
          <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => {
              if (item.kind === "event") {
                const past = isPastEvent(item.startDate);
                return (
                  <article
                    key={`event-${item.id}`}
                    className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* Image container */}
                      <div className="relative h-56 overflow-hidden bg-gray-100">
                        {item.coverImageUrl ? (
                          <Image
                            src={item.coverImageUrl}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                        ) : (
                          <img
                            src={FALLBACK_EVENT_IMG}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Date badge */}
                        <div className="absolute bottom-3 left-3">
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-xs">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(item.startDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>

                        {/* Status badge */}
                        <div className="absolute top-3 right-3">
                          <span
                            className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md shadow-xs ${
                              past ? "bg-slate-700/80 text-white" : "bg-emerald-500 text-white"
                            }`}
                          >
                            {past ? "Past Event" : "Upcoming Event"}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full uppercase">
                            <Calendar className="w-3 h-3" />
                            EVENT
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300 leading-snug line-clamp-2">
                          {item.title}
                        </h3>

                        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                          {item.description}
                        </p>

                        <div className="space-y-1.5 text-xs text-slate-500 mb-4 pt-3 border-t border-slate-100">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="truncate">{item.location}</span>
                          </div>
                          {item.time && (
                            <div className="flex items-center gap-2">
                              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="truncate">{item.time}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <Link
                        href={`/Resources/events/${item.id}`}
                        className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-[#160a5c] text-white text-xs sm:text-sm font-bold py-3 rounded-2xl transition-all duration-300 active:scale-[0.98] group/btn shadow-xs cursor-pointer"
                      >
                        View Event Details
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </article>
                );
              }

              // News Post
              return (
                <article
                  key={`news-${item.id}`}
                  className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Image container */}
                    <div className="relative h-56 overflow-hidden bg-gray-100">
                      {item.coverImageUrl ? (
                        <Image
                          src={item.coverImageUrl}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <img
                          src={FALLBACK_NEWS_IMG}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      <div className="absolute bottom-3 left-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-xs">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(item.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-secondary bg-secondary/10 px-2.5 py-0.5 rounded-full uppercase">
                          <Tag className="w-3 h-3" />
                          NEWS &amp; UPDATES
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300 leading-snug line-clamp-2">
                        {item.title}
                      </h3>

                      {item.excerpt && (
                        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                          {item.excerpt}
                        </p>
                      )}

                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-2 pt-3 border-t border-slate-100">
                        <User className="w-3.5 h-3.5" />
                        <span>{item.author}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Link
                      href={`/blog/${item.id}`}
                      className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-[#160a5c] text-white text-xs sm:text-sm font-bold py-3 rounded-2xl transition-all duration-300 active:scale-[0.98] group/btn shadow-xs cursor-pointer"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
