import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WIPpage() {
  return (
    <div className="inset h-full flex justify-center items-center">
      <div className="p-4 text-center">
        <h1 className="text-6xl font-bold mb-10">
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-stone-300 via-stone-50 to-stone-500">
            Work in Progress
          </span>{" "}
          🚧
        </h1>
        <p className="mt-2 text-pretty text-xs max-w-[80%] m-auto">
          Sorry buddy, this page is not ready yet, please check in few days
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="/workouts">
            <Button className="flex gap-1">Back to Workouts</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
