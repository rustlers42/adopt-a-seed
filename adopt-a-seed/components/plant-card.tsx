import { format } from "date-fns";
import Link from "next/link";

import { PlantDTO } from "@/lib/plant";

interface PlantCardProps {
  plant: PlantDTO;
}

export function PlantCard({ plant }: PlantCardProps) {
  return (
    <Link href={`/view-grow-information/${plant.id}`}>
      <div className="border rounded-md p-4 w-48 h-64 flex flex-col justify-between cursor-pointer">
        <div>
          <h2 className="text-lg font-bold">{plant.seed_category}</h2>
          <p className="text-sm text-muted-foreground">{plant.seed_specific}</p>
        </div>
        <div>
          {plant.planted_at && <p className="text-sm font-medium">{format(new Date(plant.planted_at), "PPP")}</p>}
          <p className="text-sm font-medium">{plant.current_status}</p>
        </div>
      </div>
    </Link>
  );
}
