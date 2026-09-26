import MediaPageBanner from "@/components/Media/PageBanner";
import OurNews from "@/components/news/ournews";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "News & Events | SONUT",
  description: "Read the latest news, events, announcements, and updates from SONUT.",
};

async function getData() {
  try {
    const [dbPosts, dbEvents] = await Promise.all([
      prisma.blogPost.findMany({
        where: { isPublished: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.event.findMany({
        where: { isPublished: true },
        orderBy: { startDate: "desc" },
      }),
    ]);

    const posts = dbPosts.map((p) => ({
      id: p.id,
      title: p.title,
      excerpt: p.excerpt,
      author: p.author,
      coverImageUrl: p.coverImageUrl,
      createdAt: p.createdAt.toISOString(),
      isPublished: p.isPublished,
    }));

    const events = dbEvents.map((e) => ({
      id: e.id,
      title: e.title,
      description: e.description,
      location: e.location,
      startDate: e.startDate.toISOString(),
      endDate: e.endDate.toISOString(),
      time: e.time,
      coverImageUrl: e.coverImageUrl,
      isPublished: e.isPublished,
      createdAt: e.createdAt.toISOString(),
    }));

    return { posts, events };
  } catch (error) {
    console.error("Unable to load news and events data:", error);
    return { posts: [], events: [] };
  }
}

export default async function NewsPage() {
  const { posts, events } = await getData();

  return (
    <main>
      <MediaPageBanner
        title="News & Events"
        description="Stay informed with the latest announcements, events, stories, and updates from SONUT."
      />
      <OurNews initialPosts={posts} initialEvents={events} />
    </main>
  );
}
