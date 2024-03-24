"use client";
import { createClient } from "@/utils/supabase/client";

import { toast } from "sonner";

import { useRouter } from "next/navigation";

export default function DeleteTargetSetButton({ children, id }: { children: React.ReactNode; id: string }) {
  const supabase = createClient();
  const router = useRouter();

  const handleDelete = async () => {
    const { error } = await supabase.from("workout_exercises").delete().eq("id", id);

    if (error) {
      toast("Something went wrong while deleting the Exercise");
    } else {
      toast("Exercise deleted successfully");
      router.refresh();
    }
  };

  return <span onClick={handleDelete}>{children}</span>;
}
