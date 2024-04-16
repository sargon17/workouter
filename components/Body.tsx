import React from "react";

export default function Body({ children }: { children: React.ReactNode }): JSX.Element {
  return <div className="p-2 py-16 w-full overflow-scroll h-lvh">{children}</div>;
}
