import { ImageResponse } from "next/og";
import { getAppOrigin } from "@/lib/app-url";
import { getInvoiceDocumentByToken } from "@/lib/invoices/document-access";
import { formatMoney } from "@/lib/invoices/format-money";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function statusLabel(status: string) {
  if (status === "paid" || status === "active") return "Paid";
  if (status === "past_due") return "Past due";
  if (status === "cancelled") return "Cancelled";
  return "Payment due";
}

export default async function Image({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const document = await getInvoiceDocumentByToken(token);

  if (!document?.invoice) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0b121c",
            color: "#ffffff",
            fontSize: 48,
            fontWeight: 600,
          }}
        >
          Invoice not found
        </div>
      ),
      size,
    );
  }

  const invoice = document.invoice;
  const origin = getAppOrigin();
  const amount = formatMoney(invoice.total, invoice.currency);
  const settled = invoice.status === "paid" || invoice.status === "active";
  const label = statusLabel(invoice.status);
  const intervalSuffix = invoice.invoiceType === "subscription"
    ? `/${invoice.billingInterval === "year" ? "yr" : "mo"}`
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "linear-gradient(135deg, #050608 0%, #0b121c 55%, #101827 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${origin}/logos/BhyteIcon1.png`}
              alt=""
              width={72}
              height={72}
              style={{ borderRadius: 18 }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 24, color: "#93c5fd", letterSpacing: 4, textTransform: "uppercase" }}>
                Bhyte Software
              </div>
              <div style={{ fontSize: 52, fontWeight: 700, letterSpacing: -2 }}>
                {invoice.invoiceType === "subscription" ? "Subscription Invoice" : "Invoice"}
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "12px 24px",
              borderRadius: 999,
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: "uppercase",
              background: settled ? "rgba(16, 185, 129, 0.16)" : "rgba(245, 158, 11, 0.16)",
              color: settled ? "#6ee7b7" : "#fcd34d",
            }}
          >
            {label}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 28, color: "#a1a1aa", letterSpacing: 3, textTransform: "uppercase" }}>
            {invoice.number}
          </div>
          <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: -2 }}>
            {invoice.customerName}
          </div>
          <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: -3, color: "#ffffff" }}>
            {amount}{intervalSuffix}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
