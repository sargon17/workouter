import NewTargetSetForm from "@/components/target_set/NewTargetSetForm";

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

import { getUser } from "@/lib/fetch";
export default async function NewTargetSetButton({
  children,
  workout_exercise_id,
}: {
  children: React.ReactNode;
  workout_exercise_id: string;
}) {
  const supabase = createClient();

  let user = await getUser(supabase);

  if (!user) return null;

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add a new Target Set</DrawerTitle>
          {/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
        </DrawerHeader>
        <NewTargetSetForm workout_exercise_id={workout_exercise_id} />
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
