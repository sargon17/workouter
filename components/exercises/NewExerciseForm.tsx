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
  title: z.string().nonempty(),
});

export default function EditTargetSetForm({}: {}) {
  const supabase = createClient();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data, error } = await supabase
      .from("exercises")
      .insert([{ ...values }])
      .select();

    console.log("data", data);

    if (error) {
      console.error("error", error);
      toast("Error updating set");
      return;
    } else {
      toast("Set updated successfully");
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
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Squat"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Exercise Name</FormDescription>
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
