import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/server";
import { createConversation, listConversations } from "@/lib/conversations/service";

export async function GET() {
  try {
    const user = await requireAdmin();
    const items = await listConversations(user.id);
    return NextResponse.json({ conversations: items });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST() {
  try {
    const user = await requireAdmin();
    const conversation = await createConversation(user.id);
    return NextResponse.json({ conversation }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create conversation.";
    const status = message === "UNAUTHORIZED" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
