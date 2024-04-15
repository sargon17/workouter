import { MoreHorizontal, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import PrintDate from "../date/PrintDate";
import SingleWorkoutMoreButton from "./SingleWorkoutMoreButton";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";

import { SingleWorkout } from "@/types/workout";

import StatusLabel from "../status/StatusLabel";

export default function WorkoutListItem({
  workout,
  highlighted = false,
}: {
  workout: SingleWorkout;
  highlighted?: boolean;
}) {
  const setsCount = countSets(workout);
  const exercisesCount = countExercises(workout);

  return (
    <>
      <div className={cn("w-full flex items-top justify-between p-1 dark:border-stone-900 ", {})}>
        <div>
          <div className="flex gap-2 items-center">
            <h2 className="text-md font-bold">{workout.title}</h2>
            {workout.workout_statuses && (
              <StatusLabel
                status={workout.workout_statuses?.name}
                workout_id={workout.id}
              />
            )}
          </div>
          <PrintDate date={workout.date} />
          <div className="text-sm text-stone-400">
            {exercisesCount} exercises, {setsCount} sets
          </div>
        </div>
        <div className="flex gap-2">
          <SingleWorkoutMoreButton
            id={workout.id}
            title={workout.title}
            date={workout.date}
          >
            <Button
              size="icon"
              variant="ghost"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </SingleWorkoutMoreButton>
          <Link href={`/workouts/${workout.id}`}>
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
  return workout.workout_exercises.reduce((acc, curr) => {
    return acc + curr.target_sets.length;
  }, 0);
};

const countExercises = (workout: SingleWorkout) => {
  return workout.workout_exercises.length;
};
