"use client";
import React from "react";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";

export default function ReactSmoothScroll({ children }: { children: React.ReactNode }) {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
    console.log(scroll);
  });

  return (
    <>
      <ReactLenis
        root
        options={
          {
            //   lerp: 0.05,
            //   smoothWheel: true,
            //   normalizeWheel: true,
            //   wheelMultiplier: 1.5,
          }
        }
      >
        {children}
      </ReactLenis>
    </>
  );
}
