import { getPlantById } from "../../../lib/plant";
import PlantDetails from "./PlantDetails";
import PlantSurvey from "./PlantSurvey";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const plant = getPlantById(Number(id));

  if (!plant) {
    return <div>Plant not found</div>;
  }

  return (
    <div>
      <h1>Plant Information</h1>
      <PlantDetails plant={plant} />
      <PlantSurvey />
    </div>
  );
}
