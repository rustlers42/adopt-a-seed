import { PlantDTO } from "@/app/page";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

export default function PlantDetails({ plant }: { plant: PlantDTO | null }) {
  if (!plant) {
    return (
      <div>
        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    );
  }

  return (
    <div>
      <p>ID: {plant.id}</p>
      <p>Category: {plant.seed_category}</p>
      <p>Specific: {plant.seed_specific}</p>
      <p>Planted At: {format(new Date(plant.planted_at), "PPP")}</p>
    </div>
  );
}
