import { Seed } from "./seed";
import { getUniqueSeedsClass } from "./seed-database";

export class Plant {
  constructor(
    public seed: Seed,
    public planted_at: Date,
  ) {}
}

export const getPlantsDummyData = [
  new Plant(getUniqueSeedsClass()[0], new Date()),
  new Plant(getUniqueSeedsClass()[1], new Date()),
  new Plant(getUniqueSeedsClass()[3], new Date()),
  new Plant(getUniqueSeedsClass()[3], new Date()),
  new Plant(getUniqueSeedsClass()[4], new Date()),
  new Plant(getUniqueSeedsClass()[2], new Date()),
  new Plant(getUniqueSeedsClass()[5], new Date()),
  new Plant(getUniqueSeedsClass()[3], new Date()),
];
