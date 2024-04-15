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

import { getUser } from "@/lib/fetch";

export default async function NewWorkoutExerciseButton({
  children,
  workout_id,
}: {
  children: React.ReactNode;
  workout_id: string;
}) {
  const supabase = createClient();

  let { data: exercises, error } = await supabase.from("exercises").select("id, title");

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add an Exercise</DrawerTitle>
          {/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
        </DrawerHeader>
        <NewWorkoutExerciseForm
          workout_id={workout_id}
          exercises={exercises}
        />
      </DrawerContent>
    </Drawer>
  );
}
