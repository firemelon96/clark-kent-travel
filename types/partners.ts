type RoomType = {
  name: string;
  roomConfig: string;
  pricePerNight: number;
};

type Policy = {
  title: string;
  list: string[];
};

export type PartnersType = {
  id: string;
  name: string;
  roomType: RoomType[];
  address: string;
  description: string;
  inclusions: string[];
  exclusiong: string[];
  notes: string[];
  policies: Policy[];
  termsConditions: string[];
  images: string[];
};
