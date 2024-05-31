import SingleWorkoutMoreButton from "./../SingleWorkoutMoreButton";
import { MoreHorizontal } from "lucide-react";

import Link from "next/link";
import { Button } from "../../ui/button";

import { cn } from "@/lib/utils";

import { Workout } from "../workout.d";

type WorkoutDetailsHeaderProps = {
  workout: Workout;
  status?: "done" | "planed";
  //   children?: React.ReactNode;
  chip?: React.ReactNode;
};

const WorkoutDetailsHeader = (props: WorkoutDetailsHeaderProps) => {
  const status = props.status || "planed";

  return (
    <div
      className={cn(
        " w-full min-h-36 p-2 py-16 my-2 border rounded-2xl flex flex-col justify-center items-center gap-2 relative",
        {
          "border-lime-500/70  text-lime-200": status === "planed",
          "border-purple-500/70  text-purple-200": status === "done",
        }
      )}
    >
      <Pattern />
      {props.chip && <div className="absolute top-1 left-1">{props.chip}</div>}

      <div className=" absolute z-10 top-1 right-1">
        <SingleWorkoutMoreButton
          id={props.workout.id}
          title={props.workout.title}
          date={props.workout.date}
        >
          <Button
            size="icon"
            variant="ghost"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </SingleWorkoutMoreButton>
      </div>
      <div className="relative z-10 flex flex-col items-center gap-2">
        <h2 className=" text-balance font-bold text-2xl antialiased capitalize text-center">
          {props.workout.title}
        </h2>
        <Link href={`/session/${props.workout.id}`}>
          <Button variant="outline">Start Workout</Button>
        </Link>
      </div>
      <div className=" absolute min-h-12 bottom-0 left-0 w-full ">
        <div
          className={cn("absolute inset-1 rounded-lg border p-2 font-bold flex gap-2", {
            "bg-purple-950 border-purple-800": props.workout.workout_statuses.name === "done",
            "bg-lime-950 border-lime-800": props.workout.workout_statuses.name === "planed",
          })}
        >
          <p>Exercises: {props.workout.workout_exercises.length}</p>
          <p>
            Sets:{" "}
            {props.workout.workout_exercises.reduce(
              (acc: any, curr: any) => acc + curr.target_sets.length,
              0
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

const Pattern = () => {
  return (
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
      <defs>
        <radialGradient
          id="RadialGradient1"
          cx="50%"
          cy="50%"
          r="50%"
          fx="50%"
          fy="50%"
        >
          <stop
            offset="20%"
            style={{ stopColor: "white", stopOpacity: 1 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "white", stopOpacity: 0 }}
          />
        </radialGradient>
        <mask id="circleMask">
          <circle
            cx="250"
            cy="100"
            r="250"
            fill="url(#RadialGradient1)"
          />
        </mask>
      </defs>

      <rect
        x="0"
        y="0"
        width="500"
        height="500"
        fill="url(#pattern-3)"
        mask="url(#circleMask)"
      />
    </svg>
  );
};

export { WorkoutDetailsHeader };
