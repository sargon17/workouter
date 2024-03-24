import React from "react";

export default function Body({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div
      className="p-4 mt-20 w-full overflow-auto"
      style={{
        height: "calc(100vh - 80px)",
      }}
    >
      {children}
    </div>
  );
}
