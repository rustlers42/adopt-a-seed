export class Seed {
  constructor(
    public category: string,
    public specific: string,
  ) {}
}

export type SeedDTO = {
  category: string;
  id: number;
  specific_name: string;
};
