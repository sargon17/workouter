"use client";
import { Trash } from "lucide-react";
import { memo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import DeleteWorkoutButton from "./delete/DeleteWorkoutButton";

function SingleWorkoutMoreButton({
  children,
  id,
  title,
  date,
}: {
  children: React.ReactNode;
  id: string;
  title: string;
  date: any;
}) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Workout Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DeleteWorkoutButton workout_id={id}>
            <DropdownMenuItem className="text-red-500 dark:focus:bg-red-900">
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DeleteWorkoutButton>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default memo(SingleWorkoutMoreButton);
