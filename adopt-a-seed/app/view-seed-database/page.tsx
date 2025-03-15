"use client";

import { getSeedDatabaseDummyData } from "@/lib/seed-database";
import { columns } from "./components/ui/columns";
import { DataTable } from "./components/ui/data-table";

export default function ViewSeedDatabasePage() {
  const data = getSeedDatabaseDummyData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
