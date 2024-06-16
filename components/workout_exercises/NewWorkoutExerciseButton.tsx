import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { NewWorkoutExerciseForm } from "./NewWorkoutExerciseForm";

import { cache } from "react";

import { getUser } from "@/lib/fetch";

export default async function NewWorkoutExerciseButton(props: {
  children: React.ReactNode;
  workout_id: string;
  body_parts?: number[];
}) {
  const supabase = createClient();

  // get all exercises for at least one of the body parts

  let { data: exercises, error } = await supabase
    .from("exercises")
    .select("id, title, body_part_id, body_parts(*)")
    .in("body_part_id", props.body_parts || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

  return (
    <Drawer>
      <DrawerTrigger asChild>{props.children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add an Exercise</DrawerTitle>
          {/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
        </DrawerHeader>
        <NewWorkoutExerciseForm
          workout_id={props.workout_id}
          exercises={exercises as any}
        />
      </DrawerContent>
    </Drawer>
  );
}
