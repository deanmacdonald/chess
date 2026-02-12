let game = require("./gameEngine"); // your chess logic

module.exports = async (req, res) => {
    if (req.method === "GET") {
        return res.json(game.getState());
    }

    if (req.method === "POST") {
        const body = req.body;

        if (body.type === "legalMoves") {
            return res.json({
                legalMoves: game.getLegalMoves(body.from)
            });
        }

        if (body.type === "move") {
            game.makeMove(body.from, body.to);
            return res.json(game.getState());
        }
    }

    res.status(400).json({ error: "Invalid request" });
};
