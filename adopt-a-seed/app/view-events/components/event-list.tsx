import { EventDTO } from "@/lib/event";
import { ScrollArea } from "@/components/ui/scroll-area";
import EventEntry from "./event-entry";

interface EventListProps {
  events: EventDTO[] | null;
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  if (events != null && events.length == 0) {
    return <></>;
  }

  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Events</h1>

      <ScrollArea className="h-96 w-full rounded-lg p-2">
        <div className="space-y-2">
          {events
            ? events.map((event) => <EventEntry key={event.id} event={event} />)
            : Array.from({ length: 5 }).map((_, index) => <EventEntry key={index} event={null} />)}
        </div>
      </ScrollArea>
    </>
  );
};

export default EventList;
