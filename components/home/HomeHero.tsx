import React from "react";

import { ArrowRight } from "lucide-react";

import { Button } from "../ui/button";
import Link from "next/link";

export default function HomeHero() {
  const version = "v0.0.1";

  return (
    <div className="w-full h-[80lvh] flex justify-center">
      <div className=" w-full h-[80lvh] border border-stone-900 rounded-md flex justify-center items-center p-2 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_bg.png"
            alt="hero background"
            className="w-full h-full object-cover z-0"
          />
          <div
            className="absolute inset-2 rounded bg-stone-950/50 backdrop-blur-md
            z-10 after:absolute after:inset-0 after:rounded after:bg-gradient-to-b after:from-stone-950 after:to-stone-950/00
          "
          ></div>
        </div>
        <div className="relative z-10">
          <div className="flex justify-center items-center">
            <div className="w-min relative">
              <h2 className="text-sm md:text-base text-center mx-auto uppercase font-black text-stone-300 ">
                Workouter
              </h2>
              <div
                className=" bg-teal-500/30 border border-teal-500 rounded-full w-min px-2 text-xs text-teal-200 font-semibold absolute top-0 right-0 backdrop-blur-sm backdrop-brightness-150 translate-x-1/2 -translate-y-1/3 rotate-12 "
                style={{
                  // shadow
                  boxShadow: "0 0 12px 5px rgba(153, 246, 228, 0.1), 0 0 8px 3px rgba(153, 246, 228, 0.1)",
                }}
              >
                <span>{version}</span>
              </div>
            </div>
          </div>
          <h3 className=" text-2xl md:text-3xl lg:text-6xl text-center font-bold max-w-[80%] mx-auto text-pretty text-transparent bg-clip-text bg-gradient-to-br from-stone-300 via-stone-50 to-stone-500">
            Log your workouts never been easier
          </h3>
          <p className=" text-sm lg:text-lg text-center font-medium mt-4 text-balance max-w-[80%] mx-auto">
            Track your progress, set goals, and more... now it's easy
          </p>
          <div className="flex justify-center mt-8">
            <Link href="/workouts">
              <Button className="flex gap-1 transition-all hover:gap-4 hover:translate-x-1.5 hover:origin-left">
                Start Progress Now
                <ArrowRight
                  size={16}
                  className="ml-2"
                />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
