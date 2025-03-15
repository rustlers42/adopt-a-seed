"use client";

import { PlantCard } from "@/components/plant-card";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import { Plant } from "@/lib/plant";
import { Plus } from "lucide-react";
import Link from "next/link";

interface PlantsCarouselProps {
  plants: Plant[];
}

export function PlantsCarousel({ plants }: PlantsCarouselProps) {
  return (
    <Carousel>
      <CarouselContent className="-ml-4">
        <div className="pl-4">
          <Link href="/start-growing-process">
            <div className="border rounded-md p-4 w-48 h-64 flex items-center justify-center">
              <Plus size={64} />
            </div>
          </Link>
        </div>
        {plants.map((plant, index) => (
          <div key={index} className="pl-4">
            <PlantCard plant={plant} />
          </div>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
