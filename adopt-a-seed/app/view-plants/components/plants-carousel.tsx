"use client";

import { PlantCard } from "@/components/plant-card";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import { Plant } from "@/lib/plant";

interface PlantsCarouselProps {
  plants: Plant[];
}

export function PlantsCarousel({ plants }: PlantsCarouselProps) {
  return (
    <Carousel>
      <CarouselContent className="-ml-4">
        {plants.map((plant, index) => (
          <div key={index} className="pl-4">
            <PlantCard plant={plant} />
          </div>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
