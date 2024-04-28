import React from "react";
import { createClient } from "@/utils/supabase/server";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import WorkoutListItem from "@/components/workout/WorkoutListItem";

export default async function TemplatesPage() {
  const supabase = createClient();

  const { data: templates, error } = await supabase.from("workouts").select("*").eq("is_template", true);

  if (error) {
    throw error;
  }

  if (!templates) {
    return <div>No templates found</div>;
  }

  return (
    <div>
      <div className="flex justify-between">
        <h1>Templates</h1>
        <Link href="/workouts/templates/create">
          <Button>Create New Template</Button>
        </Link>
      </div>
      <div>
        {templates.map((template) => (
          <WorkoutListItem
            key={template.id}
            workout={template}
            href={`/workouts/templates/${template.id}`}
          />
        ))}
      </div>
    </div>
  );
}
