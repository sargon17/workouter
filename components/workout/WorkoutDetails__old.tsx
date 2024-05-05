import React from "react";

import { MoreHorizontal, Plus, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

import { SingleWorkout, StatusType } from "@/types/workout";
import PrintDate from "../date/PrintDate";

import { Card, CardHeader, CardTitle, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

import NewTargetSetButton from "../target_set/NewTargetSetButton";
import TargetSetItem from "../target_set/TargetSetItem";

import SetItem from "../sets/SetItem";
import NewSetButton from "../sets/NewSetButton";

import NewWorkoutExerciseButton from "../workout_exercises/NewWorkoutExerciseButton";

import SingleWorkoutMoreButton from "./SingleWorkoutMoreButton";

import SingleWorkoutExerciseMoreButton from "../workout_exercises/SingleWorkoutExerciseMoreButton";

import StatusLabel from "../status/StatusLabel";

import Link from "next/link";

type WorkoutDetailsProps = {
  id: string;
};

type WorkoutDetailsResponse = {
  id: string;
  title: string;
  date: string;
  workout_statuses: StatusType | null;
  workout_exercises: any[];
};

export default async function WorkoutDetails({ id }: WorkoutDetailsProps) {
  const supabase = createClient();

  let workout: WorkoutDetailsResponse = await getWorkoutById(id, supabase);

  if (!workout) {
    toast("Error fetching workout");
    return null;
  }

  // let { data: sets, error } = await supabase.from("sets").select("id");

  return (
    <div>
      <div className=" flex justify-between items-start gap-2">
        <div>
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold capitalize text-balance">{workout.title}</h1>
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
          </div>
          {workout.workout_statuses && (
            <StatusLabel
              status={workout.workout_statuses?.name}
              workout_id={workout.id}
            />
          )}
        </div>
      </div>
      <PrintDate date={workout.date} />
      <div className="flex flex-wrap gap-2 py-4">
        {workout.workout_exercises &&
          workout.workout_exercises.map((workout_exercise: any, index) => (
            <ExerciseCard
              exercise={workout_exercise}
              index={index}
            />
          ))}
      </div>
    </div>
  );
}

const ExerciseCard = ({ exercise, index }: { exercise: any; index: number }) => {
  const sets = exercise.sets.sort((a: any, b: any) => a.id - b.id);
  const target_sets = exercise.target_sets.sort((a: any, b: any) => a.id - b.id);

  return (
    <div
      key={exercise.id}
      className="w-full border border-stone-800 bg-stone-900 p-2 rounded-xl"
    >
      <div>
        <div className="w-full flex justify-between items-center gap-2">
          <h1 className="text-lg font-bold">
            {/* <span className="text-xs text-stone-600 font-light">{index + 1}.</span> */}
            {exercise.exercises.title}
          </h1>
          <div>
            <SingleWorkoutExerciseMoreButton id={exercise.id}>
              <Button
                size="icon"
                variant="ghost"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </SingleWorkoutExerciseMoreButton>
          </div>
        </div>
        <div className="text-xs text-stone-500">
          <p className=" text-stone-500">
            {target_sets.length}
            {target_sets.length === 1 ? " set" : " sets"}
          </p>

          <div className="flex justify-start items-center gap-2">
            <span className="font-semibold text-stone-300">Target:</span>{" "}
            {target_sets.map((set: any) => (
              <TargetSetItem
                set_id={set.id}
                key={set.id}
              >
                {set.target_reps} x {set.target_weight}kg
              </TargetSetItem>
            ))}
            <NewTargetSetButton workout_exercise_id={exercise.id}>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 flex justify-center items-center p-1"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </NewTargetSetButton>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-wrap gap-1 items-center mt-4 mb-2">
          {sets.map((set: any) => (
            <SetItem
              key={set.id}
              id={set.id}
              reps={set.reps}
              weight={set.weight}
            >
              <span className="bg-stone-950 border border-stone-900 rounded-md p-2 text-stone-300 font-bold text-sm">
                {set.reps} x {set.weight}kg
              </span>
            </SetItem>
          ))}
          <NewSetButton workout_exercise_id={exercise.id}>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 flex justify-center items-center p-1"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </NewSetButton>
        </div>
      </div>
    </div>
  );
};

const getWorkoutById = async (id: string, supabase: SupabaseClient) => {
  let { data: workouts, error } = await supabase
    .from("workouts")
    .select(
      "id, title, date, status_id, workout_exercises(*, target_sets(*), sets(*), exercises(title)), workout_statuses(name)"
    )
    .eq("id", id);

  if (error) {
    throw error;
  }

  return workouts && (workouts[0] as any);
};
