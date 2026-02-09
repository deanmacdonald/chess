import React, { useState, useEffect } from "react";
import "./ChessPiece.css";

export default function ChessPiece({
    piece,
    row,
    col,
    squareSize,
    boardRef,
    onDragStart,
    onDragEnd,
}) {
    const [dragging, setDragging] = useState(false);
    const [dragPos, setDragPos] = useState({ x: 0, y: 0 });

    const handlePointerDown = (e) => {
        e.preventDefault();
        setDragging(true);
        onDragStart?.(piece, row, col);

        setDragPos({
            x: e.clientX - squareSize / 2,
            y: e.clientY - squareSize / 2,
        });
    };

    const handlePointerMove = (e) => {
        if (!dragging) return;

        setDragPos({
            x: e.clientX - squareSize / 2,
            y: e.clientY - squareSize / 2,
        });
    };

    const handlePointerUp = (e) => {
        if (!dragging) return;
        setDragging(false);

        if (!boardRef.current) return;
        const rect = boardRef.current.getBoundingClientRect();

        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;

        let targetCol = Math.floor(relX / squareSize);
        let targetRow = Math.floor(relY / squareSize);

        targetCol = Math.max(0, Math.min(7, targetCol));
        targetRow = Math.max(0, Math.min(7, targetRow));

        onDragEnd?.(piece, row, col, targetRow, targetCol);
    };

    useEffect(() => {
        if (dragging) {
            window.addEventListener("pointermove", handlePointerMove);
            window.addEventListener("pointerup", handlePointerUp);
        } else {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
        }

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
        };
    }, [dragging]);

    const x = col * squareSize;
    const y = row * squareSize;
    const piecePath = `/pieces/${piece.color}${piece.type}.png`;

    return (
        <img
            src={piecePath}
            alt={piece.type}
            className={`chess-piece ${dragging ? "dragging" : ""}`}
            onPointerDown={handlePointerDown}
            draggable={false}
            style={{
                position: "absolute",
                width: squareSize,
                height: squareSize,
                left: dragging ? dragPos.x : x,
                top: dragging ? dragPos.y : y,
                cursor: dragging ? "grabbing" : "grab",
                zIndex: dragging ? 999 : 10,
            }}
        />
    );
}
