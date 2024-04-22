import { Plus } from "lucide-react";

import Header from "@/components/Header";

import { Button } from "@/components/ui/button";
import NewWorkoutExerciseButton from "@/components/workout_exercises/NewWorkoutExerciseButton";
import Body from "@/components/Body";

export default function layout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  return (
    <>
      <Header
        title="Details"
        backHref={`/workouts`}
        backText="Workouts"
        actionBtn={
          <NewWorkoutExerciseButton workout_id={params.id}>
            <Button size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </NewWorkoutExerciseButton>
        }
      />
      {children}
    </>
  );
}
