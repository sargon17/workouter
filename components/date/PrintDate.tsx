"use client";
import { format } from "date-fns";

export default function PrintDate({ date }: { date: string }) {
  return (
    <div>
      <span className="text-sm text-stone-500 cursor-default">
        {format(new Date(date), "eeee dd, MMMM ")}
      </span>
    </div>
  );
}
