"use client";
import { useState, useEffect } from "react";

import { createClient } from "@/utils/supabase/client";

import { Plus, Minus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

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

  const [isInfoOpen, setIsInfoOpen] = useState(false);

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
        <div className="flex items-baseline gap-2 mb-1 ">
          <h2 className="text-sm relative text-nowrap">Suggested Sets</h2>
          <div className="text-xs text-muted-foreground flex items-center mb-2 text-stone-500">
            <span
              className="underline cursor-pointer"
              onClick={() => setIsInfoOpen(!isInfoOpen)}
            >
              What are these?
            </span>
          </div>
        </div>
        <span
          className={cn("text-xs text-muted-foreground flex items-center mb-2 text-stone-500", {
            hidden: !isInfoOpen,
          })}
        >
          Suggested sets are based on your previous workouts, click add to include them in your workout plan
          by default.
        </span>
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
    .from("workouts")
    .select("id, title, workout_exercises(exercise_id, id, sets(*))")
    .eq("workout_exercises.exercise_id", exercise_id)
    .eq("user_id", user.id)
    .not("workout_exercises", "is", null)
    .not("workout_exercises.sets", "is", null)
    .order("id", { ascending: false });

  if (error) {
    console.error("error", error);
    return [];
  }

  if (!data || data.length === 0) return [];

  return data[0].workout_exercises[0].sets;
};

export { ExerciseSuggestedSets, getSuggestedSets };
