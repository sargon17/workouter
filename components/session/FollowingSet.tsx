import React from "react";

import { ArrowRight } from "lucide-react";

type Props = {
  session: {
    workout_id: string;
    currentExercise: number;
    currentSet: number;
    isEnd: boolean;
  };
  workout: {
    id: string;
    title: string;
    exercises: {
      id: string;
      exercise_data: {
        title: string;
      };
      target_sets: {
        target_reps: number;
        target_weight: number;
      }[];
      sets: {
        reps: number;
        weight: number;
      }[];
    }[];
  };
};
export default function FollowingSet(props: Props) {
  const printSet = () => {
    if (props.session.isEnd) {
      return <span>End of workout</span>;
    }

    if (
      props.session.currentExercise === props.workout.exercises.length - 1 &&
      props.session.currentSet ===
        props.workout.exercises[props.session.currentExercise].target_sets.length - 1
    ) {
      return <span>This is the last one</span>;
    }
    if (
      props.session.currentSet + 1 ===
      props.workout.exercises[props.session.currentExercise].target_sets.length
    ) {
      return (
        <span>
          {props.workout.exercises[props.session.currentExercise + 1].exercise_data.title}:{" "}
          {props.workout.exercises[props.session.currentExercise + 1].target_sets[0].target_reps} x{" "}
          {props.workout.exercises[props.session.currentExercise + 1].target_sets[0].target_weight}
        </span>
      );
    } else {
      return (
        <span>
          {props.workout.exercises[props.session.currentExercise].exercise_data.title}:{" "}
          {
            props.workout.exercises[props.session.currentExercise].target_sets[props.session.currentSet + 1]
              .target_reps
          }{" "}
          x{" "}
          {
            props.workout.exercises[props.session.currentExercise].target_sets[props.session.currentSet + 1]
              .target_weight
          }
        </span>
      );
    }
  };

  return (
    <div className="relative border border-cyan-300/20 overflow-hidden outline-dashed outline-2 outline-cyan-300/0 outline-offset-8  rounded-xl p-2 mt-2 ">
      <svg
        className="h-full object-fill absolute top-0 left-0 w-full z-0"
        viewBox="0 0 500 50"
        xmlns="http://www.w3.org/2000/svg"
        // responsive
        preserveAspectRatio="none"
      >
        <pattern
          id={`pattern-following-set`}
          patternUnits="userSpaceOnUse"
          width="8"
          height="8"
          className="stroke-cyan-300/10"
        >
          <path d="M-1,1 l4,-4 M0,8 l8,-8 M6,10 l4,-4" />
        </pattern>

        <rect
          x="0"
          y="0"
          width="500"
          height="200"
          // fill="url(#pattern-3)"
          fill={`url(#pattern-following-set)`}
          stroke="transparent"
        />
      </svg>
      <p className="font-semibold text-cyan-300">
        <span className=" text-xs flex justify-start items-center gap-1 text-cyan-300/40">
          Next set <ArrowRight size={14} />
        </span>
        {printSet()}
      </p>
    </div>
  );
}
