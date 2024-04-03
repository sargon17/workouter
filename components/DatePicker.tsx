"use client";

import { useState } from "react";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export function DatePicker({ field }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isMobile && (
        <div>
          <Button
            variant="outline"
            type="button"
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !field.value && "text-muted-foreground"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
          </Button>

          <div
            className={cn("", {
              hidden: !isOpen,
              block: isOpen,
            })}
          >
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={(e: any) => {
                field.onChange(e);
                setIsOpen(false);
              }}
              initialFocus
              weekStartsOn={1}
            />
          </div>
        </div>
      )}
    </>
  );
}
