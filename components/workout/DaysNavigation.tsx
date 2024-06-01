"use client";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dayjs from "dayjs";
import ReloadButton from "../ReloadButton";
import { Button } from "../ui/button";

import { getUser } from "@/lib/fetch";

import { createClient } from "@/utils/supabase/client";

import { cn } from "@/lib/utils";

import calendar from "dayjs/plugin/calendar";
import isoWeek from "dayjs/plugin/isoWeek";
import { getStatusColor } from "../status/getStatusColor";

import { useState, useMemo, useEffect, use } from "react";

type DaysNavigationProps = {
  date: string;
  user_id: string;
};
export default function DaysNavigation(props: DaysNavigationProps) {
  const supabase = createClient();
  const [WeekInView, setWeekInView] = useState(0);
  const [workouts, setWorkouts] = useState<any[]>([]);
  dayjs.extend(calendar);
  dayjs.extend(isoWeek);

  const startOfWeek = dayjs(props.date).startOf("isoWeek").add(WeekInView, "week");
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day"));

  const monthInView = useMemo(() => {
    // 21-28 June
    return dayjs(props.date).startOf("isoWeek").add(WeekInView, "week").format("MMMM");
  }, [WeekInView]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const user = await getUser(supabase);
      const days = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day").format("YYYY-MM-DD"));

      const { data: workouts, error } = await supabase
        .from("workouts")
        .select("date, status_id, workout_statuses(name)")
        .eq("user_id", user.id)
        .in("date", days);

      if (error) {
        console.error("error", error);
      }

      setWorkouts(workouts || []);
    };

    fetchWorkouts();
  }, [WeekInView]);

  useEffect(() => {
    setWeekInView(0); // reset week in view to 0 on date change
  }, [props.date]);

  return (
    <div className="flex flex-col gap-2 py-3">
      <div className="flex justify-between items-center">
        <Button
          variant={"outline"}
          size={"icon"}
          onMouseDown={() => setWeekInView((prev) => prev - 1)}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <p className=" text-sm font-bold flex justify-center items-center gap-1">
          {monthInView} {startOfWeek.format("DD")} - {daysOfWeek[6].format("DD")}
          {/* <ReloadButton /> */}
        </p>

        <Button
          variant={"outline"}
          size={"icon"}
          onMouseDown={() => setWeekInView((prev) => prev + 1)}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
      <CurrentWeek
        date={props.date}
        workouts={workouts}
        daysOfWeek={daysOfWeek}
      />
    </div>
  );
}

type CurrentWeekProps = {
  date: string;
  workouts: any[];
  daysOfWeek: any[];
};
const CurrentWeek = (props: CurrentWeekProps) => {
  dayjs.extend(isoWeek);

  const currentDate = dayjs(props.date);
  const today = dayjs().format("YYYY-MM-DD");

  return (
    <div className="flex justify-center items-stretch gap-2">
      {props.daysOfWeek.map((day, index) => (
        <Link
          key={index}
          href={`/workouts?date=${day.format("YYYY-MM-DD")}`}
          className={cn(
            "rounded-xl flex items-center justify-center flex-col cursor-pointer w-full opacity-45 text-stone-200 p-2 border border-transparent",
            {
              "  border-stone-800 opacity-100 bg-stone-900":
                day.format("YYYY-MM-DD") === currentDate.format("YYYY-MM-DD"),
              "  border-stone-800 opacity-100": day.format("YYYY-MM-DD") === today,
            }
          )}
        >
          <div className="text-xs font-normal">{day.format("ddd")}</div>
          <div className=" font-bold text-lg">{day.format("DD")}</div>

          <WorkoutStatus
            workout={props.workouts.find((workout: any) => workout.date === day.format("YYYY-MM-DD")) || null}
          />
        </Link>
      ))}
    </div>
  );
};

const WorkoutStatus = (props: { workout: any }) => {
  let color = "none";

  if (props.workout !== null) {
    color = getStatusColor(props.workout.workout_statuses?.name);
  }

  return (
    <div
      className={cn("w-2 h-2 rounded-full border", {
        "bg-lime-500/50 border-lime-500": color === "lime",
        "bg-green-500/50 border-green-500": color === "green",
        "bg-teal-500/50 border-teal-500": color === "teal",
        "bg-cyan-500/50 border-cyan-500": color === "cyan",
        "bg-indigo-500/50 border-indigo-500": color === "indigo",
        "bg-purple-500/50 border-purple-500": color === "purple",
        "bg-pink-500/50 border-pink-500": color === "pink",
        "bg-rose-500/50 border-rose-500": color === "rose",
        "bg-fuchsia-500/50 border-fuchsia-500": color === "fuchsia",
        "bg-violet-500/50 border-violet-500": color === "violet",
        "bg-orange-500/50 border-orange-500": color === "orange",
        "bg-amber-500/50 border-amber-500": color === "amber",
        "bg-gray-500/50 border-gray-500": color === "gray",
        "bg-zinc-500/50 border-zinc-500": color === "zinc",
        "bg-neutral-500/50 border-neutral-500": color === "neutral",
        "bg-slate-500/50 border-slate-500": color === "slate",
        "bg-transparent border-transparent": color === "none",
      })}
    ></div>
  );
};
