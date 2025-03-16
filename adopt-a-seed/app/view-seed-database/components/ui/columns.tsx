"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { SeedDatabaseDTO } from "@/app/view-seed-database/page";

export const columns: ColumnDef<SeedDatabaseDTO>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Database
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorFn: (row) => (row.seeds.length > 0 ? row.seeds[0].category : "N/A"),
    id: "seeds.category",
    header: "Category",
  },
  {
    accessorFn: (row) => (row.seeds.length > 0 ? row.seeds[0].specific_name : "N/A"),
    id: "seeds.specific",
    header: "Specific",
  },
  {
    accessorKey: "contact",
    header: "Email",
  },
];
