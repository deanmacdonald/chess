export const getSquareColor = (file, rank) => {
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const fileIndex = files.indexOf(file);
    const isDark = (fileIndex + rank) % 2 === 1;
    return isDark ? "dark" : "light";
};
