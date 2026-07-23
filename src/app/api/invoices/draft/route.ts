import { NextResponse } from "next/server";
import { z } from "zod";
import { createInvoiceDraft } from "@/lib/anthropic";
import { requireAdmin } from "@/lib/auth/server";

const requestSchema = z.object({ message: z.string().min(10).max(10_000) });

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const { message } = requestSchema.parse(await request.json());
    const draft = await createInvoiceDraft(message);
    return NextResponse.json({ draft });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create invoice draft.";
    const status = message === "UNAUTHORIZED" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
