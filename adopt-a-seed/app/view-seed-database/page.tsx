"use client";

import { columns } from "./components/ui/columns";
import { DataTable } from "./components/ui/data-table";
import { useFetchApi } from "@/lib/use-api";

type SeedDTO = {
  category: string;
  id: number;
  specific_name: string;
};

export type SeedDatabaseDTO = {
  id: number;
  name: string;
  contact: string;
  seeds: SeedDTO[];
};

export default function ViewSeedDatabasePage() {
  const { data: entries, isLoading } = useFetchApi<SeedDatabaseDTO[]>(`http://localhost:8000/seed_databases/seeds`, {
    requireAuth: true,
    enabled: true,
  });

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={entries} />
    </div>
  );
}
