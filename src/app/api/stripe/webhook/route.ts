import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { markInvoicePaid, syncSubscriptionStatus } from "@/lib/invoices/service";

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
      event.type === "checkout.session.completed"
      || event.type === "checkout.session.async_payment_succeeded"
    ) {
      const checkoutSessionId = event.data.object.id;
      console.info("Stripe webhook: marking invoice paid", {
        eventId: event.id,
        eventType: event.type,
        checkoutSessionId,
      });
      await markInvoicePaid(checkoutSessionId, event.id, event.type, event.data.object);
    }

    if (
      event.type === "customer.subscription.updated"
      || event.type === "customer.subscription.deleted"
    ) {
      const subscription = event.data.object;
      await syncSubscriptionStatus(
        subscription.id,
        subscription.status,
        event.id,
        event.type,
        subscription,
      );
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook verification failed.";
    console.error("Stripe webhook failed:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
