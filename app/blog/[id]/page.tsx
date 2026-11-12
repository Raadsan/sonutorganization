import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  User,
  Tag,
  Share2,
  Clock,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { prisma } from "@/lib/db";
import JoinMovementCta from "@/components/shared/JoinMovementCta";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const postId = parseInt(id);

  if (isNaN(postId)) {
    return { title: "Blog Post | SONUT" };
  }

  const post = await prisma.blogPost.findUnique({
    where: { id: postId },
  });

  if (!post || !post.isPublished) {
    return { title: "Article Not Found | SONUT" };
  }

  return {
    title: `${post.title} | SONUT`,
    description:
      post.excerpt ||
      "Read the latest updates, news, and insights from the Somali National Union of Teachers (SONUT).",
  };
}

function formatInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-gray-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function renderFormattedContent(content: string) {
  const isHtml = /<\/?[a-z][\s\S]*>/i.test(content);
  if (isHtml) {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="blog-content prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed"
      />
    );
  }

  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentList: React.ReactNode[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="my-4 space-y-2 pl-2">
          {currentList}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      return;
    }

    if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(
        <h3
          key={`h3-${idx}`}
          className="text-xl md:text-2xl font-serif font-bold text-gray-900 mt-8 mb-4 tracking-tight"
        >
          {formatInline(trimmed.replace(/^###\s*/, ""))}
        </h3>
      );
    } else if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <h2
          key={`h2-${idx}`}
          className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-10 mb-5 tracking-tight border-b border-gray-100 pb-3"
        >
          {formatInline(trimmed.replace(/^##\s*/, ""))}
        </h2>
      );
    } else if (trimmed.startsWith("# ")) {
      flushList();
      elements.push(
        <h1
          key={`h1-${idx}`}
          className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mt-10 mb-6 tracking-tight"
        >
          {formatInline(trimmed.replace(/^#\s*/, ""))}
        </h1>
      );
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      currentList.push(
        <li
          key={`li-${idx}`}
          className="flex items-start gap-3 text-gray-700 leading-relaxed text-base md:text-lg"
        >
          <span className="w-2 h-2 rounded-full bg-primary mt-2.5 flex-shrink-0" />
          <span>{formatInline(trimmed.replace(/^[-*]\s*/, ""))}</span>
        </li>
      );
    } else {
      flushList();
      elements.push(
        <p
          key={`p-${idx}`}
          className="text-gray-700 leading-relaxed mb-5 text-base md:text-lg"
        >
          {formatInline(trimmed)}
        </p>
      );
    }
  });

  flushList();

  return <div className="space-y-1">{elements}</div>;
}

export default async function BlogDetail({ params }: PageProps) {
  const { id } = await params;
  const postId = parseInt(id);

  if (isNaN(postId)) {
    notFound();
  }

  const post = await prisma.blogPost.findUnique({
    where: { id: postId },
  });

  if (!post || !post.isPublished) {
    notFound();
  }

  const relatedPosts = await prisma.blogPost.findMany({
    where: {
      isPublished: true,
      id: { not: postId },
    },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const shortDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const wordCount = post.content
    ? post.content.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length
    : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const postUrl = `https://sonut.org/blog/${post.id}`;
  const authorName = post.author || "SONUT";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero — event-style full-bleed cover */}
      <div className="relative w-full h-[40vh] md:h-[55vh] overflow-hidden">
        {post.coverImageUrl ? (
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/80 to-blue-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/90 text-white">
              News &amp; Updates
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight drop-shadow-lg max-w-4xl">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Main 2-column layout — mirrors event detail */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left — article body */}
          <div className="lg:col-span-2 space-y-6">
            <Link
              href="/media/news"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to News
            </Link>

            <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 font-serif">
                About This Article
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                {authorName} — {shortDate}
              </p>

              {post.excerpt && (
                <p className="mb-6 text-gray-600 leading-relaxed border-l-4 border-primary/30 pl-4 italic">
                  {post.excerpt}
                </p>
              )}

              <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
                {renderFormattedContent(post.content)}
              </div>

              <div className="mt-10 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-4 h-4 text-gray-400 mr-1" />
                  {["SONUT", "Education", "Teachers", "Somalia", "Solidarity"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-semibold"
                      >
                        #{tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </article>

            {/* CTA after reading */}
            <JoinMovementCta />

            {/* Share */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <Share2 className="w-4 h-4" /> Share this article
              </h3>
              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    postUrl
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
                    postUrl
                  )}&text=${encodeURIComponent(post.title)}`}
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
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <div className="bg-gradient-to-br from-primary to-blue-800 px-6 py-5">
                <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-1">
                  Article Details
                </p>
                <p className="text-white font-bold text-lg leading-snug">
                  {post.title}
                </p>
              </div>

              <div className="p-6 space-y-5">
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                      Date
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {formattedDate}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                      Reading Time
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      ~{readingTime} min read
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                      Category
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      News &amp; Updates
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                      Author
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {authorName}
                    </p>
                    <p className="text-xs text-gray-500">
                      Somali National Union of Teachers
                    </p>
                  </div>
                </div>

                <Link
                  href="/join"
                  className="block w-full text-center bg-primary hover:bg-[#2A1A99] text-white font-bold py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] text-sm"
                >
                  Join SONUT Today
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related articles */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                Other Articles
              </h2>
              <Link
                href="/media/news"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
              >
                View all news
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((item) => (
                <Link
                  key={item.id}
                  href={`/blog/${item.id}`}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className="relative h-40 overflow-hidden bg-gray-100">
                    {item.coverImageUrl ? (
                      <Image
                        src={item.coverImageUrl}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/30 to-blue-200" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-white/90 text-primary">
                      News
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-auto">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                      <span className="mx-1 text-gray-300">·</span>
                      <span className="truncate">{item.author || "Admin"}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
