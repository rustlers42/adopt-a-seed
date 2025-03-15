import { Seed } from "./seed";
import { getUniqueSeedsClass } from "./seed-database";

export class Plant {
  constructor(
    public id: number, // added id field
    public seed: Seed,
    public planted_at: Date,
  ) {}
}

export const getPlantsDummyData = [
  new Plant(1, getUniqueSeedsClass()[0], new Date()),
  new Plant(2, getUniqueSeedsClass()[1], new Date()),
  new Plant(3, getUniqueSeedsClass()[3], new Date()),
  new Plant(4, getUniqueSeedsClass()[3], new Date()),
  new Plant(5, getUniqueSeedsClass()[4], new Date()),
  new Plant(6, getUniqueSeedsClass()[2], new Date()),
  new Plant(7, getUniqueSeedsClass()[5], new Date()),
  new Plant(8, getUniqueSeedsClass()[3], new Date()),
];
