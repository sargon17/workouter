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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const formSchema = z.object({
  title: z.string().nonempty(),
  body_part_id: z.number(),
});

export default function EditTargetSetForm({}: {}) {
  const [bodyParts, setBodyParts] = useState<any>([]);
  const supabase = createClient();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  useEffect(() => {
    getBodyParts();
  }, []);

  const getBodyParts = async () => {
    const { data, error } = await supabase.from("body_parts").select("*");

    if (error) {
      console.error("error", error);
      toast("Error fetching body parts");
      return;
    }

    if (data) {
      setBodyParts(data);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data, error } = await supabase
      .from("exercises")
      .insert([{ ...values }])
      .select();

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
                <div className="w-full">
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Squat"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="body_part_id"
              render={({ field }) => (
                <div className="w-full">
                  <FormItem className="w-full">
                    <FormLabel>Body Part</FormLabel>
                    <FormControl>
                      <Select
                        value={
                          form.getValues("body_part_id") ? form.getValues("body_part_id").toString() : ""
                        }
                        onValueChange={(value) => {
                          form.setValue("body_part_id", parseInt(value));
                        }}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select the body part" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Body Part</SelectLabel>
                            {bodyParts.map((bodyPart: any) => (
                              <SelectItem
                                key={bodyPart.id}
                                value={bodyPart.id.toString()}
                              >
                                {bodyPart.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
          </div>
          <DrawerFooter>
            <div className="flex gap-2 justify-end">
              <DrawerClose>
                <Button
                  type="button"
                  variant={"ghost"}
                  size={"sm"}
                >
                  Cancel
                </Button>
              </DrawerClose>
              <Button
                type="submit"
                size={"sm"}
              >
                Create
              </Button>
            </div>
          </DrawerFooter>
        </form>
      </Form>
    </div>
  );
}
