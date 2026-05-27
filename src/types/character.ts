export interface Character {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  gender: string;
  image: string;
  location: {
    name: string;
  };
  origin: {
    name: string;
  };
  episode: string[];
  type: string;
  url: string;
  created: string;
}

export type CharacterStatus = Character["status"];
