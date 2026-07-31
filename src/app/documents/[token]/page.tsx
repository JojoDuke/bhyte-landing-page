import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAppOrigin } from "@/lib/app-url";
import { getInvoiceDocumentByToken } from "@/lib/invoices/document-access";
import { formatMoney } from "@/lib/invoices/format-money";
import { DocumentPreviewScreen } from "./document-preview-screen";

type PageProps = {
  params: Promise<{ token: string }>;
};

function getInvoiceStatusLabel(status: string) {
  if (status === "paid" || status === "active") return "Paid";
  if (status === "past_due") return "Past due";
  if (status === "cancelled") return "Cancelled";
  return "Payment due";
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { token } = await params;
  const document = await getInvoiceDocumentByToken(token);

  if (!document?.invoice) {
    return {
      title: "Invoice not found",
      robots: { index: false, follow: false },
    };
  }

  const invoice = document.invoice;
  const origin = getAppOrigin();
  const pageUrl = `${origin}/documents/${token}`;
  const imageUrl = `${origin}/documents/${token}/opengraph-image`;
  const amount = formatMoney(invoice.total, invoice.currency);
  const statusLabel = getInvoiceStatusLabel(invoice.status);
  const title = `Invoice ${invoice.number}`;
  const description = `${invoice.customerName} · ${amount} · ${statusLabel}`;

  return {
    title,
    description,
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "Bhyte Software, LLC",
      type: "website",
      locale: "en_US",
      images: [{
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: `${title} for ${invoice.customerName}`,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function DocumentPreviewPage({ params }: PageProps) {
  const { token } = await params;
  const document = await getInvoiceDocumentByToken(token);

  if (!document?.invoice) notFound();

  const invoice = document.invoice;
  const settled = invoice.status === "paid" || invoice.status === "active";

  return (
    <DocumentPreviewScreen
      token={token}
      number={invoice.number}
      customerName={invoice.customerName}
      amount={formatMoney(invoice.total, invoice.currency)}
      statusLabel={getInvoiceStatusLabel(invoice.status)}
      settled={settled}
      isSubscription={invoice.invoiceType === "subscription"}
      billingInterval={invoice.billingInterval}
    />
  );
}
