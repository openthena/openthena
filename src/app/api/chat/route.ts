import { streamText, type CoreMessage } from "ai";
import {
  getModel,
  isConfigured,
  DEFAULT_MODEL_ID,
  DEFAULT_SYSTEM_PROMPT,
} from "@/lib/ai/gateway";

// Run on the edge for fast, streaming, stateless responses.
export const runtime = "edge";
// This endpoint must never be cached or pre-rendered.
export const dynamic = "force-dynamic";

const MAX_MESSAGES = 50;
const MAX_CHARS = 24_000;

export async function POST(req: Request) {
  if (!isConfigured()) {
    return Response.json(
      {
        error:
          "OpenThena is not configured. Set MIMO_API_KEY (or a LiteLLM proxy) in your environment.",
      },
      { status: 503 },
    );
  }

  let body: { messages?: CoreMessage[]; model?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json(
      { error: "`messages` must be a non-empty array." },
      { status: 400 },
    );
  }
  if (messages.length > MAX_MESSAGES) {
    return Response.json(
      { error: `Too many messages (max ${MAX_MESSAGES}).` },
      { status: 413 },
    );
  }

  const totalChars = messages.reduce(
    (sum, m) =>
      sum + (typeof m.content === "string" ? m.content.length : 0),
    0,
  );
  if (totalChars > MAX_CHARS) {
    return Response.json(
      { error: "Conversation is too long. Start a new chat." },
      { status: 413 },
    );
  }

  try {
    const result = streamText({
      model: getModel(body.model ?? DEFAULT_MODEL_ID),
      system: DEFAULT_SYSTEM_PROMPT,
      messages,
      temperature: 0.7,
    });

    // Stateless: we forward the stream and write nothing to any store.
    return result.toDataStreamResponse({
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unexpected gateway error.";
    return Response.json({ error: message }, { status: 502 });
  }
}
