"use client";
import { createClient } from "@/utils/supabase/client";
import { format } from "date-fns";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
import { DatePicker } from "../DatePicker";

import { DrawerClose } from "@/components/ui/drawer";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

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
  original_date: any;
}) {
  const supabase = createClient();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: original_title,
      date: original_date,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data, error } = await supabase
      .from("workouts")
      .update({ title: values.title, date: format(values.date, "yyyy-MM-dd") })
      .eq("id", id)
      .select();

    if (error) {
      console.error("error", error);
      toast("Error updating Workout");
      return;
    } else {
      toast("Workout updated successfully");
      form.reset();

      // refresh the page
      router.refresh();
    }
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
          <DrawerClose className="flex justify-end gap-2 w-full">
            <Button variant={"outline"}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DrawerClose>
        </form>
      </Form>
    </div>
  );
}
