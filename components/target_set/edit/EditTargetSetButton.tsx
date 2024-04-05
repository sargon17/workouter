import React from "react";

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import EditTargetSetForm from "./EditTargetSetForm";

export default function EditTargetSetButton({
  children,
  set_id,
}: {
  children: React.ReactNode;
  set_id: any;
}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit Target Set</DrawerTitle>
        </DrawerHeader>
        <EditTargetSetForm set_id={set_id} />
      </DrawerContent>
    </Drawer>
  );
}
