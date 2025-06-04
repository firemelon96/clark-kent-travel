CREATE TYPE "public"."services_type" AS ENUM('Tours', 'Transfers', 'Rentals', 'Hotels');--> statement-breakpoint
CREATE TYPE "public"."statusType" AS ENUM('Pending', 'Canceled', 'Paid', 'Expired');--> statement-breakpoint
CREATE TYPE "public"."tour_types" AS ENUM('Day Tour', 'Package');--> statement-breakpoint
CREATE TYPE "public"."traveller_type" AS ENUM('Joiner', 'Private');--> statement-breakpoint
CREATE TYPE "public"."unit_types" AS ENUM('days', 'hours');--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"serviceId" uuid NOT NULL,
	"servicesType" "services_type" NOT NULL,
	"participants" integer NOT NULL,
	"from" timestamp NOT NULL,
	"to" timestamp NOT NULL,
	"totalPrice" integer NOT NULL,
	"status" "statusType" DEFAULT 'Pending',
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "itinerary" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tourId" uuid NOT NULL,
	"title" text NOT NULL,
	"destinations" text[] DEFAULT '{}' NOT NULL,
	"activities" text[] DEFAULT '{}' NOT NULL,
	"images" text[] DEFAULT '{}' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tour_pricing" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tourId" uuid NOT NULL,
	"type" "traveller_type" DEFAULT 'Joiner',
	"minGroupSize" integer DEFAULT 1,
	"maxGroupSize" integer DEFAULT 1,
	"price" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tours" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"isFeatured" boolean DEFAULT false NOT NULL,
	"images" text[] DEFAULT '{}' NOT NULL,
	"duration" integer DEFAULT 1 NOT NULL,
	"durationUnit" "unit_types" DEFAULT 'days',
	"type" "tour_types" DEFAULT 'Day Tour',
	"inclusions" text[] DEFAULT '{}' NOT NULL,
	"exclusions" text[] DEFAULT '{}' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "userId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "authenticator" ALTER COLUMN "userId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "userId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "itinerary" ADD CONSTRAINT "itinerary_tourId_tours_id_fk" FOREIGN KEY ("tourId") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tour_pricing" ADD CONSTRAINT "tour_pricing_tourId_tours_id_fk" FOREIGN KEY ("tourId") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;