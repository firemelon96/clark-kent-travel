type Itinerary = {
  name: string;
  activities: string[];
};

export type TourPackage = {
  tourId: string;
  tourName: string;
  isFeatured?: boolean | undefined;
  iti: string;
  type: string;
  price?: number | number[] | undefined;
  isPax?: boolean | undefined;
  privatePrice?: number[] | undefined;
  address: string[];
  description: string;
  itineraries: Itinerary[];
  duration: string[];
  inclusions: string[];
  exclusions: string[];
  note?: string[] | undefined;
  reminders?: string[] | undefined;
  images: string[];
  minParticipants: number;
  maxParticipants: number;
};
