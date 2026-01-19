export const accommodtions = [
  {
    id: "clark-kent-homestay",
    name: "Clark Kent Homestay",
    description:
      "Clark Kent Homestay offers a cozy and welcoming environment in Puerto Princesa, perfect for families and groups. Enjoy air-conditioned rooms, a fully equipped kitchen, and convenient amenities such as free WiFi, breakfast, and airport shuttle service for a comfortable stay.",
    information: {
      checkIn: "2:00 PM",
      checkOut: "12:00 NN",
      mapLink:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3931.9847532849335!2d118.75335960000001!3d9.767356999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33b5636784f4dc75%3A0x795a26301846cb50!2sClark%20Kent%20Homestay%20%2F%20Transient!5e0!3m2!1sen!2sph!4v1768803529221!5m2!1sen!2sph",
      about:
        "Clark Kent Homestay / Transient is conveniently located along Libis C. Factor Road in Puerto Princesa City, Palawan, offering a quiet yet highly accessible place to stay. The property sits just minutes away from Robinsons Place Palawan, making it easy for guests to access shopping, dining, groceries, and essential services.",
    },
    location: "Puerto Princesa",
    inclusions: ["Breakfast", "Free WiFi", "Airport Shuttle"],
    exclusions: ["Mini Bar", "Laundry Service"],
    amenities: [
      "Kitchen",
      "Laundry area",
      "Towels",
      "Beddings",
      "Dining utensils",
      "Airconditioned room",
      "Tv",
      "Ref",
      "Wifi",
    ],
    pricing: [
      {
        type: "Homestay",
        isGroupSize: true,
        minGroupSize: 1,
        maxGroupSize: 10,
        price: 3800,
      },
    ],
    rating: 4.5,
    images: [
      "/resources/ckhomestay/ckhomestay000.avif",
      "/resources/ckhomestay/ckhomestay001.avif",
      "/resources/ckhomestay/ckhomestay002.avif",
      "/resources/ckhomestay/ckhomestay003.avif",
      "/resources/ckhomestay/ckhomestay004.avif",
      "/resources/ckhomestay/ckhomestay005.avif",
      "/resources/ckhomestay/ckhomestay006.avif",
      "/resources/ckhomestay/ckhomestay007.avif",
    ],
    maxPax: 10,
  },
  {
    id: "ckc-loftstyle-apartment",
    name: "CKC Loftstyle Apartment",
    location: "Puerto Princesa",
    description:
      "CKC Loftstyle Apartment provides a modern and stylish stay in Puerto Princesa, ideal for travelers seeking comfort and convenience. The apartment features spacious loft-style interiors, air-conditioned rooms, a fully equipped kitchen, and essential amenities. Guests can enjoy complimentary breakfast, a welcome drink, and secure parking, making it a perfect choice for both short and extended stays.",
    information: {
      checkIn: "2:00 PM",
      checkOut: "12:00 NN",
      mapLink:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3469.8636873767787!2d118.745096402026!3d9.73765078688158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33b563f337ae9c73%3A0xc7be529ee74cae42!2sCKC%20Loftstyle%20Apartment!5e0!3m2!1sen!2sph!4v1768807513641!5m2!1sen!2sph",
      about:
        "CKC Loftstyle Apartment is centrally located along Tamilok Road in Puerto Princesa City, Palawan, placing guests right in the heart of the city's cultural and dining district. The apartment is just a short walk or drive from Rizal Avenue, home to some of Puerto Princesa's most popular restaurants such as Kinabuchs Grill and Bar, Kalui Seafood Restaurant, and other well-known local dining spots.",
    },
    inclusions: ["Breakfast", "Welcome Drink", "Parking"],
    exclusions: ["Room Service", "Pet Accommodation"],
    amenities: [
      "Kitchen",
      "Laundry area",
      "Towels",
      "Beddings",
      "Dining utensils",
      "Airconditioned room",
      "Tv",
      "Ref",
      "Wifi",
    ],
    pricing: [
      {
        type: "Apartment",
        isGroupSize: true,
        minGroupSize: 1,
        maxGroupSize: 10,
        price: 3800,
      },
    ],
    rating: 4.7,
    images: [
      "/resources/ckc/ckc000.avif",
      "/resources/ckc/ckc001.avif",
      "/resources/ckc/ckc002.avif",
      "/resources/ckc/ckc003.avif",
      "/resources/ckc/ckc004.avif",
      "/resources/ckc/ckc005.avif",
    ],
    maxPax: 10,
  },
];
