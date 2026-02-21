import { runEngine, getLegalMoves } from "@lib/chess";

export async function POST(req) {
  const body = await req.json();
  const state = body.state;

  const legal = getLegalMoves(state);
  const result = runEngine(state);

  return Response.json({
    legalMoves: legal,
    engineMove: result.bestMove,
    newState: result.newState,
  });
}
