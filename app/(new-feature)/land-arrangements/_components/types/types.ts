export type Options = {
  name: string;
  iti: string;
  price: number;
  itineraries: {
    day: number;
    activities: string[];
  }[];
};
