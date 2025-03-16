import { EventDTO } from "@/lib/event";
import { ScrollArea } from "@/components/ui/scroll-area";
import EventEntry from "./event-entry";

interface EventListProps {
  events: EventDTO[] | null;
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  return (
    <ScrollArea className="h-96 w-full rounded-lg p-2">
      <div className="space-y-2">
        {events
          ? events.map((event) => <EventEntry key={event.id} event={event} />)
          : Array.from({ length: 5 }).map((_, index) => (
              <EventEntry
                key={index}
                event={{
                  user_id: null,
                  event_type: "Loading...",
                  event_description: "Loading...",
                  event_date: "Loading...",
                  plant_id: null,
                  id: index,
                }}
              />
            ))}
      </div>
    </ScrollArea>
  );
};

export default EventList;
