import React from "react";
import Image from "next/image";

import { ArrowRight } from "lucide-react";

import { Button } from "../ui/button";
import Link from "next/link";

import getConfig from "next/config";

export default function HomeHero() {
  const { publicRuntimeConfig } = getConfig();
  const version = publicRuntimeConfig.version;

  return (
    <div className="w-full h-[80lvh] flex justify-center mt-16">
      <div className=" w-full h-[80lvh] border border-stone-900 rounded-md flex justify-center items-center p-2 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_bg.jpg"
            alt="hero background"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            quality={100}
            priority
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
          <div className="flex justify-center  relative p-8">
            <Link
              href="/workouts"
              className="relative z-50 peer"
            >
              <Button className="flex gap-1">
                Start Progress Now
                <ArrowRight
                  size={16}
                  className="ml-2"
                />
              </Button>
            </Link>
            <div className="absolute top-1/2 left-1/2 h-[75px] border border-lime-300/20 rounded-xl overflow-hidden w-[250px] -translate-x-1/2 -translate-y-1/2 outline outline-4 outline-lime-300/10 outline-offset-2  peer-hover:border-lime-300/50 *:stroke-lime-300/10 peer-hover:*:stroke-lime-300/20 peer-hover:outline-lime-300/20  transition-all ease-out duration-700">
              <svg
                className="absolute top-0 left-0 w-full h-full"
                viewBox="0 0 500 100"
                xmlns="http://www.w3.org/2000/svg"
                // responsive
                preserveAspectRatio="none"
              >
                <pattern
                  id="pattern-3"
                  patternUnits="userSpaceOnUse"
                  width="8"
                  height="8"
                  // className="stroke-lime-300/20"
                >
                  <path d="M-1,1 l4,-4 M0,8 l8,-8 M6,10 l4,-4" />
                </pattern>

                <rect
                  x="0"
                  y="0"
                  width="500"
                  height="100"
                  fill="url(#pattern-3)"
                  strokeWidth={0}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
