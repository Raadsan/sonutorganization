"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, ArrowRight, User, Tag } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
}

const newsData: NewsItem[] = [
  {
    id: 1,
    title: "SONUT Launches New Teacher Training Program",
    excerpt:
      "The Somali National Union of Teachers has launched an innovative training program aimed at enhancing classroom management and modern teaching methodologies across the country.",
    date: "2026-06-10",
    author: "SONUT Communications",
    category: "announcements",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80",
  },
  {
    id: 2,
    title: "Education Minister Meets with SONUT Leadership",
    excerpt:
      "SONUT's executive committee held a productive meeting with the Minister of Education to discuss teacher welfare, salary reforms, and the future of education in Somalia.",
    date: "2026-05-28",
    author: "SONUT Communications",
    category: "updates",
    image:
      "https://images.unsplash.com/photo-1577962917302-c3a32f3d8a98?w=600&q=80",
  },
  {
    id: 3,
    title: "Annual Teacher Awards Ceremony 2026",
    excerpt:
      "SONUT honored outstanding educators from across Somalia in a glittering ceremony celebrating dedication, innovation, and excellence in teaching.",
    date: "2026-05-15",
    author: "SONUT Events Team",
    category: "events",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
  },
  {
    id: 4,
    title: "New Partnership with International Education Bodies",
    excerpt:
      "SONUT has signed memoranda of understanding with several international education organizations to bring global best practices to Somali classrooms.",
    date: "2026-04-20",
    author: "SONUT Communications",
    category: "announcements",
    image:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80",
  },
  {
    id: 5,
    title: "Teachers' Rights Advocacy Campaign Reaches Milestone",
    excerpt:
      "The ongoing campaign for improved teacher compensation and working conditions has achieved significant policy changes at the federal level.",
    date: "2026-04-05",
    author: "SONUT Advocacy Team",
    category: "updates",
    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80",
  },
  {
    id: 6,
    title: "Regional Workshop: Quality Education for All",
    excerpt:
      "SONUT facilitated a regional workshop bringing together educators from across East Africa to share strategies for inclusive and quality education.",
    date: "2026-03-12",
    author: "SONUT Events Team",
    category: "events",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80",
  },
];

const categories = [
  { value: "all", label: "All News" },
  { value: "announcements", label: "Announcements" },
  { value: "updates", label: "Updates" },
  { value: "events", label: "Events" },
];

export default function OurNews() {
  const [activeCategory, setActiveCategory] = useState("all");
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const filtered = newsData.filter(
    (n) => activeCategory === "all" || n.category === activeCategory
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
  }, [activeCategory]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".news-header",
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
        <div className="news-header text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            OUR NEWS
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-primary mb-4">
            Latest News & Updates
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            Stay informed with the latest announcements, updates, and stories
            from SONUT.
          </p>
        </div>

        <div className="flex items-center justify-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                  activeCategory === cat.value
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "text-gray-500 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Tag className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No news found
            </h3>
            <p className="text-muted-foreground text-sm">
              No news in this category at the moment.
            </p>
          </div>
        ) : (
          <div
            ref={cardsRef}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filtered.map((item) => (
              <article
                key={item.id}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-white bg-primary/90 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
                      <Calendar className="w-3 h-3" />
                      {new Date(item.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-secondary bg-secondary/10 px-2.5 py-1 rounded-full uppercase">
                      <Tag className="w-3 h-3" />
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300 leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                    {item.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-5">
                    <User className="w-3.5 h-3.5" />
                    {item.author}
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
