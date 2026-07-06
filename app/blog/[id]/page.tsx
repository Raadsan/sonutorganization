import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { prisma } from "@/lib/db";

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

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Since we don't have tags in the DB, we can hardcode a few generic ones based on category
  const tags = ["Education", "Somalia", "Teachers", "SONUT"];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
              News & Updates
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

            {/* Share buttons (UI only) */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 font-medium mr-2 hidden sm:inline-block">Share:</span>
              <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
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
          {/* If the content contains HTML, you might use dangerouslySetInnerHTML. 
              Assuming basic text with line breaks for now. */}
          {post.content.split('\n').map((paragraph, idx) => (
            <p key={idx} className="mb-6">{paragraph}</p>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-5 h-5 text-gray-400 mr-2" />
            {tags.map((tag, idx) => (
              <span key={idx} className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 cursor-pointer transition-colors">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* Beautiful CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary to-blue-900 text-center px-6 py-16 sm:px-12 sm:py-20 shadow-2xl">
          {/* Abstract Shapes */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-5 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Diyaar ma u tahay inaad qayb ka noqoto SONUT?
            </h2>
            <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Ku soo biir ururka macalimiinta Soomaaliyeed si aad qayb uga noqoto horumarinta tayada waxbarashada iyo xuquuqda macalinka.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/join" className="w-full sm:w-auto px-8 py-4 bg-white text-primary font-bold rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300">
                Hadda Is-diiwaangeli
              </Link>
              <Link href="/about" className="w-full sm:w-auto px-8 py-4 bg-primary-foreground/10 text-white font-bold rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300">
                Wax badan ka baro
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
