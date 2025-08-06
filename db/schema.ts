import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum,
  uuid,
  unique,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const userRole = pgEnum("user_role", ["ADMIN", "USER"]);

// export type UserRole = (typeof userRole.enumValues)[number];
export const Roles = createSelectSchema(userRole);

export const users = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  email: text("email").unique(),
  password: text("password"),
  role: userRole("role").default("USER").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),

  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const accounts = pgTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),

    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ],
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ],
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ],
);

export const unitTypes = pgEnum("unit_types", ["days", "hours"]);

export const tourTypes = pgEnum("tour_types", ["Day Tour", "Package"]);

export const tours = pgTable("tours", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("userId")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title").unique().notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description").notNull(),
  isFeatured: boolean("isFeatured").notNull().default(false),
  images: text("images").array().notNull().default([]),
  publicIds: text("publicIds").array().notNull().default([]),
  duration: integer("duration").notNull().default(1),
  durationUnit: unitTypes("durationUnit").default("days"),
  type: tourTypes("type").default("Day Tour"),
  inclusions: text("inclusions").array().notNull().default([]),
  exclusions: text("exclusions").array().notNull().default([]),

  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const tourRelations = relations(tours, ({ many }) => ({
  itineraries: many(itinerary),
  tourPricings: many(tourPricing),
}));

export const itinerary = pgTable("itinerary", {
  id: uuid("id").primaryKey().defaultRandom(),
  tourId: uuid("tourId")
    .notNull()
    .references(() => tours.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  destinations: text("destinations").array().notNull().default([]),
  activities: text("activities").array().notNull().default([]),
  images: text("images").array().notNull().default([]),

  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const itineraryRelations = relations(itinerary, ({ one }) => ({
  tour: one(tours, {
    fields: [itinerary.tourId],
    references: [tours.id],
  }),
}));

export const travellerType = pgEnum("traveller_type", ["Joiner", "Private"]);

export const tourPricing = pgTable(
  "tour_pricing",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tourId: uuid("tourId")
      .references(() => tours.id, { onDelete: "cascade" })
      .notNull(),
    type: travellerType("type").default("Joiner"),
    minGroupSize: integer("minGroupSize").default(1),
    maxGroupSize: integer("maxGroupSize").default(1),
    price: integer("price").notNull(),

    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (t) => [
    {
      uniqueTourTypeGroupSize: unique().on(
        t.tourId,
        t.type,
        t.minGroupSize,
        t.maxGroupSize,
      ),
    },
  ],
);

export const tourPricingRelations = relations(tourPricing, ({ one }) => ({
  tour: one(tours, {
    fields: [tourPricing.tourId],
    references: [tours.id],
  }),
}));

export const servicesType = pgEnum("services_type", [
  "Tours",
  "Transfers",
  "Rentals",
  "Hotels",
]);

export const statusType = pgEnum("statusType", [
  "Pending",
  "Canceled",
  "Paid",
  "Expired",
]);

export const bookings = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("userId")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  serviceId: uuid("serviceId").notNull(),
  servicesType: servicesType("servicesType").notNull(),
  participants: integer("participants").notNull(),
  from: timestamp("from").notNull(),
  to: timestamp("to").notNull(),
  totalPrice: integer("totalPrice").notNull(),
  status: statusType("status").default("Pending"),
  invoiceUrl: text("invoice_url"),
  contactName: text("contact_name").notNull(),
  contactEmail: text("contact_email").notNull(),
  contactNumber: text("contact_number").notNull(),
  traveller: travellerType("traveller").default("Joiner"),
  externalId: text("external_id").unique(),

  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
