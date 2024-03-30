import React from "react";
import { Label } from "./ui/label";

import { StatusType } from "@/types/workout";

export default function StatusLabel({ status }: { status: StatusType["name"] }) {
  let classes = "text-xs font-bold rounded-full px-2 py-0";

  switch (status) {
    case "planed":
      classes +=
        " bg-lime-100 border border-lime-500 text-lime-500 dark:bg-lime-950 dark:text-lime-100 dark:border-lime-500";
      break;
    case "in progress":
      classes +=
        " bg-cyan-100 border border-cyan-500 text-cyan-500 dark:bg-cyan-950 dark:text-cyan-100 dark:border-cyan-500";
      break;
    case "done":
      classes +=
        " bg-purple-100 border border-purple-500 text-purple-500 dark:bg-purple-950 dark:text-purple-100 dark:border-purple-500";
      break;
    case "canceled":
      classes +=
        " bg-red-100 border border-red-500 text-red-500 dark:bg-red-950 dark:text-red-100 dark:border-red-500";
      break;
    case "skipped":
      classes +=
        " bg-red-100 border border-red-500 text-red-500 dark:bg-red-950 dark:text-red-100 dark:border-red-500";
      break;
    case "to plan":
      classes +=
        " bg-orange-100 border border-orange-500 text-orange-500 dark:bg-orange-950 dark:text-orange-100 dark:border-orange-500";
      break;
    default:
      classes += " bg-gray-500 text-black";
  }

  return (
    <>
      <Label className={classes}>{status}</Label>
    </>
  );
}
