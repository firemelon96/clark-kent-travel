export const landArrangements = [
  {
    id: "adlaw-inn-puerto-princesa",
    slug: "adlaw-inn-puerto-princesa",
    title: "Adlaw Inn Puerto Princesa Package",
    isFeatured: false,
    address: ["Puerto Princesa City, Palawan"],
    description:
      "Experience the beauty of Puerto Princesa with our exclusive land arrangement package.",
    type: "package",
    options: [
      {
        name: "3D2N Adlaw Inn Package",
        iti: "3D2N",
        price: 6050,
        itineraries: [
          {
            day: 1,
            activities: ["Arrival in Puerto Princesa", "Transfer to Hotel"],
          },
          {
            day: 2,
            activities: [
              "Underground River Tour",
              "Lunch at a local restaurant",
              "Return to Hotel",
            ],
          },
          {
            day: 3,
            activities: ["City Tour", "Return to Hotel", "Departure"],
          },
        ],
      },
      {
        name: "4D3N Adlaw Inn Package",
        iti: "4D3N",
        price: 7550,
        itineraries: [
          {
            day: 1,
            activities: ["Arrival in Puerto Princesa", "Transfer to Hotel"],
          },
          {
            day: 2,
            activities: [
              "Underground River Tour",
              "Lunch at a local restaurant",
              "Return to Hotel",
            ],
          },
          {
            day: 3,
            activities: ["Honda Bay", "Buffet Lunch", "Return to Hotel"],
          },
          {
            day: 4,
            activities: ["City Tour", "Return to Hotel", "Departure"],
          },
        ],
      },
      {
        name: "5D4N Adlaw Inn Package",
        iti: "5D4N",
        price: 9050,
        itineraries: [
          {
            day: 1,
            activities: ["Arrival in Puerto Princesa", "Transfer to Hotel"],
          },
          {
            day: 2,
            activities: [
              "Underground River Tour",
              "Lunch at a local restaurant",
              "Return to Hotel",
            ],
          },
          {
            day: 3,
            activities: ["Honda Bay", "Buffet Lunch", "Return to Hotel"],
          },
          {
            day: 4,
            activities: [
              "firefly Watching",
              "Buffet Dinner",
              "Return to Hotel",
            ],
          },
          {
            day: 5,
            activities: ["City Tour", "Return to Hotel", "Departure"],
          },
        ],
      },
    ],
    inclusion: [
      "Aircon Room",
      "RT Airport Transfer",
      "Daily Plated breakfast",
      "Buffet Lunch for Underground | Picnic Lunch for Honda Bay | Buffer Dinner for Firefly & Light Snacks for City Tour",
      "Tour pick-up & Drop",
      "Licensed Guide",
      "Boat transfer w/ Life vest",
      "Accident Insurance worth PHP10,000 medical reimbursement",
    ],
    exclusions: [
      "Environmental fee",
      "Snorkeling Gears",
      "Aqua Shoes",
      "Extra Activities",
      "Mangrove paddle, Zipline & Ugong Rock Adventure",
    ],
    notes: ["Additional charge for transfers with the flights 8:00PM onwards"],
    images: [
      "https://cdn.palawanwebsolutions.com/clarkkent/land-arrangement/7d6n-trio-palawan.jpeg",
    ],
    minParticipants: 2,
    maxParticipants: 12,
  },
];
