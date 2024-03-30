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

import NewWorkoutForm from "./NewWorkoutForm";

import { getUser } from "@/lib/fetch";

export default async function NewWorkoutButton({ children }: { children: React.ReactNode }) {
  const supabase = createClient();

  let user = await getUser(supabase);

  if (!user) return null;

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create a new Workout</DrawerTitle>
          {/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
        </DrawerHeader>
        <NewWorkoutForm user={user} />
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
