"use client";
import React from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

import Timer from "./Timer";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { convertToObject } from "typescript";

interface Props {
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
}

export default function Session(props: Props) {
  const [session, setSession] = useState({
    workout_id: props.workout.id,
    currentExercise: 0,
    currentSet: 0,
    isEnd: false,
  });

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

  const supabase = createClient();

  const saveSet = async () => {
    const { data, error } = await supabase
      .from("sets")
      .insert([
        {
          workout_exercise_id: props.workout.exercises[session.currentExercise].id,
          reps: props.workout.exercises[session.currentExercise].target_sets[session.currentSet].target_reps,
          weight:
            props.workout.exercises[session.currentExercise].target_sets[session.currentSet].target_weight,
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
      console.log(data);
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

      {/* reset the timer on session set change */}
      <Timer key={session.currentSet} />
      <div className="border border-stone-900 rounded-xl p-2 mt-2">
        <h3 className="text-center font-bold text-lg p-2">
          Set {session.currentSet + 1} of{" "}
          {props.workout.exercises[session.currentExercise].target_sets.length}
        </h3>
        <div className="">
          <div className="flex justify-center items-center gap-2 font-black">
            <p className=" text-4xl font-black flex flex-col justify-center items-center p-4 bg-stone-900 rounded-md w-1/3">
              {props.workout.exercises[session.currentExercise].target_sets[session.currentSet]?.target_reps}
              <span className="text-xs font-normal text-stone-500">reps</span>
            </p>
            x{" "}
            <p className=" text-4xl font-black flex flex-col justify-center items-center p-4 bg-stone-900 rounded-md w-1/3">
              {
                props.workout.exercises[session.currentExercise].target_sets[session.currentSet]
                  ?.target_weight
              }
              <span className="text-xs font-normal text-stone-500">kg</span>
            </p>
          </div>
        </div>
        <div className=" flex w-full justify-start items-center gap-2 mt-4">
          <Button className="w-full">Register Custom Set</Button>
          <Button
            onClick={() => handleRegisterSet()}
            variant={"default"}
            className="w-full bg-lime-600 hover:bg-lime-700 text-lime-50"
          >
            Register Set
          </Button>
        </div>
      </div>
    </>
  );
}
