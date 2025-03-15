import { Plant } from "@/lib/plant";
import { format } from "date-fns";
import Link from "next/link";

interface PlantCardProps {
  plant: Plant;
}

export function PlantCard({ plant }: PlantCardProps) {
  return (
    <Link href={`/view-grow-information/${plant.id}`}>
      <div className="border rounded-md p-4 w-48 h-64 flex flex-col justify-between cursor-pointer">
        <div>
          <h2 className="text-lg font-bold">{plant.seed.category}</h2>
          <p className="text-sm text-muted-foreground">{plant.seed.specific}</p>
        </div>
        <div>
          <p className="text-sm">Planted at:</p>
          <p className="text-sm font-medium">{format(new Date(plant.planted_at), "PPP")}</p>
        </div>
      </div>
    </Link>
  );
}
