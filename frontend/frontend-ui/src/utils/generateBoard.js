export const generateBoard = () => {
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const ranks = [8, 7, 6, 5, 4, 3, 2, 1];
    const board = [];

    ranks.forEach((rank) => {
        files.forEach((file) => {
            board.push({ file, rank, position: `${file}${rank}` });
        });
    });

    return board;
};
