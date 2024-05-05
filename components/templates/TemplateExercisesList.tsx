"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { ExerciseCard, ExerciseCardBody, ExerciseCardHeader, ExerciseCardsList } from "./ExerciseCards";

type TemplateExercisesListProps = {
  workout_exercises: any;
};
export default function TemplateExercisesList(props: TemplateExercisesListProps) {
  const [workout_exercises, setWorkoutExercises] = useState(
    props.workout_exercises.sort((a: any, b: any) => a.order - b.order)
  );

  const client = createClient();
  const router = useRouter();

  const handleExercisesReorder = async (currentIndex: number, targetIndex: number) => {
    // find the workout_exercise with the current index
    const workout_exercise = workout_exercises.find((exercise: any) => exercise.order === currentIndex);
    const target_workout_exercise = workout_exercises.find((exercise: any) => exercise.order === targetIndex);

    if (!workout_exercise || !target_workout_exercise) {
      return;
    }

    // optimistic update
    setWorkoutExercises((prev: any) => {
      const updated = prev.map((exercise: any) => {
        if (exercise.id === workout_exercise.id) {
          return { ...exercise, order: targetIndex };
        }
        if (exercise.id === target_workout_exercise.id) {
          return { ...exercise, order: currentIndex };
        }
        return exercise;
      });

      return updated.sort((a: any, b: any) => a.order - b.order);
    });

    const { data, error } = await client.from("workout_exercises").upsert([
      {
        id: workout_exercise.id,
        order: targetIndex,
      },
      {
        id: target_workout_exercise.id,
        order: currentIndex,
      },
    ]);

    if (error) {
      console.error(error);
      toast.error("Failed to reorder exercises.");
      router.refresh();
    }
  };

  return (
    <ExerciseCardsList>
      {workout_exercises.map((exercise: any) => (
        <ExerciseCard key={exercise.id}>
          <ExerciseCardHeader
            title={exercise.exercises.title}
            subtitle={""}
            workout_exercise_id={exercise.id}
            onReorder={handleExercisesReorder}
            index={exercise.order}
          />
          <ExerciseCardBody
            target_sets={exercise.target_sets}
            workout_exercise_id={exercise.id}
          ></ExerciseCardBody>
        </ExerciseCard>
      ))}
    </ExerciseCardsList>
  );
}
