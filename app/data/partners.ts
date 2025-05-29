export const partners = [
  // {
  //   id: "mariafe-travellers-inn",
  //   name: "Mariafe Travellers Inn",
  //   roomType: [
  //     {
  //       name: "Semi deluxe",
  //       roomConfig: "1 Double Bed 54*75",
  //       pricePerNight: 1600,
  //     },
  //     {
  //       name: "Superior twin",
  //       roomConfig: "2 Double Bed 48*75",
  //       pricePerNight: 1600,
  //     },
  //     {
  //       name: "Superior triple",
  //       roomConfig: "1 Single / Double 36*75 / 48*75",
  //       pricePerNight: 2100,
  //     },
  //     {
  //       name: "Superior quad",
  //       roomConfig: "2 Double Bed 48*75",
  //       pricePerNight: 2600,
  //     },
  //     {
  //       name: "Family room",
  //       roomConfig: "2 Double Bed 1 extra mattress",
  //       pricePerNight: 3000,
  //     },
  //     {
  //       name: "Barkada room",
  //       roomConfig: "2 Double Bed 2 extra mattress",
  //       pricePerNight: 3300,
  //     },
  //   ],
  //   address:
  //     "Tamilok Rd. Lagan Street, Barangay Milagrosa, Puerto Princesa, Philippines, 5300",
  //   description:
  //     "Mariafe Travellers Inn is a charming and affordable accommodation option, perfect for budget-conscious travelers looking for comfort and convenience. Located in a peaceful area but close to key attractions, shops, and local dining spots, the inn provides a relaxing environment for guests to unwind after a day of exploring. The rooms are clean and well-maintained, offering essential amenities such as air conditioning, free Wi-Fi, and en suite bathrooms. Guests can also enjoy friendly service, with staff dedicated to making your stay comfortable and enjoyable. Mariafe Travellers Inn is an ideal choice for solo travelers, families, or groups seeking a welcoming home away from home.",
  //   inclusions: [
  //     "24 sqm airconditioned room with own toilet and bath with hot and cold shower",
  //     "Complimentary daily breakfast",
  //     "Complimentary airport transfer 6:00am - 12:00am",
  //     "Individually controlled split type air-conditioned unit",
  //     "LCD TV & wifi",
  //     "Standard Mattress",
  //     "Electric Kettle",
  //     "Bath Towel, Bath mat and Toiletries",
  //     "Children below 5 years old is free of charge, adullt sharing (Breakfast not Included)",
  //   ],
  //   notes: [
  //     "Airport transfer Car 300/way (Minimum of 5pax)",
  //     "Airport transfer Van 500/way (maximum of 10pax)",
  //   ],
  //   policies: [
  //     {
  //       title: "Child Policy",
  //       list: [
  //         "Children 5 years old below is free of charge on room only (NO EXTRA BED; SHARING WITH ADULTS ONLY)",
  //         "1 child are allowed per superior double & 2 child for superior twin.",
  //         "Kids breakfast is P150.00 per child/ kid.",
  //       ],
  //     },
  //     {
  //       title: "Reservation Fee",
  //       list: ["A 50% reservation fee is required for all confirmed bookings"],
  //     },
  //     {
  //       title: "Cancellation Policy",
  //       list: [
  //         "Any cancellation received more than 15 days prior to arrival will incur 10% of the total room rate.",
  //         "Any cancellation received within 15 days prior to arrival date will incur 50% of the total room rate.",
  //         "Any cancellation received within 5 days prior to arrival date will incur 100% of the total rate. Failure to arrive atyour hotel will be treated as a No-Show and no refund will be given.",
  //       ],
  //     },
  //   ],
  //   termsConditions: [
  //     "Room confirmation is subject to availability. Rate may change without prior notice.",
  //     "Additions may be allowed by the Hotel subject to space availability. Any revision thereof shall be charged as an extra person.",
  //     "For booking changes (i.e., additional number of guests/rooms, etc.), the Reservations Officermust be informed seven (10) days prior to guest arrival for him/her to affect the necessary Revisions on the booking confirmation and quotation.",
  //     "Any incidental charges incurred shall be charge on personal accounts before check out.",
  //     "Check in time is 2:00pm while our check out is 12:00 noon. Hotel allows early check in depending on theavailability of rooms.",
  //     "Maria Fe Travellers Inn shall not liable for failure to carry out such arrangements as mentioned which are caused by Acts of God or conditions beyond our control.",
  //     "Early check-in and Extensions or late check-out are subject to room availability and application of appropriate charges.",
  //     "All terms and rates stated above will be valid only upon our receipt of the signed copy of this contract.",
  //     "We will require a 50% deposit upon confirmation of reservation and the balance can be settled upon arrival of the guest. Booking agreement is invalid without proof of deposit or full payment",
  //   ],
  //   images: [
  //     "/resources/mariafe/mariafe000.avif",
  //     "/resources/mariafe/mariafe001.avif",
  //     "/resources/mariafe/mariafe002.avif",
  //     "/resources/mariafe/mariafe003.avif",
  //     "/resources/mariafe/mariafe005.avif",
  //     "/resources/mariafe/mariafe006.avif",
  //   ],
  // },

  //new format

  {
    id: "HTL001",
    name: "Mariafe Traveller Inn",
    description:
      "Mariafe Travellers Inn is a charming and affordable accommodation option, perfect for budget-conscious travelers looking for comfort and convenience. Located in a peaceful area but close to key attractions, shops, and local dining spots, the inn provides a relaxing environment for guests to unwind after a day of exploring. The rooms are clean and well-maintained, offering essential amenities such as air conditioning, free Wi-Fi, and en suite bathrooms. Guests can also enjoy friendly service, with staff dedicated to making your stay comfortable and enjoyable. Mariafe Travellers Inn is an ideal choice for solo travelers, families, or groups seeking a welcoming home away from home.",
    location: {
      address:
        "Tamilok Rd. Lagan Street, Barangay Milagrosa, Puerto Princesa, Philippines, 5300",
      latitude: 11.9981,
      longitude: 120.2014,
    },
    rooms: [
      {
        roomId: "RM001",
        type: "Semi Deluxe",
        description:
          "A spacious room with a private balcony overlooking the ocean.",
        maxOccupancy: 2,
        bedType: "1 Double Bed 54*75",
        pricing: {
          currency: "PHP",
          baseRate: 1600,
          extraPersonCharge: 1000,
        },
      },
      {
        roomId: "RM002",
        type: "Superior Twin",
        description:
          "A large suite perfect for families, featuring two bedrooms and a living area.",
        maxOccupancy: 4,
        bedType: "2 Double Beds 48*75",
        pricing: {
          currency: "PHP",
          baseRate: 1600,
          extraPersonCharge: 1200,
        },
      },
      {
        roomId: "RM003",
        type: "Superior Triple",
        description:
          "A large suite perfect for families, featuring two bedrooms and a living area.",
        maxOccupancy: 4,
        bedType: "1 Single | Double 36*75 | 48*75",
        pricing: {
          currency: "PHP",
          baseRate: 2100,
          extraPersonCharge: 1200,
        },
      },
      {
        roomId: "RM004",
        type: "Superior Quad",
        description:
          "A large suite perfect for families, featuring two bedrooms and a living area.",
        maxOccupancy: 4,
        bedType: "2 Double Bed 48*75",
        pricing: {
          currency: "PHP",
          baseRate: 2600,
          extraPersonCharge: 1200,
        },
      },
      {
        roomId: "RM005",
        type: "Family Room",
        description:
          "A large suite perfect for families, featuring two bedrooms and a living area.",
        maxOccupancy: 4,
        bedType: "2 Double Bed, 1 extra mattress",
        pricing: {
          currency: "PHP",
          baseRate: 3000,
          extraPersonCharge: 1200,
        },
      },
      {
        roomId: "RM006",
        type: "Barkada Room",
        description:
          "A large suite perfect for families, featuring two bedrooms and a living area.",
        maxOccupancy: 4,
        bedType: "2 Double Bed, 2 extra mattress",
        pricing: {
          currency: "PHP",
          baseRate: 3600,
          extraPersonCharge: 1200,
        },
      },
    ],
    amenities: [
      "Air Conditioning",
      "Toilet",
      "Cold & Hot Shower",
      "LCD TV",
      "WiFi",
      "Electric Kettle",
      "Bath Towel",
      "Bath Mat & Toiletries",
    ],
    policies: {
      checkIn: "2:00 PM",
      checkOut: "12:00 PM",
      cancellationPolicies: [
        "Any cancellation received more than 15 days prior to arrival will incur 10% of the total room rate.",
        "Any cancellation received within 5 days prior to arrival date will incur 100% of the total rate.",
        "Failure to arrive atyour hotel will be treated as a No-Show and no refund will be given.",
      ],
      childPolicies: [
        "Children below 5 years old is free of charge, adullt sharing (Breakfast not Included)",
        "1 child are allowed per superior double & 2 child for superior twin.",
        "Kids breakfast is P150.00 per child/ kid.",
      ],
      reservationFee:
        "A 50% reservation fee is required for all confirmed bookings",
      petPolicy: "Pets are not allowed.",
    },
    termsAndConditions: [
      "Room confirmation is subject to availability. Rate may change without prior notice.",
      "Additions may be allowed by the Hotel subject to space availability. Any revision thereof shall be charged as an extra person.",
      "For booking changes (i.e., additional number of guests/rooms, etc.), the Reservations Officermust be informed seven (10) days prior to guest arrival for him/her to affect the necessary Revisions on the booking confirmation and quotation.",
      "Any incidental charges incurred shall be charge on personal accounts before check out.",
      "Check in time is 2:00pm while our check out is 12:00 noon. Hotel allows early check in depending on theavailability of rooms.",
      "Maria Fe Travellers Inn shall not liable for failure to carry out such arrangements as mentioned which are caused by Acts of God or conditions beyond our control.",
      "Early check-in and Extensions or late check-out are subject to room availability and application of appropriate charges.",
      "All terms and rates stated above will be valid only upon our receipt of the signed copy of this contract.",
      "We will require a 50% deposit upon confirmation of reservation and the balance can be settled upon arrival of the guest. Booking agreement is invalid without proof of deposit or full payment",
    ],
    images: [
      "/resources/mariafe/mariafe000.avif",
      "/resources/mariafe/mariafe001.avif",
      "/resources/mariafe/mariafe002.avif",
      "/resources/mariafe/mariafe003.avif",
      "/resources/mariafe/mariafe005.avif",
      "/resources/mariafe/mariafe006.avif",
    ],
    reviews: [
      {
        reviewId: "R001",
        guestName: "John Doe",
        rating: 5,
        comment:
          "Amazing experience! The staff was very accommodating, and the view from our room was breathtaking.",
      },
      {
        reviewId: "R002",
        guestName: "Maria Santos",
        rating: 4,
        comment:
          "Great location and facilities. The only downside was the slow Wi-Fi in our room.",
      },
    ],
  },
  {
    id: "clark-kent-homestay",
    name: "Clark Kent Homestay",
    description:
      "Clark Kent Homestay offers a cozy and welcoming atmosphere, providing guests with a comfortable and home-like experience during their stay. Guests can enjoy spacious and well-appointed rooms, friendly service, and a range of modern conveniences such as free Wi-Fi, air conditioning, and breakfast options. Whether you’re visiting for a quick getaway or an extended stay, Clark Kent Homestay promises a warm and memorable experience.",
    location: {
      address: "Puerto Princesa, Philippines, 5300",
      longitude: 112,
      latitude: 233,
    },
    rooms: [
      {
        roomId: "homestay",
        type: "House",
        description:
          "Located in a quiet and peaceful area, the homestay is ideal for travelers looking for a relaxing retreat while still being close to local attractions and amenities. ",
        maxOccupancy: 12,
        bedType: "1 Master bed, 2 double bed",
        pricing: {
          currency: "PHP",
          baseRate: 3500,
          extraPersonCharge: 1000,
        },
      },
    ],
    ammenities: [
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
    policies: {},
    termsAndConditions: [],
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
  },
  {
    id: "loft-style-apartment",
    name: "CKC Loftstyle Apartment",
    description:
      "CKC Loftstyle Apartment offers a unique and modern living experience with its stylish, loft-inspired design. Perfect for travelers seeking a blend of comfort and contemporary aesthetics, the apartment features open, airy spaces with high ceilings, sleek furnishings, and large windows that flood the interiors with natural light. Located in a prime area, it provides easy access to nearby attractions, dining options, and transportation hubs. The apartment is equipped with modern amenities, including a fully functional kitchen, free Wi-Fi, and a cozy living area, making it an ideal choice for both short and long-term stays.",
    location: {
      address: "Lagan St., Bgy Milagrosa Puerto Princesa City, Palawan",
      longitude: 112,
      latitude: 233,
    },
    rooms: [
      {
        roomId: "apartment",
        type: "Apartment",
        description:
          "At CKC Loftstyle Apartment, experience urban living at its finest in a space that feels like home.",
        maxOccupancy: 4,
        bedType: "2 double bed",
        pricing: {
          currency: "PHP",
          baseRate: 3800,
          extraPersonCharge: 1000,
        },
      },
    ],

    ammenities: [
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
    policies: {},
    termsAndConditions: [],
    images: [
      "/resources/ckc/ckc000.avif",
      "/resources/ckc/ckc001.avif",
      "/resources/ckc/ckc002.avif",
      "/resources/ckc/ckc003.avif",
      "/resources/ckc/ckc004.avif",
      "/resources/ckc/ckc005.avif",
    ],
  },
];
