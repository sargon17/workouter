import { createClient } from "@/utils/supabase/server";
// import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { getUser } from "@/lib/fetch";
import CreateFromTemplate from "./template/CreateFromTemplate";

import { ExerciseCard, ExerciseCardHeader, ExerciseCardBody } from "../templates/ExerciseCards";
import SingleWorkoutMoreButton from "./SingleWorkoutMoreButton";
import { MoreHorizontal } from "lucide-react";

import Link from "next/link";
import { Button } from "../ui/button";

import { cn } from "@/lib/utils";
import { Suspense } from "react";

// force dynamic cashing
export const dynamic = "force-dynamic";

type WorkoutDetailsProps = {
  date: string;
};

type Workout = {
  id: string;
  title: string;
  date: string;
  status_id: string;
  workout_exercises: {
    id: number;
    exercise_id: string;
    target_sets: {
      id: number;
      target_reps: number;
      target_weight: number;
    }[];
    exercises: {
      title: string;
      id: string;
    };
  }[];
  workout_statuses: {
    name: string;
  };
  workout_body_parts: {
    name: string;
  }[];
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

  return (
    <div>
      <Suspense fallback={<WorkoutDetailsLoading />}>
        {workout && (
          <div>
            <div
              className={cn(
                " w-full min-h-36 p-2 py-16 my-2 border border-lime-900 rounded-xl  flex flex-col justify-center items-center gap-2 relative",
                {
                  "border-lime-900 text-lime-500 bg-lime-800/5": workout.workout_statuses.name === "planed",
                  "border-purple-900 text-purple-400 bg-purple-800/5":
                    workout.workout_statuses.name === "done",
                }
              )}
            >
              <svg
                className="absolute top-0 left-0 w-full h-full opacity-5"
                viewBox="0 0 500 100"
                xmlns="http://www.w3.org/2000/svg"
                // responsive
                preserveAspectRatio="none"
              >
                <pattern
                  id="pattern-3"
                  patternUnits="userSpaceOnUse"
                  width="8"
                  height="8"
                >
                  <path
                    d="M-1,1 l4,-4 M0,8 l8,-8 M6,10 l4,-4"
                    stroke="currentColor"
                  />
                </pattern>

                <rect
                  x="0"
                  y="0"
                  width="500"
                  height="100"
                  fill="url(#pattern-3)"
                />
              </svg>
              <div
                className={cn(
                  "absolute top-1 left-1 text-xs font-bold py-0.5 px-2 rounded-lg bg-lime-500 text-lime-950",
                  {
                    "bg-purple-500 text-purple-950": workout.workout_statuses.name === "done",
                  }
                )}
              >
                {workout.workout_statuses.name}
              </div>
              <div className=" absolute z-10 top-1 right-1">
                <SingleWorkoutMoreButton
                  id={workout.id}
                  title={workout.title}
                  date={workout.date}
                >
                  <Button
                    size="icon"
                    variant="ghost"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </SingleWorkoutMoreButton>
              </div>
              <div className="relative z-10 flex flex-col items-center gap-2">
                <h2 className=" text-balance font-bold text-2xl antialiased capitalize text-center">
                  {workout.title}
                </h2>
                <Link href={`/session/${workout.id}`}>
                  <Button variant="outline">Start Workout</Button>
                </Link>
              </div>
              <div className=" absolute min-h-12 bottom-0 left-0 w-full ">
                <div
                  className={cn("absolute inset-1 rounded-lg border p-2 font-bold flex gap-2", {
                    "bg-purple-950 border-purple-800": workout.workout_statuses.name === "done",
                    "bg-lime-950 border-lime-800": workout.workout_statuses.name === "planed",
                  })}
                >
                  <p>Exercises: {workout.workout_exercises.length}</p>
                  <p>
                    Sets:{" "}
                    {workout.workout_exercises.reduce(
                      (acc: any, curr: any) => acc + curr.target_sets.length,
                      0
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-12 ">
              {workout.workout_exercises.map((exercise: any) => (
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
