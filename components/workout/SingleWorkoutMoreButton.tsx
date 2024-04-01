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

import DeleteWorkoutButton from "./DeleteWorkoutButton";
import EditWorkoutForm from "./EditWorkoutForm";

export default function SingleWorkoutMoreButton({
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Workout Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setIsDrawerOpen(true);
            }}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DeleteWorkoutButton workout_id={id}>
            <DropdownMenuItem className="text-red-500 dark:focus:bg-red-900 ">
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DeleteWorkoutButton>
        </DropdownMenuContent>
      </DropdownMenu>

      <Drawer
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
            ></DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
