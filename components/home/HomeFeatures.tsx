import React from "react";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

import { cn } from "@/lib/utils";

export default function HomeFeatures() {
  return (
    <div
      className="w-full h-[200lvh] mt-32 max-w-screen-2xl mx-auto"
      id="features-bento"
    >
      <div>
        <h2 className="text-2xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-stone-400 via-stone-50 to-stone-800 mb-2">
          Single place for all your gym needs
        </h2>
        <p className="text-stone-300 font-medium max-w-[50%] text-pretty ">
          No more notebooks, no more spreadsheets, no more hassle. Workouter is the only tool you need to
          track your workouts and progress in the gym like a pro athlete.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 mt-8">
        <Card
          title="Timer"
          description="Keep track of your workouts rest time with the built-in timer, never miss a set again"
          className=" md:col-span-4"
        >
          <TimerFeature />
        </Card>
        <Card
          title="Workout Statuses"
          description="Easily track your workout status with the built-in tags feature, never be unplanned again"
          className="md:col-span-3"
        >
          <TagsFeature />
        </Card>

        <Card
          title="Advanced Stats"
          description="Get detailed insights about your workouts and progress with our advanced stats feature, never be in the dark again"
          className="md:col-span-5"
        >
          <StatsFeature />
        </Card>
        <Card
          title="Workout Statuses"
          description="Easily track your workout status with the built-in tags feature, never be unplanned again"
          className="md:col-span-3"
        >
          <TagsFeature />
        </Card>

        <Card
          title="Advanced Stats"
          description="Get detailed insights about your workouts and progress with our advanced stats feature, never be in the dark again"
          className="md:col-span-5"
        >
          <StatsFeature />
        </Card>
        <Card
          title="Timer"
          description="Keep track of your workouts rest time with the built-in timer, never miss a set again"
          className=" md:col-span-4"
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
        " h-full group w-full p-2 pb-3 rounded-xl min-h-10 text-stone-100 transition-all ease-out duration-500",
        props.className || ""
      )}
    >
      <div className="relative h-300px w-full">
        <div className="relative h-[250px] border border-lime-300/20 rounded-xl overflow-hidden outline-dashed outline-2 outline-lime-300/0 outline-offset-8  group-hover:border-lime-300/50 group-hover:outline-offset-0 group-hover:outline-lime-300/20  transition-all ease-out duration-500 ">
          <svg
            className="h-full object-fill"
            viewBox="0 0 500 200"
            xmlns="http://www.w3.org/2000/svg"
            // responsive
            preserveAspectRatio="none"
          >
            <pattern
              id={`pattern-${props.title.toLowerCase().split(" ").join("-")}`}
              patternUnits="userSpaceOnUse"
              width="8"
              height="8"
              className="stroke-lime-300/5 group-hover:stroke-lime-300/10 transition-all ease-out duration-500"
            >
              <path d="M-1,1 l4,-4 M0,8 l8,-8 M6,10 l4,-4" />
            </pattern>

            <rect
              x="0"
              y="0"
              width="500"
              height="200"
              // fill="url(#pattern-3)"
              fill={`url(#pattern-${props.title.toLowerCase().split(" ").join("-")})`}
              stroke="transparent"
            />
          </svg>
          {props.children}
        </div>
      </div>
      <div className="pt-3">
        <h3 className="text-xl font-semibold text-stone-100">{props.title}</h3>
        <p className=" text-pretty text-sm font-medium text-stone-500 group-hover:text-stone-100 transition-colors ease-out duration-500">
          {props.description}
        </p>
      </div>
    </div>
  );
};

const TimerFeature = () => {
  return (
    <p className=" text-9xl font-bold absolute top-1/2 right-0 text-lime-300/20 -translate-y-1/2 translate-x-1/2 group-hover:translate-x-0 group-hover:text-lime-300 transition-all ease-out duration-500">
      00:21
    </p>
  );
};

const TagsFeature = () => {
  return (
    <div className="flex gap-1 absolute top-0 left-0 w-full h-full">
      <Tag
        color="lime"
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-6 group-hover:rotate-0"
      >
        Planned
      </Tag>
      <Tag
        color="purple"
        className="bottom-1/3 left-0 -translate-x-1/2 group-hover:translate-x-0 group-hover:bottom-1/4 group-hover:rotate-12"
      >
        Done
      </Tag>
      <Tag
        color="orange"
        className=" top-0 left-2/4 -translate-y-1/2 -translate-x-1/2 group-hover:translate-y-0 group-hover:top-1/4 group-hover:-rotate-12"
      >
        Canceled
      </Tag>
      <Tag
        color="red"
        className=" bottom-0 right-0 translate-x-1/2 -translate-y-1/2 -rotate-45 group-hover:translate-x-0 group-hover:bottom-1/4 group-hover:rotate-12"
      >
        Skipped
      </Tag>
      <Tag
        color="cyan"
        className=" top-0 left-0 -translate-y-1/2 rotate-45 group-hover:translate-x-0 group-hover:top-1/4 group-hover:-rotate-12"
      >
        To Plan
      </Tag>
    </div>
  );
};

const Tag = (props: { children: React.ReactNode; color: string; className?: string }) => {
  return (
    <div
      className={cn(
        `absolute text-2xl h-fit font-bold rounded-full px-4 py-0 cursor-pointer bg-${props.color}-500/10 border-2 border-${props.color}-500 text-${props.color}-500 opacity-10 group-hover:opacity-100 transition-all ease-out duration-500 backdrop-blur-sm`,
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

const StatsFeature = () => {
  const StatsBars = [
    "h-4 group-hover:h-8",
    "h-4 group-hover:h-12",
    "h-4 group-hover:h-1/4",
    "h-4 group-hover:h-1/2",
    "h-4 group-hover:h-1/3",
    "h-4 group-hover:h-2/5",
    "h-4 group-hover:h-3/5",
    "h-4 group-hover:h-5/6",
    "h-4 group-hover:h-4/6",
    "h-4 group-hover:h-[90%]",
    "h-4 group-hover:h-[100%]",
  ];

  return (
    <div className="absolute inset-2">
      <div className="flex gap-2 w-full h-full items-end">
        {StatsBars.map((bar, index) => (
          <Bar
            key={index}
            className={bar}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

const Bar = (props: { className?: string; index: number }) => {
  return (
    <div
      className={cn(
        `h-2 w-full bg-lime-300/5 rounded-lg border-2 border-lime-300/10 transition-all ease-in-out duration-500 group-hover:border-lime-500 group-hover:bg-lime-400/20 backdrop-blur-sm`,
        props.className || ""
      )}
      style={{ transitionDelay: `${props.index * 30}ms` }}
    ></div>
  );
};
