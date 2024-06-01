"use client";
import { add, format } from "date-fns";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dayjs from "dayjs";
import ReloadButton from "../ReloadButton";
import { Button } from "../ui/button";

import { cn } from "@/lib/utils";

import calendar from "dayjs/plugin/calendar";
import isoWeek from "dayjs/plugin/isoWeek";

type DaysNavigationProps = {
  date: string;
};
export default function DaysNavigation(props: DaysNavigationProps) {
  dayjs.extend(calendar);

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
    <div className="flex flex-col gap-2 py-3">
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
      <CurrentWeek date={props.date} />
    </div>
  );
}

// component to show the current week and the days with workouts

type CurrentWeekProps = {
  date: string;
};
const CurrentWeek = (props: CurrentWeekProps) => {
  dayjs.extend(isoWeek);

  const startOfWeek = dayjs(props.date).startOf("isoWeek");
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day"));

  const currentDate = dayjs(props.date);
  const today = dayjs().format("YYYY-MM-DD");

  return (
    <div className="flex justify-center items-center gap-2">
      {daysOfWeek.map((day, index) => (
        <Link
          key={index}
          href={`/workouts?date=${day.format("YYYY-MM-DD")}`}
          className={cn(
            "rounded-xl flex items-center justify-center flex-col cursor-pointer w-full opacity-45 text-stone-200 p-2",
            {
              " border border-stone-800 opacity-100 bg-stone-900":
                day.format("YYYY-MM-DD") === currentDate.format("YYYY-MM-DD"),
              " border border-stone-800 opacity-100": day.format("YYYY-MM-DD") === today,
            }
          )}
        >
          <div className="text-xs font-normal">{day.format("ddd")}</div>
          <div className=" font-bold text-lg">{day.format("DD")}</div>
        </Link>
      ))}
    </div>
  );
};
