"use client";

import { SeedDatabaseDTO } from "@/lib/seed-database";
import { useFetchApi } from "@/lib/use-api";
import { columns } from "./components/ui/columns";
import { DataTable } from "./components/ui/data-table";

export default function ViewSeedDatabasePage() {
  const { data: entries, isLoading } = useFetchApi<SeedDatabaseDTO[]>(`http://localhost:8000/seed_databases/seeds`, {
    requireAuth: false,
    enabled: true,
  });

  let expandedEntries = entries;

  if (!isLoading && entries) {
    expandedEntries = [];

    for (const entry of entries) {
      if (entry.seeds.length === 0) {
        expandedEntries.push(entry);
        continue;
      }

      for (const seed of entry.seeds) {
        expandedEntries.push({ ...entry, seeds: [seed] });
      }
    }
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={expandedEntries} />
    </div>
  );
}
