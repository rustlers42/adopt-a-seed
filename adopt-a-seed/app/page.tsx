"use client";

import { PlantsCarousel } from "./view-plants/components/plants-carousel";
import ProtectedRoute from "@/components/protected-route";
import { useFetchApi } from "@/lib/use-api";
import { PlantDTO } from "@/lib/plant";
import EventList from "@/app/view-events/components/event-list";
import { EventDTO } from "@/lib/event";

export default function Home() {
  const { data: plants } = useFetchApi<PlantDTO[]>("http://localhost:8000/plants", {
    requireAuth: true,
    enabled: true,
  });

  const { data: events } = useFetchApi<EventDTO[]>("http://localhost:8000/users/me/events", {
    requireAuth: true,
    enabled: true,
  });

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Plants</h1>
        {<PlantsCarousel plants={plants}></PlantsCarousel>}

        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Events</h1>
        <EventList events={events}></EventList>
      </div>
    </ProtectedRoute>
  );
}
