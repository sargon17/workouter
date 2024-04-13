import { ReactNode } from "react";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  actionBtn?: ReactNode;
  backHref?: string;
  backText?: string;
  title?: string;
  titleVariant?: "large" | "small";
}

export default async function Header(props: HeaderProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-3 w-full p-2 border-b dark:border-b-stone-900 dark:bg-stone-950/70 backdrop-blur-md dark:text-stone-50 fixed top-0 left-0 z-[10000] min-h-13",
        {
          "grid-rows-1": props.titleVariant === "small",
          "grid-rows-2": props.titleVariant === "large",
        }
      )}
    >
      <div className=" col-span-1 flex justify-start items-center">
        {props.backHref && (
          <Link href={props.backHref}>
            <Button
              variant="ghost"
              size={"sm"}
              className="flex items-center justify-center gap-1 text-xs text-stone-400 hover:text-stone-300 transition-colors duration-100 ease-in-out px-2"
            >
              <ChevronLeft className="h-4 w-4 flex-shrink-0" />
              {props.backText ? props.backText : "Back"}
            </Button>
          </Link>
        )}
      </div>
      {(props.titleVariant === "small" || props.titleVariant === undefined) && (
        <div className=" columns-1 col-start-2 flex justify-center items-center">
          <h1 className=" uppercase text-sm font-bold">{props.title ? props.title : "Workouter"}</h1>
        </div>
      )}
      <div className="w-full flex items-center justify-end">{props.actionBtn ? props.actionBtn : null}</div>
    </div>
  );
}
