document.addEventListener("DOMContentLoaded", function () {
    const board = Chessboard('board', {
        position: 'start',
        responsive: true,
        draggable: true,
        dropOffBoard: 'snapback'
    });
});
