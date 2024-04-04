import React from "react";
import Body from "./Body";

export default function Loading() {
  return (
    <Body>
      <div className="w-full h-full flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold uppercase">Workouter</h2>
          <p className="text-xs text-pretty text-stone-500">Wait a moment while the page loads...</p>
        </div>
      </div>
    </Body>
  );
}
