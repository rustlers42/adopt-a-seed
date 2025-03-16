import { EventDTO } from "@/lib/event";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface EventEntryProps {
  event: EventDTO | null;
}

const EventEntry: React.FC<EventEntryProps> = ({ event }) => {
  const descriptionWithPlant =
    event?.plant_id !== null ? `Plant ${event?.plant_id}: ${event?.event_description}` : event?.event_description;

  const content = event ? (
    <>
      <div className="text-lg font-semibold">{event.event_type}</div>
      <div className="text-gray-700">{descriptionWithPlant}</div>
      <div className="text-sm text-gray-500">{event.event_date}</div>
    </>
  ) : (
    <>
      <Skeleton className="h-6 w-1/4" />
      <Skeleton className="h-4 w-3/4 mt-2" />
      <Skeleton className="h-4 w-1/2 mt-2" />
    </>
  );

  return (
    <Card className="shadow-sm py-1">
      <CardContent className="p-2 flex justify-between items-center min-h-24">
        {event?.plant_id !== null ? <Link href={`/view-grow-information/${event?.plant_id}`}>{content}</Link> : content}
      </CardContent>
    </Card>
  );
};

export default EventEntry;
