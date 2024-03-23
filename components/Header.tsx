import { createClient } from "@/utils/supabase/server";
import { ReactNode } from "react";

import { Button } from "./ui/button";
import Link from "next/link";

export default async function Header({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-between items-center w-full p-4 border-b-2 dark:border-b-stone-800 dark:text-stone-50 mb-4">
      <Link
        href={"/"}
        className="font-bold text-lg leading-none hover:text-stone-300 transition-colors duration-100 ease-in-out"
      >
        <h1 className=" uppercase">Workouter</h1>
      </Link>
      <div>{children}</div>
    </div>
  );
}
