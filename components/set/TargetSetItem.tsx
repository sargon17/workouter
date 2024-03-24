import { Trash, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import DeleteTargetSetButton from "./DeleteTargetSetButton";

export default function TargetSetItem({ children, set_id }: { children: React.ReactNode; set_id: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span className="hover:text-stone-100">{children}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Target Set</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </DropdownMenuItem>
        <DeleteTargetSetButton set_id={set_id}>
          <DropdownMenuItem className="text-red-500 dark:focus:bg-red-900 ">
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DeleteTargetSetButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
