import Hero from "@/components/ui/Home/Hero";
import About from "@/components/ui/Home/About";
import Priorities from "@/components/ui/Home/Priorities";
import Statics from "@/components/ui/Home/Statics";
import Team from "@/components/ui/Home/Team";
import Partners from "@/components/ui/Home/Partners";
import Blog from "@/components/ui/Home/blog";
import Cta from "@/components/ui/Home/Cta";


import { prisma } from "@/lib/db";

export default async function Home() {
  const dbLeaders = await prisma.leader.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' }
  });

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

  const dbPartners = await prisma.partner.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' }
  });

  const formattedPartners = dbPartners.map(p => ({
    id: p.id,
    name: p.name,
    logoUrl: p.logoUrl,
    website: p.website
  }));

  const dbBlogPosts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: 'desc' },
    take: 3
  });

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
      <Statics />
      <About />
      <Priorities />
      <Team initialData={formattedLeaders} />
      <Partners initialData={formattedPartners} />
      <Blog initialData={formattedBlogPosts} />
      <Cta />
    </>
  );
}