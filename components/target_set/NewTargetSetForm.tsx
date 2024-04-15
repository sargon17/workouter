"use client";
import { useRef } from "react";
import { createClient } from "@/utils/supabase/client";

import { toast } from "sonner";

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

import { DrawerClose } from "@/components/ui/drawer";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { DrawerFormFooter } from "../DrawerFormFooter";

const formSchema = z.object({
  target_reps: z.number().int().positive(),
  target_weight: z.number().int().positive(),
});

export default function NewWorkoutForm({ workout_exercise_id }: { workout_exercise_id: any }) {
  const supabase = createClient();
  const router = useRouter();

  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      target_reps: undefined,
      target_weight: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data, error } = await supabase
      .from("target_sets")
      .insert([{ ...values, workout_exercise_id: workout_exercise_id }])
      .select();

    if (error) {
      console.error("error", error);
      toast("Error creating workout");
      return;
    } else {
      toast("Workout created");
      form.reset();

      closeBtnRef.current?.click();

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
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="target_reps"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Reps</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="8"
                      type="number"
                      required
                      onChange={(e) => {
                        form.setValue("target_reps", parseInt(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormDescription>Target reps</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="target_weight"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="100"
                      type="number"
                      required
                      onChange={(e) => {
                        form.setValue("target_weight", parseInt(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormDescription>Target weight in kg</FormDescription>
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
