"use client";
import React from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

export default function SingleTemplateButton({ template }: { template: any }) {
  const supabase = createClient();
  const router = useRouter();

  const handleDuplicate = async () => {
    // create a new workout with the same exercises and sets

    const { data, error } = await supabase
      .from("workouts")
      .insert([
        {
          date: new Date(),
          user_id: template.user_id,
          title: template.workouts.title,
          status_id: 2,
        },
      ])
      .select();

    if (error) {
      throw new Error("Error duplicating workout");
    }

    // duplicate workout exercises
    const workout_id = data[0].id;

    const workout_exercises = template.workouts.workout_exercises.map((exercise: any) => {
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

    const target_sets = template.workouts.workout_exercises.map((exercise: any, index: number) => {
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
    router.push(`/workouts/${workout_id}`);
  };

  return (
    <div
      onClick={handleDuplicate}
      className="w-full border-b border-stone-900 px-1 py-3
    hover:bg-stone-800/20 cursor-pointer transition-colors duration-200 ease-in-out
    "
    >
      <h3 className="text-lg font-bold">{template.workouts.title}</h3>
      <p className="text-xs text-stone-500">{template.workouts.date}</p>

      <p>
        {/* count exercises and sets */}
        {template.workouts.workout_exercises.length} exercises
      </p>
      <p>
        {/* count exercises and sets */}
        {template.workouts.workout_exercises.reduce((acc: any, curr: any) => {
          return acc + curr.target_sets.length;
        }, 0)}{" "}
        sets
      </p>
    </div>
  );
}
