import React from "react";

import { cn } from "@/lib/utils";

import Link from "next/link";

interface Props {
  nav: {
    label: string;
    url: string;
  }[];
}

export default function HeaderSite(props: Props) {
  return (
    <div className="fixed w-full top-0 left-0 z-[10000] border-b border-b-stone-900 bg-stone-950/70 backdrop-blur-md text-stone-50">
      <div className={cn("grid grid-cols-3 gap-1 w-full p-2 max-w-screen-2xl h-14 mx-auto", {})}>
        <div className=" col-span-1 flex justify-start items-center w-full">
          <nav className="flex gap-6">
            {props.nav.map((item, index) => (
              <Link
                key={index}
                href={item.url}
                className="text-stone-400 hover:text-stone-100 transition-colors duration-100 ease-in-out font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className=" columns-1 col-start-2 flex justify-center items-center">
          <h1 className=" uppercase text-md font-bold">
            <Link href="/">Workouter</Link>
          </h1>
        </div>

        {/* <div className="w-full flex items-center justify-end">{props.actionBtn ? props.actionBtn : null}</div> */}
      </div>
    </div>
  );
}
