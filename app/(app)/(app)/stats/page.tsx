import React from "react";

import Header from "@/components/Header";
import Body from "@/components/Body";
import WIPpage from "@/components/WIPpage";

import Statistics from "@/components/statistics/Statistics";

export default function page() {
  return (
    <>
      <Header
        title="Stats"
        backHref="/workouts"
        backText="Workouts"
      />
      <Body>
        <Statistics />
      </Body>
    </>
  );
}
