"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ExerciseCard, ExerciseCardBody, ExerciseCardHeader } from "../exercises/card/ExerciseCard";

import NoExercisesList from "../exercises/list/NoExercisesList";

import { AnimatePresence } from "framer-motion";

type WorkoutDetailsProps = {
  date: string;
  workout: any;
};

export default function WorkoutDetails(props: WorkoutDetailsProps) {
  const workout = props.workout;
  const [exercises, setExercises] = useState<any>([]);
  const supabase = createClient();
  const router = useRouter();

  // let exercises: any = [];

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

  return (
    <>
      <AnimatePresence mode="wait">
        {workout ? (
          <div className="flex flex-col gap-2 mb-12 ">
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
                />
                <ExerciseCardBody
                  target_sets={exercise.target_sets}
                  workout_exercise_id={exercise.id}
                />
              </ExerciseCard>
            ))}
          </div>
        ) : (
          <NoExercisesList />
        )}
      </AnimatePresence>
    </>
  );
}
