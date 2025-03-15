'use client';

import { Button } from '@/components/ui/button';
import { SeedDatabase } from '@/lib/seed-database';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

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
