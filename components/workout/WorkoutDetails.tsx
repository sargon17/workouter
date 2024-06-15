"use client";
import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ExerciseCard, ExerciseCardBody, ExerciseCardHeader } from "../exercises/card/ExerciseCard";

import NoExercisesList from "../exercises/list/NoExercisesList";

import { AnimatePresence } from "framer-motion";

import handleMassExercisesReorder from "@/utils/handleMassExercisesReorder";

type WorkoutDetailsProps = {
  date: string;
  workout: any;
};

export default function WorkoutDetails(props: WorkoutDetailsProps) {
  const workout = props.workout;
  const [exercises, setExercises] = useState<any>([]);
  const supabase = createClient();
  const router = useRouter();

  const isEditing = !exercises.some((exercises: any) => exercises.sets && exercises.sets.length > 0);

  useEffect(() => {
    if (workout) {
      setExercises(workout.workout_exercises.sort((a: any, b: any) => a.order - b.order));
    }
  }, [workout]);

  const handleExercisesReorder = async (currentIndex: number, targetIndex: number) => {
    // find the workout_exercise with the current index
    const workout_exercise = exercises.find((exercise: any) => exercise.order === currentIndex);
    const target_workout_exercise = exercises.find((exercise: any) => exercise.order === targetIndex);
    if (!workout_exercise || !target_workout_exercise) {
      return;
    }
    // optimistic update
    setExercises((prev: any) => {
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
    try {
      const newExercises = await handleMassExercisesReorder(
        exercises.filter((exercise: any) => exercise.id !== workout_exercise_id),
        supabase
      );

      console.log("new exercises", newExercises);

      setExercises(newExercises);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the exercise");
      // revert the optimistic update
      setExercises(exercises.sort((a: any, b: any) => a.order - b.order));
      return;
    }
    // setExercises(exercises.filter((exercise: any) => exercise.id !== workout_exercise_id));

    const { data, error } = await supabase
      .from("workout_exercises")
      .delete()
      .eq("id", workout_exercise_id)
      .single();

    if (error) {
      console.error(error);
      toast.error("An error occurred while deleting the exercise");
      // revert the optimistic update
      setExercises(exercises.sort((a: any, b: any) => a.order - b.order));
      return;
    } else {
    }

    return;
  };

  return (
    <>
      {workout ? (
        <div className="flex flex-col gap-2 mb-12 ">
          <AnimatePresence>
            {exercises.map((exercise: any) => (
              <ExerciseCard
                layoutId={exercise.id + props.date + "_card"}
                key={exercise.id + workout.id + props.date + "_card"}
              >
                <ExerciseCardHeader
                  title={exercise.exercises.title}
                  workout_exercise_id={exercise.id}
                  onReorder={handleExercisesReorder}
                  index={exercise.order}
                  onDelete={handleDeleteExercise}
                />
                <ExerciseCardBody
                  target_sets={exercise.target_sets}
                  workout_exercise_id={exercise.id}
                  sets={exercise.sets || null}
                  isEditing={isEditing}
                />
              </ExerciseCard>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <NoExercisesList />
      )}
    </>
  );
}
