import { NextResponse } from "next/server";
import { sendDuePaidInvoiceEmails } from "@/lib/invoices/service";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return NextResponse.json({ error: "CRON_SECRET is not configured." }, { status: 500 });
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = await sendDuePaidInvoiceEmails();
  return NextResponse.json({ processed: results.length, results });
}
