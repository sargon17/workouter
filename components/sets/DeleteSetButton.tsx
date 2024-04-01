"use client";
import { createClient } from "@/utils/supabase/client";

import { toast } from "sonner";

import { useRouter } from "next/navigation";

export default function DeleteTargetSetButton({
  children,
  set_id,
}: {
  children: React.ReactNode;
  set_id: string;
}) {
  const supabase = createClient();
  const router = useRouter();

  const handleDelete = async () => {
    const { error } = await supabase.from("sets").delete().eq("id", set_id);

    if (error) {
      toast("Something went wrong while deleting the set");
    } else {
      toast("Set deleted");
      router.refresh();
    }
  };

  return <div onClick={handleDelete}>{children}</div>;
}
