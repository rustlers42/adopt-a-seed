"use client";

import PlantDetails from "./PlantDetails";
import PlantSurvey from "./PlantSurvey";
import { useFetchApi } from "@/lib/use-api";

import { PlantDTO } from "@/lib/plant";
import EventList from "@/app/view-events/components/event-list";
import { EventDTO } from "@/lib/event";

interface PlantPageProps {
  id: string;
}

export default function PlantPage({ id }: PlantPageProps) {
  const { data: plant, isLoading } = useFetchApi<PlantDTO>(`http://localhost:8000/plants/${id}`, {
    requireAuth: true,
    enabled: true,
  });

  const { data: events } = useFetchApi<EventDTO[]>(`http://localhost:8000/plants/${id}/events`, {
    requireAuth: true,
    enabled: true,
  });

  console.log(events);

  return (
    <div className={"container mx-auto py-8"}>
      <h1>Plant Information</h1>
      <PlantDetails plant={plant} />
      <PlantSurvey />

      <EventList events={events}></EventList>
    </div>
  );
}
