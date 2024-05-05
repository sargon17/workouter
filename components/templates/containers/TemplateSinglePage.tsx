import React from "react";

import { NoExercises, ExerciseActions } from "../ExerciseCards";
import NewWorkoutExerciseButton from "@/components/workout_exercises/NewWorkoutExerciseButton";

import TemplateExercisesList from "../TemplateExercisesList";

import { Button } from "@/components/ui/button";

import { Chip, handleColor } from "@/components/Chip";

type TemplateSinglePageProps = {
  workout: any;
};

const body_parts_ids = (body_parts: any) => {
  return body_parts.map((bp: any) => bp.body_parts.id);
};

export default function TemplateSinglePage(props: TemplateSinglePageProps) {
  return (
    <div className="pt-2">
      <div className="mb-4">
        <div className="mb-2">
          <h1 className=" text-xl md:text-3xl font-bold capitalize">{props.workout.title}</h1>
          <p className=" text-sm text-stone-500">{props.workout.description}</p>
        </div>
        <div className=" flex justify-start items-center gap-2">
          {props.workout.workout_body_parts.map((bp: any) => (
            <Chip
              key={bp.body_parts.id}
              color={handleColor({ id: bp.body_parts.id })}
              isActive
              size="xs"
            >
              {bp.body_parts.name}
            </Chip>
          ))}
        </div>
      </div>
      <div className="pb-20">
        {props.workout.workout_exercises.length > 0 ? (
          <TemplateExercisesList workout_exercises={props.workout.workout_exercises} />
        ) : (
          <NoExercises>
            <NewWorkoutExerciseButton
              workout_id={props.workout.id}
              body_parts={body_parts_ids(props.workout.workout_body_parts)}
            >
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
      <div className="absolute bottom-20 left-0 w-full flex justify-center items-center py-2 bg-gradient-to-t from-stone-950/90 from-50% ">
        <ExerciseActions>
          <NewWorkoutExerciseButton
            workout_id={props.workout.id}
            body_parts={body_parts_ids(props.workout.workout_body_parts)}
          >
            <Button
              size="sm"
              variant="secondary"
            >
              Add exercise
            </Button>
          </NewWorkoutExerciseButton>
        </ExerciseActions>
      </div>
    </div>
  );
}
