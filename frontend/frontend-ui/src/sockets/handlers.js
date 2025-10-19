import { socket } from "./socket";

export const registerSocketHandlers = ({ onMove, onReset }) => {
    socket.on("move", onMove);
    socket.on("reset", onReset);
};
