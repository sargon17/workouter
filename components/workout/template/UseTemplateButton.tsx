"use client";
import React from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import dayjs from "dayjs";

type Props = {
  template: any;
  date?: Date;
};

export default function UseTemplateButton(props: Props) {
  const supabase = createClient();
  const router = useRouter();

  const date = props.date ? dayjs(props.date).format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD");

  console.log("date", date);

  const handleDuplicate = async () => {
    // create a new workout with the same exercises and sets

    const { data, error } = await supabase
      .from("workouts")
      .insert([
        {
          date: new Date(date),
          user_id: props.template.user_id,
          title: props.template.title,
          status_id: 2,
        },
      ])
      .select();

    if (error) {
      throw new Error("Error duplicating workout");
    }

    // duplicate workout exercises
    const workout_id = data[0].id;

    const workout_exercises = props.template.workout_exercises.map((exercise: any) => {
      return {
        workout_id,
        exercise_id: exercise.exercise_id,
      };
    });

    const { data: workoutExerciseData, error: workoutExerciseError } = await supabase
      .from("workout_exercises")
      .insert(
        workout_exercises.map((exercise: any) => {
          return {
            workout_id,
            exercise_id: exercise.exercise_id,
          };
        })
      )
      .select();

    if (workoutExerciseError) {
      throw new Error("Error duplicating workout exercises");
    }

    // duplicate target sets
    const workout_exercise_ids = workoutExerciseData.map((exercise: any) => {
      return exercise.id;
    });

    const target_sets = props.template.workout_exercises.map((exercise: any, index: number) => {
      return exercise.target_sets.map((set: any) => {
        return {
          workout_exercise_id: workout_exercise_ids[index],
          target_reps: set.target_reps,
          target_weight: set.target_weight,
        };
      });
    });

    const flatTargetSets = target_sets.flat();

    const { data: targetSetData, error: targetSetError } = await supabase
      .from("target_sets")
      .insert(flatTargetSets)
      .select();

    if (targetSetError) {
      throw new Error("Error duplicating target sets");
    }

    toast.success("Workout duplicated");

    // navigate to the new workout
    router.refresh();
  };

  return (
    <Button
      onClick={handleDuplicate}
      variant="secondary"
    >
      Use Template
    </Button>
  );
}
