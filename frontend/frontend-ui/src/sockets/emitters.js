// src/sockets/emitters.js
import { socket } from "./socket";

/**
 * Emit a move to the server
 * @param {string} from - starting square (e.g., "e2")
 * @param {string} to - ending square (e.g., "e4")
 */
export const emitMove = (from, to) => {
    socket.emit("move", { from, to });
};

/**
 * Emit a game reset to the server
 */
export const emitReset = () => {
    socket.emit("reset");
};

/**
 * Emit a custom event (optional extension)
 * @param {string} event - event name
 * @param {any} payload - data to send
 */
export const emitCustom = (event, payload) => {
    socket.emit(event, payload);
};
