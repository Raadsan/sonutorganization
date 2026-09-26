import WhoWeAreBanner from "@/components/About/WhoWeAreBanner";
import LeadershipShowcase from "@/components/Leadership/LeadershipShowcase";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getLeaders() {
  try {
    return await prisma.leader.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
  } catch (error) {
    console.error("Unable to load leadership data:", error);
    return [];
  }
}

export default async function LeadershipPage() {
  const leaders = await getLeaders();
  const formattedLeaders = leaders.map((leader) => ({
    id: leader.id,
    name: leader.name,
    role: leader.title,
    category: leader.category || "Executive Committee",
    image: leader.imageUrl,
    bio: leader.bio,
    socials: {
      facebook: leader.facebook || undefined,
      tiktok: leader.tiktok || undefined,
      instagram: leader.instagram || undefined,
    },
  }));

  return (
    <main>
      <WhoWeAreBanner title="Leadership" />
      <LeadershipShowcase leaders={formattedLeaders} />
    </main>
  );
}
