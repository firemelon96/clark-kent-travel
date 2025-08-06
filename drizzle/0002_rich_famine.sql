ALTER TABLE "tours" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "invoice_url" text;--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "contact_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "contact_email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "contact_number" text NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "traveller" "traveller_type" DEFAULT 'Joiner';--> statement-breakpoint
ALTER TABLE "bookings" ADD COLUMN "external_id" text;--> statement-breakpoint
ALTER TABLE "tours" ADD COLUMN "userId" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "tours" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "tours" ADD COLUMN "publicIds" text[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "tours" ADD CONSTRAINT "tours_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_external_id_unique" UNIQUE("external_id");--> statement-breakpoint
ALTER TABLE "tours" ADD CONSTRAINT "tours_title_unique" UNIQUE("title");--> statement-breakpoint
ALTER TABLE "tours" ADD CONSTRAINT "tours_slug_unique" UNIQUE("slug");