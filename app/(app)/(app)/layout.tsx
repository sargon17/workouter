import React from "react";

import MobileBottomNav from "@/components/MobileBottomNav";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function layout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <>
      {children}
      <MobileBottomNav />
    </>
  );
}
