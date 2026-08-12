"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";

type BlogPostData = {
  id: number;
  title: string;
  excerpt: string | null;
  category: string;
  date: string;
  author: string;
  image: string | null;
};

const defaultBlogPosts: BlogPostData[] = [
  {
    id: 1,
    title: "SONUT Launches New Training Program for Rural Teachers",
    excerpt: "In an effort to boost education quality in remote areas, SONUT has rolled out a comprehensive training initiative targeting over 500 teachers.",
    category: "Training",
    date: "June 15, 2026",
    author: "Admin",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Annual Teachers' Conference 2026 Concludes in Mogadishu",
    excerpt: "Educators from across the country gathered to discuss the future of the teaching profession, policy reforms, and digital integration in classrooms.",
    category: "Events",
    date: "June 10, 2026",
    author: "Press Team",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Advocating for Better Working Conditions and Healthcare",
    excerpt: "The Executive Committee met with government officials to present a new proposal aiming to improve the welfare and healthcare benefits for educators.",
    category: "Advocacy",
    date: "June 05, 2026",
    author: "Admin",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop"
  }
];

export default function Blog({ initialData }: { initialData?: BlogPostData[] }) {
  const displayPosts = initialData !== undefined ? initialData : defaultBlogPosts;

  if (displayPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-gray-50/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-bold tracking-widest uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              NEWS & UPDATES
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-primary mb-4">
              Latest from the Union
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Stay informed with our latest news, educational insights, and union activities across Somalia.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Link 
              href="/blog" 
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-gray-200 px-6 py-3 text-sm font-bold text-primary shadow-sm transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary group"
            >
              View All Posts
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post, index) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-60 w-full overflow-hidden bg-gray-100 flex items-center justify-center">
                {post.image ? (
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <span className="text-gray-400 font-medium">No Image</span>
                )}
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-primary shadow-sm">
                  {post.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs font-medium text-gray-400 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span>{post.author}</span>
                  </div>
                </div>

                <Link href={`/blog/${post.id}`} className="block group-hover:text-secondary transition-colors">
                  <h3 className="text-xl font-bold text-primary mb-3 line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow">
                  {post.excerpt}
                </p>

                <div className="mt-auto border-t border-gray-100 pt-4">
                  <Link 
                    href={`/blog/${post.id}`} 
                    className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-secondary transition-colors group/link"
                  >
                    Read More 
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
