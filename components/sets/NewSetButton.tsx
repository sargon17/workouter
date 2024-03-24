import NewSetForm from "@/components/sets/NewSetForm";

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
export default async function NewSetButton({
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
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Record a Set</DrawerTitle>
          {/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
        </DrawerHeader>
        <NewSetForm workout_exercise_id={workout_exercise_id} />
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
