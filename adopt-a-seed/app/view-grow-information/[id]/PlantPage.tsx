"use client";

import PlantDetails from "./PlantDetails";
import PlantSurvey from "./PlantSurvey";
import { useFetchApi } from "@/lib/use-api";
import { PlantDTO } from "@/app/page";

interface PlantPageProps {
  id: string;
}

export default function PlantPage({ id }: PlantPageProps) {
  const { data: plant, isLoading } = useFetchApi<PlantDTO>(`http://localhost:8000/plants/${id}`, {
    requireAuth: true,
    enabled: true,
  });

  return (
    <div>
      <h1>Plant Information</h1>
      <PlantDetails plant={plant} />
      <PlantSurvey />
    </div>
  );
}
