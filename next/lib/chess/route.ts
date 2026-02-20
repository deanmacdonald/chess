import { NextResponse } from "next/server";
import { createInitialState, applyMove } from "@/lib/chess/engine";

let gameState = createInitialState();

export async function GET() {
  return NextResponse.json(gameState);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { from, to } = body;

  const result = applyMove(gameState, from, to);

  if ("error" in result) {
    return NextResponse.json(result, { status: 400 });
  }

  gameState = result;
  return NextResponse.json(gameState);
}
