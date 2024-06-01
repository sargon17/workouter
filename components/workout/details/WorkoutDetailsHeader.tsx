import SingleWorkoutMoreButton from "./../SingleWorkoutMoreButton";
import StartWorkoutTrigger from "./../start/StartWorkoutTrigger";
import Pattern from "@/components/Pattern";
import { MoreHorizontal } from "lucide-react";
import CreateFromTemplate from "../template/CreateFromTemplateTrigger";

import Link from "next/link";
import { Button } from "../../ui/button";

import { cn } from "@/lib/utils";

import { Workout } from "../workout.d";
import { StatusType } from "@/types/workout";

import { getStatusColor } from "../../status/getStatusColor";

type WorkoutDetailsHeaderProps = {
  workout: Workout | null;
  status?: StatusType["name"];
  chip?: React.ReactNode;
  date: string;
};

const WorkoutDetailsHeader = (props: WorkoutDetailsHeaderProps) => {
  const status = props.status;
  let color = "stone";

  if (status) {
    color = getStatusColor(status);
  }

  const conditionalButtonRender = () => {
    if (props.workout) {
      switch (status) {
        case "planed":
          return <StartWorkoutButton workout={props.workout} />;
        case "in progress":
          return <ContinueWorkoutButton workout={props.workout} />;
        default:
          return null;
      }
    } else {
      return <CreateFromTemplateButton date={props.date} />;
    }
  };

  return (
    <div
      className={cn(
        "w-full min-h-56 p-2 py-16 my-2 border rounded-2xl flex flex-col justify-center items-center gap-2 relative" +
          ` border-${color}-500/20 text-${color}-200`
      )}
    >
      <Pattern />
      {props.workout && props.chip && <div className="absolute top-1 left-1">{props.chip}</div>}

      {props.workout && (
        <div className=" absolute z-10 top-1 right-1">
          <SingleWorkoutMoreButton
            id={props.workout.id}
            title={props.workout.title}
            date={props.workout.date}
          >
            <Button
              size="icon"
              variant="ghost"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </SingleWorkoutMoreButton>
        </div>
      )}
      <div className="relative z-10 flex flex-col items-center gap-2">
        <h2 className=" text-balance font-bold text-2xl antialiased capitalize text-center">
          {props.workout?.title || "Nothing planned yet for Today"}
        </h2>
        {conditionalButtonRender()}
      </div>
      {props.workout && (
        <div className=" absolute min-h-12 bottom-0 left-0 w-full ">
          <WorkoutDetailsHeaderFooter
            workout={props.workout}
            color={color}
          />
        </div>
      )}
    </div>
  );
};

const CreateFromTemplateButton = ({ date }: { date: string }) => {
  return (
    <CreateFromTemplate date={date}>
      <Button
        variant="outline"
        size="sm"
      >
        Create from Template
      </Button>
    </CreateFromTemplate>
  );
};

const StartWorkoutButton = ({ workout }: { workout: Workout }) => {
  return (
    <StartWorkoutTrigger workout_id={workout.id}>
      <Button variant="outline">Start Workout</Button>
    </StartWorkoutTrigger>
  );
};

const ContinueWorkoutButton = ({ workout }: { workout: Workout }) => {
  return (
    <Link href={`/session/${workout.id}`}>
      <Button variant="outline">Continue Workout</Button>
    </Link>
  );
};

type WorkoutDetailsHeaderFooterProps = {
  workout: Workout;
  status?: StatusType["name"];
  color: string;
};
const WorkoutDetailsHeaderFooter = (props: WorkoutDetailsHeaderFooterProps) => {
  const clss = cn(
    "backdrop-blur-sm border rounded-xl p-2 px-4 w-full" +
      ` bg-${props.color}-500/5 border-${props.color}-500/20 text-${props.color}-200`
  );

  return (
    <div className={cn("absolute inset-1 font-bold flex gap-1")}>
      <div className={clss}>
        <span className="text-xs font-light opacity-60">Total sets:</span>{" "}
        {props.workout.workout_exercises.reduce((acc: any, curr: any) => acc + curr.target_sets.length, 0)}
      </div>
      <div className={clss}>
        <span className="text-xs font-light opacity-60">Total exercises:</span>{" "}
        {props.workout.workout_exercises.length}
      </div>
    </div>
  );
};

export { WorkoutDetailsHeader };
