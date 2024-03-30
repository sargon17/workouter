"use client";
import { format } from "date-fns";

export default function PrintDate({ date }: { date: string }) {
  let renderDate = "";

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  switch (date) {
    case today.toISOString().slice(0, 10):
      renderDate = "Today";
      break;

    case tomorrow.toISOString().slice(0, 10):
      renderDate = "Tomorrow";
      break;

    default:
      renderDate = format(new Date(date), "PPP");
      break;
  }

  return (
    <div>
      <span className="text-sm text-stone-500 cursor-default">{renderDate}</span>
    </div>
  );
}
