import React from "react";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

import { cn } from "@/lib/utils";

export default function HomeFeatures() {
  return (
    <div className="w-full h-[200lvh] mt-32 max-w-screen-2xl mx-auto">
      <div>
        <h2 className="text-2xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-stone-400 via-stone-50 to-stone-800 mb-2">
          Single place for all your gym needs
        </h2>
        <p className="text-stone-300 font-medium max-w-[50%] text-pretty ">
          No more notebooks, no more spreadsheets, no more hassle. Workouter is the only tool you need to
          track your workouts and progress in the gym like a pro athlete.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-12 mt-8">
        <Card
          title="Timer"
          description="Keep track of your workouts rest time with the built-in timer, never miss a set again"
          className=" md:col-span-4"
        >
          <TimerFeature />
        </Card>
        <Card
          title="Timer"
          description="Keep track of your workouts rest time with the built-in timer, never miss a set again"
          className="md:col-span-3"
        >
          <TimerFeature />
        </Card>

        <Card
          title="Timer"
          description="Keep track of your workouts rest time with the built-in timer, never miss a set again"
          className="md:col-span-5"
        >
          <TimerFeature />
        </Card>
      </div>
    </div>
  );
}

const Card = (props: {
  children: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        " h-full group w-full p-2 border border-stone-900 rounded-xl min-h-10 text-stone-100 hover:border-stone-800 transition-all ease-out duration-500",
        props.className || ""
      )}
    >
      {props.children}
      <div className="pt-2">
        <h3 className="text-xl font-semibold">{props.title}</h3>
        <p className=" text-pretty text-sm font-medium">{props.description}</p>
      </div>
    </div>
  );
};

const TimerFeature = () => {
  return (
    <div className="relative h-300px w-full">
      <div className="relative h-[250px] border border-lime-300/20 rounded overflow-hidden outline-dashed outline-2 outline-lime-300/0 outline-offset-8  group-hover:border-lime-300/50 group-hover:outline-offset-0 group-hover:outline-lime-300/20  transition-all ease-out duration-500">
        <svg
          className="h-full object-fill "
          viewBox="0 0 500 200"
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
            <path d="M-1,1 l4,-4 M0,8 l8,-8 M6,10 l4,-4" />
          </pattern>

          <rect
            x="0"
            y="0"
            width="500"
            height="200"
            fill="url(#pattern-3)"
          />
        </svg>
        <p className=" text-9xl font-bold absolute top-1/2 right-0 text-lime-300/20 -translate-y-1/2 translate-x-1/2 group-hover:translate-x-0 group-hover:text-lime-300 transition-all ease-out duration-500">
          00:21
        </p>
      </div>
    </div>
  );
};
