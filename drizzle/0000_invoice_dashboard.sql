CREATE TYPE "public"."invoice_status" AS ENUM('draft', 'open', 'paid', 'void', 'expired');

CREATE TABLE "invoices" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "number" varchar(40) NOT NULL UNIQUE,
  "customer_name" text NOT NULL,
  "customer_email" text,
  "customer_address" text,
  "currency" varchar(3) NOT NULL,
  "subtotal" integer NOT NULL,
  "tax_amount" integer DEFAULT 0 NOT NULL,
  "discount_amount" integer DEFAULT 0 NOT NULL,
  "total" integer NOT NULL,
  "due_date" timestamp with time zone,
  "notes" text,
  "status" "invoice_status" DEFAULT 'draft' NOT NULL,
  "stripe_payment_link_id" text UNIQUE,
  "stripe_payment_link_url" text,
  "stripe_checkout_session_id" text UNIQUE,
  "paid_at" timestamp with time zone,
  "created_by" text NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "invoice_line_items" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "invoice_id" uuid NOT NULL REFERENCES "invoices"("id") ON DELETE CASCADE,
  "description" text NOT NULL,
  "quantity" integer DEFAULT 1 NOT NULL,
  "unit_amount" integer NOT NULL,
  "position" integer NOT NULL
);

CREATE TABLE "invoice_messages" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "invoice_id" uuid REFERENCES "invoices"("id") ON DELETE CASCADE,
  "role" varchar(20) NOT NULL,
  "content" text NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "invoice_documents" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "invoice_id" uuid NOT NULL REFERENCES "invoices"("id") ON DELETE CASCADE,
  "token" varchar(80) NOT NULL UNIQUE,
  "version" integer NOT NULL,
  "kind" varchar(20) NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "stripe_events" (
  "id" text PRIMARY KEY NOT NULL,
  "type" varchar(100) NOT NULL,
  "payload" jsonb NOT NULL,
  "processed_at" timestamp with time zone DEFAULT now() NOT NULL
);
