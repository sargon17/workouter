"use client";
import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ExerciseCard, ExerciseCardBody, ExerciseCardHeader } from "../exercises/card/ExerciseCard";

import NoExercisesList from "../exercises/list/NoExercisesList";

import handleMassExercisesReorder from "@/utils/handleMassExercisesReorder";

import { Button } from "@/components/ui/button";

import { motion, AnimatePresence } from "framer-motion";

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
              <WorkoutExerciseCard
                key={exercise.id + "_card"}
                exercise={exercise}
                handleExercisesReorder={handleExercisesReorder}
                handleDeleteExercise={handleDeleteExercise}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <NoExercisesList />
      )}
    </>
  );
}

type WorkoutExerciseCardProps = {
  exercise: any;
  handleExercisesReorder: (currentIndex: number, targetIndex: number) => void;
  handleDeleteExercise: (workout_exercise_id: number) => void;
};

const WorkoutExerciseCard = (props: WorkoutExerciseCardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <ExerciseCard
      layoutId={props.exercise.id + "_card"}
      key={props.exercise.id + "_card"}
    >
      <ExerciseCardHeader
        title={props.exercise.exercises.title}
        workout_exercise_id={props.exercise.id}
        onReorder={props.handleExercisesReorder}
        index={props.exercise.order}
        onDelete={props.handleDeleteExercise}
        onEditClick={handleEditClick}
      />
      <ExerciseCardBody
        target_sets={props.exercise.target_sets}
        workout_exercise_id={props.exercise.id}
        sets={props.exercise.sets || null}
        isEditing={isEditing}
      />
      <AnimatePresence>
        {isEditing && (
          <motion.div
            className="flex justify-end"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Button
              size="sm"
              variant="ghost"
              onMouseDown={handleEditClick}
              className=" text-sm text-stone-500 "
            >
              Done Editing
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </ExerciseCard>
  );
};
