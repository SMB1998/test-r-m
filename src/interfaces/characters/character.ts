export interface Character {
  id: number;
  name: string;
  image: string;
  gender: string;
  species: string;
  status: string;
  type: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
}
