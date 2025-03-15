"use client";

import { getPlantsDummyData } from "@/lib/plant";
import { PlantsCarousel } from "./view-plants/components/plants-carousel";

export default function Home() {
  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Plants</h1>
      <PlantsCarousel plants={getPlantsDummyData}></PlantsCarousel>
    </>
  );
}
