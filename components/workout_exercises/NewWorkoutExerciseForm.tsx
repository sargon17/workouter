"use client";

import { useState, useRef, useEffect } from "react";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronsUpDown, Plus, Minus } from "lucide-react";
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
  CommandSeparator,
} from "@/components/ui/command";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

import { ScrollArea } from "@/components/ui/scroll-area";

import NewExerciseButton from "../exercises/NewExerciseButton";
import { ExerciseSuggestedSets } from "../sets/ExerciseSuggestedSets";

import { DrawerFormFooter } from "../DrawerFormFooter";

const FormSchema = z.object({
  exercise_id: z.number().int(),
});

export function NewWorkoutExerciseForm({ workout_id, exercises }: { workout_id: string; exercises: any }) {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [suggestedSets, setSuggestedSets] = useState([]) as any;
  const [isWithSuggested, setIsWithSuggested] = useState(false);

  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const supabase = createClient();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      exercise_id: undefined,
    },
  });

  useEffect(() => {
    if (!form.getValues("exercise_id")) return;
    setIsWithSuggested(false);
  }, [form.getValues("exercise_id")]);

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

      const workout_exercise_id = data[0].id;

      if (isWithSuggested && workout_exercise_id && suggestedSets.length > 0) {
        const { data, error } = await supabase
          .from("target_sets")
          .insert(
            suggestedSets.map((set: any) => ({
              target_reps: set.reps,
              target_weight: set.weight,
              workout_exercise_id: workout_exercise_id,
            }))
          )
          .select();

        if (error) {
          console.error("error", error);
          toast("Error creating suggested sets");
          return;
        } else {
          toast("Suggested sets created");
        }
      }

      form.reset();

      closeBtnRef.current?.click();

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
              {/* <FormControl> */}
              <Button
                variant="outline"
                className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsCommandOpen(!isCommandOpen);
                }}
              >
                {field.value
                  ? exercises.find((exercise: any) => exercise.id === field.value)?.title
                  : "Select a exercise..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
              {/* </FormControl> */}
              <Command
                className={cn(
                  "z-10 w-full max-h-[400px] overflow-x-hidden overflow-y-auto bg-stone-950 rounded-lg shadow-md border border-stone-900",
                  isCommandOpen ? "block" : "hidden"
                )}
              >
                <CommandInput placeholder="Search exercise..." />
                <CommandList className="overflow-x-hidden">
                  <CommandEmpty>
                    <div>
                      <p className="text-muted-foreground text-xs text-stone-500 w-[80%] mx-auto text-balance mb-4">
                        Not seeing the exercise you want? Create a new one.
                      </p>
                    </div>
                    <NewExerciseButton>
                      <Button
                        type="button"
                        size={"sm"}
                      >
                        Create New Exercise
                      </Button>
                    </NewExerciseButton>
                  </CommandEmpty>
                  <CommandGroup heading="Add new exercise">
                    <NewExerciseButton>
                      <Button
                        variant={"ghost"}
                        size={"sm"}
                        className="flex items-center gap-1 w-full justify-start text-left font-normal"
                      >
                        <Plus width={16} />
                        Create New Exercise
                      </Button>
                    </NewExerciseButton>
                  </CommandGroup>
                  <CommandSeparator />

                  <CommandGroup
                    heading="Exercises"
                    className="overflow-x-hidden overflow-y-auto"
                  >
                    <ScrollArea className="h-[200px] w-[full] pointer-events-auto">
                      {exercises.map((exercise: any) => (
                        <div
                          key={exercise.id}
                          onClick={() => {
                            form.setValue("exercise_id", exercise.id);
                            setIsCommandOpen(false);
                          }}
                        >
                          <CommandItem
                            value={exercise.title}
                            className={cn(
                              "flex items-center justify-between bg-stone-950 hover:bg-stone-800",
                              field.value === exercise.id && "bg-stone-800"
                            )}
                          >
                            {exercise.title}
                          </CommandItem>
                        </div>
                      ))}
                    </ScrollArea>
                  </CommandGroup>
                </CommandList>
              </Command>
              <FormMessage />
            </FormItem>
          )}
        />

        <ExerciseSuggestedSets
          exercise_id={form.getValues("exercise_id")}
          isWithSuggested={isWithSuggested}
          updateSuggestedSets={setSuggestedSets}
          suggestedSets={suggestedSets}
          onButtonClick={() => {
            setIsWithSuggested(!isWithSuggested);
          }}
        />
        <DrawerFormFooter closeRef={closeBtnRef} />
      </form>
    </Form>
  );
}
