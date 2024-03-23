import React from "react";

import { createClient } from "@/utils/supabase/server";
import { toast } from "sonner";

import { getUser } from "@/lib/fetch";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import NewWorkoutButton from "./NewWorkoutButton";

export default async function WorkoutList() {
  const supabase = createClient();
  const user = await getUser(supabase);
  if (!user) return null;

  let { data: workouts, error } = await supabase.from("workouts").select("").eq("user_id", user.id);

  if (error) {
    console.error("error", error);
    toast("Error fetching workouts");
  }

  if (!workouts) {
    workouts = [];
  }

  console.log("workouts", workouts);

  return (
    <div className="w-full p-4">
      <div className="mb-4">
        <h1 className=" text-xl font-bold">Your Workouts</h1>
      </div>
      <div className="flex flex-wrap">
        {workouts.length === 0 && <NoWorkouts />}
        {workouts.map((workout: any) => (
          <WorkoutCard workout={workout} />
        ))}
      </div>
    </div>
  );
}

const WorkoutCard = ({ workout }: { workout: any }) => (
  <Card
    key={workout.id}
    className="w-full md:w-1/2 lg:w-1/3"
  >
    <CardHeader>
      <CardTitle>{workout.title}</CardTitle>
      <CardDescription>{workout.date}</CardDescription>
    </CardHeader>
    <CardContent></CardContent>
    <CardFooter>
      <p>{workout.created_at}</p>
    </CardFooter>
  </Card>
);

const NoWorkouts = () => (
  <div className="w-full h-[100%] flex flex-col justify-center items-center">
    <h1 className="text-2xl font-bold pb-1">No workouts yet </h1>
    <p className="text-xs text-center pb-4 text-stone-200">
      Click the button below to create your first workout
    </p>
    {/* <Button>New Workout</Button>
     */}
    <NewWorkoutButton />
  </div>
);
