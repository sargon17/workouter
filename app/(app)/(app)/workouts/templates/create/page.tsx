import React from "react";

import TemplateCreatePage from "@/components/templates/containers/TemplateCreatePage";

import Body from "@/components/Body";
import Header from "@/components/Header";

export default function page() {
  return (
    <>
      <Header
        title="templates"
        backHref="/workouts"
      />
      <Body>
        <TemplateCreatePage />
      </Body>
    </>
  );
}
