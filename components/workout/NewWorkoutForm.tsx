"use client";

import { createClient } from "@/utils/supabase/client";

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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useRouter } from "next/navigation";
import { DrawerClose, DrawerFooter } from "../ui/drawer";

const formSchema = z.object({
  title: z.string().nonempty(),
  date: z.date(),
});

export default function NewWorkoutForm({ user }: { user: any }) {
  const supabase = createClient();
  const router = useRouter();

  if (!user) {
    throw new Error("User not found");
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      date: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data, error } = await supabase
      .from("workouts")
      .insert([{ ...values, user_id: user.id, status_id: 1 }])
      .select();

    if (error) {
      console.error("error", error);
      toast("Error creating workout");
      return;
    } else {
      toast("Workout created");
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
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Back and Biceps"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter a title for the workout</FormDescription>
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
                <FormDescription>Select the date of the workout</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <DrawerFooter>
            <div className="flex w-full justify-end gap-2">
              <DrawerClose>
                <Button
                  variant="outline"
                  type="button"
                >
                  Cancel
                </Button>
              </DrawerClose>
              <DrawerClose>
                <Button type="submit">Submit</Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </form>
      </Form>
    </div>
  );
}
