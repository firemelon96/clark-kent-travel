export type TransferServicesType = {
  id: string;
  service_name: string;
  type: "transfer" | "rentals";
  vehicle_type: string;
  capacity: number;
  price_per_trip: number;
  description: string;
  availability: string;
  image: string;
};

export type TransferWihtoutMeta = Pick<
  TransferServicesType,
  "id" | "image" | "price_per_trip" | "vehicle_type" | "service_name"
>;

export type AccomodationType = {
  id: string;
  name: string;
  address: string;
  price_per_night: number;
  description: string;
  inclusions: string[];
  images: string[];
};

