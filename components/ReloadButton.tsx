"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { toast } from "sonner";

export default function ReloadButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        router.refresh();
        toast.success("Page Refreshed");
      }}
      variant={"ghost"}
      size={"sm"}
    >
      <RefreshCcw className="w-4 h-4" />
    </Button>
  );
}
