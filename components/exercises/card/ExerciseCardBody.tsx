import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import { SetDataAdvancedEditor } from "../../session/CurrentSet";

import { Plus, Trash2 } from "lucide-react";

type ExerciseCardBodyProps = {
  target_sets: {
    id: number;
    target_reps: number;
    target_weight: number;
  }[];
  workout_exercise_id: number;
};
const ExerciseCardBody = (props: ExerciseCardBodyProps) => {
  const [targetSets, setTargetSets] = useState(props.target_sets);

  const supabase = createClient();

  const handleAddSet = async () => {
    let reps = 0;
    let weight = 0;

    if (targetSets.length > 0) {
      reps = targetSets[targetSets.length - 1].target_reps;
      weight = targetSets[targetSets.length - 1].target_weight;
    }

    const { data } = await supabase
      .from("target_sets")
      .insert([{ target_reps: reps, target_weight: weight, workout_exercise_id: props.workout_exercise_id }])
      .select("*")
      .single();

    if (data) {
      setTargetSets([...targetSets, data]);
    }
  };
  const handleRemoveSet = async (id: number) => {
    const { data, error } = await supabase.from("target_sets").delete().eq("id", id).single();

    if (!error) {
      setTargetSets(targetSets.filter((set) => set.id !== id));
    }
  };

  const handleUpdateSet = async (id: number, key: string, value: number) => {
    const { data, error } = await supabase
      .from("target_sets")
      .update({ [key]: value })
      .eq("id", id)
      .single();

    if (!error) {
      setTargetSets(
        targetSets.map((set) => {
          if (set.id === id) {
            return { ...set, [key]: value };
          }
          return set;
        })
      );
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <p className=" text-sm font-semibold text-stone-500">Target sets:</p>
      <div className="flex gap-1 flex-col">
        {targetSets.map((set: any, index: number) => (
          <div
            key={index + "-target-set"}
            className=" flex items-center w-full gap-1"
          >
            <SetDataAdvancedEditor
              value={set.target_reps}
              onChange={(value: number) => {
                handleUpdateSet(set.id, "target_reps", value);
              }}
              label="Reps"
            >
              <TargetData>
                {set.target_reps}
                <span className="text-xs font-normal text-stone-500">Reps</span>
              </TargetData>
            </SetDataAdvancedEditor>
            <SetDataAdvancedEditor
              value={set.target_weight}
              onChange={(value: number) => {
                handleUpdateSet(set.id, "target_weight", value);
              }}
              label="Kg"
            >
              <TargetData>
                {set.target_weight}
                <span className="text-xs font-normal text-stone-500">Kg</span>
              </TargetData>
            </SetDataAdvancedEditor>
            <Button
              size="icon"
              variant="ghost"
              className=" aspect-square"
              onClick={() => handleRemoveSet(set.id)}
            >
              <Trash2 className="h-4 w-4 text-rose-500" />
            </Button>
          </div>
        ))}
        <div className="w-full flex justify-end">
          <div className="w-full">
            <p className=" text-xs text-stone-500 text-balance antialiased">
              by clicking on each set you can edit the target reps and weight. Click the trash icon to remove
              the set.
            </p>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleAddSet}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const TargetData = (props: { children: React.ReactNode | React.ReactNode[] }) => {
  return (
    <p className="text-xl font-black flex justify-center items-baseline gap-1 p-1 bg-stone-950 border border-stone-800 rounded-md w-full hover:bg-stone-950/60 transition-colors">
      {props.children}
    </p>
  );
};

export default ExerciseCardBody;
