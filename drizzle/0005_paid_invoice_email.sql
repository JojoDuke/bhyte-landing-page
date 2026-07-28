ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "paid_invoice_email_scheduled_at" timestamp with time zone;
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "paid_invoice_email_sent_at" timestamp with time zone;
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "paid_invoice_email_skipped_at" timestamp with time zone;
