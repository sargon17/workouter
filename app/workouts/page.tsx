import { Plus } from "lucide-react";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import WorkoutList from "@/components/workout/WorkoutList";
import NewWorkoutButton from "@/components/workout/NewWorkoutButton";

import Header from "@/components/Header";
import Body from "@/components/Body";
import { Button } from "@/components/ui/button";

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
          <Button
            size="icon"
            variant="outline"
          >
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
