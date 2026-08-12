import Hero from "@/components/ui/Home/Hero";
import About from "@/components/ui/Home/About";
import Priorities from "@/components/ui/Home/Priorities";
import Statics from "@/components/ui/Home/Statics";
import Team from "@/components/ui/Home/Team";
import Partners from "@/components/ui/Home/Partners";
import Blog from "@/components/ui/Home/blog";
import Cta from "@/components/ui/Home/Cta";
import Social from "@/components/Socila";


import { prisma } from "@/lib/db";
import type { BlogPost, Leader, Partner } from "@prisma/client";

export const dynamic = "force-dynamic";

async function getHomepageData(): Promise<{
  leaders: Leader[];
  partners: Partner[];
  blogPosts: BlogPost[];
}> {
  try {
    const [leaders, partners, blogPosts] = await Promise.all([
      prisma.leader.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
      }),
      prisma.partner.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
      }),
      prisma.blogPost.findMany({
        where: { isPublished: true },
        orderBy: { createdAt: "desc" },
        take: 3,
      }),
    ]);

    return { leaders, partners, blogPosts };
  } catch (error) {
    console.error("Unable to load homepage data from the database:", error);
    return { leaders: [], partners: [], blogPosts: [] };
  }
}

export default async function Home() {
  const {
    leaders: dbLeaders,
    partners: dbPartners,
    blogPosts: dbBlogPosts,
  } = await getHomepageData();

  const formattedLeaders = dbLeaders.map(l => ({
    id: l.id,
    name: l.name,
    role: l.title,
    image: l.imageUrl,
    bio: l.bio,
    socials: {
      facebook: l.facebook || undefined,
      tiktok: l.tiktok || undefined,
      instagram: l.instagram || undefined
    }
  }));

  const formattedPartners = dbPartners.map(p => ({
    id: p.id,
    name: p.name,
    logoUrl: p.logoUrl,
    website: p.website
  }));

  const formattedBlogPosts = dbBlogPosts.map(post => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    category: "News",
    date: new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    author: post.author,
    image: post.coverImageUrl
  }));

  return (
    <>
      <Hero />
      <About />
      <Priorities />
      <Statics />
      <Team initialData={formattedLeaders} />
      <Social />
      <Blog initialData={formattedBlogPosts} />
      <Partners initialData={formattedPartners} />
      <Cta />
    </>
  );
}
