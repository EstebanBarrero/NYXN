import { BASE_URL } from "@/constants";

/** Typed API error — carries HTTP status so callers can handle 429 vs 404 etc. */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function get<T>(endpoint: string, revalidate = 60): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  const res = await fetch(url, { next: { revalidate } });

  if (!res.ok) {
    throw new ApiError(
      res.status,
      `HTTP ${res.status}: ${res.statusText} — ${url}`
    );
  }

  return res.json() as Promise<T>;
}

export const httpClient = { get };
