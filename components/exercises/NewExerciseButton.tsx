import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

import NewExerciseForm from "./NewExerciseForm";

import { getUser } from "@/lib/fetch";

export default function NewExerciseButton({ children }: { children: React.ReactNode }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create a new Exercise</DrawerTitle>
        </DrawerHeader>
        <NewExerciseForm />
      </DrawerContent>
    </Drawer>
  );
}
