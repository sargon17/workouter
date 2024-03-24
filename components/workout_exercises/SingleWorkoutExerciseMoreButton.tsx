"use client";
import { Trash, Edit } from "lucide-react";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

import DeleteWorkoutExerciseButton from "./DeleteWorkoutExerciseButton";
// import EditWorkoutForm from "./EditWorkoutForm";

export default function SingleWorkoutMoreButton({ children, id }: { children: React.ReactNode; id: string }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span>{children}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Workout Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem
            onClick={() => {
              setIsDrawerOpen(true);
            }}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem> */}
          <DeleteWorkoutExerciseButton id={id}>
            <DropdownMenuItem className="text-red-500 dark:focus:bg-red-900 ">
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DeleteWorkoutExerciseButton>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* <Drawer
        open={isDrawerOpen}
        onOpenChange={(state) => {
          setIsDrawerOpen(state);
        }}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit Target Set</DrawerTitle>
          </DrawerHeader>
          <EditWorkoutForm
            id={id}
            original_title={title}
            original_date={date}
          />
          <DrawerFooter>
            <DrawerClose
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer> */}
    </>
  );
}
