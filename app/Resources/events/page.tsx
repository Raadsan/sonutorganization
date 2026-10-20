import Banneevents from "@/components/events/eventbanner";
import UpcomingEvents from "@/components/events/upcomingevents";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

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
      organizer: e.organizer,
      organizerRole: e.organizerRole,
      coverImageUrl: e.coverImageUrl,
      isPublished: e.isPublished,
    }));
  } catch (error) {
    console.error("Unable to load events:", error);
    return [];
  }
}

export default async function Events() {
  const events = await getEvents();

  return (
    <>
      <Banneevents />
      <UpcomingEvents initialEvents={events} />
    </>
  );
}