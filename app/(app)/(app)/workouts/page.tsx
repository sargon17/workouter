import { Plus } from "lucide-react";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import WorkoutList from "@/components/workout/WorkoutList";
import NewWorkoutButton from "@/components/workout/NewWorkoutButton";

import Header from "@/components/Header";
import Body from "@/components/Body";
import { Button } from "@/components/ui/button";

import Link from "next/link";

export default async function ProtectedPage({ searchParams }: { searchParams: { date: string } }) {
  const supabase = createClient();
  const searchDate = searchParams.date || new Date().toISOString().split("T")[0];

  console.log("searchDate", searchDate);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <>
      <Header
        title="workouts"
        backHref="/"
        actionBtn={
          <NewWorkoutButton>
            <Button
              size="icon"
              variant="outline"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </NewWorkoutButton>
        }
      />
      <Body>
        <WorkoutList date={searchDate} />
      </Body>
    </>
  );
}
