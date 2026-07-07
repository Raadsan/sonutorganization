"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, ArrowRight, User, Tag, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface BlogPost {
  id: number;
  title: string;
  excerpt: string | null;
  author: string;
  coverImageUrl: string | null;
  createdAt: string;
  isPublished: boolean;
}

const categories = [
  { value: "all", label: "All News" },
  { value: "announcements", label: "Announcements" },
  { value: "updates", label: "Updates" },
  { value: "events", label: "Events" },
];

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80";

export default function OurNews() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/admin/blog");
        const data: BlogPost[] = await res.json();
        // Only show published posts
        setPosts(data.filter((p) => p.isPublished));
      } catch (e) {
        console.error("Failed to load blog posts", e);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

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
  }, [posts, activeCategory]);

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
            Latest News &amp; Updates
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

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Tag className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No news found
            </h3>
            <p className="text-muted-foreground text-sm">
              No news published yet. Check back soon.
            </p>
          </div>
        ) : (
          <div
            ref={cardsRef}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {posts.map((post) => (
              <article
                key={post.id}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col"
              >
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  {post.coverImageUrl ? (
                    <Image
                      src={post.coverImageUrl}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <img
                      src={FALLBACK_IMG}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-white bg-primary/90 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
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
                      News &amp; Updates
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300 leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  {post.excerpt && (
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                      {post.excerpt}
                    </p>
                  )}

                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-5">
                    <User className="w-3.5 h-3.5" />
                    {post.author}
                  </div>

                  <Link
                    href={`/blog/${post.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-[#2A1A99] text-white text-sm font-bold py-3 rounded-xl transition-all duration-300 active:scale-[0.98] group/btn"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
