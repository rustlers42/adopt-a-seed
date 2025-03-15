// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export class SeedDatabase {
  constructor(
    public name: string,
    public contact: string,
    public seeds: string[]
  ) {}
}
