import { MoreHorizontal, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import PrintDate from "../date/PrintDate";
import SingleWorkoutMoreButton from "./SingleWorkoutMoreButton";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";

import { SingleWorkout } from "@/types/workout";

export default function WorkoutListItem({
  workout,
  highlighted = false,
}: {
  workout: SingleWorkout;
  highlighted?: boolean;
}) {
  return (
    <>
      <div className={cn("w-full flex items-center justify-between px-4 py-2 dark:border-stone-900 ", {})}>
        <div>
          <div className="">
            <h2 className="text-lg font-bold">{workout.title}</h2>
            <PrintDate date={workout.date} />
          </div>
        </div>
        <div className="flex gap-2">
          <SingleWorkoutMoreButton
            id={workout.id}
            title={workout.title}
            date={workout.date}
          >
            <Button
              size="icon"
              variant="ghost"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </SingleWorkoutMoreButton>
          <Button size={"icon"}>
            <Link href={`/workouts/${workout.id}`}>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
      <Separator />
    </>
  );
}
