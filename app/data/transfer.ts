export const transfers = [
  {
    id: "transfer-between-puerto-princesa-and-el-nido",
    title: "Transfer between Puerto Princesa and El Nido",
    description:
      "Enjoy a comfortable and convenient transfer between Puerto Princesa and El Nido in a premium Urvan van. Perfect for solo travelers, families, or groups, this service offers multiple daily departures, air-conditioned comfort, and scenic views along the way. Choose between shared or private options to suit your travel needs.",
    type: "transfer",
    vehicle: "Urvan Premium",
    location: ["Puerto Princesa", "El Nido"],
    options: [
      {
        id: "puerto-princesa-airport-transfer-city-proper",
        name: "Puerto Princesa Airport Transfer: City Proper only",
        travelTime: ["6:00 AM", "12:00 PM"],
        pickUpLocation:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1840.9844793850052!2d118.74719623800014!3d9.746142401207397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33b563ef3b32222b%3A0xe7d9bdc0c148ed24!2sPuerto%20Princesa%20Airport!5e0!3m2!1sen!2sph!4v1768883336269!5m2!1sen!2sph",
        shareLink: "https://maps.app.goo.gl/4xpYc4BeLCxeF8Kz5",
        pricing: [
          {
            isGroupSize: true,
            type: "Shared",
            minGroupSize: 1,
            maxGroupSize: 10,
            price: 700,
          },
        ],
      },
      {
        id: "puerto-princesa-to-elnido-shared",
        name: "Puerto princesa to Elnido: Shared Transfer",
        travelTime: ["6:00 AM", "12:00 PM", "5:00 PM"],
        pricing: [
          { type: "Shared", minGroupSize: 1, maxGroupSize: 10, price: 750 },
        ],
      },
      {
        id: "elnido-to-puerto-princesa-shared",
        name: "Elnido to Puerto princesa: Shared Transfer",
        travelTime: ["6:00 AM", "12:00 PM", "5:00 PM"],
        pickUpLocation:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15656.859552950098!2d119.3835885257036!3d11.171719200000018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33b655b2c9eee5b7%3A0x34cc64b7e2244b08!2sEl%20Nido%20Bus%20Terminal!5e0!3m2!1sen!2sph!4v1768882713949!5m2!1sen!2sph",
        shareLink: "https://maps.app.goo.gl/93BXfZVEjuzoBD6p9",
        pricing: [
          { type: "Shared", minGroupSize: 1, maxGroupSize: 10, price: 750 },
        ],
      },
      {
        id: "puerto-princesa-to-elnido-private",
        name: "Puerto Princesa to Elnido: 1-Way Private Transfer",
        travelTime: [],
        pricing: [
          {
            type: "Private",
            isGroupSize: true,
            minGroupSize: 1,
            maxGroupSize: 10,
            price: 7500,
          },
        ],
      },
      {
        id: "elnido-to-puerto-princesa-private",
        name: "Elnido to Puerto Princesa: 1-Way Private Transfer",
        travelTime: [],
        pickUpLocation:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15656.859552950098!2d119.3835885257036!3d11.171719200000018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33b655b2c9eee5b7%3A0x34cc64b7e2244b08!2sEl%20Nido%20Bus%20Terminal!5e0!3m2!1sen!2sph!4v1768882713949!5m2!1sen!2sph",
        shareLink: "https://maps.app.goo.gl/93BXfZVEjuzoBD6p9",
        pricing: [
          {
            type: "Private",
            isGroupSize: true,
            minGroupSize: 1,
            maxGroupSize: 10,
            price: 7500,
          },
        ],
      },
    ],
    images: [
      "https://cdn.palawanwebsolutions.com/clarkkent/logistics/pps-elnido-transfer.avif",
    ],
  },
  {
    id: "transfer-between-puerto-princesa-and-port-barton",
    title: "Transfer between Puerto Princesa and Port Barton",
    description:
      "Travel seamlessly between Puerto Princesa and Port Barton in a comfortable, air-conditioned Urvan van. This transfer service is ideal for solo travelers, families, or groups, offering multiple daily departures and scenic views along the way. Choose from shared transfer options for a budget-friendly and convenient journey to your destination.",
    vehicle: "Urvan Premium",
    location: ["Puerto Princesa", "Port Barton"],
    options: [
      {
        id: "puerto-princesa-to-port-barton",
        name: "Puerto princesa to Port Barton: 1-Way Shared Transfer",
        travelTime: ["6:00 AM", "12:00 PM", "5:00 PM"],
        pricing: [
          { type: "Shared", minGroupSize: 1, maxGroupSize: 10, price: 700 },
        ],
      },
      {
        id: "port-barton-to-puerto-princesa",
        name: "Port Barton to Puerto princesa: 1-Way Shared Transfer",
        travelTime: ["6:00 AM", "12:00 PM", "5:00 PM"],
        pickUpLocation:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3143.4767802688084!2d119.1742751964753!3d10.409172850856896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33b5c58c04926fab%3A0x275604c93a51239b!2sPort%20Barton%20Bus%20Terminal!5e0!3m2!1sen!2sph!4v1768883164745!5m2!1sen!2sph",
        shareLink: "https://maps.app.goo.gl/kAdY1kiRGeUXBPPH7",
        pricing: [
          { type: "Shared", minGroupSize: 1, maxGroupSize: 10, price: 700 },
        ],
      },
    ],
    images: [
      "https://cdn.palawanwebsolutions.com/clarkkent/logistics/pps-port-barton.avif",
    ],
  },
  {
    id: "private-el-nido-transfer",
    title: "Private Transfer between Elnido and Lio Beach",
    description:
      "Experience a seamless and exclusive transfer between El Nido Town and Lio Beach in a premium, air-conditioned van. Perfect for families, groups, or couples seeking privacy and comfort, this private service offers flexible departure times and a hassle-free journey. Enjoy the scenic drive and arrive at your destination relaxed and ready to explore.",
    vehicle: "Urvan Premium",
    location: ["Elnido"],
    options: [
      {
        id: "lio-beach-to-el-nido-town",
        name: "Lio Beach to El Nido Town: 1-Way Private Transfer",
        travelTime: ["6:00 AM", "12:00 PM", "5:00 PM"],
        pickUpLocation:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7827.475349429605!2d119.40995560886265!3d11.207034515087567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33b7aaa86995c247%3A0x6ef654479d4ccef2!2sLio%20Beach!5e0!3m2!1sen!2sph!4v1768882962804!5m2!1sen!2sph",
        shareLink: "https://maps.app.goo.gl/mtNAgxnkMbastjtGA",
        pricing: [
          {
            type: "Private",
            isGroupSize: true,
            minGroupSize: 1,
            maxGroupSize: 10,
            price: 2000,
          },
        ],
      },
      {
        id: "el-nido-town-to-lio",
        name: "El Nido Town to Lio Beach: 1-Way Private Transfer",
        travelTime: ["6:00 AM", "12:00 PM", "5:00 PM"],
        pickUpLocation:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15656.859552950098!2d119.3835885257036!3d11.171719200000018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33b655b2c9eee5b7%3A0x34cc64b7e2244b08!2sEl%20Nido%20Bus%20Terminal!5e0!3m2!1sen!2sph!4v1768882713949!5m2!1sen!2sph",
        shareLink: "https://maps.app.goo.gl/93BXfZVEjuzoBD6p9",
        pricing: [
          {
            type: "Private",
            isGroupSize: true,
            minGroupSize: 1,
            maxGroupSize: 10,
            price: 2000,
          },
        ],
      },
    ],
    images: [
      "https://cdn.palawanwebsolutions.com/clarkkent/logistics/lio-en-town.avif",
    ],
  },
  {
    id: "private-nacpan-day-tour",
    title: "Private Nacpan Day tour",
    description:
      "Discover the beauty of Nacpan Beach with our Private Nacpan Day Tour. Travel in comfort and privacy in a premium, air-conditioned van, perfect for families, groups, or couples. Enjoy a flexible schedule, scenic drive, and a full day to relax, swim, and explore the stunning coastline. Experience hassle-free transportation and make unforgettable memories at one of Palawan's most picturesque beaches.",
    vehicle: "Urvan Premium",
    location: ["Puerto Princesa"],
    options: [
      {
        id: "nacpan-day-tour",
        name: "Nacpan Day Tour: Private Van",
        travelTime: ["9:00 AM - 4:00 PM"],
        pickUpLocation:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.214888385907!2d119.3925784752925!3d11.17171918900209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33b655b2c9eee5b7%3A0x34cc64b7e2244b08!2sEl%20Nido%20Bus%20Terminal!5e0!3m2!1sen!2sph!4v1768889860069!5m2!1sen!2sph",
        shareLink: "https://maps.app.goo.gl/71PyLpNzD9zdMadZ8",
        pricing: [
          {
            type: "Private",
            isGroupSize: true,
            minGroupSize: 1,
            maxGroupSize: 10,
            price: 5000,
          },
        ],
      },
    ],
    images: [
      "https://cdn.palawanwebsolutions.com/clarkkent/logistics/nacpan-day-tour.avif",
    ],
  },
  {
    id: "private-lio-day-tour",
    title: "Private Lio Day tour",
    description:
      "Enjoy a relaxing day at Lio Beach with our Private Lio Day Tour. Travel in comfort and privacy in a premium, air-conditioned van, perfect for families, groups, or couples. Experience the beauty of Lio's white sand beaches, clear waters, and vibrant surroundings at your own pace. This hassle-free service includes flexible departure times, allowing you to make the most of your day exploring, swimming, and unwinding in one of El Nido's most picturesque destinations.",
    vehicle: "Urvan Premium",
    location: ["El Nido"],
    options: [
      {
        id: "lio-day-tour",
        name: "Lio Day Tour: Private Van",
        travelTime: ["9:00 AM - 4:00 PM"],
        pickUpLocation:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15656.859552950098!2d119.3835885257036!3d11.171719200000018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33b655b2c9eee5b7%3A0x34cc64b7e2244b08!2sEl%20Nido%20Bus%20Terminal!5e0!3m2!1sen!2sph!4v1768882713949!5m2!1sen!2sph",
        shareLink: "https://maps.app.goo.gl/hL7Qsahn6pQfrYZF6",
        pricing: [
          {
            type: "Private",
            isGroupSize: true,
            minGroupSize: 1,
            maxGroupSize: 10,
            price: 4000,
          },
        ],
      },
    ],
    images: [
      "https://cdn.palawanwebsolutions.com/clarkkent/logistics/lio-day-tour.avif",
    ],
  },
  {
    id: "private-talaudyong-day-tour",
    title: "Private Talaudyong Day tour",
    description:
      "Escape to the tranquil Talaudyong Beach with our Private Talaudyong Day Tour. Travel in comfort and privacy in a premium, air-conditioned van, ideal for families, groups, or couples. Enjoy a flexible schedule, scenic drive, and a full day to relax, swim, and explore the unspoiled beauty of Talaudyong. Experience hassle-free transportation and make lasting memories at one of Palawan's hidden gems.",
    vehicle: "Urvan Premium",
    location: ["Puerto Princesa"],
    options: [
      {
        id: "talaudyong-day-tour",
        name: "Talaudyong Day Tour: Private Van",
        travelTime: ["9:00 AM - 4:00 PM"],
        pricing: [
          {
            type: "Private",
            isGroupSize: true,
            minGroupSize: 1,
            maxGroupSize: 10,
            price: 4000,
          },
        ],
      },
    ],
    images: [
      "https://cdn.palawanwebsolutions.com/clarkkent/logistics/talaudyong.avif",
    ],
  },
  {
    id: "roundtrip-private-port-barton-day-tour",
    title: "Private Port Barton Day tour",
    location: ["Port Barton"],
    description:
      "Book our Bohol Airport Transfer for a convenient and comfortable ride to your destination. Enjoy air-conditioned comfort and reliable service, whether you're heading to a hotel, resort, or any location in Bohol. Perfect for solo travelers, families, or groups, this transfer ensures a smooth and hassle-free journey from the airport, allowing you to relax and start your Bohol adventure with ease.",
    vehicle: "Urvan Premium",
    options: [
      {
        id: "port-barton-day-tour",
        name: "Port Barton Day Tour: Roundtrip Private Van",
        travelTime: ["9:00 AM - 4:00 PM"],
        pickUpLocation:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.3058891523706!2d123.77054047527159!3d9.568878290515611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33abadc2c1a8daff%3A0x3eb63c82c7bb3fe7!2sPanglao%20International%20Airport!5e0!3m2!1sen!2sph!4v1768890076952!5m2!1sen!2sph",
        shareLink: "https://maps.app.goo.gl/RsnaJfapGyBmCsbw7",
        pricing: [
          {
            type: "Private",
            isGroupSize: true,
            minGroupSize: 1,
            maxGroupSize: 10,
            price: 8500,
          },
        ],
      },
    ],
    images: [
      "https://cdn.palawanwebsolutions.com/clarkkent/logistics/rt-port-barton.avif",
    ],
  },
  {
    id: "private-puerto-princesa-and-astoria-transfer",
    title: "Private Puerto Princesa and Astoria Transfer",
    description:
      "Experience the beauty of Port Barton with our Private Day Tour. Travel in comfort and privacy in a premium, air-conditioned van, perfect for families, groups, or couples. Enjoy a flexible schedule, scenic drive, and a full day to relax, swim, and explore the stunning beaches and natural wonders of Port Barton. Hassle-free transportation ensures a memorable and relaxing adventure at one of Palawan's hidden gems.",
    vehicle: "Urvan Premium",
    location: ["Puerto Princesa"],
    options: [
      {
        id: "puerto-princesa-to-astoria",
        name: "Puerto Princesa to Astoria: 1-Way Transfer",
        travelTime: ["9:00 AM - 4:00 PM"],
        pricing: [
          {
            type: "Shared",
            isGroupSize: true,
            minGroupSize: 1,
            maxGroupSize: 10,
            price: 3500,
          },
        ],
      },
      {
        id: "astoria-to-puerto-princesa",
        name: "Astoria to Puerto Princesa: 1-Way Transfer",
        travelTime: ["9:00 AM - 4:00 PM"],
        pickUpLocation:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.384543114697!2d118.96369287527682!3d9.985059490119564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33b5b9e4bc4c1585%3A0xbc2d94e5aa9856f4!2sAstoria%20Palawan!5e0!3m2!1sen!2sph!4v1768883077804!5m2!1sen!2sph",
        shareLink: "https://maps.app.goo.gl/rCnvF5CdFXeRKKfX6",
        pricing: [
          {
            type: "Shared",
            isGroupSize: true,
            minGroupSize: 1,
            maxGroupSize: 10,
            price: 3500,
          },
        ],
      },
    ],
    images: [
      "https://cdn.palawanwebsolutions.com/clarkkent/logistics/pps-astoria.avif",
    ],
  },
  {
    id: "bohol-transfer",
    title: "Bohol Transfer",
    description:
      "Book our Bohol Airport Transfer for a convenient and comfortable ride to your destination. Enjoy air-conditioned comfort and reliable service, whether you're heading to a hotel, resort, or any location in Bohol. Perfect for solo travelers, families, or groups, this transfer ensures a smooth and hassle-free journey from the airport, allowing you to relax and start your Bohol adventure with ease.",
    vehicle: "Van",
    location: ["Bohol"],
    options: [
      {
        id: "bohol-airport-transfer",
        name: "Bohol Airport Transfer",
        travelTime: ["9:00 AM - 4:00 PM"],
        pickUpLocation:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.3058891523706!2d123.77054047527159!3d9.568878290515611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33abadc2c1a8daff%3A0x3eb63c82c7bb3fe7!2sPanglao%20International%20Airport!5e0!3m2!1sen!2sph!4v1768890314383!5m2!1sen!2sph",
        shareLink: "https://maps.app.goo.gl/RsnaJfapGyBmCsbw7",
        pricing: [
          {
            type: "Shared",
            isGroupSize: true,
            minGroupSize: 1,
            maxGroupSize: 10,
            price: 1500,
          },
        ],
      },
    ],
    images: [
      "https://cdn.palawanwebsolutions.com/clarkkent/logistics/bohol-airport.avif",
    ],
  },

  //transfer
  // {
  //   id: "joiner-pps-elnido",
  //   title: "Joiner Puerto Princesa to El Nido",
  //   from: "Puerto Princesa, City",
  //   to: "El Nido",
  //   type: "transfer",
  //   vehicle_type: "Urvan Premium",
  //   capacity: 12,
  //   price_per_trip: 750,
  //   description:
  //     "Join our Puerto Princesa to El Nido Joiner Transfer for a convenient, budget-friendly ride. Travel in comfort in our air-conditioned vans, perfect for solo travelers or small groups. Enjoy the scenic journey and arrive in El Nido ready to explore. Multiple daily departures available!",
  //   availability: "6:00 AM - 5:00 PM",
  //   image: "/resources/logistics/van.jpg",
  // },
  // {
  //   id: "joiner-elnido-pps",
  //   title: "Joiner El Nido to Puerto Princesa",
  //   from: "El Nido",
  //   to: "Puerto Princesa, City",
  //   vehicle_type: "Van",
  //   type: "transfer",
  //   capacity: 8,
  //   price_per_trip: 750,
  //   description:
  //     "Join our El Nido to Puerto Princesa Joiner Transfer for an easy, affordable trip back to the city. Travel in comfort in our air-conditioned vans and enjoy the scenic views along the way. Ideal for solo travelers or small groups, with multiple daily departures to fit your schedule.",
  //   availability: "6:00 AM - 5:00 PM",
  //   image: "/resources/logistics/van.jpg",
  // },
  // {
  //   id: "private-van-pps-elnido",
  //   title: "Private Van Puerto Princesa to El Nido",
  //   type: "transfer",
  //   vehicle_type: "Private Van",
  //   from: "Puerto Princesa, City",
  //   to: "El Nido",
  //   capacity: 10,
  //   price_per_trip: 7500,
  //   description:
  //     "Book our Private Van Transfer from Puerto Princesa to El Nido for a personalized and comfortable travel experience. Perfect for families or groups, our air-conditioned van offers a direct, hassle-free journey at your own pace. Enjoy the privacy, flexibility, and scenic views as you travel through Palawan. Choose your departure time and relax while we take care of the rest!",
  //   availability: "6:00 AM - 10:00 PM",
  //   image: "/resources/logistics/van.jpg",
  // },
  // {
  //   id: "private-van-elnido-pps",
  //   title: "Private Van El Nido to Puerto Princesa",
  //   type: "transfer",
  //   vehicle_type: "Private Van",
  //   to: "Puerto Princesa, City",
  //   from: "El Nido",
  //   capacity: 10,
  //   price_per_trip: 7500,
  //   description:
  //     "Book our Private Van Transfer from Puerto Princesa to El Nido for a personalized and comfortable travel experience. Perfect for families or groups, our air-conditioned van offers a direct, hassle-free journey at your own pace. Enjoy the privacy, flexibility, and scenic views as you travel through Palawan. Choose your departure time and relax while we take care of the rest!",
  //   availability: "6:00 AM - 10:00 PM",
  //   image: "/resources/logistics/van.jpg",
  // },
  // {
  //   id: "joiner-pps-barton",
  //   title: "Joiners Puerto Princesa to Port Barton",
  //   vehicle_type: "Van",
  //   type: "transfer",
  //   from: "Puerto Princesa, City",
  //   to: "Port Barton",
  //   capacity: 10,
  //   price_per_trip: 700,
  //   description:
  //     "Join our Puerto Princesa to Port Barton Joiner Transfer for an affordable and convenient ride. Travel comfortably in our air-conditioned vans and enjoy the scenic trip to Port Barton. Perfect for solo travelers or small groups, with multiple departures daily.",
  //   availability: "6:00 AM - 5:00 PM",
  //   image: "/resources/logistics/van.jpg",
  // },
  // {
  //   id: "joiner-barton-pps",
  //   title: "Joiners Port Barton to Puerto Princesa",
  //   vehicle_type: "Van",
  //   type: "transfer",
  //   to: "Puerto Princesa, City",
  //   from: "Port Barton",
  //   capacity: 10,
  //   price_per_trip: 700,
  //   description:
  //     "Join our Port Barton to Puerto Princesa Joiner Transfer for an easy and affordable journey back to the city. Enjoy a comfortable ride in our air-conditioned vans while taking in the beautiful landscapes of Palawan. Ideal for solo travelers or small groups, with multiple daily departures to fit your schedule.",
  //   availability: "6:00 AM - 5:00 PM",
  //   image: "/resources/logistics/van.jpg",
  // },
  // {
  //   id: "private-puerto-princesa-astoria-transfer-per-way",
  //   title: "Private Puerto Princesa to Astoria Transfer per way",
  //   vehicle_type: "Private Van",
  //   from: "Puerto Princesa, City",
  //   to: "Astoria",
  //   type: "transfer",
  //   capacity: 10,
  //   price_per_trip: 3500,
  //   description:
  //     "Book our Private Transfer from Puerto Princesa to Astoria Palawan for a comfortable and hassle-free journey. Travel in a spacious, air-conditioned van with the convenience of choosing your own departure time. Perfect for families or groups, this direct transfer ensures a smooth and relaxing ride to your destination. Enjoy the scenic beauty of Palawan along the way!",
  //   availability: "9:00 AM - 4:00 PM",
  //   image: "/resources/logistics/ckvan.jpg",
  // },
  // {
  //   id: "private-astoria-puerto-princesa-transfer-per-way",
  //   title: "Private Astoria to Puerto Princesa Transfer per way",
  //   vehicle_type: "Private Van",
  //   from: "Astoria",
  //   to: "Puerto Princesa, City",
  //   type: "transfer",
  //   capacity: 10,
  //   price_per_trip: 3500,
  //   description:
  //     "Book our Private Transfer from Astoria Palawan to Puerto Princesa for a smooth and comfortable journey. Travel in an air-conditioned van with the convenience of selecting your preferred departure time. Ideal for families or groups, this direct transfer ensures a stress-free ride back to the city while enjoying the scenic landscapes of Palawan.",
  //   availability: "9:00 AM - 4:00 PM",
  //   image: "/resources/logistics/ckvan.jpg",
  // },

  // //city proper
  // {
  //   id: "pps-airport-transfer-for-city-proper",
  //   title: "PPS Airport Transfer for City Proper only",
  //   vehicle_type: "Van",
  //   from: "Puerto Princesa Airport",
  //   to: "City Proper",
  //   type: "proper",
  //   capacity: 2,
  //   price_per_trip: 700,
  //   description:
  //     "Book our PPS Airport Transfer to City Proper for a quick and hassle-free ride to your destination. Our air-conditioned van provides a comfortable and efficient transfer, ideal for solo travelers, families, or groups. Enjoy a smooth journey from Puerto Princesa Airport to any location within the city proper. Let us take care of your transportation needs upon arrival!",
  //   availability: "4 hours",
  //   image: "/resources/logistics/airport-van.jpg",
  // },
  // {
  //   id: "bohol-airport-transfer",
  //   title: "Bohol Airport Transfer",
  //   vehicle_type: "Van",
  //   type: "proper",
  //   from: "Bohol Airport",
  //   to: "Bohol Proper",
  //   capacity: 4,
  //   price_per_trip: 1500,
  //   description:
  //     "Book our Bohol Airport Transfer for a convenient and comfortable ride to your destination. Our air-conditioned vehicles ensure a smooth and hassle-free journey, whether you're heading to a hotel, resort, or any location in Bohol. Ideal for solo travelers, families, or groups, this service offers reliable transportation from the airport, allowing you to relax and enjoy the start of your Bohol adventure.",
  //   availability: "1 Day",
  //   image: "/resources/logistics/van.jpg",
  // },

  // //one way
  // {
  //   id: "private-lio-elnido-town-one-way",
  //   title: "Private Lio to Elnido town one way",
  //   vehicle_type: "Private Van",
  //   type: "one_way",
  //   from: "Lio Resort",
  //   to: "El Nido Town",
  //   capacity: 10,
  //   price_per_trip: 2000,
  //   description:
  //     "Book our Private Transfer from Lio to El Nido Town for a comfortable and exclusive journey. Enjoy the flexibility of choosing your departure time while traveling in an air-conditioned van. Perfect for families or groups, this direct transfer allows you to relax and take in the beautiful scenery of Palawan along the way.",
  //   availability: "8:00 AM - 8:00 PM",
  //   image: "/resources/logistics/private-vanck.jpg",
  // },
  // {
  //   id: "private-elnido-town-lio-one-way",
  //   title: "Private  Elnido town to Lio one way",
  //   vehicle_type: "Private Van",
  //   type: "one_way",
  //   from: "El Nido Town",
  //   to: "Lio Resort",
  //   capacity: 10,
  //   price_per_trip: 2000,
  //   description:
  //     "Book our Private Transfer from El Nido Town to Lio for a comfortable and exclusive journey. Enjoy the flexibility of choosing your departure time in an air-conditioned van. Ideal for families or groups, this direct transfer allows you to relax and soak in the stunning scenery of Palawan as you travel.",
  //   availability: "8:00 AM - 8:00 PM",
  //   image: "/resources/logistics/private-vanck.jpg",
  // },

  // //day tour
  // {
  //   id: "private-van-nacpan-day-tour",
  //   title: "Private Van Nacpan Day Tour",
  //   vehicle_type: "Private Van",
  //   type: "day_tour",
  //   from: "El Nido",
  //   to: "Nacpan",
  //   capacity: 10,
  //   price_per_trip: 5000,
  //   description:
  //     "Experience the beauty of Nacpan Beach with our Private Van Nacpan Day Tour. Enjoy a personalized journey in a comfortable, air-conditioned van, allowing you to explore at your own pace. Relax on the stunning shores, swim in crystal-clear waters, and take in breathtaking views. Perfect for families or groups looking for a memorable day in paradise!",
  //   availability: "9:00 AM - 4:00 PM",
  //   image: "/resources/logistics/private-vanck.jpg",
  // },
  // {
  //   id: "private-van-lio-day-tour",
  //   title: "Private Van Lio Day Tour",
  //   vehicle_type: "Private Van",
  //   type: "day_tour",
  //   from: "El Nido",
  //   to: "Lio Resort",
  //   capacity: 10,
  //   price_per_trip: 4000,
  //   description:
  //     "Discover the charm of Lio Beach with our Private Van Lio Day Tour. Travel comfortably in an air-conditioned van and enjoy a day of relaxation and exploration at your own pace. Perfect for families or groups, this personalized tour lets you experience the pristine beauty of Lio’s beaches and surroundings. A perfect getaway for a fun and peaceful day!",
  //   availability: "9:00 AM - 4:00 PM",
  //   image: "/resources/logistics/private-vanck.jpg",
  // },
  // {
  //   id: "private-van-talaudyong-day-tour",
  //   title: "Private Van Talaudyong Day Tour",
  //   vehicle_type: "Private Van",
  //   type: "day_tour",
  //   from: "Puerto Princesa",
  //   to: "Talaudyong",
  //   capacity: 10,
  //   price_per_trip: 4000,
  //   description:
  //     "Escape to the serene Talaudyong Beach with our Private Van Talaudyong Day Tour. Enjoy a comfortable and personalized trip in an air-conditioned van, perfect for families or groups. Spend the day relaxing on the quiet, unspoiled beach, swimming in clear waters, and soaking in the tranquil surroundings. A peaceful retreat for a memorable day in nature!",
  //   availability: "9:00 AM - 4:00 PM",
  //   image: "/resources/logistics/private-vanck.jpg",
  // },

  // //roundtrip
  // {
  //   id: "rt-private-van-port-barton-day-tour",
  //   title: "RT Private Van Port Barton Day Tour",
  //   type: "round_trip",
  //   vehicle_type: "Private Van",
  //   from: "Puerto Princesa",
  //   to: "Port Barton",
  //   capacity: 10,
  //   price_per_trip: 9500,
  //   description:
  //     "Enjoy a day of adventure with our Round-Trip Private Van Port Barton Day Tour. Travel comfortably in an air-conditioned van and explore the pristine beaches and lush surroundings of Port Barton at your own pace. Perfect for families or groups, this personalized tour offers a relaxing escape, with stunning views and opportunities for swimming, snorkeling, and sightseeing. A perfect way to experience the natural beauty of Palawan!",
  //   availability: "9:00 AM - 4:00 PM",
  //   image: "/resources/logistics/private-vanck.jpg",
  // },

  // //cruise
  // {
  //   id: "jomalia-fastcraft-pps-to-coron",
  //   title: "Jomalia Fast Craft",
  //   vehicle_type: "cruise",
  //   type: "fast craft",
  //   from: "El Nido",
  //   to: "Coron",
  //   capacity: 15,
  //   price_per_trip: 2800,
  //   description:
  //     "Jomalia Shipping offers a convenient and scenic ferry service between Elnido and Coron, Palawan. This route is perfect for travelers seeking a reliable and affordable way to explore the stunning islands of Palawan. Enjoy a comfortable journey aboard their well-maintained vessel, equipped with modern amenities to ensure a pleasant travel experience. Whether you're a tourist eager to discover Coron's iconic lagoons or a local traveling for business, Jomalia Shipping provides a seamless connection between these two beautiful destinations. Sit back, relax, and enjoy the breathtaking ocean views along the way.",
  //   availability: {
  //     morning: "8:00 AM MWFSun",
  //     afternoon: "12:30 PM Daily ",
  //   },
  //   image: "/resources/logistics/jomalia.avif",
  // },
  // {
  //   id: "jomalia-fastcraft-coron-to-pps",
  //   title: "Jomalia Fast Craft ",
  //   vehicle_type: "cruise",
  //   type: "fast craft",
  //   from: "Coron",
  //   to: "El Nido",
  //   capacity: 15,
  //   price_per_trip: 2800,
  //   description:
  //     "Jomalia Shipping offers a reliable and comfortable ferry service connecting Coron to Elnido, Palawan. Ideal for travelers heading to Puerto Princesa's natural wonders, such as the Underground River or Honda Bay, this route ensures a hassle-free journey with excellent service. The ferry is equipped with modern facilities, providing a smooth and enjoyable ride as you traverse the scenic waters of Palawan. Whether you're a tourist or a local, Jomalia Shipping makes traveling between Coron and Puerto Princesa both convenient and unforgettable.",
  //   availability: {
  //     morning: "7:30 AM Daily",
  //     afternoon: "1:00 PM MWFSun ",
  //   },
  //   image: "/resources/logistics/jomalia.avif",
  // },
];
