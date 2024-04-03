import React from "react";

import MobileBottomNav from "@/components/MobileBottomNav";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <MobileBottomNav />
    </>
  );
}