"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { DrawerClose } from "../ui/drawer";

import NewExerciseButton from "../exercises/NewExerciseButton";

const FormSchema = z.object({
  exercise_id: z.number().int(),
});

export function NewWorkoutExerciseForm({ workout_id, exercises }: { workout_id: string; exercises: any }) {
  const supabase = createClient();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      exercise_id: undefined,
    },
  });

  async function onSubmit() {
    const { data, error } = await supabase
      .from("workout_exercises")
      .insert([{ workout_id, exercise_id: form.getValues("exercise_id") }])
      .select();

    if (error) {
      console.error("error", error);
      toast("Error creating workout exercise");
      return;
    } else {
      toast("Workout exercise created");
      form.reset();
      router.refresh();
    }
  }

  if (!exercises) {
    return <div>Loading...</div>;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-4"
      >
        <FormField
          control={form.control}
          name="exercise_id"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Exercise</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn("w-[200px] justify-between", !field.value && "text-muted-foreground")}
                    >
                      {field.value
                        ? exercises.find((exercise: any) => exercise.id === field.value)?.title
                        : "Select a exercise..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search exercise..." />
                    <CommandList>
                      <CommandEmpty>
                        <NewExerciseButton>
                          <Button>Create New Exercise</Button>
                        </NewExerciseButton>
                      </CommandEmpty>
                      <CommandGroup>
                        {exercises.map((exercise: any) => (
                          <div
                            key={exercise.id}
                            onClick={() => form.setValue("exercise_id", exercise.id)}
                          >
                            <CommandItem value={exercise.title}>{exercise.title}</CommandItem>
                          </div>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <DrawerClose>
          <Button type="submit">Submit</Button>
        </DrawerClose>
      </form>
    </Form>
  );
}
