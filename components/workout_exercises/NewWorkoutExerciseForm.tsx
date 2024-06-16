"use client";

import { useState, useRef, useMemo, useEffect } from "react";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";

import { toast } from "sonner";

import { ScrollArea } from "@/components/ui/scroll-area";

import NewExerciseButton from "../exercises/NewExerciseButton";
import { ExerciseSuggestedSets } from "../sets/ExerciseSuggestedSets";

import { DrawerFormFooter } from "../DrawerFormFooter";

import { Chip, handleColor } from "../Chip";

type Exercise = {
  id: number;
  title: string;
  body_part_id: number;
  body_parts: {
    id: number;
    name: string;
  };
};

type NewWorkoutExerciseFormProps = {
  workout_id: string;
  exercises: Exercise[];
};

export function NewWorkoutExerciseForm(props: NewWorkoutExerciseFormProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredExercises, setFilteredExercises] = useState<any>(props.exercises);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [bodyPartsFilter, setBodyPartsFilter] = useState<any>([]);

  // const [isCommandOpen, setIsCommandOpen] = useState(true);
  const [suggestedSets, setSuggestedSets] = useState([]) as any;
  const [isWithSuggested, setIsWithSuggested] = useState(false);

  // console.log("props.exercises", props.exercises);

  const bodyPartsFilterList = useMemo(() => {
    // return filtered unique Body Parts { id: number; name: string; }
    return props.exercises
      .map((exercise: any) => exercise.body_parts)
      .flat()
      .filter(
        (bodyPart: any, index: number, self: any) =>
          index === self.findIndex((t: any) => t.id === bodyPart.id)
      );
  }, [props.exercises]);

  useEffect(() => {
    handleFilter(inputValue);
  }, [bodyPartsFilter]);

  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const supabase = createClient();
  const router = useRouter();

  async function handleSubmit() {
    if (!selectedExercise) {
      toast.error("Please select an exercise");
      return;
    }

    const othersExercises = await getOthersExercises(props.workout_id);

    let order = 1;

    if (othersExercises) {
      order = othersExercises.length + 1;
    }

    const { data, error } = await supabase
      .from("workout_exercises")
      .insert([{ workout_id: props.workout_id, exercise_id: selectedExercise?.id, order }])
      .select();

    if (error) {
      console.error("error", error);
      toast.error("Error creating workout exercise");
      return;
    }

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
        toast.error("Error creating suggested sets");
        return;
      }
    }

    toast.success("Exercise added to workout successfully");
    closeBtnRef.current?.click();
    router.refresh();
  }

  const getOthersExercises = async (workout_id: string) => {
    const { data, error } = await supabase.from("workout_exercises").select("*").eq("workout_id", workout_id);

    if (error) {
      console.error("error", error);
      toast.error("Error fetching exercises");
      return;
    }

    return data;
  };

  const handleFilter = (value: string) => {
    setInputValue(value);

    let filteredExercises = props.exercises.filter((exercise: Exercise) =>
      exercise.title.toLowerCase().includes(value.toLowerCase())
    );

    if (bodyPartsFilter.length > 0) {
      filteredExercises = filteredExercises.filter((exercise: Exercise) =>
        bodyPartsFilter.includes(exercise.body_parts.id)
      );
    }

    setFilteredExercises(filteredExercises.sort((a: any, b: any) => a.order - b.order));
  };

  const handleItemClick = (exercise: Exercise) => {
    setSelectedExercise(exercise);
  };

  if (!props.exercises) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" px-4">
      {!selectedExercise ? (
        <>
          <div>
            <Input
              type="text"
              placeholder="Search for an exercise..."
              onChange={(e) => {
                handleFilter(e.target.value);
              }}
              value={inputValue}
            />
            <div className="flex gap-2 mt-2">
              {bodyPartsFilterList.map((bodyPart: any) => (
                <Chip
                  key={bodyPart}
                  color={handleColor({ id: bodyPart.id })}
                  size="xs"
                  isActive={bodyPartsFilter.includes(bodyPart.id)}
                  onClick={() => {
                    if (bodyPartsFilter.includes(bodyPart.id)) {
                      setBodyPartsFilter((prev: any) => prev.filter((id: any) => id !== bodyPart.id));
                    } else {
                      setBodyPartsFilter((prev: any) => [...prev, bodyPart.id]);
                    }
                  }}
                >
                  {bodyPart.name}
                </Chip>
              ))}
            </div>
          </div>

          <div className="mt-2">
            {filteredExercises.length !== 0 ? (
              <ScrollArea className="flex flex-col gap-2 h-[60vh]">
                {filteredExercises.map((exercise: Exercise) => (
                  <div
                    key={exercise.id}
                    className="pl-2 py-2 text-stone-400 cursor-pointer hover:bg-stone-900 hover:text-stone-100 transition-all duration-300 ease-in-out rounded-md"
                    onClick={() => handleItemClick(exercise)}
                  >
                    <div className="flex justify-start items-center gap-2">
                      <h3 className="">{exercise.title}</h3>
                      <Chip
                        isActive
                        color={handleColor({ id: exercise.body_part_id })}
                        size="xs"
                      >
                        {exercise.body_parts.name}
                      </Chip>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            ) : (
              <div className="h-[60vh] flex justify-center items-center flex-col">
                <p className="text-center text-xs text-stone-500">
                  Nothing you really like? Try creating a new exercise
                </p>
                <NewExerciseButton>
                  <Button
                    variant="default"
                    size="sm"
                    className="mt-2"
                  >
                    Create New Exercise
                  </Button>
                </NewExerciseButton>
              </div>
            )}
          </div>
        </>
      ) : (
        <div>
          <div className=" mb-8">
            <div className="flex items-center gap-2 mb-2">
              <h2 className=" text-2xl font-bold">{selectedExercise.title}</h2>
              <Chip
                isActive
                color={handleColor({ id: selectedExercise.body_part_id })}
                size="xs"
              >
                {selectedExercise.body_parts.name}
              </Chip>
            </div>
            <p className=" text-stone-400 text-sm">
              Plan your sets and reps for this exercise. You can also add suggested sets for this
            </p>
          </div>
          <ExerciseSuggestedSets
            exercise_id={selectedExercise.id}
            isWithSuggested={isWithSuggested}
            updateSuggestedSets={setSuggestedSets}
            suggestedSets={suggestedSets}
            onButtonClick={() => {
              setIsWithSuggested(!isWithSuggested);
            }}
          />
        </div>
      )}
      <DrawerFormFooter
        closeRef={closeBtnRef}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
