import React from "react";
import {
  Document,
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
  dueDate: Date | null;
  notes: string | null;
  status: string;
  stripePaymentLinkUrl: string | null;
  invoiceLineItems: Array<{ description: string; quantity: number; unitAmount: number }>;
};

const styles = StyleSheet.create({
  page: { padding: 42, fontSize: 10, color: "#18181b", fontFamily: "Helvetica" },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 32 },
  brand: { fontSize: 22, color: "#2563eb", fontFamily: "Helvetica-Bold" },
  title: { fontSize: 26, fontFamily: "Helvetica-Bold", textAlign: "right" },
  muted: { color: "#71717a", marginTop: 4 },
  section: { marginTop: 18 },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 8, borderBottom: "1 solid #e4e4e7" },
  amount: { width: 90, textAlign: "right" },
  total: { fontSize: 14, fontFamily: "Helvetica-Bold", marginTop: 14, textAlign: "right" },
  button: { marginTop: 28, backgroundColor: "#2563eb", color: "#ffffff", padding: 12, textAlign: "center", borderRadius: 4 },
  paid: { marginTop: 28, backgroundColor: "#dcfce7", color: "#166534", padding: 12, textAlign: "center", borderRadius: 4 },
});

function money(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format(amount / 100);
}

export function InvoicePdf({ invoice }: { invoice: PdfInvoice }) {
  const paid = invoice.status === "paid";
  return (
    <Document title={`${invoice.number} invoice`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>BHYTE STUDIOS</Text>
            <Text style={styles.muted}>AI-native software built to scale</Text>
          </View>
          <View>
            <Text style={styles.title}>INVOICE</Text>
            <Text style={styles.muted}>{invoice.number}</Text>
          </View>
        </View>
        <View>
          <Text style={{ fontFamily: "Helvetica-Bold" }}>Bill to</Text>
          <Text>{invoice.customerName}</Text>
          {invoice.customerEmail && <Text>{invoice.customerEmail}</Text>}
          {invoice.customerAddress && <Text>{invoice.customerAddress}</Text>}
          {invoice.dueDate && <Text style={styles.muted}>Due {invoice.dueDate.toLocaleDateString()}</Text>}
        </View>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={{ fontFamily: "Helvetica-Bold" }}>Description</Text>
            <Text style={styles.amount}>Amount</Text>
          </View>
          {invoice.invoiceLineItems.map((item) => (
            <View key={`${item.description}-${item.quantity}`} style={styles.row}>
              <Text>{item.description} × {item.quantity}</Text>
              <Text style={styles.amount}>{money(item.unitAmount * item.quantity, invoice.currency)}</Text>
            </View>
          ))}
          <View style={styles.section}>
            <Text style={{ textAlign: "right" }}>Subtotal: {money(invoice.subtotal, invoice.currency)}</Text>
            {invoice.taxAmount > 0 && <Text style={{ textAlign: "right" }}>Tax: {money(invoice.taxAmount, invoice.currency)}</Text>}
            {invoice.discountAmount > 0 && <Text style={{ textAlign: "right" }}>Discount: −{money(invoice.discountAmount, invoice.currency)}</Text>}
            <Text style={styles.total}>Total: {money(invoice.total, invoice.currency)}</Text>
          </View>
        </View>
        {invoice.notes && <Text style={{ ...styles.section, color: "#52525b" }}>{invoice.notes}</Text>}
        {paid ? (
          <Text style={styles.paid}>PAID — Thank you for your business.</Text>
        ) : invoice.stripePaymentLinkUrl ? (
          <Link src={invoice.stripePaymentLinkUrl} style={styles.button}>Pay Invoice</Link>
        ) : null}
      </Page>
    </Document>
  );
}

export function renderInvoicePdf(invoice: PdfInvoice) {
  return renderToBuffer(<InvoicePdf invoice={invoice} />);
}
