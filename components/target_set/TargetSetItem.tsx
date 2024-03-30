"use client";

import { useState } from "react";

import { Trash, Edit, Copy } from "lucide-react";
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

import DeleteTargetSetButton from "./DeleteTargetSetButton";
import EditTargetSetForm from "./EditTargetSetForm";
import DuplicateTargetSet from "./DuplicateTargetSet";

export default function TargetSetItem({
  children,
  set_id,
  target_weight,
  target_reps,
}: {
  children: React.ReactNode;
  set_id: string;
  target_weight: number;
  target_reps: number;
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span className="hover:text-stone-100">{children}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Target Set Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setIsDrawerOpen(true);
            }}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DuplicateTargetSet set_id={set_id}>
              <div className="flex ">
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </div>
            </DuplicateTargetSet>
          </DropdownMenuItem>
          <DeleteTargetSetButton set_id={set_id}>
            <DropdownMenuItem className="dark:text-rose-500 dark:focus:bg-rose-950">
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DeleteTargetSetButton>
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
          <EditTargetSetForm
            set_id={set_id}
            original_target_reps={target_reps}
            original_target_weight={target_weight}
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
