export const validateMove = (game, from, to) => {
    const move = game.move({ from, to, promotion: "q" });
    if (!move) {
        return { valid: false, error: `Invalid move from ${from} to ${to}` };
    }
    return { valid: true, move };
};
