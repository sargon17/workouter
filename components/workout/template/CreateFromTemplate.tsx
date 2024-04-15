import React from "react";

import { createClient } from "@/utils/supabase/server";

import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import SingleTemplateButton from "./SingleTemplateButton";

export default async function CreateFromTemplate() {
  const supabase = createClient();

  //   get user's templates
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  // get user's templates
  const { data, error } = await supabase
    .from("template_workouts")
    .select("*, workouts(* , workout_exercises(*, target_sets(*)))")
    .eq("user_id", user.id);

  if (error) {
    throw new Error("Error getting templates");
  }

  if (data.length === 0) {
    return null;
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant={"default"}
            size="sm"
          >
            Create from Template
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full">
          <DialogHeader>
            <DialogTitle>Select a template</DialogTitle>
          </DialogHeader>
          <div className="">
            {data.map((template: any) => (
              <SingleTemplateButton
                key={template.id}
                template={template}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>
      <p className="text-xs text-stone-500 pt-1">Create a workout from a template you've saved.</p>
    </div>
  );
}
