import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import Header from "@/components/Header";
import WorkoutList from "@/components/workout/WorkoutList";

import { Button } from "@/components/ui/button";

import NewWorkoutButton from "@/components/workout/NewWorkoutButton";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <>
      <Header>
        <NewWorkoutButton />
      </Header>
      <WorkoutList />
    </>
  );
}
