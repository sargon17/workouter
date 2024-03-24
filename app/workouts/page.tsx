import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";

import Header from "@/components/Header";
import WorkoutList from "@/components/workout/WorkoutList";

import { Button } from "@/components/ui/button";

import NewWorkoutButton from "@/components/workout/NewWorkoutButton";
import Body from "@/components/Body";

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
        <NewWorkoutButton>
          <Button size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </NewWorkoutButton>
      </Header>
      <Body>
        <WorkoutList />
      </Body>
    </>
  );
}
