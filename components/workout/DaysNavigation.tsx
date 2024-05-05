"use client";
import { add, format } from "date-fns";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dayjs from "dayjs";
import ReloadButton from "../ReloadButton";
import { Button } from "../ui/button";

import calendar from "dayjs/plugin/calendar";

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
  );
}
