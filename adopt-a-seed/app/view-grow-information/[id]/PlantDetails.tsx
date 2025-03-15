import { Plant } from "@/lib/plant";

export default function PlantDetails({ plant }: { plant: Plant }) {
  return (
    <div>
      <p>ID: {plant.id}</p>
      <p>Category: {plant.seed.category}</p>
      <p>Specific: {plant.seed.specific}</p>
      <p>Planted At: {plant.planted_at.toDateString()}</p>
    </div>
  );
}
