"use client";

import { useState } from "react";

import { Trash, Edit } from "lucide-react";
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

import DeleteSetButton from "./DeleteSetButton";
import EditSetForm from "./EditSetForm";
export default function SetItem({
  children,
  id,
  reps,
  weight,
}: {
  children: React.ReactNode;
  id: string;
  reps: number;
  weight: number;
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span>{children}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Set Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setIsDrawerOpen(true);
            }}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DeleteSetButton set_id={id}>
            <DropdownMenuItem className="text-red-500 dark:focus:bg-red-900 ">
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DeleteSetButton>
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
            <DrawerTitle>Edit Set</DrawerTitle>
          </DrawerHeader>
          <EditSetForm
            set_id={id}
            original_reps={reps}
            original_weight={weight}
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
      </Drawer>
    </>
  );
}
