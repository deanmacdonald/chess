import game from "@/api/gameEngine"; // adjust path if needed

export async function GET() {
  return Response.json(game.getState());
}

export async function POST(request) {
  const body = await request.json();

  if (body.type === "legalMoves") {
    return Response.json({
      legalMoves: game.getLegalMoves(body.from),
    });
  }

  if (body.type === "move") {
    game.makeMove(body.from, body.to);
    return Response.json(game.getState());
  }

  return new Response(JSON.stringify({ error: "Invalid request" }), {
    status: 400,
  });
}
