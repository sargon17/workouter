import { createClient } from "@/utils/supabase/server";
import { Chip } from "../Chip";

import UpdateStatus from "./UpdateStatus";

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
  planed: "lime",
  "in progress": "cyan",
  done: "purple",
  canceled: "red",
  skipped: "red",
  "to plan": "orange",
};

type StatusLabelProps = {
  status: StatusType["name"];
  workout_id: string;
};
export default async function StatusLabel(props: StatusLabelProps) {
  const supabase = createClient();

  let { data: workout_statuses, error } = await supabase.from("workout_statuses").select("*").order("id");

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {
            <Chip
              color={conditionalStyles[props.status] as any}
              size="xs"
              isActive
            >
              {props.status}
            </Chip>
          }
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Update Status</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {workout_statuses?.map((status: StatusType) => (
            <UpdateStatus
              key={status.id}
              workout_id={props.workout_id || ""}
              status_id={status.id}
            >
              <DropdownMenuItem>
                <Chip
                  color={conditionalStyles[status.name] as any}
                  size="xs"
                  isActive
                >
                  {status.name}
                </Chip>
              </DropdownMenuItem>
            </UpdateStatus>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
