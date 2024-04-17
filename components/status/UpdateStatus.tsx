"use client";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { StatusType } from "@/types/workout";

import { useRouter } from "next/navigation";

export default function UpdateStatus({
  children,
  status_id,
  workout_id,
}: {
  children: React.ReactNode;
  status_id: string;
  workout_id: string;
}) {
  const supabase = createClient();
  const router = useRouter();

  const updateStatus = async (status_id: StatusType["id"]) => {
    if (workout_id === "") return;

    const { data, error } = await supabase
      .from("workouts")
      .update({ status_id: status_id })
      .eq("id", workout_id)
      .select();

    if (error) {
      console.error("error", error);
      toast("Error updating workout status");
    } else {
      toast("Workout status updated");

      // refresh the page
      router.refresh();
    }
  };
  return <div onClick={() => updateStatus(status_id)}>{children}</div>;
}
