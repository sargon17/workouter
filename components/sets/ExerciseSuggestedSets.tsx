"use client";
import { useState, useEffect } from "react";

import { createClient } from "@/utils/supabase/client";

function ExerciseSuggestedSets({ exercise_id }: { exercise_id: number }) {
  const [suggestedSets, setSuggestedSets] = useState([]) as any;

  const supabase = createClient();

  useEffect(() => {
    if (!exercise_id) return;
    setSuggestedSets([]);
    setSuggested();
  }, [exercise_id]);

  const setSuggested = async () => {
    const sets = await getSuggestedSets(exercise_id, supabase);

    setSuggestedSets(sets);
  };

  useEffect(() => {
    console.log("suggestedSets", suggestedSets);
  }, [suggestedSets]);

  if (!suggestedSets || suggestedSets.length === 0) return null;

  return (
    <div>
      <h2>Suggested Sets</h2>
      <ul>
        {suggestedSets.length > 0 &&
          suggestedSets.map((set: any) => (
            <li key={set.id}>
              {set.reps} reps x {set.weight} kg
            </li>
          ))}
      </ul>
    </div>
  );
}

const getSuggestedSets = async (exercise_id: number, supabase: any) => {
  const {
    data: { user },
  } = (await supabase.auth.getUser()) as any;

  const { data, error } = await supabase
    .from("workout_exercises")
    .select("id, workouts(user_id)")
    .eq("exercise_id", exercise_id)
    .eq("workouts.user_id", user.id)
    .limit(1);

  if (error) {
    console.error("error", error);
    return [];
  }

  if (!data || data.length === 0) return [];

  const { data: sets, error: setsError } = await supabase
    .from("sets")
    .select("reps, weight")
    .order("id", { ascending: true })
    .eq("workout_exercise_id", data[0].id);

  if (setsError) {
    console.error("error", setsError);
    return [];
  }

  return sets;
};

export { ExerciseSuggestedSets, getSuggestedSets };
