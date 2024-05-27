import React from "react";
import Image from "next/image";

import { ArrowRight } from "lucide-react";

import { Button } from "../ui/button";
import Link from "next/link";

import BG from "@/public/images/hero_bg.jpg";

interface Props {
  content: {
    id: string;
    blockType: string;
    version: string;
    title: string;
    subtitle: string;
    ctaLabel: string;
  };
}

export default function HomeHero(props: Props) {
  return (
    <div className="w-full h-[90lvh] flex justify-center mb-8">
      <div className=" w-full h-[90lvh] border border-stone-900 rounded-md flex justify-center items-center p-2 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={BG}
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
                <span>{props.content.version}</span>
              </div>
            </div>
          </div>
          <h3 className=" text-2xl md:text-3xl lg:text-6xl text-center font-bold max-w-[80%] mx-auto text-pretty text-transparent bg-clip-text bg-gradient-to-br from-stone-300 via-stone-50 to-stone-500 mb-[0.25em]">
            {props.content.title}
          </h3>
          <p className=" text-sm lg:text-lg text-center font-medium text-balance max-w-[80%] mx-auto mb-[0.5em]">
            {props.content.subtitle}
          </p>
          <div className="flex justify-center">
            <Link
              href="/workouts"
              className="relative"
            >
              <Button className="flex gap-1">
                {props.content.ctaLabel}
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
