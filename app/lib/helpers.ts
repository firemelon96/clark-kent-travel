import { notFound } from "next/navigation";
import { tours } from "../data/tours";
import { TourPackage } from "@/types/tour";
import { hotels } from "../data/hotels";
// import { transfer_services } from "../data/logistics";
// import { fastCrafts } from "../data/fast-craft";

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

export const getPackageTours = () => {
  const dayTours = tours.filter((tour) => tour.type === "package");

  return dayTours;
};

export const getTourById = (id: string) => {
  const tour = tours.find((tour) => tour.tourId === id);
  if (tour === undefined) return notFound();
  return tour;
};

export const getPackageToursByLocation = (address: string) => {
  const tour = tours.filter(
    (tour) =>
      tour.address[0].toLowerCase().includes(address.toLowerCase()) &&
      tour.type === "package",
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

// export const getServicesByType = (type: string) => {
//   const otherservices = transfer_services
//     .filter((transfer) => transfer.type === type)
//     .map((transfer) => ({
//       id: transfer.id,
//       image: transfer.image,
//       price_per_trip: transfer.price_per_trip,
//       service_name: transfer.service_name,
//       vehicle_type: transfer.vehicle_type,
//     }));

//   return otherservices;
// };

// export const getOtherServicesById = (id: string) => {
//   const otherServices = transfer_services.find((service) => service.id === id);
//   if (otherServices === undefined) return notFound();

//   return otherServices;
// };

// export const getFastCraftById = (id: string) => {
//   const fastcraft = fastCrafts.find((fastcraft) => fastcraft.id === id);
//   if (fastcraft === undefined) return notFound();

//   return fastcraft;
// };

export const getTravelTours = ({
  location,
  type,
}: {
  location: string;
  type: string;
}) => {
  let datas: TourPackage[] = [];

  if (location === "all" && type === "all types") {
    datas = tours;
  } else {
    if (location && type === "all types") {
      datas = tours.filter((tour) => tour.address.includes(location));
    } else if (type && location === "all") {
      datas = tours.filter((tour) => tour.type === type);
    } else {
      datas = tours.filter(
        (tour) => tour.address.includes(location) && tour.type === type,
      );
    }
  }

  return datas;
};

export const getHotel = (id: string) => {
  const hotel = hotels.find((hotel) => hotel.id === id);
  if (!hotel) return notFound();

  return hotel;
};
