import React, { useEffect, useState } from "react";

const Timer = ({ initialTime, isActive, onTimeout }) => {
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        if (!isActive || time <= 0) return;
        const interval = setInterval(() => {
            setTime((t) => {
                if (t <= 1) {
                    clearInterval(interval);
                    onTimeout?.();
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [isActive, time]);

    const format = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    return <span>{format(time)}</span>;
};

export default Timer;
