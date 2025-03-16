import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";

export type PlantDTO = {
  id: number;
  seed_category: string;
  seed_specific: string;
  current_status: string;
  planted_at: string;
};

interface PlantCardProps {
  plant: PlantDTO;
}

export function PlantCard({ plant }: PlantCardProps) {
  return (
    <Link href={`/view-grow-information/${plant.id}`} className="block">
      <Card className="w-48 h-64 cursor-pointer relative overflow-hidden border-2 border-primary/50 transition-all duration-300 hover:border-primary hover:shadow-lg bg-card">
        {/* Background image as a separate element with its own opacity */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/plant-bg.png"
            alt="Plant background"
            fill
            className="opacity-20 object-cover"
            sizes="(max-width: 768px) 100vw, 192px"
          />
        </div>

        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/50 to-background/90 z-10"></div>

        {/* Card content positioned on top of the background */}
        <div className="relative z-20 flex flex-col justify-between h-full">
          <CardHeader className="pb-0">
            <CardTitle className="text-foreground text-lg">{plant.seed_category}</CardTitle>
            <CardDescription>{plant.seed_specific}</CardDescription>
          </CardHeader>

          <CardFooter className="pt-0 mt-auto flex flex-col items-start">
            {plant.planted_at && (
              <p className="text-sm font-medium text-foreground">{format(new Date(plant.planted_at), "PPP")}</p>
            )}
            <p className="text-sm font-medium text-foreground mt-2">{plant.current_status}</p>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
}
