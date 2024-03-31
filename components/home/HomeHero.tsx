import React from "react";

import { ArrowRight } from "lucide-react";

import { Button } from "../ui/button";
import Link from "next/link";

export default function HomeHero() {
  return (
    <div className="w-full h-[80lvh] flex justify-center p-1">
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
          <h2 className=" text-2xl md:text-3xl lg:text-6xl text-center font-bold max-w-[80%] mx-auto text-pretty">
            Log your workouts never been easier
          </h2>
          <p className=" text-sm lg:text-lg text-center font-medium mt-4">
            Track your progress, set goals, and more
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
