"use client";
import { useState, useEffect } from "react";

import { createClient } from "@/utils/supabase/client";

import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

function ExerciseSuggestedSets({
  exercise_id,
  onButtonClick,
  updateSuggestedSets,
  isWithSuggested,
  suggestedSets,
}: {
  exercise_id: number;
  onButtonClick: any;
  updateSuggestedSets: any;
  isWithSuggested: boolean;
  suggestedSets: any;
}) {
  const supabase = createClient();

  useEffect(() => {
    if (!exercise_id) return;
    setSuggested();
  }, [exercise_id]);

  const setSuggested = async () => {
    const sets = await getSuggestedSets(exercise_id, supabase);

    if (sets.length === 0) return updateSuggestedSets([]);

    updateSuggestedSets(sets);
  };

  if (!suggestedSets || suggestedSets.length === 0) return null;

  return (
    <div>
      <div>
        <h2 className="text-sm pb-2 relative text-nowrap">Suggested Sets</h2>
      </div>
      <div className="flex gap-2 flex-col sm:flex-row">
        <ul className="flex gap-1 dark:bg-stone-800 p-1 rounded-md relative">
          {suggestedSets.length > 0 &&
            suggestedSets.map((set: any) => (
              <li
                key={set.id}
                className="dark:bg-stone-950 rounded text-xs px-2 py-1 flex items-center w-full justify-center  "
              >
                {set.reps} x {set.weight}kg
              </li>
            ))}
          {isWithSuggested && (
            <span className="w-[8px] h-[8px] rounded-full bg-lime-500 absolute top-0 right-0 translate-x-0.5 -translate-y-0.5"></span>
          )}
        </ul>
        <Button
          size="sm"
          className="text-sm"
          onClick={() => {
            onButtonClick();
          }}
          type="button"
        >
          {isWithSuggested ? <Minus className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
          {isWithSuggested ? "Remove" : "Add"} Sets
        </Button>
      </div>
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
