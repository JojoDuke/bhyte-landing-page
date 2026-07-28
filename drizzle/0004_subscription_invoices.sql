CREATE TYPE "public"."invoice_type" AS ENUM('one_time', 'subscription');
CREATE TYPE "public"."billing_interval" AS ENUM('month', 'year');

ALTER TYPE "public"."invoice_status" ADD VALUE IF NOT EXISTS 'active';
ALTER TYPE "public"."invoice_status" ADD VALUE IF NOT EXISTS 'past_due';
ALTER TYPE "public"."invoice_status" ADD VALUE IF NOT EXISTS 'cancelled';

ALTER TABLE "invoices" ADD COLUMN "invoice_type" "invoice_type" DEFAULT 'one_time' NOT NULL;
ALTER TABLE "invoices" ADD COLUMN "billing_interval" "billing_interval";
ALTER TABLE "invoices" ADD COLUMN "stripe_subscription_id" text UNIQUE;
