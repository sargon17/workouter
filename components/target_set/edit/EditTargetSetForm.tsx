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

import { useEditTargetSet } from "./EditTargetSet.hooks";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { DrawerFormFooter } from "../../DrawerFormFooter";
import { useEffect, useRef } from "react";

const formSchema = z.object({
  target_reps: z.number().int().positive(),
  target_weight: z.number().int().positive(),
});

export default function EditTargetSetForm({ set_id }: { set_id: any }) {
  const supabase = createClient();
  const router = useRouter();

  const { targetSetData } = useEditTargetSet(set_id);

  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      target_reps: targetSetData?.target_reps,
      target_weight: targetSetData?.target_weight,
    },
  });

  useEffect(() => {
    if (targetSetData) {
      form.setValue("target_reps", targetSetData.target_reps);
      form.setValue("target_weight", targetSetData.target_weight);
    }
  }, [targetSetData]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data, error } = await supabase
      .from("target_sets")
      .update({ ...values })
      .eq("id", set_id)
      .select();

    if (error) {
      console.error("error", error);
      toast("Error updating target set");
      return;
    } else {
      toast("Target set updated successfully");
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
                      value={field.value}
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
                      value={form.watch("target_weight")}
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
