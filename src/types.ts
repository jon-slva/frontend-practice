export type CardData = {
  name: string;
  subtitle: string;
  image: string;
  description: string;
  code?: string;
};

export type CloseApproachData = {
  close_approach_date: string;
  close_approach_date_full: string;
  epoch_date_close_approach: number;
  relative_velocity: {
    kilometers_per_second: string;
    kilometers_per_hour: string;
    miles_per_hour: string;
  };
  miss_distance: {
    astronomical: string;
    lunar: string;
    kilometers: string;
    miles: string;
  };
  orbiting_body: string;
};

export type NearEarthObject = {
  links: {};
  id: string;
  neo_reference_id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: {};
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: CloseApproachData[];
  is_entry_object: boolean;
};

export type NasaNEOData = {
  links: {
    [key: string]: string;
  };
  element_count: "";
  near_earth_objects: {
    [date: string]: NearEarthObject[];
  };
};

export type CardType = "async/await" | "then/catch" | "pre-ES6";
