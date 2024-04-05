import { Trash, Edit, Copy } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import DeleteTargetSetButton from "./DeleteTargetSetButton";
import DuplicateTargetSet from "./DuplicateTargetSet";

import EditTargetSetButton from "./edit/EditTargetSetButton";

export default function TargetSetItem({ children, set_id }: { children: React.ReactNode; set_id: string }) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="hover:text-stone-100">{children}</div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Target Set Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <EditTargetSetButton set_id={set_id}>
            <div className="flex w-full items-center px-2 py-1 hover:bg-stone-800 transition-all cursor-pointer text-sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </div>
          </EditTargetSetButton>
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
    </>
  );
}
