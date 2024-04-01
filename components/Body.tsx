import React from "react";

export default function Body({ children }: { children: React.ReactNode }): JSX.Element {
  return <div className="p-4 py-20 w-full overflow-scroll h-lvh">{children}</div>;
}
