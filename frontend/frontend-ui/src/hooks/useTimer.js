import { useState, useEffect } from "react";

export const useTimer = (initialTime, isActive, onTimeout) => {
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        if (!isActive || time <= 0) return;

        const interval = setInterval(() => {
            setTime((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    onTimeout?.();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isActive, time]);

    return time;
};
