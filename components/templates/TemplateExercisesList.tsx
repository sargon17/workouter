"use client";

import { useState, useEffect, use } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { LayoutGroup, AnimatePresence } from "framer-motion";

import { ExerciseCard, ExerciseCardBody, ExerciseCardHeader, ExerciseCardsList } from "./ExerciseCards";
import { set } from "date-fns";

type TemplateExercisesListProps = {
  workout_exercises: any;
};
export default function TemplateExercisesList(props: TemplateExercisesListProps) {
  const [workout_exercises, setWorkoutExercises] = useState(
    props.workout_exercises.sort((a: any, b: any) => a.order - b.order)
  );

  useEffect(() => {
    setWorkoutExercises(props.workout_exercises.sort((a: any, b: any) => a.order - b.order));
  }, [props.workout_exercises]);

  const supabase = createClient();
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

    const { data, error } = await supabase.from("workout_exercises").upsert([
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

  const handleDeleteExercise = async (workout_exercise_id: number) => {
    // optimistic update
    setWorkoutExercises(workout_exercises.filter((exercise: any) => exercise.id !== workout_exercise_id));

    const { data, error } = await supabase
      .from("workout_exercises")
      .delete()
      .eq("id", workout_exercise_id)
      .single();

    if (error) {
      console.error(error);
      toast.error("An error occurred while deleting the exercise");
      // revert the optimistic update
      setWorkoutExercises(props.workout_exercises.sort((a: any, b: any) => a.order - b.order));
      return;
    }

    handleMassOrder(workout_exercises.filter((exercise: any) => exercise.id !== workout_exercise_id));

    return;
  };

  const handleMassOrder = async (exercises: any) => {
    const updated = exercises.map((exercise: any, index: number) => {
      return { ...exercise, order: index + 1 };
    });

    const UpdatedToSupabase = updated.map((exercise: any) => {
      return {
        id: exercise.id,
        order: exercise.order,
      };
    });

    const { data, error } = await supabase.from("workout_exercises").upsert(UpdatedToSupabase);

    if (error) {
      console.error(error);
      toast.error("Failed to reorder exercises.");
    }

    toast.success("Exercises reordered successfully");
    setWorkoutExercises(updated);
  };

  useEffect(() => {
    // if all exercises have 0 order then create new order based on the id
    if (workout_exercises.every((exercise: any) => exercise.order === 0)) {
      handleMassOrder(workout_exercises);
    }
  }, [props.workout_exercises]);

  return (
    <AnimatePresence mode="wait">
      <LayoutGroup>
        <ExerciseCardsList>
          {workout_exercises.map((exercise: any) => (
            <ExerciseCard
              key={exercise.id}
              layoutId={exercise.id + exercise.exercises.title + "_card"}
            >
              <ExerciseCardHeader
                title={exercise.exercises.title}
                subtitle={""}
                workout_exercise_id={exercise.id}
                onReorder={handleExercisesReorder}
                index={exercise.order}
                onDelete={handleDeleteExercise}
              />
              <ExerciseCardBody
                target_sets={exercise.target_sets}
                workout_exercise_id={exercise.id}
              ></ExerciseCardBody>
            </ExerciseCard>
          ))}
        </ExerciseCardsList>
      </LayoutGroup>
    </AnimatePresence>
  );
}
