"use client ";
import { use, useEffect, useState } from "react";
import { LayoutGrid } from "lucide-react";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { getUser } from "@/lib/fetch";

export default function SetAsTemplateButton({ workout_id }: { workout_id: string }) {
  const [isTemplate, setIsTemplate] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const checkIfTemplate = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("template_workouts")
        .select("*")
        .eq("workout_id", workout_id)
        .eq("user_id", user.id);

      if (error) {
        throw new Error("Error getting template workout");
      }

      if (data.length > 0) {
        setIsTemplate(true);
      }
    };

    checkIfTemplate();
  }, []);

  const handleSetAsTemplate = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("template_workouts")
        .insert([{ workout_id, user_id: user.id }])
        .select();
    } catch (error) {
      toast.error("Error setting workout as template");
    }

    toast.success("Workout set as template");
    router.refresh();
  };

  const handleRemoveFromTemplates = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("template_workouts")
        .delete()
        .eq("workout_id", workout_id)
        .eq("user_id", user.id)
        .select();
    } catch (error) {
      toast.error("Error removing workout from templates");
    }

    toast.success("Workout removed from templates");
    router.refresh();
  };

  return (
    <div
      className="flex items-center"
      onClick={() => {
        if (isTemplate) {
          handleRemoveFromTemplates();
        } else {
          handleSetAsTemplate();
        }
      }}
    >
      <LayoutGrid className="h-4 w-4 mr-2" />
      {isTemplate ? "Remove from Templates" : "Set as Template"}
    </div>
  );
}
