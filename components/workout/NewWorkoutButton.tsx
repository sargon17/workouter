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
  DrawerDescription,
} from "@/components/ui/drawer";

import NewWorkoutForm from "./NewWorkoutForm";

import CreateFromTemplate from "./template/CreateFromTemplate";

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
          <DrawerTitle>Create a Workout</DrawerTitle>

          <DrawerDescription>Create a workout from scratch or use a template.</DrawerDescription>
        </DrawerHeader>
        <div className="w-full px-4 py-2">
          <CreateFromTemplate />
        </div>
        <NewWorkoutForm user={user} />
      </DrawerContent>
    </Drawer>
  );
}
