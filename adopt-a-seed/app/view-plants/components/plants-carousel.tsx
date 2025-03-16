"use client";

import { ScrollBar } from "@/components/ui/scroll-area";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

import { PlantDTO } from "@/lib/plant";
import { PlantCard } from "@/app/view-plants/components/plant-card";

interface PlantsCarouselProps {
  plants: PlantDTO[] | null;
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
        {!plants
          ? Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="shrink-0 overflow-hidden">
                <div className="border rounded-md p-4 w-48 h-64 flex flex-col justify-between">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))
          : plants.map((plant, index) => (
              <div key={index} className="shrink-0 overflow-hidden">
                <PlantCard plant={plant} />
              </div>
            ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
