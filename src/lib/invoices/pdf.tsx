import React from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  Document,
  Image,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
  renderToBuffer,
} from "@react-pdf/renderer";

type PdfInvoice = {
  number: string;
  customerName: string;
  customerEmail: string | null;
  customerAddress: string | null;
  currency: string;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
  issueDate: Date;
  dueDate: Date | null;
  notes: string | null;
  status: string;
  invoiceType: "one_time" | "subscription";
  billingInterval: "month" | "year" | null;
  stripePaymentLinkUrl: string | null;
  invoiceLineItems: Array<{ description: string; quantity: number; unitAmount: number }>;
};

type PdfOptions = {
  hidePaymentSection?: boolean;
};

const logo = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public", "logos", "BhyteIcon1.png"),
).toString("base64")}`;

const styles = StyleSheet.create({
  page: { padding: 46, fontSize: 9.5, color: "#15171a", fontFamily: "Helvetica", backgroundColor: "#ffffff" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  title: { fontSize: 30, fontFamily: "Helvetica-Bold", letterSpacing: -1 },
  logo: { width: 54, height: 54, borderRadius: 12 },
  metadata: { marginTop: 15, gap: 4 },
  metadataRow: { flexDirection: "row" },
  metadataLabel: { width: 82, color: "#71717a" },
  company: { marginTop: 16, lineHeight: 1.04 },
  companyName: { fontFamily: "Helvetica-Bold", marginBottom: 1 },
  divider: { height: 1, backgroundColor: "#e4e4e7", marginVertical: 15 },
  billingRow: { flexDirection: "row", justifyContent: "space-between" },
  billTo: { width: "58%", lineHeight: 1.05 },
  label: { color: "#71717a", fontSize: 8.5, marginBottom: 7, textTransform: "uppercase", letterSpacing: 0.6 },
  dueBox: { width: "36%", alignItems: "flex-end" },
  dueAmount: { fontFamily: "Helvetica-Bold", fontSize: 18, marginTop: 4 },
  dueDate: { color: "#71717a", marginTop: 5 },
  table: { marginTop: 30 },
  tableHeader: { flexDirection: "row", paddingBottom: 8, borderBottom: "1 solid #d4d4d8", color: "#71717a", fontSize: 8.5 },
  row: { flexDirection: "row", paddingVertical: 11, borderBottom: "1 solid #eeeeef" },
  description: { flex: 1 },
  quantity: { width: 52, textAlign: "right" },
  rate: { width: 82, textAlign: "right" },
  amount: { width: 90, textAlign: "right" },
  totals: { marginTop: 16, marginLeft: "auto", width: 220 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 4 },
  totalDivider: { borderTop: "1 solid #d4d4d8", marginTop: 5, paddingTop: 10 },
  total: { fontSize: 14, fontFamily: "Helvetica-Bold" },
  notes: { marginTop: 25, color: "#52525b", lineHeight: 1.5 },
  button: { marginTop: 30, backgroundColor: "#111827", color: "#ffffff", padding: 13, textAlign: "center", borderRadius: 6, fontFamily: "Helvetica-Bold", textDecoration: "none" },
  paid: { marginTop: 30, backgroundColor: "#ecfdf5", color: "#047857", padding: 13, textAlign: "center", borderRadius: 6, fontFamily: "Helvetica-Bold" },
  warning: { marginTop: 30, backgroundColor: "#fff7ed", color: "#c2410c", padding: 13, textAlign: "center", borderRadius: 6, fontFamily: "Helvetica-Bold" },
  muted: { marginTop: 30, backgroundColor: "#f4f4f5", color: "#52525b", padding: 13, textAlign: "center", borderRadius: 6, fontFamily: "Helvetica-Bold" },
  footer: { position: "absolute", left: 46, right: 46, bottom: 35, paddingTop: 12, borderTop: "1 solid #eeeeef", color: "#a1a1aa", fontSize: 8, textAlign: "center" },
});

function money(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format(amount / 100);
}

export function InvoicePdf({ invoice, options }: { invoice: PdfInvoice; options?: PdfOptions }) {
  const isSubscription = invoice.invoiceType === "subscription";
  const settled = invoice.status === "paid" || invoice.status === "active";
  const cancelled = invoice.status === "cancelled";
  const pastDue = invoice.status === "past_due";
  const hidePaymentSection = options?.hidePaymentSection ?? false;
  const intervalLabel = invoice.billingInterval === "year" ? "year" : "month";

  return (
    <Document title={`${invoice.number} invoice`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>{isSubscription ? "Subscription Invoice" : "Invoice"}</Text>
            <View style={styles.metadata}>
              <View style={styles.metadataRow}>
                <Text style={styles.metadataLabel}>Invoice number</Text>
                <Text>{invoice.number}</Text>
              </View>
              <View style={styles.metadataRow}>
                <Text style={styles.metadataLabel}>Date of issue</Text>
                <Text>{formatDate(invoice.issueDate)}</Text>
              </View>
              <View style={styles.metadataRow}>
                <Text style={styles.metadataLabel}>{isSubscription ? "First billing date" : "Date due"}</Text>
                <Text>{invoice.dueDate ? formatDate(invoice.dueDate) : "—"}</Text>
              </View>
              {isSubscription && (
                <View style={styles.metadataRow}>
                  <Text style={styles.metadataLabel}>Billing</Text>
                  <Text>{intervalLabel === "year" ? "Yearly" : "Monthly"} subscription</Text>
                </View>
              )}
            </View>
          </View>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image src={logo} style={styles.logo} />
        </View>

        <View style={styles.company}>
          <Text style={styles.companyName}>Bhyte Software, LLC</Text>
          <Text>2261 Market Street STE 5800 #5800</Text>
          <Text>San Francisco, California 94114, United States</Text>
          <Text>+1 870 888 3133</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.billingRow}>
          <View style={styles.billTo}>
            <Text style={styles.label}>Bill to</Text>
            <Text style={{ fontFamily: "Helvetica-Bold" }}>{invoice.customerName}</Text>
            {invoice.customerAddress && <Text>{invoice.customerAddress}</Text>}
            {hasContent(invoice.customerEmail) && <Text>{invoice.customerEmail}</Text>}
          </View>
          <View style={styles.dueBox}>
            <Text style={styles.label}>{isSubscription ? "Recurring amount" : "Amount due"}</Text>
            <Text style={styles.dueAmount}>
              {money(invoice.total, invoice.currency)}{isSubscription ? `/${intervalLabel}` : ""}
            </Text>
            {invoice.dueDate && !isSubscription && <Text style={styles.dueDate}>Due {formatDate(invoice.dueDate)}</Text>}
            {invoice.dueDate && isSubscription && <Text style={styles.dueDate}>Starts {formatDate(invoice.dueDate)}</Text>}
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.description}>Description</Text>
            <Text style={styles.quantity}>Qty</Text>
            <Text style={styles.rate}>Rate</Text>
            <Text style={styles.amount}>Amount</Text>
          </View>
          {invoice.invoiceLineItems.map((item) => (
            <View key={`${item.description}-${item.quantity}`} style={styles.row}>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <Text style={styles.rate}>{money(item.unitAmount, invoice.currency)}</Text>
              <Text style={styles.amount}>{money(item.unitAmount * item.quantity, invoice.currency)}</Text>
            </View>
          ))}
          <View style={styles.totals}>
            <View style={styles.totalRow}>
              <Text>Subtotal</Text>
              <Text>{money(invoice.subtotal, invoice.currency)}</Text>
            </View>
            {invoice.discountAmount > 0 && (
              <View style={styles.totalRow}>
                <Text>Discount</Text>
                <Text>−{money(invoice.discountAmount, invoice.currency)}</Text>
              </View>
            )}
            <View style={[styles.totalRow, styles.totalDivider]}>
              <Text style={styles.total}>{isSubscription ? "Recurring total" : "Amount due"}</Text>
              <Text style={styles.total}>
                {money(invoice.total, invoice.currency)}{isSubscription ? `/${intervalLabel}` : ""} {invoice.currency.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>

        {hasContent(invoice.notes) && <Text style={styles.notes}>{invoice.notes}</Text>}
        {!hidePaymentSection && (settled ? (
          <Text style={styles.paid}>
            {isSubscription ? "ACTIVE SUBSCRIPTION — Thank you for your business." : "PAID — Thank you for your business."}
          </Text>
        ) : cancelled ? (
          <Text style={styles.muted}>SUBSCRIPTION CANCELLED</Text>
        ) : pastDue ? (
          <Text style={styles.warning}>SUBSCRIPTION PAST DUE — Please update payment.</Text>
        ) : invoice.stripePaymentLinkUrl ? (
          <Link src={invoice.stripePaymentLinkUrl} style={styles.button}>
            {isSubscription ? "Subscribe" : "Pay Invoice"}
          </Link>
        ) : null)}
        <Text style={styles.footer}>Bhyte Software, LLC · bhytesoftware.com</Text>
      </Page>
    </Document>
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function hasContent(value: string | null) {
  return Boolean(value && !/^(none|n\/a|not applicable|no)$/i.test(value.trim()));
}

export function renderInvoicePdf(invoice: PdfInvoice, options?: PdfOptions) {
  return renderToBuffer(<InvoicePdf invoice={invoice} options={options} />);
}
