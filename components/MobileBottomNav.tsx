"use client";
import React from "react";
import Link from "next/link";

import { User, TrendingUp, Dumbbell, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

import { usePathname } from "next/navigation";

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 w-full">
      <div className="border rounded-xl dark:border-stone-900 dark:bg-stone-950/70 backdrop-blur-md dark:text-stone-50 flex p-1 w-[98vw] mx-auto pb-6 gap-1">
        <MobileBottomNavItem
          href={"/workouts"}
          current={pathname?.includes("/workouts")}
        >
          <Dumbbell className="h-4 w-4 flex-shrink-0" />
          Workouts
        </MobileBottomNavItem>
        <MobileBottomNavItem
          href={"/stats"}
          current={pathname?.includes("/stats")}
        >
          <TrendingUp className="h-4 w-4 flex-shrink-0" />
          Stats
        </MobileBottomNavItem>
        <MobileBottomNavItem
          href={"/profile"}
          current={pathname?.includes("/profile")}
        >
          <User className="h-4 w-4 flex-shrink-0" />
          Profile
        </MobileBottomNavItem>
        <MobileBottomNavItem
          href={"/settings"}
          current={pathname?.includes("/settings")}
        >
          <Settings className="h-4 w-4 flex-shrink-0" />
          Settings
        </MobileBottomNavItem>
      </div>
    </div>
  );
}

const MobileBottomNavItem = ({
  href,
  children,
  current = false,
}: {
  href: string;
  children: React.ReactNode;
  current?: boolean;
}) => {
  return (
    <Link
      href={href}
      className="w-full flex justify-center items-center h-full"
    >
      <Button
        className={cn(
          "flex flex-col gap-1 w-full justify-center items-center text-stone-400 text-xs h-full",
          {
            "text-stone-50 ": current,
          }
        )}
        variant={"ghost"}
      >
        {children}
      </Button>
    </Link>
  );
};
