"use client";
import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => router.back()}
    >
      <ChevronLeft className="h-4 w-4" />
    </Button>
  );
}
