export interface Category {
  id: string;
  label: string;
  navLabel?: string;
  inNav: boolean;
}

export const categories = [
  { id: "musings", label: "Musings", inNav: true },
  { id: "misc", label: "Miscellaneous", navLabel: "Misc", inNav: true },
  { id: "math", label: "Mathematics", inNav: false },
  { id: "tech", label: "Technology", navLabel: "Tech", inNav: true },
  { id: "music", label: "Music", inNav: false },
] as const satisfies readonly Category[];

export type CategoryId = (typeof categories)[number]["id"];

export const navCategories = categories.filter((c) => c.inNav);

export const getCategoryLabel = (id: string): string =>
  categories.find((c) => c.id === id)?.label ?? id;
