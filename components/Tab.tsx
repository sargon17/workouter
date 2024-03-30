import Link from "next/link";
import { cn } from "@/lib/utils";
import React from "react";

const Tab = React.forwardRef(
  ({ children }: { children: React.ReactNode }, ref: React.Ref<HTMLDivElement>) => {
    return (
      <div
        ref={ref}
        className="flex w-fit p-1 rounded-md dark:bg-stone-900"
      >
        {children}
      </div>
    );
  }
);

const TabItem = ({
  children,
  active,
  href,
}: {
  children: React.ReactNode;
  href: string;
  active: boolean;
}) => {
  return (
    <Link
      className={cn(
        "py-1 px-2 font-medium text-sm rounded text-stone-400 min-w-28 flex justify-center items-center",
        {
          "bg-stone-950": active,
          "text-stone-50": active,
        }
      )}
      href={href}
    >
      {children}
    </Link>
  );
};

export { Tab, TabItem };
