"use client";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Pause, Play, SkipForward, TimerReset } from "lucide-react";

export default function Timer() {
  const [timer, setTimer] = React.useState({
    time: 60,
    isPaused: false,
  });

  React.useEffect(() => {
    if (timer.isPaused) {
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev.time === 0) {
          clearInterval(interval);
          return prev;
        }
        return {
          ...prev,
          time: prev.time - 1,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer.isPaused]);

  const printTime = () => {
    return `${new Date(timer.time * 1000).toISOString().substr(11, 8)}`;
  };

  const resetTimer = () => {
    setTimer((prev) => ({
      ...prev,
      time: 60,
    }));
  };

  const pauseTimer = () => {
    console.log("pause");
    setTimer((prev) => ({
      ...prev,
      isPaused: !prev.isPaused,
    }));
  };

  const skipTimer = () => {
    setTimer((prev) => ({
      ...prev,
      time: 0,
    }));
  };

  useEffect(() => {
    if (timer.time >= 5) {
      navigator.vibrate([200, 800, 200, 800, 200, 800, 200, 800, 200, 800]);
    } else if (timer.time > 0) {
      navigator.vibrate([1000]);
    } else {
      navigator.vibrate(0);
    }
  }, [timer.time]);

  return (
    <div
      className={cn(
        "w-full h-[50lvh] max-h-[200px] border border-lime-300/50 rounded-xl bg-lime-500/10 flex justify-center items-center text-lime-300 flex-col relative",
        {
          "animate-timer-danger": timer.time < 10 && timer.time > 3,
          "animate-timer-danger-fast": timer.time <= 3 && timer.time > 0,
          "border-rose-400/50 text-rose-400 bg-rose-500/10": timer.time === 0,
        }
      )}
    >
      <svg
        className="absolute top-0 left-0 w-full h-full opacity-20"
        viewBox="0 0 500 100"
        xmlns="http://www.w3.org/2000/svg"
        // responsive
        preserveAspectRatio="none"
      >
        <pattern
          id="pattern-3"
          patternUnits="userSpaceOnUse"
          width="8"
          height="8"
        >
          <path
            d="M-1,1 l4,-4 M0,8 l8,-8 M6,10 l4,-4"
            stroke="currentColor"
          />
        </pattern>

        <rect
          x="0"
          y="0"
          width="500"
          height="100"
          fill="url(#pattern-3)"
        />
      </svg>

      <div className="relative z-50">
        <div className="flex justify-center items-center">
          <p className="text-xs ">
            {timer.time === 0 ? "Rest time ended pussy" : "Rest Bitch, you've earned it"}
          </p>
        </div>
        <p className=" text-[14vw] font-black leading-none">{printTime()}</p>
      </div>
      <div className="absolute bottom-0 left-0 w-full flex justify-center items-center gap-1">
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => resetTimer()}
        >
          <TimerReset className="h-4 w-4" />
        </Button>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => pauseTimer()}
        >
          {timer.isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </Button>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => skipTimer()}
        >
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
