import {
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const invoiceStatus = pgEnum("invoice_status", [
  "draft",
  "open",
  "paid",
  "void",
  "expired",
]);

export const invoices = pgTable("invoices", {
  id: uuid("id").defaultRandom().primaryKey(),
  number: varchar("number", { length: 40 }).notNull().unique(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email"),
  customerAddress: text("customer_address"),
  currency: varchar("currency", { length: 3 }).notNull(),
  subtotal: integer("subtotal").notNull(),
  taxAmount: integer("tax_amount").notNull().default(0),
  discountAmount: integer("discount_amount").notNull().default(0),
  total: integer("total").notNull(),
  dueDate: timestamp("due_date", { withTimezone: true }),
  notes: text("notes"),
  status: invoiceStatus("status").notNull().default("draft"),
  stripePaymentLinkId: text("stripe_payment_link_id").unique(),
  stripePaymentLinkUrl: text("stripe_payment_link_url"),
  stripeCheckoutSessionId: text("stripe_checkout_session_id").unique(),
  paidAt: timestamp("paid_at", { withTimezone: true }),
  createdBy: text("created_by").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const invoiceLineItems = pgTable("invoice_line_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  invoiceId: uuid("invoice_id").notNull().references(() => invoices.id, { onDelete: "cascade" }),
  description: text("description").notNull(),
  quantity: integer("quantity").notNull().default(1),
  unitAmount: integer("unit_amount").notNull(),
  position: integer("position").notNull(),
});

export const invoiceMessages = pgTable("invoice_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  invoiceId: uuid("invoice_id").references(() => invoices.id, { onDelete: "cascade" }),
  role: varchar("role", { length: 20 }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const invoiceDocuments = pgTable("invoice_documents", {
  id: uuid("id").defaultRandom().primaryKey(),
  invoiceId: uuid("invoice_id").notNull().references(() => invoices.id, { onDelete: "cascade" }),
  token: varchar("token", { length: 80 }).notNull().unique(),
  version: integer("version").notNull(),
  kind: varchar("kind", { length: 20 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const stripeEvents = pgTable("stripe_events", {
  id: text("id").primaryKey(),
  type: varchar("type", { length: 100 }).notNull(),
  payload: jsonb("payload").notNull(),
  processedAt: timestamp("processed_at", { withTimezone: true }).defaultNow().notNull(),
});

export const invoicesRelations = relations(invoices, ({ many }) => ({
  invoiceLineItems: many(invoiceLineItems),
  invoiceDocuments: many(invoiceDocuments),
  invoiceMessages: many(invoiceMessages),
}));

export const invoiceLineItemsRelations = relations(invoiceLineItems, ({ one }) => ({
  invoice: one(invoices, {
    fields: [invoiceLineItems.invoiceId],
    references: [invoices.id],
  }),
}));

export const invoiceDocumentsRelations = relations(invoiceDocuments, ({ one }) => ({
  invoice: one(invoices, {
    fields: [invoiceDocuments.invoiceId],
    references: [invoices.id],
  }),
}));
