import { useCallback } from "react";

export const useSound = () => {
    const playSound = useCallback((src) => {
        const audio = new Audio(src);
        audio.play().catch((err) => {
            console.warn("Sound playback failed:", err);
        });
    }, []);

    return { playSound };
};
