import { createClient } from "@/utils/supabase/server";
import { Chip } from "../Chip";

import UpdateStatus from "./UpdateStatus";

import { StatusType } from "@/types/workout";

import { getStatusColor } from "./getStatusColor";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
              color={getStatusColor(props.status)}
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
                  color={getStatusColor(status.name)}
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
