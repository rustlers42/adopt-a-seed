'use client';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export class SeedDatabase {
  constructor(
    public name: string,
    public contact: string,
    public seeds: string[]
  ) {}
}

export const columns: ColumnDef<SeedDatabase>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Database
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'contact',
    header: 'Email',
  },
  {
    accessorKey: 'seeds',
    header: 'Seed',
  },
];
