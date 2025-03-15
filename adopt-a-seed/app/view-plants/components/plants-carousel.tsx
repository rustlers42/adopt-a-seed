"use client";

import { PlantCard } from "@/components/plant-card";
import { ScrollBar } from "@/components/ui/scroll-area";
import { Plant } from "@/lib/plant";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Plus } from "lucide-react";
import Link from "next/link";

interface PlantsCarouselProps {
  plants: Plant[];
}

export function PlantsCarousel({ plants }: PlantsCarouselProps) {
  return (
    <ScrollArea className="custom-scrollbar whitespace-nowrap overflow-auto">
      <div className="flex w-max space-x-4 p-4">
        <div className="shrink-0">
          <Link href="/start-growing-process">
            <div className="border rounded-md p-4 w-48 h-64 flex items-center justify-center">
              <Plus size={64} />
            </div>
          </Link>
        </div>
        {plants.map((plant, index) => (
          <div key={index} className="shrink-0 overflow-hidden">
            <PlantCard plant={plant} />
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
