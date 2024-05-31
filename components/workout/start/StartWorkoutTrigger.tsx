import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import UpdateStatus from "@/components/status/UpdateStatus";

type Props = {
  children: React.ReactNode;
  workout_id: string;
};
export default function StartWorkoutTrigger(props: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start Workout</DialogTitle>
        </DialogHeader>
        <div className="w-full px-4 py-4 flex flex-col gap-2 min-w-96">
          <p className=" text-center text-stone-500 pb-4">Are you sure you want to start this workout?</p>
          <div className="flex justify-center gap-2">
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <UpdateStatus
              status_id="3"
              workout_id={props.workout_id}
            >
              <Link href={`/session/${props.workout_id}`}>
                <Button variant="default">Start Workout</Button>
              </Link>
            </UpdateStatus>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
