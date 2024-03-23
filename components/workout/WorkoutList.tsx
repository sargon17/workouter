import React from "react";

import { SingleWorkout } from "@/types/workout";

import { createClient } from "@/utils/supabase/server";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { getUser } from "@/lib/fetch";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import Link from "next/link";

import NewWorkoutButton from "./NewWorkoutButton";
import PrintDate from "../date/PrintDate";

export default async function WorkoutList() {
  const supabase = createClient();
  const user = await getUser(supabase);
  if (!user) return null;

  let { data: workouts, error } = await supabase
    .from("workouts")
    .select("")
    .eq("user_id", user.id)
    .order("date", { ascending: true })
    .filter("date", "gte", new Date().toISOString().slice(0, 10)); // only show workouts from today onwards

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
        <h1 className=" text-xl font-bold">Your Next Workouts</h1>
      </div>
      <div className="flex flex-wrap gap-2">
        {workouts.length === 0 && <NoWorkouts />}
        {workouts.map((workout: any, i: number) => (
          <WorkoutCard
            workout={workout as SingleWorkout}
            highlighted={i === 0}
          />
        ))}
      </div>
    </div>
  );
}

const WorkoutCard = ({ workout, highlighted = false }: { workout: SingleWorkout; highlighted?: boolean }) => {
  return (
    <Card
      key={workout.id}
      className={cn("w-full md:w-1/2 lg:w-1/3")}
    >
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>{workout.title}</CardTitle>
          {highlighted && <Badge>Next</Badge>}
        </div>
        <CardDescription>
          <PrintDate date={workout.date} />
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <Button variant="outline">
          <Link href={`/workouts/${workout.id}`}>View Workout</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const NoWorkouts = () => (
  <div className="w-full h-[100%] flex flex-col justify-center items-center">
    <h1 className="text-2xl font-bold pb-1">No workouts yet </h1>
    <p className="text-xs text-center pb-4 text-stone-200">
      Click the button below to create your first workout
    </p>
    <NewWorkoutButton>
      <Button>Create Workout</Button>
    </NewWorkoutButton>
  </div>
);
