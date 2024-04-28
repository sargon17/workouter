import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TemplatesPage() {
  return (
    <div>
      <div className="flex justify-between">
        <h1>Templates</h1>
        <Link href="/workouts/templates/create">
          <Button>Create New Template</Button>
        </Link>
      </div>
    </div>
  );
}
