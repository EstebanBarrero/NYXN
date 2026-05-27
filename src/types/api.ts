import type { Character } from "./character";

export interface PageInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface ApiResponse<T> {
  info: PageInfo;
  results: T[];
}

export type CharacterApiResponse = ApiResponse<Character>;
