"use client";

import PlantDetails from "./PlantDetails";
import PlantSurvey from "./PlantSurvey";
import { useFetchApi } from "@/lib/use-api";

import { PlantDTO } from "@/lib/plant";
import EventList from "@/app/view-events/components/event-list";
import { EventDTO } from "@/lib/event";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TreesIcon as Plant } from "lucide-react";

interface PlantPageProps {
  id: string;
}

type HelpResponseDTO = {
  text: string;
};

export default function PlantPage({ id }: PlantPageProps) {
  const { data: plant, isLoading } = useFetchApi<PlantDTO>(`http://localhost:8000/plants/${id}`, {
    requireAuth: true,
    enabled: true,
  });

  const { data: events } = useFetchApi<EventDTO[]>(`http://localhost:8000/plants/${id}/events`, {
    requireAuth: true,
    enabled: true,
  });

  const { data: help } = useFetchApi<HelpResponseDTO>(`http://localhost:8000/plants/${id}/help`, {
    requireAuth: true,
    enabled: true,
  });

  return (
    <div className={"container mx-auto py-8"}>
      {help && (
        <Alert className="bg-green-50 border-green-200">
          <Plant className="h-4 w-4 text-green-600" />
          <AlertTitle>Help</AlertTitle>
          <AlertDescription>{help?.text}</AlertDescription>
        </Alert>
      )}

      <h1>Plant Information</h1>
      <PlantDetails plant={plant} />
      <PlantSurvey />

      <EventList events={events}></EventList>
    </div>
  );
}
