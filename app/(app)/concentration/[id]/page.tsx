import React from "react";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import Timer from "@/components/concentration/Timer";

export default async function page({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: workoutData, error: workoutError } = await supabase
    .from("workouts")
    .select("*, exercises:workout_exercises(*, exercise_data:exercises(title))")
    .eq("id", params.id)
    .single();

  if (workoutError) {
    return <div>Error loading workout</div>;
    redirect("/workouts");
  }

  return (
    <>
      <Timer />
    </>
  );
}
