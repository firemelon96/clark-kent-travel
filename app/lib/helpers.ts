import { notFound } from "next/navigation";
import { tours } from "../data/tours";

interface TourLocationProps {
  address: string;
  image: string;
}

export const formatPeso = (amount: number) => {
  const peso = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);

  return peso;
};

export const getFeaturedTours = () => {
  const featuredTours = tours.filter((tour) => tour.isFeatured === true);

  return featuredTours;
};

export const getDayTours = () => {
  const dayTours = tours.filter((tour) => tour.type === "day tour");

  return dayTours;
};

export const getTourById = (id: string) => {
  const tour = tours.find((tour) => tour.tourId === id);
  if (tour === undefined) return notFound();
  return tour;
};

export const getToursByLocation = (address: string) => {
  const tour = tours.filter((tour) =>
    tour.address[0].toLowerCase().includes(address.toLowerCase()),
  );

  return tour;
};

export const getAllTourLocation = () => {
  const uniqueAddressesWithImage: TourLocationProps[] = tours.reduce(
    (acc, item) => {
      item.address.forEach((address) => {
        // Check if the address is already in the accumulator
        if (!acc.some((entry) => entry.address === address)) {
          acc.push({ address, image: item.images[0] });
        }
      });
      return acc;
    },
    [] as TourLocationProps[],
  );

  return uniqueAddressesWithImage;
};
