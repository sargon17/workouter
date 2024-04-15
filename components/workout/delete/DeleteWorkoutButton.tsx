"use client";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { handleDelete } from "./DeleteWorkout.hooks";
export default function DeleteTargetSetButton({
  children,
  workout_id,
}: {
  children: React.ReactNode;
  workout_id: string;
}) {
  const supabase = createClient();
  const router = useRouter();

  const onClick = () => {
    handleDelete(workout_id, supabase, router);
  };

  return <span onClick={onClick}>{children}</span>;
}
