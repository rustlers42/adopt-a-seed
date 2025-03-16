"use client";

import { columns } from "./components/ui/columns";
import { DataTable } from "./components/ui/data-table";
import { useFetchApi } from "@/lib/use-api";
import { SeedDatabaseDTO } from "@/lib/seed-database";

export default function ViewSeedDatabasePage() {
  let { data: entries, isLoading } = useFetchApi<SeedDatabaseDTO[]>(`http://localhost:8000/seed_databases/seeds`, {
    requireAuth: true,
    enabled: true,
  });

  if (!isLoading && entries) {
    const expandedEntries = [];

    for (const entry of entries) {
      if (entry.seeds.length === 0) {
        expandedEntries.push(entry);
        continue;
      }

      for (const seed of entry.seeds) {
        expandedEntries.push({ ...entry, seeds: [seed] });
      }
    }

    entries = expandedEntries;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={entries} />
    </div>
  );
}
