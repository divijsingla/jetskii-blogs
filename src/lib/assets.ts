const base = import.meta.env.BASE_URL;

export const assetUrl = (path: string): string =>
  `${base}assets/${path.replace(/^\//, "")}`;
