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

import { DrawerClose } from "@/components/ui/drawer";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  target_reps: z.number().int().positive(),
  target_weight: z.number().int().positive(),
});

export default function EditTargetSetForm({
  set_id,
  original_target_reps,
  original_target_weight,
}: {
  set_id: any;
  original_target_reps: number;
  original_target_weight: number;
}) {
  const supabase = createClient();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      target_reps: original_target_reps,
      target_weight: original_target_weight,
    },
  });

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
                      value={form.watch("target_reps")}
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
          <DrawerClose>
            <Button type="submit">Submit</Button>
          </DrawerClose>
        </form>
      </Form>
    </div>
  );
}
