"use client";

import { createClient } from "@/utils/supabase/client";
import { useRef } from "react";

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

import { DrawerFormFooter } from "../DrawerFormFooter";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  reps: z.number().int().positive(),
  weight: z.number().int().positive(),
});

export default function EditTargetSetForm({
  set_id,
  original_reps,
  original_weight,
}: {
  set_id: any;
  original_reps: number;
  original_weight: number;
}) {
  const supabase = createClient();
  const router = useRouter();

  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reps: original_reps,
      weight: original_weight,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data, error } = await supabase
      .from("sets")
      .update({ ...values })
      .eq("id", set_id)
      .select();

    if (error) {
      console.error("error", error);
      toast("Error updating set");
      return;
    } else {
      toast("Set updated successfully");
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
              name="reps"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Reps</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="8"
                      type="number"
                      required
                      onChange={(e) => {
                        form.setValue("reps", parseInt(e.target.value));
                      }}
                      value={form.watch("reps")}
                    />
                  </FormControl>
                  <FormDescription>Reps</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="100"
                      type="number"
                      required
                      onChange={(e) => {
                        form.setValue("weight", parseInt(e.target.value));
                      }}
                      value={form.watch("weight")}
                    />
                  </FormControl>
                  <FormDescription>Weight in kg</FormDescription>
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
