"use client";

import { useFetchApi } from "@/lib/use-api";
import PlantDetails from "./plant-details";
import PlantSurvey from "./plant-survey";
import EventList from "@/app/view-events/components/event-list";
import HelpAlert from "@/app/view-grow-information/components/help-alert";
import ProtectedRoute from "@/components/protected-route";
import type { EventDTO } from "@/lib/event";
import type { PlantDTO } from "@/lib/plant";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SproutIcon, CalendarDaysIcon, HelpCircleIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8 px-4 max-w-5xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <SproutIcon className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold">
              {isLoading ? <Skeleton className="h-9 w-48" /> : plant?.seed_specific || "Plant Information"}
            </h1>
          </div>
          {!isLoading && plant && <p className="text-muted-foreground text-lg ml-10">{plant.seed_category}</p>}
        </div>

        <div className="mb-6">
          <HelpAlert id={id} />
        </div>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="details" className="flex items-center gap-2">
              <SproutIcon className="h-4 w-4" />
              Plant Details
            </TabsTrigger>
            <TabsTrigger value="survey" className="flex items-center gap-2">
              <HelpCircleIcon className="h-4 w-4" />
              Status Survey
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <CalendarDaysIcon className="h-4 w-4" />
              Growth Events
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <PlantDetails plant={plant} />
          </TabsContent>

          <TabsContent value="survey">
            <PlantSurvey id={id} />
          </TabsContent>

          <TabsContent value="events">
            <EventList events={events} header="Growth & Telemetry Events" />
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
}
