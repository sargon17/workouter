import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import Header from "@/components/Header";
import Body from "@/components/Body";
import { Button } from "@/components/ui/button";

import Link from "next/link";

import DaysNavigation from "@/components/workout/DaysNavigation";
import WorkoutDetails from "@/components/workout/WorkoutDetails";

import isoWeek from "dayjs/plugin/isoWeek";
import dayjs from "dayjs";
import { toast } from "sonner";

import { WorkoutDetailsHeader } from "@/components/workout/details/WorkoutDetailsHeader";
import StatusLabel from "@/components/status/StatusLabel";

import NewWorkoutExerciseButton from "@/components/workout_exercises/NewWorkoutExerciseButton";

import { ExerciseActions } from "@/components/exercises/ExerciseCardsList";

const body_parts_ids = (body_parts: any) => {
  return body_parts.map((bp: any) => bp.body_parts.id);
};

export default async function ProtectedPage({ searchParams }: { searchParams: { date: string } }) {
  const supabase = createClient();
  const searchDate = searchParams.date || new Date().toISOString().split("T")[0];

  dayjs.extend(isoWeek);

  const startOfWeek = dayjs(searchDate).startOf("isoWeek");
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day")).map((day) =>
    day.format("YYYY-MM-DD")
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const fetchWorkouts = async () => {
    if (!user) return;

    const { data: workouts, error } = await supabase
      .from("workouts")
      .select(
        "id, title, date, status_id, workout_exercises(*, sets(*), target_sets(*), exercises(*)), workout_statuses(name), workout_body_parts(*)"
      )
      .eq("user_id", user.id)
      .in("date", daysOfWeek);

    if (error) {
      console.error("error", error);
      toast("Error fetching workouts");
    }

    if (!workouts) {
      toast("No workouts found");
      return;
    }

    return workouts;
  };

  const workouts: any = await fetchWorkouts();

  const workout = workouts.find((workout: any) => workout.date === searchDate) || null;

  return (
    <>
      <Header
        title="workouts"
        backHref="/"
        actionBtn={
          <Link href="/workouts/templates">
            <Button>Templates</Button>
          </Link>
        }
      />
      <Body>
        <DaysNavigation
          date={searchDate}
          user_id={user.id}
        />
        <WorkoutDetailsHeader
          workout={workout && workout}
          status={workout && workout.workout_statuses?.name}
          date={searchDate}
          chip={
            workout && (
              <StatusLabel
                status={workout.workout_statuses?.name}
                workout_id={workout.id}
              />
            )
          }
        />
        <WorkoutDetails
          date={searchDate}
          key={searchDate}
          workout={workout}
        />
        <div className="absolute bottom-20 left-0 w-full flex justify-center items-center py-2 bg-gradient-to-t from-stone-950/90 from-50% ">
          <ExerciseActions>
            <NewWorkoutExerciseButton
              workout_id={workout.id}
              // body_parts={body_parts_ids(workout.workout_body_parts)}
            >
              <Button
                size="sm"
                variant="secondary"
              >
                Add exercise
              </Button>
            </NewWorkoutExerciseButton>
          </ExerciseActions>
        </div>
      </Body>
    </>
  );
}
