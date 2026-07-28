ALTER TABLE "invoices"
ADD COLUMN IF NOT EXISTS "issue_date" timestamp with time zone DEFAULT now() NOT NULL;
