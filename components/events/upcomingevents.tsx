"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, MapPin, Clock, Search, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  endDate: string;
  location: string;
  time: string;
  category: "upcoming" | "past";
  image: string;
}

const eventsData: Event[] = [
  {
    id: 1,
    title: "Annual General Meeting 2026",
    description:
      "Join us for the Annual General Meeting where we will discuss the union's achievements, financial report, and elect new leadership for the coming term.",
    date: "2026-08-15",
    endDate: "2026-08-16",
    location: "Mogadishu, Somalia",
    time: "09:00 AM - 5:00 PM",
    category: "upcoming",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
  },
  {
    id: 2,
    title: "Teachers' Professional Development Workshop",
    description:
      "A two-day workshop focused on modern teaching methodologies, classroom management, and curriculum development for primary and secondary educators.",
    date: "2026-07-10",
    endDate: "2026-07-11",
    location: "Hargeisa, Somaliland",
    time: "08:30 AM - 4:30 PM",
    category: "upcoming",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80",
  },
  {
    id: 3,
    title: "Education Policy Forum",
    description:
      "A high-level forum bringing together policymakers, educators, and international partners to shape the future of education in Somalia.",
    date: "2026-09-05",
    endDate: "2026-09-06",
    location: "Kismayo, Somalia",
    time: "09:00 AM - 5:00 PM",
    category: "upcoming",
    image:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80",
  },
  {
    id: 4,
    title: "Somali Teachers' Day Celebration",
    description:
      "A celebration honoring the contributions of teachers across Somalia with awards, cultural performances, and recognition ceremonies.",
    date: "2026-03-15",
    endDate: "2026-03-15",
    location: "Mogadishu, Somalia",
    time: "10:00 AM - 3:00 PM",
    category: "past",
    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80",
  },
  {
    id: 5,
    title: "Women in Education Leadership Summit",
    description:
      "A summit empowering female educators with leadership skills, mentorship opportunities, and networking with industry leaders.",
    date: "2026-02-20",
    endDate: "2026-02-21",
    location: "Garowe, Puntland",
    time: "09:00 AM - 4:00 PM",
    category: "past",
    image:
      "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&q=80",
  },
  {
    id: 6,
    title: "Digital Literacy in Schools Initiative",
    description:
      "A training program introducing teachers to digital tools, online resources, and blended learning techniques for modern classrooms.",
    date: "2026-01-12",
    endDate: "2026-01-14",
    location: "Baidoa, Somalia",
    time: "08:00 AM - 5:00 PM",
    category: "past",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80",
  },
];

export default function UpcomingEvents() {
  const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");
  const [search, setSearch] = useState("");
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const filtered = eventsData
    .filter((e) => e.category === filter)
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
  }, [filter, search]);

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
            Events & Gatherings
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            Stay connected with SONUT's upcoming and past events, workshops, and
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

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Calendar className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No events found
            </h3>
            <p className="text-muted-foreground text-sm">
              {search
                ? "Try a different search term."
                : `No ${filter} events scheduled at the moment.`}
            </p>
          </div>
        ) : (
          <div
            ref={cardsRef}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filtered.map((event) => (
              <article
                key={event.id}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-primary/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm ${
                        event.category === "upcoming"
                          ? "bg-green-500/90 text-white"
                          : "bg-gray-500/80 text-white"
                      }`}
                    >
                      {event.category === "upcoming" ? "Upcoming" : "Past"}
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

                  <button className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-[#2A1A99] text-white text-sm font-bold py-3 rounded-xl transition-all duration-300 active:scale-[0.98] group/btn">
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
