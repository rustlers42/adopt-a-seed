"use client";

import type { EventDTO } from "@/lib/event";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { CalendarIcon, MessageSquareIcon } from "lucide-react";

interface EventListProps {
  events: EventDTO[] | null;
  header: string | null;
}

export default function EventList({ events, header }: EventListProps) {
  if (!events || events.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Growth Events</CardTitle>
        </CardHeader>
        <CardContent>No events recorded for this plant.</CardContent>
      </Card>
    );
  }

  return (
    <div className={!header ? "py-4" : ""}>
      <Card>
        {header && (
          <CardHeader>
            <CardTitle>{header}</CardTitle>
          </CardHeader>
        )}

        <CardContent className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="border rounded-md p-4">
              <p className="text-sm mb-2">{event.event_description}</p>
              <div className="flex items-center space-x-2 mb-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground flex-1">
                  {format(new Date(event.event_date), "PPP")}
                </span>
                <MessageSquareIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{event.event_type}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
