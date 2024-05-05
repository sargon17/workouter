import React from "react";

import { SingleWorkout } from "@/types/workout";

import { createClient } from "@/utils/supabase/server";
import { toast } from "sonner";

import { getUser } from "@/lib/fetch";
import { Button } from "@/components/ui/button";

import NewWorkoutButton from "./NewWorkoutButton";

import WorkoutListItem from "./WorkoutListItem";

import { Tab, TabItem } from "@/components/Tab";

import ReloadButton from "../ReloadButton";

type Props = {
  date: string;
};

export default async function WorkoutList(props: Props) {
  const supabase = createClient();
  const user = await getUser(supabase);
  if (!user) return null;

  let { data: workouts, error } = await supabase
    .from("workouts")
    .select(
      "id, title, date, status_id, workout_exercises(exercise_id, target_sets(*)), workout_statuses(name)"
    )
    .eq("user_id", user.id);

  if (error) {
    console.error("error", error);
    toast("Error fetching workouts");
  }

  if (!workouts) {
    workouts = [];
  }

  return (
    <div className="w-full h-full">
      <div className="flex justify-center mb-4">
        {/* <Tab>
          <TabItem
            href="/workouts"
            active={!isPast}
          >
            Upcoming
          </TabItem>
          <TabItem
            href="/workouts?t=past"
            active={isPast}
          >
            Previous
          </TabItem>
        </Tab> */}
      </div>
      {workouts.length > 0 && (
        <>
          <div className="mb-4 flex justify-start items-center gap-1">
            {/* <h1 className=" text-xl font-bold">{isPast ? "Previous" : "Upcoming"} Workouts</h1> */}
            <ReloadButton />
          </div>
          <div className="flex flex-wrap gap-2">
            {workouts.map((workout: any, i: number) => (
              <WorkoutListItem
                workout={workout as SingleWorkout}
                key={workout.id}
              />
            ))}
          </div>
        </>
      )}
      {workouts.length === 0 && <NoWorkouts />}
    </div>
  );
}

const NoWorkouts = () => (
  <div className="w-full h-[100%] flex flex-col justify-center items-center">
    <h2 className="text-2xl font-bold">Welcome to your Workouts</h2>
    <h3 className="text-lg font-medium pb-4">You don't have any workouts yet</h3>
    <p className="text-xs text-center pb-4 text-stone-300">
      Click the button below to create your first workout
    </p>
    <NewWorkoutButton>
      <Button>Create a new Workout</Button>
    </NewWorkoutButton>
  </div>
);
