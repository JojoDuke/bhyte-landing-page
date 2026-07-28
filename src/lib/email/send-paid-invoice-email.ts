import nodemailer from "nodemailer";

function getSmtpConfig() {
  const user = process.env.SMTP_USER ?? process.env.INVOICE_EMAIL_FROM ?? "jojoduke@bhytesoftware.com";
  const password = process.env.PRIVATE_EMAIL_PASSWORD ?? process.env.SMTP_PASSWORD;
  const port = Number(process.env.SMTP_PORT ?? "465");

  if (!password) {
    throw new Error("PRIVATE_EMAIL_PASSWORD is not configured.");
  }

  return {
    host: process.env.SMTP_HOST ?? "mail.privateemail.com",
    port,
    secure: port === 465,
    requireTLS: port === 587,
    auth: { user, pass: password },
    from: process.env.INVOICE_EMAIL_FROM ?? user,
  };
}

export async function sendPaidInvoiceEmail({
  to,
  invoiceNumber,
  pdfBytes,
}: {
  to: string;
  invoiceNumber: string;
  pdfBytes: Buffer;
}) {
  const smtp = getSmtpConfig();
  const transport = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    requireTLS: smtp.requireTLS,
    auth: smtp.auth,
    connectionTimeout: 15_000,
    greetingTimeout: 15_000,
    tls: { minVersion: "TLSv1.2" },
  });

  await transport.sendMail({
    from: smtp.from,
    to,
    subject: `Invoice ${invoiceNumber}`,
    text: [
      "Thank you for your payment.",
      "",
      `Your invoice ${invoiceNumber} is attached.`,
      "",
      "Bhyte Software, LLC",
    ].join("\n"),
    attachments: [{
      filename: `${invoiceNumber}.pdf`,
      content: pdfBytes,
      contentType: "application/pdf",
    }],
  });
}
