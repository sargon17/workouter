import React from "react";

import { MoreHorizontal, Plus } from "lucide-react";
import { toast } from "sonner";

import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

import { SingleWorkout } from "@/types/workout";
import PrintDate from "../date/PrintDate";

import { Card, CardHeader, CardTitle, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

import NewTargetSetButton from "../target_set/NewTargetSetButton";
import TargetSetItem from "../target_set/TargetSetItem";

type WorkoutDetailsProps = {
  id: string;
};

export default async function WorkoutDetails({ id }: WorkoutDetailsProps) {
  const supabase = createClient();

  const workout: SingleWorkout = await getWorkoutById(id, supabase);

  let { data: workout_exercises, error } = await supabase
    .from("workout_exercises")
    .select("id, exercises(*), sets(*), target_sets(*)")
    .eq("workout_id", id);

  if (error) {
    console.error("error", error);
    toast("Error fetching workouts");
  }

  // let { data: sets, error } = await supabase.from("sets").select("id");

  return (
    <div>
      <h1 className="text-2xl font-bold">{workout.title} Workout</h1>
      <PrintDate date={workout.date} />
      <div className="flex flex-wrap gap-2 py-4">
        {workout_exercises &&
          workout_exercises.map((workout_exercise: any) => <ExerciseCard exercise={workout_exercise} />)}
      </div>
    </div>
  );
}

const ExerciseCard = ({ exercise }: { exercise: any }) => {
  const sets = exercise.sets;
  const target_sets = exercise.target_sets;

  return (
    <Card
      key={exercise.id}
      className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
    >
      <CardHeader>
        <div className="w-full flex justify-start items-center gap-2">
          <CardTitle>{exercise.exercises.title}</CardTitle>

          <div>
            <Button
              size="icon"
              variant="ghost"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="text-xs text-stone-400">
          <p className=" font-semibold text-stone-300">
            {target_sets.length}
            {target_sets.length === 1 ? " set" : " sets"}
          </p>

          <div className="flex justify-start items-center gap-2">
            <span className="font-semibold text-stone-300">Target:</span>{" "}
            {target_sets.map((set: any) => (
              <TargetSetItem
                set_id={set.id}
                key={set.id}
                target_reps={set.target_reps}
                target_weight={set.target_weight}
              >
                {set.target_reps} x {set.target_weight}kg
              </TargetSetItem>
            ))}
            <NewTargetSetButton workout_exercise_id={exercise.id}>
              <Button
                variant="ghost"
                size="sm"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </NewTargetSetButton>
          </div>
        </div>
      </CardHeader>
      <CardFooter></CardFooter>
    </Card>
  );
};

const getWorkoutById = async (id: string, supabase: SupabaseClient) => {
  const { data, error } = await supabase.from("workouts").select("*").eq("id", id);

  if (error) {
    throw error;
  }

  return data[0] as SingleWorkout;
};
