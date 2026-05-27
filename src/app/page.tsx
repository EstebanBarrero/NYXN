import { characterService } from "@/services";
import { CharacterGrid } from "@/components/organisms";
import { MainLayout } from "@/components/templates";
import type { Character } from "@/types";

export default async function HomePage() {
  let initialCharacters: Character[] = [];
  try {
    const data = await characterService.getAll("", 1);
    initialCharacters = data.results;
  } catch {
    initialCharacters = [];
  }

  return (
    <MainLayout>
      <CharacterGrid initialData={initialCharacters} />
    </MainLayout>
  );
}
