"use client";

import { getPlantsDummyData } from "@/lib/plant";
import { PlantsCarousel } from "./view-plants/components/plants-carousel";
import ProtectedRoute from "@/components/protected-route";

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Plants</h1>
        <PlantsCarousel plants={getPlantsDummyData}></PlantsCarousel>
      </div>
    </ProtectedRoute>
  );
}
