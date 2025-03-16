import PlantPage from "../components/plant-page";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <PlantPage id={id} />;
}
