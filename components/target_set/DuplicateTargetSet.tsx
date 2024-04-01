"use client";
import { createClient } from "@/utils/supabase/client";

import { toast } from "sonner";

import { useRouter } from "next/navigation";

export default function DuplicateTargetSet({
  set_id,
  children,
}: {
  set_id: string;
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const router = useRouter();

  const duplicateTargetSet = async () => {
    let { data: target_set, error } = await supabase.from("target_sets").select("*").eq("id", set_id);

    if (error) {
      console.error(error);
      toast("Error duplicating target set");
      return;
    }

    if (!target_set || target_set.length === 0) {
      console.error("No target set found");
      toast("Error duplicating target set");
      return;
    }

    let new_target_set = target_set[0];

    delete new_target_set.id;

    let { data, error: insertError } = await supabase.from("target_sets").insert([new_target_set]);

    if (error || insertError) {
      console.error(error || insertError);
      toast("Error duplicating target set");
      return;
    } else {
      toast("Target set duplicated");

      router.refresh();
    }
  };

  return <div onClick={duplicateTargetSet}>{children}</div>;
}
