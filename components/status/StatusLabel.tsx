import { createClient } from "@/utils/supabase/server";
import { Label } from "../ui/label";

import UpdateStatus from "./UpdateStatus";

import { cn } from "@/lib/utils";

import { StatusType } from "@/types/workout";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const conditionalStyles = {
  planed:
    "bg-lime-100 border border-lime-500 text-lime-500 dark:bg-lime-950 dark:text-lime-100 dark:border-lime-500",
  "in progress":
    "bg-cyan-100 border border-cyan-500 text-cyan-500 dark:bg-cyan-950 dark:text-cyan-100 dark:border-cyan-500",
  done: "bg-purple-100 border border-purple-500 text-purple-500 dark:bg-purple-950 dark:text-purple-100 dark:border-purple-500",
  canceled:
    "bg-red-100 border border-red-500 text-red-500 dark:bg-red-950 dark:text-red-100 dark:border-red-500",
  skipped:
    "bg-red-100 border border-red-500 text-red-500 dark:bg-red-950 dark:text-red-100 dark:border-red-500",
  "to plan":
    "bg-orange-100 border border-orange-500 text-orange-500 dark:bg-orange-950 dark:text-orange-100 dark:border-orange-500",
};

export default async function StatusLabel({
  status,
  workout_id,
}: {
  status: StatusType["name"];
  workout_id: string;
}) {
  const supabase = createClient();

  let { data: workout_statuses, error } = await supabase.from("workout_statuses").select("*").order("id");

  const base = "text-xs font-bold rounded-full px-2 py-0 cursor-pointer ";

  let classes = base;
  if (status in conditionalStyles) {
    classes += conditionalStyles[status];
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{<Label className={classes}>{status}</Label>}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Update Status</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {workout_statuses?.map((status: StatusType) => (
            <UpdateStatus
              key={status.id}
              workout_id={workout_id}
              status_id={status.id}
            >
              <DropdownMenuItem>
                <Label className={cn(base, conditionalStyles[status.name])}>{status.name}</Label>
              </DropdownMenuItem>
            </UpdateStatus>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
