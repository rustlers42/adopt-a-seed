import { EventDTO } from "@/lib/event";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface EventEntryProps {
  event: EventDTO;
}

const EventEntry: React.FC<EventEntryProps> = ({ event }) => {
  const descriptionWithPlant =
    event.plant_id !== null ? `${event.event_description} for plant ${event.plant_id}` : event.event_description;

  const content = (
    <>
      <div className="text-lg font-semibold">{event.event_type}</div>
      <div className="text-gray-700">{descriptionWithPlant}</div>
      <div className="text-sm text-gray-500">{event.event_date}</div>
    </>
  );

  return (
    <Card className="shadow-sm py-1">
      <CardContent className="p-2 flex justify-between items-center min-h-24">
        {event.plant_id !== null ? <Link href={`/view-grow-information/${event.plant_id}`}>{content}</Link> : content}
      </CardContent>
    </Card>
  );
};

export default EventEntry;
