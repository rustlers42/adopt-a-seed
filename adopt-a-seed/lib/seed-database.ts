// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export class SeedDatabase {
  constructor(
    public name: string,
    public contact: string,
    public seeds: string[]
  ) {}
}

export function getSeedDatabaseDummyData(): SeedDatabase[] {
  const databases = [
    new SeedDatabase('Manhattan Seed Database', 'example@example.com', [
      'Siberian Tomato',
      'Yukon Gold Potato',
    ]),
    new SeedDatabase('Brooklyn Seed Bank', 'contact@brooklynseed.com', [
      'Nantes Carrot',
      'Butterhead Lettuce',
    ]),
    new SeedDatabase('Queens Urban Seeds', 'info@queensseeds.org', [
      'Genovese Basil',
      'Greek Oregano',
    ]),
    new SeedDatabase('Bronx Green Seeds', 'support@bronxgreens.com', [
      'Bell Pepper',
      'Marketmore Cucumber',
    ]),
    new SeedDatabase(
      'Staten Island Seed Vault',
      'admin@statenislandseeds.com',
      ['Bloomsdale Spinach', 'Lacinato Kale']
    ),
    new SeedDatabase('Chicago Seed Repository', 'contact@chicagoseeds.com', [
      'Roma Tomato',
      'Black Beauty Zucchini',
    ]),
    new SeedDatabase('San Francisco Seed Library', 'info@sfseedlibrary.org', [
      'Tuscan Blue Rosemary',
      'English Thyme',
    ]),
    new SeedDatabase(
      'Los Angeles Seed Exchange',
      'support@laseedexchange.com',
      ['Spearmint', 'Italian Flat Leaf Parsley']
    ),
    new SeedDatabase('Seattle Seed Collective', 'admin@seattleseeds.com', [
      'Garlic Chives',
      'Fernleaf Dill',
    ]),
    new SeedDatabase('Portland Seed Network', 'contact@portlandseeds.net', [
      'Slow Bolt Cilantro',
      'Common Sage',
    ]),
  ];

  return databases.flatMap((database) =>
    database.seeds.map(
      (seed) => new SeedDatabase(database.name, database.contact, [seed])
    )
  );
}
