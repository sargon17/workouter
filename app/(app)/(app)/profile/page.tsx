import React from "react";

import Header from "@/components/Header";
import Body from "@/components/Body";
import WIPpage from "@/components/WIPpage";

export default function page() {
  return (
    <>
      <Header
        title="Profile"
        backHref="/workouts"
        backText="Workouts"
      />
      <Body>
        <WIPpage />
      </Body>
    </>
  );
}
