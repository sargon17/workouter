import React from "react";

import Body from "@/components/Body";

import { createClient } from "@/utils/supabase/server";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return <Body>{children}</Body>;
}
