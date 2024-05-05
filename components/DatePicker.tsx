"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import dayjs from "dayjs";

import calendar from "dayjs/plugin/calendar";
export function DatePicker({ field }: { field: any }) {
  dayjs.extend(calendar);
  return (
    <>
      <Dialog>
        <div>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              type="button"
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !field.value && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {field.value ? (
                dayjs(new Date(field.value)).calendar(null, {
                  sameDay: "[Today]",
                  nextDay: "[Tomorrow]",
                  nextWeek: "dddd",
                  lastDay: "[Yesterday]",
                  lastWeek: "[Last] dddd",
                  sameElse: "DD/MM/YYYY",
                })
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select a date</DialogTitle>
            </DialogHeader>
            <div className="w-full flex justify-center items-center">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : new Date()}
                onSelect={(e: any) => {
                  field.onChange(e);
                }}
                initialFocus
                weekStartsOn={1}
              />
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
}
