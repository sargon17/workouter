import React from "react";

import { Button } from "@/components/ui/button";
import { Text } from "lucide-react";
import Link from "next/link";

export default function Settings() {
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold">General</h2>
        <div>
          <Link href="/release-notes">
            <Button
              variant={"ghost"}
              className="w-full flex items-center justify-start gap-2"
            >
              <Text className="w-4 h-4" />
              <span>Workouter Changelogs</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
