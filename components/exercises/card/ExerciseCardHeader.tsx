"use client"

import React from "react";


import { Button } from "@/components/ui/button";


import { Trash2, ChevronUp, ChevronDown, MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


type ExerciseCardHeaderProps = {
  title: string;
  subtitle?: string;
  workout_exercise_id: number;
  onReorder?: (currentIndex: number, targetIndex: number) => void;
  index?: number;
  onDelete?: (id: number) => void;
};

const ExerciseCardHeader = (props: ExerciseCardHeaderProps) => {
  const onReorderClick = (direction: "up" | "down") => {
    if (props.onReorder && props.index) {
      if (direction === "up" && props.index > 1) {
        props.onReorder(props.index, props.index - 1);
      } else if (direction === "down") {
        props.onReorder(props.index, props.index + 1);
      }
    }

    return;
  };

  return (
    <div className=" flex justify-between items-start">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <h2 className=" text-xl font-bold text-stone-300 antialiased">{props.title}</h2>
          {props.index && props.onReorder && (
            <>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onReorderClick("up")}
              >
                <ChevronUp className="h-4 w-4 stroke-stone-500" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onReorderClick("down")}
              >
                <ChevronDown className="h-4 w-4 stroke-stone-500" />
              </Button>
            </>
          )}
        </div>
        {props.subtitle && <p className=" text-sm text-stone-500">{props.subtitle}</p>}
      </div>
      {props.onDelete && (
        <ExerciseMoreButton
          workout_exercise_id={props.workout_exercise_id}
          onDelete={props.onDelete}
        >
          <Button
            size="icon"
            variant="ghost"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </ExerciseMoreButton>
      )}
    </div>
  );
};



type ExerciseMoreButtonProps = {
  children: React.ReactNode;
  workout_exercise_id: number;
  onDelete: (id: number) => void;
};

const ExerciseMoreButton = (props: ExerciseMoreButtonProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{props.children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Workout Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-red-500 dark:focus:bg-red-900 "
          onClick={() => props.onDelete(props.workout_exercise_id)}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExerciseCardHeader;