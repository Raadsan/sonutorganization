"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Calendar, MapPin, Clock, Search, ArrowRight, Loader2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  time: string;
  coverImageUrl: string | null;
  isPublished: boolean;
}

const FALLBACK =
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80";

function isPast(startDate: string) {
  return new Date(startDate) < new Date();
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");
  const [search, setSearch] = useState("");
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/admin/events");
        const data: Event[] = await res.json();
        // Only published events
        setEvents(data.filter((e) => e.isPublished));
      } catch (e) {
        console.error("Failed to load events", e);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filtered = events
    .filter((e) => (filter === "past" ? isPast(e.startDate) : !isPast(e.startDate)))
    .filter(
      (e) =>
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.description.toLowerCase().includes(search.toLowerCase()) ||
        e.location.toLowerCase().includes(search.toLowerCase())
    );

  useEffect(() => {
    const cards = cardsRef.current?.children;
    if (!cards || cards.length === 0) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [filter, search, events]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".events-header",
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[#fafafa] relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="events-header text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            OUR EVENTS
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-primary mb-4">
            Events &amp; Gatherings
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            Stay connected with SONUT&apos;s upcoming and past events, workshops, and
            community gatherings.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-2 bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100">
            <button
              onClick={() => setFilter("upcoming")}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                filter === "upcoming"
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "text-gray-500 hover:text-primary hover:bg-primary/5"
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setFilter("past")}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                filter === "past"
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "text-gray-500 hover:text-primary hover:bg-primary/5"
              }`}
            >
              Past Events
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Calendar className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No events found</h3>
            <p className="text-muted-foreground text-sm">
              {search
                ? "Try a different search term."
                : `No ${filter} events scheduled at the moment.`}
            </p>
          </div>
        ) : (
          <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((event) => {
              const past = isPast(event.startDate);
              return (
                <article
                  key={event.id}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col"
                >
                  <div className="relative h-52 overflow-hidden bg-gray-100">
                    {event.coverImageUrl ? (
                      <Image
                        src={event.coverImageUrl}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <img
                        src={FALLBACK}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-primary/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(event.startDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm ${
                          past
                            ? "bg-gray-500/80 text-white"
                            : "bg-green-500/90 text-white"
                        }`}
                      >
                        {past ? "Past" : "Upcoming"}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300 leading-snug line-clamp-2">
                      {event.title}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-5">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        {event.time}
                      </div>
                    </div>

                    <Link
                      href={`/Resources/events/${event.id}`}
                      className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-[#2A1A99] text-white text-sm font-bold py-3 rounded-xl transition-all duration-300 active:scale-[0.98] group/btn"
                    >
                      View Details
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
