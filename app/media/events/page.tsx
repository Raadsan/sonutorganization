import MediaPageBanner from "@/components/Media/PageBanner";
import UpcomingEvents from "@/components/events/upcomingevents";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Events | SONUT",
  description: "Stay connected with SONUT's upcoming and past events, workshops, and community gatherings.",
};

async function getEvents() {
  try {
    const dbEvents = await prisma.event.findMany({
      where: { isPublished: true },
      orderBy: { startDate: "desc" },
    });

    return dbEvents.map((e) => ({
      id: e.id,
      title: e.title,
      description: e.description,
      location: e.location,
      startDate: e.startDate.toISOString(),
      endDate: e.endDate.toISOString(),
      time: e.time,
      coverImageUrl: e.coverImageUrl,
      isPublished: e.isPublished,
    }));
  } catch (error) {
    console.error("Unable to load events:", error);
    return [];
  }
}

export default async function MediaEventsPage() {
  const events = await getEvents();

  return (
    <main>
      <MediaPageBanner
        title="Events"
        description="Explore our upcoming conferences, educational forums, and teacher union gatherings across Somalia."
      />
      <UpcomingEvents initialEvents={events} />
    </main>
  );
}
