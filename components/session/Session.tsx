"use client";
import React from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

import Timer from "./Timer";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { convertToObject } from "typescript";

import { CurrentSet, CurrentSetHeader, CurrentSetBody, CurrentSetData, CurrentSetFooter } from "./CurrentSet";

type Props = {
  workout: {
    id: string;
    title: string;
    exercises: {
      id: string;
      exercise_data: {
        title: string;
      };
      target_sets: {
        target_reps: number;
        target_weight: number;
      }[];
      sets: {
        reps: number;
        weight: number;
      }[];
    }[];
  };
};

type Set = Props["workout"]["exercises"][0]["sets"][0];

export default function Session(props: Props) {
  const [session, setSession] = useState({
    workout_id: props.workout.id,
    currentExercise: 0,
    currentSet: 0,
    isEnd: false,
  });

  const [setData, setSetData] = useState<Set | null>(null);
  const supabase = createClient();

  useEffect(() => {
    let activeExercise = 0;
    let activeSet = 0;

    props.workout.exercises.forEach((exercise, index) => {
      if (exercise.sets.length > 0) {
        activeExercise = index;
        if (exercise.sets.length < exercise.target_sets.length) {
          activeSet = exercise.sets.length;
        } else if (exercise.sets.length >= exercise.target_sets.length) {
          activeExercise = index + 1;
          activeSet = 0;
        }
      }
    });

    setSession((prev) => ({
      ...prev,
      currentExercise: activeExercise,
      currentSet: activeSet,
    }));
  }, []);

  useEffect(() => {
    const set = props.workout.exercises[session.currentExercise].target_sets[session.currentSet];
    modifySet({ reps: set.target_reps, weight: set.target_weight });
  }, [session]);

  const modifySet = (set: Set) => {
    setSetData(set);
  };

  const saveSet = async () => {
    if (!setData) {
      throw new Error("No set data to save");
    }

    const { data, error } = await supabase
      .from("sets")
      .insert([
        {
          workout_exercise_id: props.workout.exercises[session.currentExercise].id,
          reps: setData.reps,
          weight: setData.weight,
        },
      ])
      .select();

    if (error) {
      toast("Error saving set");
      throw error;
    }

    if (data) {
      return data;
    }
  };

  const handleRegisterSet = async () => {
    const { nextSet, nextExercise, isLastSet } = getNextSet();

    try {
      const data = await saveSet();

      if (isLastSet) {
        toast("Workout completed");
        return;
      }

      setSession((prev) => ({
        ...prev,
        currentSet: nextSet,
        currentExercise: nextExercise,
      }));

      toast("Set registered");
    } catch (error) {
      console.error(error);
      toast("Error registering set");
    }
  };

  const getNextSet = () => {
    let nextSet = 0;
    let nextExercise = session.currentExercise;
    let isLastSet = false; // if the current set is the last set of the workout

    if (session.currentSet < props.workout.exercises[session.currentExercise].target_sets.length - 1) {
      nextSet = session.currentSet + 1;
    }

    if (session.currentSet === props.workout.exercises[session.currentExercise].target_sets.length - 1) {
      if (session.currentExercise === props.workout.exercises.length - 1) {
        isLastSet = true;
        return { nextSet, nextExercise, isLastSet };
      }
      nextSet = 0;
      nextExercise = session.currentExercise + 1;
    }

    return { nextSet, nextExercise, isLastSet };
  };

  return (
    <>
      <div className="pb-4">
        <h2 className=" text-center text-2xl font-bold ">
          {props.workout.exercises[session.currentExercise].exercise_data.title}
        </h2>
        <p className="text-center text-xs text-stone-500">
          {props.workout.exercises.length - session.currentExercise - 1} exercises left
        </p>
      </div>

      <Timer key={session.currentSet} />
      <CurrentSet>
        <CurrentSetHeader>
          Set {session.currentSet + 1} of{" "}
          {props.workout.exercises[session.currentExercise].target_sets.length}
        </CurrentSetHeader>
        <CurrentSetBody>
          {setData && (
            <>
              <CurrentSetData
                label="reps"
                value={setData.reps}
                onChange={(value: Pick<Set, "reps">) => {
                  modifySet({ ...setData, reps: value });
                }}
              ></CurrentSetData>
              x
              <CurrentSetData
                label="kg"
                value={setData.weight}
                onChange={(value: Pick<Set, "weight">) => {
                  modifySet({ ...setData, weight: value });
                }}
              ></CurrentSetData>
            </>
          )}
        </CurrentSetBody>
        <CurrentSetFooter onClick={handleRegisterSet}>Done</CurrentSetFooter>
      </CurrentSet>
    </>
  );
}
