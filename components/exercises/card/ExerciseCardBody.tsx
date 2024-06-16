"use client";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import { SetDataAdvancedEditor } from "../../session/CurrentSet";

import { Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";

type ExerciseCardBodyProps = {
  target_sets: {
    id: number;
    target_reps: number;
    target_weight: number;
  }[];
  sets?: {
    id: number;
    reps: number;
    weight: number;
  }[];
  workout_exercise_id: number;
  isEditing?: boolean;
};
const ExerciseCardBody = (props: ExerciseCardBodyProps) => {
  const [targetSets, setTargetSets] = useState(props.target_sets);

  const supabase = createClient();

  const handleAddTargetSet = async () => {
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
  const handleRemoveTargetSet = async (id: number) => {
    const { data, error } = await supabase.from("target_sets").delete().eq("id", id).single();

    if (!error) {
      setTargetSets(targetSets.filter((set) => set.id !== id));
    }
  };

  const handleUpdateTargetSet = async (id: number, key: string, value: number) => {
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

  const handleRemoveSet = async (id: number) => {
    const { data, error } = await supabase.from("sets").delete().eq("id", id).single();

    if (!error) {
      setTargetSets(targetSets.filter((set) => set.id !== id));
    }
  };

  const handleUpdateSet = async (id: number, key: string, value: number) => {
    const { data, error } = await supabase
      .from("sets")
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

  console.log("sets", props.sets);

  return (
    <motion.div
      className="flex flex-col gap-1"
      layout
    >
      <p className=" text-sm font-semibold text-stone-500">
        {props.sets && props.sets.length > 0 ? "Sets" : "Target sets"}
      </p>
      <div className="flex gap-1 flex-col">
        {props.sets && props.sets.length > 0 && (
          <SetsList
            sets={props.sets}
            targetSets={targetSets}
          />
        )}

        <AnimatePresence>
          {(!props.sets || props.sets.length === 0) &&
            targetSets.map((set: any, index: number) => (
              <motion.div
                key={index + "-target-set"}
                className=" flex items-center w-full gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
              >
                <SetDataAdvancedEditor
                  value={set.target_reps}
                  onChange={(value: number) => {
                    handleUpdateTargetSet(set.id, "target_reps", value);
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
                    handleUpdateTargetSet(set.id, "target_weight", value);
                  }}
                  label="Kg"
                >
                  <TargetData>
                    {set.target_weight}
                    <span className="text-xs font-normal text-stone-500">Kg</span>
                  </TargetData>
                </SetDataAdvancedEditor>
                {props.isEditing && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                  >
                    <Button
                      size="icon"
                      variant="ghost"
                      className=" aspect-square"
                      onClick={() => handleRemoveTargetSet(set.id)}
                    >
                      <Trash2 className="h-4 w-4 text-rose-500" />
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            ))}
          {props.isEditing && (
            <motion.div
              className="w-full flex justify-end"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="w-full">
                <p className=" text-xs text-stone-500 text-balance antialiased">
                  by clicking on each set you can edit the target reps and weight. Click the trash icon to
                  remove the set.
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleAddTargetSet}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

type SetsListProps = {
  sets: {
    id: number;
    reps: number;
    weight: number;
  }[];
  targetSets: {
    id: number;
    target_reps: number;
    target_weight: number;
  }[];
};

const SetsList = (props: SetsListProps) => {
  return (
    <AnimatePresence>
      {props.sets.map((set: { id: number; reps: number; weight: number }, index: number) => (
        <motion.div
          key={index + "-set"}
          className=" flex items-center w-full gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
        >
          <TargetData
            target={props.targetSets[index].target_reps}
            difference={set.reps - props.targetSets[index].target_reps}
          >
            {set.reps}
            <span className="text-xs font-normal text-stone-500">Reps</span>
          </TargetData>

          <TargetData
            target={props.targetSets[index].target_weight}
            difference={set.weight - props.targetSets[index].target_weight}
          >
            {set.weight}
            <span className="text-xs font-normal text-stone-500">Kg</span>
          </TargetData>
          {/* <Button
            size="icon"
            variant="ghost"
            className=" aspect-square"
            // onClick={() => handleRemoveSet(set.id)}
          >
            <Trash2 className="h-4 w-4 text-rose-500" />
          </Button> */}
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

type TargetDataProps = {
  children: React.ReactNode | React.ReactNode[];
  target?: number;
  difference?: number;
};

const TargetData = (props: TargetDataProps) => {
  return (
    <p className="text-xl font-black flex justify-center items-baseline gap-1 p-1 bg-stone-950 border border-stone-800 rounded-md w-full hover:bg-stone-950/60 transition-colors relative">
      {props.target && (
        <SetStats
          original={props.target || 0}
          difference={props.difference || 0}
        />
      )}
      {props.children}
    </p>
  );
};

type SetStatsProps = {
  original: number;
  difference: number;
};
const SetStats = (props: SetStatsProps) => {
  return (
    <div className="flex items-center gap-1 text-xs font-normal text-stone-500 absolute top-1 left-1">
      <span className="text-xs font-normal text-stone-500">{props.original}</span>
      {props.difference !== 0 && (
        <span className={cn("text-xs font-normal text-rose-500", { "text-green-500": props.difference > 0 })}>
          {props.difference > 0 ? "+" : ""}
          {props.difference}
        </span>
      )}
    </div>
  );
};

export default ExerciseCardBody;
