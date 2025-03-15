"use client";

import { Combobox, ComboxOption } from "@/components/combobox";
import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import { getUniqueSeedDatabases, getUniqueSeeds } from "@/lib/seed-database";
import { useState } from "react";

function makeComboboxOptionFromStringArray(arr: string[]): ComboxOption[] {
  return arr.map((item) => ({
    value: item.trim().toLowerCase().replaceAll(" ", "-"),
    label: item,
  }));
}

export default function StartGrowingProcessPage() {
  const seeds: ComboxOption[] = makeComboboxOptionFromStringArray(getUniqueSeeds());

  const seedDatabases: ComboxOption[] = makeComboboxOptionFromStringArray(getUniqueSeedDatabases());

  const [selectedSeed, setSelectedSeed] = useState<ComboxOption | null>(null);
  const [selectedSeedDatabase, setSelectedSeedDatabase] = useState<ComboxOption | null>(null);

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
    <>
      <div>
        <div>seed</div>
        <Combobox options={seeds} onSelect={handleSeedChange} />
      </div>

      <div>
        <div>seed database</div>
        <Combobox options={seedDatabases} onSelect={handleSeedDatabaseChange} />
      </div>

      <div>
        <div>start date</div>
        <DatePicker initialDate={startDate} onDateChange={handleStartDateChange} />
      </div>

      <div>
        <Button variant="default">start growing</Button>
      </div>
    </>
  );
}
