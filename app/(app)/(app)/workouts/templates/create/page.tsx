import React from "react";

import TemplateCreatePage from "@/components/templates/containers/TemplateCreatePage";

import Body from "@/components/Body";
import Header from "@/components/Header";

import { createClient } from "@/utils/supabase/server";

export default async function page() {
  const supabase = createClient();

  const { data: workoutTypes, error: workoutTypesError } = await supabase.from("workout_types").select("*");

  const { data: bodyParts, error: bodyPartsError } = await supabase.from("body_parts").select("*");

  if (workoutTypesError) {
    throw workoutTypesError;
  }

  if (bodyPartsError) {
    throw bodyPartsError;
  }

  return (
    <>
      <Header
        title="templates"
        backHref="/workouts/templates"
      />
      <Body>
        <TemplateCreatePage
          workoutTypes={workoutTypes}
          bodyParts={bodyParts}
        />
      </Body>
    </>
  );
}
