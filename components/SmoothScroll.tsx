"use client";
import React from "react";
import { ReactLenis, useLenis } from "lenis/react";

export default function ReactSmoothScroll({ children }: { children: React.ReactNode }) {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
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
