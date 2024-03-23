import React from "react";

import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

import { SingleWorkout } from "@/types/workout";
import PrintDate from "../date/PrintDate";

type WorkoutDetailsProps = {
  id: string;
};

export default async function WorkoutDetails({ id }: WorkoutDetailsProps) {
  const supabase = createClient();

  const workout: SingleWorkout = await getWorkoutById(id, supabase);

  console.log("workout", workout);

  return (
    <div>
      <h1 className="text-2xl font-bold">{workout.title} Workout</h1>
      <PrintDate date={workout.date} />
    </div>
  );
}

const getWorkoutById = async (id: string, supabase: SupabaseClient) => {
  const { data, error } = await supabase.from("workouts").select("*").eq("id", id);

  if (error) {
    throw error;
  }

  return data[0] as SingleWorkout;
};
