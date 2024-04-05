"use client";
import { useRef } from "react";
import { createClient } from "@/utils/supabase/client";

import { handleSubmit } from "./EditWorkout";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DatePicker } from "../../DatePicker";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

import { DrawerFormFooter } from "../../DrawerFormFooter";

const formSchema = z.object({
  title: z.string().nonempty(),
  date: z.date(),
});

export default function EditWorkoutForm({
  id,
  original_title,
  original_date,
}: {
  id: any;
  original_title: string;
  original_date: Date;
}) {
  const supabase = createClient();
  const router = useRouter();

  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: original_title,
      date: new Date(original_date),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await handleSubmit({ values, id, supabase });
      toast("Workout updated");
    } catch (error) {
      console.error("error", error);
      toast("Error updating workout");
    }

    form.reset();
    closeBtnRef.current?.click();
    router.refresh();
  }

  return (
    <div className="p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div
            className="
          md:flex md:gap-2
          "
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Biceps"
                      onChange={(e) => {
                        form.setValue("title", e.target.value);
                      }}
                      value={field.value}
                    />
                  </FormControl>
                  <FormDescription>Title</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <div>
                      <DatePicker field={field} />
                    </div>
                  </FormControl>
                  <FormDescription>This is the workout date</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DrawerFormFooter closeRef={closeBtnRef} />
        </form>
      </Form>
    </div>
  );
}
