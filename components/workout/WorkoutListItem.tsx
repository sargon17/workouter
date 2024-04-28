import { MoreHorizontal, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import PrintDate from "../date/PrintDate";
import SingleWorkoutMoreButton from "./SingleWorkoutMoreButton";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";

import { SingleWorkout } from "@/types/workout";

import StatusLabel from "../status/StatusLabel";

type WorkoutListItemProps = {
  workout: SingleWorkout;
  href?: string;
};

export default function WorkoutListItem(props: WorkoutListItemProps) {
  const setsCount = countSets(props.workout);
  const exercisesCount = countExercises(props.workout);

  return (
    <>
      <div className={cn("w-full flex items-top justify-between p-1 dark:border-stone-900 ", {})}>
        <div>
          <div className="flex gap-2 items-center">
            <h2 className="text-md font-bold capitalize">{props.workout.title}</h2>
            {props.workout.workout_statuses && (
              <StatusLabel
                status={props.workout.workout_statuses?.name}
                workout_id={props.workout.id}
              />
            )}
          </div>
          <PrintDate date={props.workout.date} />
          {exercisesCount && setsCount && (
            <div className="text-sm text-stone-400">
              {exercisesCount} exercises, {setsCount} sets
            </div>
          )}
        </div>
        <div className="flex gap-2">
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
          <Link href={props.href ? props.href : `/workouts/${props.workout.id}`}>
            <Button size={"icon"}>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
      <Separator />
    </>
  );
}

const countSets = (workout: SingleWorkout) => {
  if (!workout.workout_exercises) return null;

  return workout.workout_exercises.reduce((acc, curr) => {
    return acc + curr.target_sets.length;
  }, 0);
};

const countExercises = (workout: SingleWorkout) => {
  if (!workout.workout_exercises) return null;
  return workout.workout_exercises.length;
};
