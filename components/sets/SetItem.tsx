import React from "react";

export default function SetItem({
  children,
  id,
  reps,
  weight,
}: {
  children: React.ReactNode;
  id: string;
  reps: number;
  weight: number;
}) {
  return <div>{children}</div>;
}
