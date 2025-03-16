"use client";

import { Combobox, ComboxOption } from "@/components/combobox";
import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import { SeedDatabaseDTO } from "@/lib/seed-database";
import { useState } from "react";
import { useFetchApi } from "@/lib/use-api";
import { SeedDTO } from "@/lib/seed";

function makeComboboxOptionFromStringArray(arr: string[]): ComboxOption[] {
  return arr.map((item) => ({
    value: item.trim().toLowerCase().replaceAll(" ", "-"),
    label: item,
  }));
}

export default function StartGrowingProcessPage() {
  const { data: seedDatabases } = useFetchApi<SeedDatabaseDTO[]>(`http://localhost:8000/seed_databases/seeds`, {
    requireAuth: true,
    enabled: true,
  });

  const { data: seeds } = useFetchApi<SeedDTO[]>(`http://localhost:8000/seeds`, {
    requireAuth: true,
    enabled: true,
  });

  const [, setSelectedSeed] = useState<ComboxOption | null>(null);
  const [, setSelectedSeedDatabase] = useState<ComboxOption | null>(null);

  const handleSeedChange = (seed: ComboxOption) => {
    setSelectedSeed(seed);
  };

  const handleSeedDatabaseChange = (seedDatabase: ComboxOption) => {
    setSelectedSeedDatabase(seedDatabase);
  };

  const [startDate, setStartDate] = useState<Date>(new Date());

  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
  };

  return (
    <div className={"container mx-auto py-8"}>
      <div>
        <div>seed</div>
        <Combobox
          options={makeComboboxOptionFromStringArray(seeds?.map((x) => x.specific_name) ?? [])}
          onSelect={handleSeedChange}
        />
      </div>

      <div>
        <div>seed database</div>
        <Combobox
          options={makeComboboxOptionFromStringArray(seedDatabases?.map((x) => x.name) ?? [])}
          onSelect={handleSeedDatabaseChange}
        />
      </div>

      <div>
        <div>start date</div>
        <DatePicker initialDate={startDate} onDateChange={handleStartDateChange} />
      </div>

      <div>
        <Button variant="default">start growing</Button>
      </div>
    </div>
  );
}
