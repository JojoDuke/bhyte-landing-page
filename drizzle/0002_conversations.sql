CREATE TABLE "conversations" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "title" varchar(200) DEFAULT 'New chat' NOT NULL,
  "created_by" text NOT NULL,
  "invoice_id" uuid REFERENCES "invoices"("id") ON DELETE SET NULL,
  "pending_draft" jsonb,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE "invoice_messages" ADD COLUMN "conversation_id" uuid REFERENCES "conversations"("id") ON DELETE CASCADE;
