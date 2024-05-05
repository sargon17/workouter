import React from "react";
import { createClient } from "@/utils/supabase/server";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import { TemplateList, TemplateItem } from "@/components/templates/TemplateList";

export default async function TemplatesPage() {
  const supabase = createClient();

  const { data: templates, error } = await supabase
    .from("workouts")
    .select("*, workout_body_parts( body_parts(name, id))")
    .eq("is_template", true);

  if (error) {
    throw error;
  }

  if (!templates) {
    return <div>No templates found</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-start my-4">
        <div>
          <h1 className=" text-stone-300 font-bold text-2xl antialiased">Templates</h1>
          <p className=" text-stone-500 text-xs antialiased text-balance">
            Create a new workout template or modify an existing one
          </p>
        </div>
        <Link href="/workouts/templates/create">
          <Button variant={"secondary"}>Create Template</Button>
        </Link>
      </div>
      <div>
        <TemplateList>
          {templates.map((template) => (
            <TemplateItem
              key={template.id}
              workout={template}
            />
          ))}
        </TemplateList>
      </div>
    </div>
  );
}
