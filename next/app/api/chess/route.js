import game from "@/lib/gameEngine"; // <-- update this path after running find command

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
    const result = game.makeMove(body.from, body.to);
    return Response.json(result);
  }

  return Response.json({ error: "Invalid request" }, { status: 400 });
}
