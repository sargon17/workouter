"use client";
import { createClient } from "@/utils/supabase/client";

import { toast } from "sonner";

import { useRouter } from "next/navigation";

export default function DeleteTargetSetButton({
  children,
  workout_id,
}: {
  children: React.ReactNode;
  workout_id: string;
}) {
  const supabase = createClient();
  const router = useRouter();

  console.log(workout_id);

  const handleDelete = async () => {
    const { error } = await supabase.from("workouts").delete().eq("id", workout_id);

    if (error) {
      toast("Something went wrong while deleting the workout");
    } else {
      toast("Workout deleted successfully");
      router.refresh();
    }
  };

  return <span onClick={handleDelete}>{children}</span>;
}
