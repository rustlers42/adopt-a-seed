"use client";

import { columns } from "./components/ui/columns";
import { DataTable } from "./components/ui/data-table";
import { useFetchApi } from "@/lib/use-api";
import { SeedDatabaseDTO } from "@/lib/seed-database";

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
