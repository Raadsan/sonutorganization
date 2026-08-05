import WhoWeAreBanner from "@/components/About/WhoWeAreBanner";
import Team from "@/components/ui/Home/Team";
import { prisma } from "@/lib/db";

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
      <Team initialData={formattedLeaders} />
    </main>
  );
}
