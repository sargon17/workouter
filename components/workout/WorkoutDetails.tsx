import { WorkoutDetailsHeader } from "./details/WorkoutDetailsHeader";
import { ExerciseCard, ExerciseCardBody, ExerciseCardHeader } from "../exercises/card/ExerciseCard";

import NoExercisesList from "../exercises/list/NoExercisesList";

import StatusLabel from "../status/StatusLabel";

// force dynamic cashing
export const dynamic = "force-dynamic";

type WorkoutDetailsProps = {
  date: string;
  workout: any;
};

export default async function WorkoutDetails(props: WorkoutDetailsProps) {
  const workout = props.workout;

  let exercises: any = [];

  if (workout) {
    exercises = workout.workout_exercises.sort((a: any, b: any) => a.order - b.order);
  }

  return (
    <div>
      <div>
        <WorkoutDetailsHeader
          workout={workout && workout}
          status={workout && workout.workout_statuses?.name}
          date={props.date}
          chip={
            workout && (
              <StatusLabel
                status={workout.workout_statuses?.name}
                workout_id={workout.id}
              />
            )
          }
        />
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
      </div>
    </div>
  );
}

const WorkoutDetailsLoading = () => {
  return (
    <div className="w-full h-[70vh] flex flex-col justify-center items-center">
      <h1 className=" animate-pulse font-bold text-lg">Loading your workout details...</h1>
    </div>
  );
};

export { WorkoutDetailsLoading };
