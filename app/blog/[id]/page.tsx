import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag, Share2 } from "lucide-react";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
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

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Detect if content is HTML or plain text
  const isHtml = /<\/?[a-z][\s\S]*>/i.test(post.content);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link
            href="/#news"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
              News &amp; Updates
            </span>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              {formattedDate}
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 leading-tight mb-6">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg text-gray-500 leading-relaxed mb-6 border-l-4 border-primary/30 pl-4">
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center justify-between border-y border-gray-200 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-primary/20 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{post.author}</p>
                <p className="text-xs text-gray-500">Author</p>
              </div>
            </div>

            {/* Share buttons */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 font-medium mr-2 hidden sm:inline-block">
                Share:
              </span>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  `https://sonut.org/blog/${post.id}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  `https://sonut.org/blog/${post.id}`
                )}&text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <button
                onClick={undefined}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImageUrl && (
          <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden mb-12 shadow-md">
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed">
          {isHtml ? (
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="blog-content"
            />
          ) : (
            post.content.split("\n").map((paragraph, idx) =>
              paragraph.trim() ? (
                <p key={idx} className="mb-6">
                  {paragraph}
                </p>
              ) : (
                <br key={idx} />
              )
            )
          )}
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-5 h-5 text-gray-400 mr-2" />
            {["Education", "Somalia", "Teachers", "SONUT"].map((tag, idx) => (
              <span
                key={idx}
                className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 cursor-pointer transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary to-blue-900 text-center px-6 py-16 sm:px-12 sm:py-20 shadow-2xl">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-5 blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-500 opacity-20 blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Are you ready to be part of SONUT?
            </h2>
            <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Join the Somali National Union of Teachers to be part of improving
              the quality of education and protecting teachers&apos; rights.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/join"
                className="w-full sm:w-auto px-8 py-4 bg-white text-primary font-bold rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                Register Now
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto px-8 py-4 bg-primary-foreground/10 text-white font-bold rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
