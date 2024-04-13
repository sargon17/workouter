import React from "react";

import Body from "@/components/Body";

import { createClient } from "@/utils/supabase/server";

import Header from "@/components/Header";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <>
      <Header
        backHref={`/workouts/${params.id}`}
        title="concentration"
        backText="Workout Details"
      />
      <Body>{children}</Body>
    </>
  );
}
