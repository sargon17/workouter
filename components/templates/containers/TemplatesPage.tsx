import React from "react";
import { createClient } from "@/utils/supabase/server";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Chip, handleColor } from "@/components/Chip";

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

const TemplateList = (props: { children: React.ReactNode | React.ReactNode[] }) => {
  return <div className="flex flex-col gap-2">{props.children}</div>;
};

const TemplateItem = (props: { workout: any }) => {
  console.log(props.workout);
  return (
    <div className="flex justify-between items-start gap-4  p-2 border border-stone-800 bg-stone-900 rounded-xl">
      <div>
        <div className=" mb-4">
          <h2 className=" text-stone-300 font-bold text-lg antialiased capitalize ">{props.workout.title}</h2>
          <p className=" text-stone-500 text-xs antialiased">{props.workout.description}</p>
        </div>
        <div className="flex gap-1">
          {props.workout.workout_body_parts.map((bp: any) => (
            <Chip
              key={bp.body_parts.id}
              color={handleColor({ id: bp.body_parts.id })}
              isActive
              size="xs"
            >
              {bp.body_parts.name}
            </Chip>
          ))}
        </div>
      </div>
      <Link href={`/workouts/templates/${props.workout.id}`}>
        <Button variant={"secondary"}>View</Button>
      </Link>
    </div>
  );
};
