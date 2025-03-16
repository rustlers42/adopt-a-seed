import PlantPage from "./PlantPage";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <PlantPage id={id} />;
}
