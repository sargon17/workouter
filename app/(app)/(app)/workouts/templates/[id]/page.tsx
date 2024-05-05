import TemplateSinglePage from "@/components/templates/containers/TemplateSinglePage";

import Body from "@/components/Body";
import Header from "@/components/Header";

import { createClient } from "@/utils/supabase/server";

export default async function page(props: { params: { id: string } }) {
  const supabase = createClient();

  // get template data

  let { data: workout, error } = await supabase
    .from("workouts")
    .select(
      "id, title, date, workout_exercises(*, target_sets(*), exercises(title)), workout_types(name, id), workout_body_parts( body_parts(name, id)), description"
    )
    .eq("id", props.params.id)
    .single();

  if (error) {
    throw error;
  }

  return (
    <>
      <Header
        title="template"
        backHref="/workouts/templates"
      />
      <Body>
        <TemplateSinglePage workout={workout} />
      </Body>
    </>
  );
}
