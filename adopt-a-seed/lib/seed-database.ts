import { SeedDTO } from "./seed";

export type SeedDatabaseDTO = {
  id: number;
  name: string;
  contact: string;
  seeds: SeedDTO[];
};
