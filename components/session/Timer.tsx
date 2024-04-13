"use client";
import React from "react";
import { cn } from "@/lib/utils";

export default function Timer() {
  const [time, setTime] = React.useState(60);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev === 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const printTime = () => {
    return `${new Date(time * 1000).toISOString().substr(11, 8)}`;
  };

  return (
    <div
      className={cn(
        "w-full h-[50lvh] max-h-[200px] border border-lime-300/50 rounded-xl bg-lime-500/10 flex justify-center items-center text-lime-300",
        {
          "animate-timer-danger": time < 10 && time > 3,
          "animate-timer-danger-fast": time <= 3 && time > 0,
          "border-rose-400/50 text-rose-400 bg-rose-500/10": time === 0,
        }
      )}
    >
      <div></div>
      <p className=" text-[14vw] font-black ">{printTime()}</p>
    </div>
  );
}
