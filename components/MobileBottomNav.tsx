import React from "react";
import Link from "next/link";

import { User, TrendingUp, Dumbbell } from "lucide-react";

import { Button } from "./ui/button";

export default function MobileBottomNav() {
  return (
    <div className="fixed bottom-0 left-0 w-full">
      <div className="border rounded-xl dark:border-stone-900 dark:bg-stone-950/70 backdrop-blur-md dark:text-stone-50 flex p-1 w-[98vw] mx-auto mb-6">
        <MobileBottomNavItem href={"/workouts"}>
          <Dumbbell className="h-4 w-4" />
          Workouts
        </MobileBottomNavItem>
        <MobileBottomNavItem href={"/stats"}>
          <TrendingUp className="h-4 w-4" />
          Stats
        </MobileBottomNavItem>
        <MobileBottomNavItem href={"/profile"}>
          <User className="h-4 w-4" />
          Profile
        </MobileBottomNavItem>
      </div>
    </div>
  );
}

const MobileBottomNavItem = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link
      href={href}
      className="w-full flex justify-center items-center"
    >
      <Button
        className="flex gap-2 w-full justify-center items-center"
        variant={"ghost"}
      >
        {children}
      </Button>
    </Link>
  );
};
