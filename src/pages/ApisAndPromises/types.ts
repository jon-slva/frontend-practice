export type CardData = {
  name: string;
  subtitle: string;
  image: string;
  description: string;
  code?: string;
};

export type NasaNEOData = {
  links: {};
  element_count: "";
  near_earth_objects: {};
};

export type CardType = "async/await" | "then/catch" | "pre-ES6";
