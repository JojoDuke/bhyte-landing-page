import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { markInvoicePaid } from "@/lib/invoices/service";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Invalid webhook configuration." }, { status: 400 });
  }

  try {
    const event = getStripe().webhooks.constructEvent(
      await request.text(),
      signature,
      webhookSecret,
    );

    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded"
    ) {
      await markInvoicePaid(event.data.object.id, event.id, event.type, event.data.object);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook verification failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
