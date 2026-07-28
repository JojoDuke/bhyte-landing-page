import { requireAdmin } from "@/lib/auth/server";
import { PastPaymentForm } from "./past-payment-form";

export default async function PastPaymentPage() {
  await requireAdmin();
  return <PastPaymentForm />;
}
