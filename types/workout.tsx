type StatusType = {
  name: "planed" | "in progress" | "done" | "canceled" | "skipped" | "to plan";
  id: string;
};

type SingleWorkout = {
  id: string;
  title: string;
  date: string;
  workout_exercises: any[];
  workout_statuses: StatusType | null;
};

export type { SingleWorkout, StatusType };
