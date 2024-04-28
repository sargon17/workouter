import React from "react";

import {
  ExerciseCard,
  NoExercises,
  ExerciseCardsList,
  ExerciseActions,
  ExerciseCardHeader,
  ExerciseCardBody,
} from "../ExerciseCards";
import NewWorkoutExerciseButton from "@/components/workout_exercises/NewWorkoutExerciseButton";

import { Button } from "@/components/ui/button";

type TemplateSinglePageProps = {
  workout: any;
};
export default function TemplateSinglePage(props: TemplateSinglePageProps) {
  return (
    <div className="pt-4">
      <div>
        <h1 className=" text-xl md:text-3xl font-bold capitalize">{props.workout.title}</h1>
        <p className=" text-sm text-stone-500">{props.workout.description}</p>
      </div>
      <div>
        {props.workout.workout_exercises.length > 0 ? (
          <ExerciseCardsList>
            {props.workout.workout_exercises.map((exercise: any) => (
              <ExerciseCard
                key={exercise.id}
                // exercise={exercise}
              >
                <ExerciseCardHeader
                  title={exercise.exercises.title}
                  subtitle={""}
                />
                <ExerciseCardBody
                  target_sets={exercise.target_sets}
                  workout_exercise_id={exercise.id}
                ></ExerciseCardBody>
              </ExerciseCard>
            ))}
            <ExerciseActions>
              <NewWorkoutExerciseButton workout_id={props.workout.id}>
                <Button
                  size="sm"
                  variant="default"
                >
                  Add exercise
                </Button>
              </NewWorkoutExerciseButton>
            </ExerciseActions>
          </ExerciseCardsList>
        ) : (
          <NoExercises>
            <NewWorkoutExerciseButton workout_id={props.workout.id}>
              <Button
                size="sm"
                variant="default"
              >
                Add exercise
              </Button>
            </NewWorkoutExerciseButton>
          </NoExercises>
        )}
      </div>
    </div>
  );
}
