import React from "react";

import TemplatesPage from "@/components/templates/containers/TemplatesPage";

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
        <TemplatesPage />
      </Body>
    </>
  );
}
