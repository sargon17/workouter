"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { SetDataAdvancedEditor } from "../session/CurrentSet";

import { Trash2, Plus } from "lucide-react";

type ExerciseCardsListProps = {
  children?: React.ReactNode | React.ReactNode[];
};

type ExerciseCardProps = {
  children: React.ReactNode | React.ReactNode[];
};

type ExerciseCardHeaderProps = {
  title: string;
  subtitle?: string;
};

type ExerciseCardBodyProps = {
  target_sets: {
    id: number;
    target_reps: number;
    target_weight: number;
  }[];
  workout_exercise_id: number;
};

type ExerciseActionsProps = {
  children: React.ReactNode;
};

type NoExercisesProps = {
  children?: React.ReactNode;
};

const ExerciseCardsList = (props: ExerciseCardsListProps) => {
  return <div className="flex flex-col gap-2 justify-start items-center mt-4">{props.children}</div>;
};

const ExerciseCard = (props: ExerciseCardProps) => {
  return <div className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3">{props.children}</div>;
};

const ExerciseCardHeader = (props: ExerciseCardHeaderProps) => {
  return (
    <div className="flex flex-col gap-1">
      <h2 className=" text-lg font-semibold">{props.title}</h2>
      {props.subtitle && <p className=" text-sm text-stone-500">{props.subtitle}</p>}
    </div>
  );
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

    console.log(data);

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
      <p className=" text-sm font-semibold">Target sets:</p>
      <p className=" text-xs text-stone-500">
        by clicking on each set you can edit the target reps and weight. Click the trash icon to remove the
        set.
      </p>
      <div className="flex gap-1 flex-col">
        {targetSets.map((set: any, index) => (
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
              <TargetData
                label="Reps"
                value={set.target_reps}
              />
            </SetDataAdvancedEditor>
            <SetDataAdvancedEditor
              value={set.target_weight}
              onChange={(value: number) => {
                handleUpdateSet(set.id, "target_weight", value);
              }}
              label="Kg"
            >
              <TargetData
                label="Kg"
                value={set.target_weight}
              />
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

const TargetData = (props: { label: string; value: number }) => {
  return (
    <p className="text-xl font-black flex justify-center items-baseline gap-1 p-1 bg-stone-950 border border-stone-800 rounded-md w-full">
      {props.value}
      <span className="text-xs font-normal text-stone-500">{props.label}</span>
    </p>
  );
};
const ExerciseActions = (props: ExerciseActionsProps) => {
  return <div className="flex gap-2">{props.children}</div>;
};
const NoExercises = (props: NoExercisesProps) => {
  return (
    <div className="w-full h-[80vh] flex justify-center items-center flex-col gap-1">
      <p className=" text-stone-500">No exercises added yet</p>
      {props.children}
    </div>
  );
};

export {
  ExerciseCardsList,
  ExerciseCard,
  ExerciseCardHeader,
  ExerciseCardBody,
  ExerciseActions,
  NoExercises,
};
