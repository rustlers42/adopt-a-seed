import { Seed } from "./seed";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export class SeedDatabase {
  constructor(
    public name: string,
    public contact: string,
    public seeds: Seed[],
  ) {}
}

const databases = [
  new SeedDatabase("Manhattan Seed Database", "example@example.com", [
    new Seed("Tomato", "Siberian Tomato"),
    new Seed("Potato", "Yukon Gold Potato"),
  ]),
  new SeedDatabase("Brooklyn Seed Bank", "contact@brooklynseed.com", [
    new Seed("Carrot", "Nantes Carrot"),
    new Seed("Lettuce", "Butterhead Lettuce"),
  ]),
  new SeedDatabase("Queens Urban Seeds", "info@queensseeds.org", [
    new Seed("Basil", "Genovese Basil"),
    new Seed("Oregano", "Greek Oregano"),
  ]),
  new SeedDatabase("Bronx Green Seeds", "support@bronxgreens.com", [
    new Seed("Pepper", "Bell Pepper"),
    new Seed("Cucumber", "Marketmore Cucumber"),
  ]),
  new SeedDatabase("Staten Island Seed Vault", "admin@statenislandseeds.com", [
    new Seed("Spinach", "Bloomsdale Spinach"),
    new Seed("Kale", "Lacinato Kale"),
  ]),
  new SeedDatabase("Chicago Seed Repository", "contact@chicagoseeds.com", [
    new Seed("Tomato", "Roma Tomato"),
    new Seed("Zucchini", "Black Beauty Zucchini"),
  ]),
  new SeedDatabase("San Francisco Seed Library", "info@sfseedlibrary.org", [
    new Seed("Rosemary", "Tuscan Blue Rosemary"),
    new Seed("Thyme", "English Thyme"),
  ]),
  new SeedDatabase("Los Angeles Seed Exchange", "support@laseedexchange.com", [
    new Seed("Mint", "Spearmint"),
    new Seed("Parsley", "Italian Flat Leaf Parsley"),
  ]),
  new SeedDatabase("Seattle Seed Collective", "admin@seattleseeds.com", [
    new Seed("Chives", "Garlic Chives"),
    new Seed("Dill", "Fernleaf Dill"),
  ]),
  new SeedDatabase("Portland Seed Network", "contact@portlandseeds.net", [
    new Seed("Cilantro", "Slow Bolt Cilantro"),
    new Seed("Sage", "Common Sage"),
  ]),
];

export function getSeedDatabaseDummyData(): SeedDatabase[] {
  return databases.flatMap((database) =>
    database.seeds.map((seed) => new SeedDatabase(database.name, database.contact, [seed])),
  );
}

export function getUniqueSeedDatabases(): string[] {
  return Array.from(new Set(databases.map((database) => database.name)));
}

export function getUniqueSeeds(): string[] {
  return Array.from(new Set(databases.flatMap((database) => database.seeds.map((seed) => seed.specific))));
}
