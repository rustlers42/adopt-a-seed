'use client';

import { Combobox, ComboxOption } from '@/components/combobox';
import { DatePicker } from '@/components/date-picker';

export default function StartGrowingProcessPage() {
  const seeds: ComboxOption[] = [
    { value: 'tomato', label: 'Tomato' },
    { value: 'cucumber', label: 'Cucumber' },
    { value: 'pepper', label: 'Pepper' },
  ];

  const seedDatabases: ComboxOption[] = [
    { value: 'seed-db-1', label: 'Seed Database 1' },
    { value: 'seed-db-2', label: 'Seed Database 2' },
    { value: 'seed-db-3', label: 'Seed Database 3' },
  ];

  return (
    <>
      <div className="mx-auto py-10">start growing process</div>
      <div>
        <div>seed</div>
        <Combobox options={seeds} />
      </div>

      <div>
        <div>seed database</div>
        <Combobox options={seedDatabases} />
      </div>

      <div>
        <div>start date</div>
        <DatePicker />
      </div>
    </>
  );
}
