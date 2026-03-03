"use client";

import React, { useState, useEffect } from "react";

export default function ChessClock({ initialTime = 300, running = false }) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTime((t) => Math.max(0, t - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  const format = (t) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="chess-clock">
      <span className="clock-time">{format(time)}</span>
    </div>
  );
}
