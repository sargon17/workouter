import { createClient } from "@/utils/supabase/server";
// import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { getUser } from "@/lib/fetch";
import CreateFromTemplate from "./template/CreateFromTemplate";

import { WorkoutDetailsHeader } from "./details/WorkoutDetailsHeader";
import { ExerciseCard, ExerciseCardBody, ExerciseCardHeader } from "../exercises/card/ExerciseCard";

import { Suspense } from "react";

import StatusLabel from "../status/StatusLabel";

// force dynamic cashing
export const dynamic = "force-dynamic";

type WorkoutDetailsProps = {
  date: string;
};

export default async function WorkoutDetails(props: WorkoutDetailsProps) {
  const supabase = createClient();
  //   const router = useRouter();

  const fetchWorkouts = async () => {
    const user = await getUser(supabase);

    if (!user) return;

    const { data: workout, error } = await supabase
      .from("workouts")
      .select(
        "id, title, date, status_id, workout_exercises(*, target_sets(*), exercises(*)), workout_statuses(name) workout_body_parts(name)"
      )
      .eq("user_id", user.id)
      .eq("date", props.date);

    if (error) {
      console.error("error", error);
      toast("Error fetching workouts");
    }

    if (!workout) {
      toast("No workouts found");
      return;
    }

    return workout[0];
  };

  const workout: any = await fetchWorkouts();
  let exercises: any = [];

  if (workout) {
    exercises = workout.workout_exercises.sort((a: any, b: any) => a.order - b.order);
  }

  console.log("exercises", exercises);

  return (
    <div>
      <Suspense fallback={<WorkoutDetailsLoading />}>
        {workout && (
          <div>
            <WorkoutDetailsHeader
              workout={workout}
              chip={
                <StatusLabel
                  status={workout.workout_statuses?.name}
                  workout_id={workout.id}
                />
              }
            />
            <div className="flex flex-col gap-2 mb-12 ">
              {exercises.map((exercise: any) => (
                <ExerciseCard key={exercise.exercise_id}>
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
          </div>
        )}
        {!workout && <NoWorkoutsFound date={props.date} />}
      </Suspense>
    </div>
  );
}

const NoWorkoutsFound = (props: { date: string }) => {
  return (
    <div className="w-full h-[70vh] flex flex-col justify-center items-center">
      <h1>No workouts found there</h1>
      <CreateFromTemplate date={props.date} />
    </div>
  );
};

const WorkoutDetailsLoading = () => {
  return (
    <div className="w-full h-[70vh] flex flex-col justify-center items-center">
      <h1 className=" animate-pulse font-bold text-lg">Loading your workout details...</h1>
    </div>
  );
};

export { WorkoutDetailsLoading };
