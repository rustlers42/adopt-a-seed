import { getPlantById } from "../../../lib/plant";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const plant = getPlantById(Number(id));

  if (!plant) {
    return <div>Plant not found</div>;
  }

  return (
    <div>
      <h1>Plant Information</h1>
      <p>ID: {plant.id}</p>
      <p>Category: {plant.seed.category}</p>
      <p>Specific: {plant.seed.specific}</p>
      <p>Planted At: {plant.planted_at.toDateString()}</p>
    </div>
  );
}
