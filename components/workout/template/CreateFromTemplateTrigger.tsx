import { createClient } from "@/utils/supabase/server";

import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import UseTemplateButton from "./UseTemplateButton";

import { TemplateList, TemplateItem } from "@/components/templates/TemplateList";

type TemplateProps = {
  children: React.ReactNode;
  date: string;
};
export default async function CreateFromTemplateTrigger(props: TemplateProps) {
  const supabase = createClient();

  //   get user's templates
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  // get user's templates
  const { data, error } = await supabase
    .from("workouts")
    .select("*, workout_exercises(*, target_sets(*)), workout_body_parts( body_parts(name, id))")
    .eq("user_id", user.id)
    .eq("is_template", true);

  if (error) {
    throw new Error("Error getting templates");
  }

  if (data.length === 0) {
    return null;
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>{props.children}</DialogTrigger>
        <DialogContent className="w-full">
          <DialogHeader>
            <DialogTitle>Select a template</DialogTitle>
          </DialogHeader>
          <TemplateList>
            {data.map((template: any) => (
              <TemplateItem
                key={template.id}
                workout={template}
              >
                <UseTemplateButton
                  template={template}
                  date={props.date ? new Date(props.date) : new Date()}
                />
              </TemplateItem>
            ))}
          </TemplateList>
        </DialogContent>
      </Dialog>
    </div>
  );
}
