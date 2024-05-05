import React from "react";

import { SingleWorkout } from "@/types/workout";

import { createClient } from "@/utils/supabase/server";
import { toast } from "sonner";

import { getUser } from "@/lib/fetch";
import { Button } from "@/components/ui/button";

import NewWorkoutButton from "./NewWorkoutButton";

import WorkoutListItem from "./WorkoutListItem";

import { Tab, TabItem } from "@/components/Tab";

import { ChevronLeft, ChevronRight } from "lucide-react";

import ReloadButton from "../ReloadButton";

import Link from "next/link";
import { format, add, formatDistance } from "date-fns";

import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";

type Props = {
  date: string;
};

export default async function WorkoutList(props: Props) {
  const supabase = createClient();
  const user = await getUser(supabase);

  dayjs.extend(calendar);

  if (!user) return null;

  let { data: workouts, error } = await supabase
    .from("workouts")
    .select(
      "id, title, date, status_id, workout_exercises(exercise_id, target_sets(*)), workout_statuses(name)"
    )
    .eq("user_id", user.id)
    .eq("date", props.date);

  if (error) {
    console.error("error", error);
    toast("Error fetching workouts");
  }

  if (!workouts) {
    workouts = [];
  }

  type GetTimedLinkProps = {
    currentDate: string;
    delta: 1 | -1;
  };
  const getTimedLink = (props: GetTimedLinkProps): string => {
    const date = new Date(props.currentDate);
    const newDate = add(date, { days: props.delta });
    return `/workouts?date=${format(newDate, "yyyy-MM-dd")}`;
  };

  return (
    <div className="w-full h-full">
      <div className="flex justify-center mb-4">
        <Tab>
          <TabItem
            href="/workouts"
            active
          >
            Workouts
          </TabItem>
          <TabItem
            href="/workouts/templates"
            active={false}
          >
            Templates
          </TabItem>
        </Tab>
      </div>
      <div className="flex justify-between items-center">
        <Link
          href={getTimedLink({
            currentDate: props.date,
            delta: -1,
          })}
        >
          <Button
            variant={"outline"}
            size={"icon"}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </Link>
        <p className=" text-2xl font-bold flex justify-center items-center gap-1">
          {dayjs(props.date).calendar(null, {
            sameDay: "[Today]",
            nextDay: "[Tomorrow]",
            nextWeek: "dddd",
            lastDay: "[Yesterday]",
            lastWeek: "[Last] dddd",
            sameElse: "DD/MM/YYYY",
          })}
          <ReloadButton />
        </p>
        <Link
          href={getTimedLink({
            currentDate: props.date,
            delta: 1,
          })}
        >
          <Button
            variant={"outline"}
            size={"icon"}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
      {workouts.length > 0 && (
        <>
          <div className="mb-4 flex justify-start items-center gap-1"></div>
          <div className="flex flex-wrap gap-2">
            {workouts.map((workout: any, i: number) => (
              <WorkoutListItem
                workout={workout as SingleWorkout}
                key={workout.id}
              />
            ))}
          </div>
        </>
      )}
      {workouts.length === 0 && <NoWorkouts />}
    </div>
  );
}

const NoWorkouts = () => (
  <div className="w-full h-[100%] flex flex-col justify-center items-center">
    <h2 className="text-2xl font-bold">Welcome to your Workouts</h2>
    <h3 className="text-lg font-medium pb-4">You don't have any workouts yet</h3>
    <p className="text-xs text-center pb-4 text-stone-300">
      Click the button below to create your first workout
    </p>
    <NewWorkoutButton>
      <Button>Create a new Workout</Button>
    </NewWorkoutButton>
  </div>
);
