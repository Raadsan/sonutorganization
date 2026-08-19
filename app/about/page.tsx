import Aboutbanner from "@/components/About/Aboutbanner";
import AboutPageContent from "@/components/About/AboutPageContent";
import VissionAndMission from "@/components/About/VissionandMission";
import CoreValues from "@/components/About/corevalues";
import AimsAndObjectives from "@/components/About/AimsAndObjectives";
import Affiliates from "@/components/About/Affiliates";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getAffiliates() {
  try {
    return await prisma.affiliate.findMany({
      where: { isActive: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      select: {
        id: true,
        name: true,
        logoUrl: true,
        website: true,
        description: true,
      },
    });
  } catch (error) {
    console.error("Unable to load affiliates:", error);
    return [];
  }
}

export default async function AboutPage() {
  const affiliates = await getAffiliates();

  return (
    <main>
      <Aboutbanner />
      <AboutPageContent />
      <VissionAndMission />
      <CoreValues />
      <AimsAndObjectives />
      <Affiliates initialData={affiliates} />
    </main>
  );
}
