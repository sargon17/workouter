"use client";
import { createClient } from "@/utils/supabase/client";

import { toast } from "sonner";

import { useRouter } from "next/navigation";

export default function DuplicateSet({ set_id, children }: { set_id: string; children: React.ReactNode }) {
  const supabase = createClient();
  const router = useRouter();

  const duplicateTargetSet = async () => {
    let { data: set, error } = await supabase.from("sets").select("*").eq("id", set_id);

    if (error) {
      console.error(error);
      toast("Error duplicating set");
      return;
    }

    if (!set || set.length === 0) {
      console.error("No set found");
      toast("No set found");
      return;
    }

    let new_set = set[0];

    delete new_set.id;

    let { data, error: insertError } = await supabase.from("sets").insert([new_set]);

    if (error || insertError) {
      console.error(error || insertError);
      toast("Error duplicating set");
      return;
    } else {
      toast("Set duplicated");

      router.refresh();
    }
  };

  return <div onClick={duplicateTargetSet}>{children}</div>;
}
