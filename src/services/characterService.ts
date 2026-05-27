import { httpClient } from "./httpClient";
import { ENDPOINTS } from "@/constants";
import type { CharacterApiResponse } from "@/types";

export const characterService = {
  getAll: (name = "", page = 1): Promise<CharacterApiResponse> => {
    const params = new URLSearchParams();
    if (name) params.set("name", name);
    params.set("page", String(page));

    return httpClient.get<CharacterApiResponse>(
      `${ENDPOINTS.CHARACTER}?${params.toString()}`
    );
  },

  getById: (id: number): Promise<CharacterApiResponse["results"][0]> =>
    httpClient.get(`${ENDPOINTS.CHARACTER}/${id}`),
};
