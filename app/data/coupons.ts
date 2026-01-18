export const coupons = [
  {
    code: "CKANNIVERSARY",
    type: "percentage",
    eligible: {
      type: "day tour",
      location: ["El Nido", "Puerto Princesa"],
    },
    value: 20,
    maxDiscount: 500,
    minBookingAmount: 3000,
    startDate: "2026-01-01",
    expiryDate: "2026-01-31",
    status: "active",
    description: "Celebrate our anniversary with a special discount!",
  },
];
