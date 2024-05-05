"use client";

import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

import { StepCard, StepBody, StepFooter, StepHeader, Stepper } from "@/components/Steps";

import { Chip, handleColor } from "@/components/Chip";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

import { toast } from "sonner";

type WorkoutType = {
  id: number | null;
  name: string;
};

type BodyPart = {
  id: number | null;
  name: string;
};

type Input = {
  workout_type_id: WorkoutType["id"];
  body_parts_id: BodyPart["id"][];
  title: string;
  description: string;
};

type TemplateCreatePageProps = {
  workoutTypes: WorkoutType[];
  bodyParts: BodyPart[];
};
export default function TemplateCreatePage(props: TemplateCreatePageProps) {
  const [step, setStep] = useState(1);
  const [input, setInput] = useState<Input>({
    workout_type_id: null,
    body_parts_id: [],
    title: "",
    description: "",
  });

  const supabase = createClient();
  const router = useRouter();

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };
  const handleBodyPartChange = (value: number | null) => {
    // if value is already in the array, remove it
    if (input.body_parts_id.includes(value)) {
      setInput((prev) => ({
        ...prev,
        body_parts_id: prev.body_parts_id.filter((id) => id !== value),
      }));
    } else {
      setInput((prev) => ({
        ...prev,
        body_parts_id: [...prev.body_parts_id, value],
      }));
    }
  };

  const createAutoTitle = () => {
    const wType: any = props.workoutTypes.find(
      (workoutType: WorkoutType) => workoutType.id === input.workout_type_id
    );

    const bParts: any = props.bodyParts.filter((bodyPart: BodyPart) =>
      input.body_parts_id.includes(bodyPart.id)
    );

    const title = `${bParts.map((bodyPart: BodyPart) => bodyPart.name).join(" & ")} ${wType.name} workout`;

    setInput((prev) => ({
      ...prev,
      title,
    }));
  };

  const createTemplate = async () => {
    if (!input.title || !input.body_parts_id || !input.workout_type_id) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return console.error("No user found");

    const { data, error } = await supabase
      .from("workouts")
      .insert([
        {
          title: input.title,
          description: input.description,
          date: null,
          user_id: user.id,
          is_template: true,
          type_id: input.workout_type_id,
        },
      ])
      .select();

    if (error) {
      toast.error("Error creating workout template");
      throw new Error("Error creating workout template");
    }

    if (!data) {
      toast.error("Something went wrong, please try again.");
      throw new Error("No data returned");
    }

    const workout_id = data[0].id;

    const { data: bodyPartData, error: bodyPartError } = await supabase
      .from("workout_body_parts")
      .insert(
        input.body_parts_id.map((body_part_id) => ({
          workout_id,
          body_part_id,
        }))
      )
      .select();

    if (bodyPartError) {
      toast.error("Error creating workout body parts");
      throw new Error("Error creating workout body parts");
    }

    if (!bodyPartData) {
      toast.error("Something went wrong, please try again.");
      throw new Error("No data returned");
    }

    toast.success("Workout template created successfully");
    router.push(`/workouts/templates/${workout_id}`);
  };

  useEffect(() => {
    if (input.workout_type_id && input.body_parts_id.length > 0) {
      createAutoTitle();
    }
  }, [input.body_parts_id || input.workout_type_id]);

  return (
    <AnimatePresence mode="wait">
      <div className="flex flex-col justify-center items-center h-[80vh]">
        <div className="relative w-full flex justify-center">
          <motion.div
            className=" absolute -top-10 left-0 w-full flex justify-center items-center"
            layoutId="stepper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Stepper
              steps={3}
              activeStep={step - 1}
              onClick={(step) => setStep(step + 1)}
            />
          </motion.div>
          {step === 1 && (
            <motion.div
              layoutId="step1"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              key={1}
            >
              <Step1
                workoutTypes={props.workoutTypes}
                value={input.workout_type_id}
                onChange={(value) => setInput({ ...input, workout_type_id: value })}
                onNext={handleNextStep}
              />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              layoutId="step2"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              key={2}
            >
              <Step2
                bodyParts={props.bodyParts}
                value={input.body_parts_id}
                onChange={(value) => handleBodyPartChange(value)}
                onNext={handleNextStep}
              />
            </motion.div>
          )}
          {step === 3 && (
            <motion.div
              layoutId="step3"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              key={3}
            >
              <Step3
                title={input.title}
                description={input.description}
                onTitleChange={(value) => setInput({ ...input, title: value })}
                onDescriptionChange={(value) => setInput({ ...input, description: value })}
                onNext={createTemplate}
              />
            </motion.div>
          )}
        </div>
      </div>
    </AnimatePresence>
  );
}

type step1Props = {
  workoutTypes: WorkoutType[];
  value: WorkoutType["id"];
  onChange: (value: number) => void;
  onNext: () => void;
};

const Step1 = (props: step1Props) => {
  return (
    <StepCard>
      <StepHeader
        title="Workout Type"
        subtitle="Select a workout type to get started with creating a new template. This will help you categorize your workout templates."
      />
      <StepBody>
        <Select
          value={props.value === null ? "" : props.value.toString()}
          onValueChange={(value) => props.onChange(parseInt(value))}
        >
          <SelectTrigger className="w-full max-w-[280px] capitalize">
            <SelectValue placeholder="Select a workout type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Workout Type</SelectLabel>
              {props.workoutTypes.map((workoutType: WorkoutType) => {
                return (
                  <SelectItem
                    className=" capitalize"
                    value={workoutType.id === null ? "" : workoutType.id.toString()}
                  >
                    {workoutType.name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </StepBody>
      <StepFooter
        onNext={props.onNext}
        disabled={props.value === null}
      />
    </StepCard>
  );
};

type step2Props = {
  bodyParts: BodyPart[];
  value: BodyPart["id"][] | BodyPart["id"];
  onChange: (value: number | null) => void;
  onNext: () => void;
};
const Step2 = (props: step2Props) => {
  return (
    <StepCard>
      <StepHeader
        title="Body Parts"
        subtitle="Select the body parts that you want to target with this workout template."
      />
      <StepBody>
        <div className=" flex flex-wrap gap-1">
          {props.bodyParts.map((bodyPart: BodyPart) => {
            return (
              <Chip
                key={bodyPart.id}
                onClick={() => props.onChange(bodyPart.id)}
                color={handleColor({ id: bodyPart.id || 1 })}
                isActive={
                  Array.isArray(props.value) ? props.value.includes(bodyPart.id) : props.value === bodyPart.id
                }
              >
                {bodyPart.name}
              </Chip>
            );
          })}
        </div>
      </StepBody>
      <StepFooter
        onNext={props.onNext}
        disabled={props.value === null}
      />
    </StepCard>
  );
};

type step3Props = {
  title: string;
  description: string;

  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onNext: () => void;
};

const Step3 = (props: step3Props) => {
  return (
    <StepCard>
      <StepHeader
        title="Title & Description"
        subtitle="Give your workout template a title and a brief description."
      />
      <StepBody>
        <Input
          placeholder="Title"
          value={props.title}
          onChange={(e) => props.onTitleChange(e.target.value)}
          className="mb-1 capitalize"
        />
        <Textarea
          placeholder="Description"
          value={props.description}
          onChange={(e) => props.onDescriptionChange(e.target.value)}
        />
      </StepBody>
      <StepFooter onNext={() => props.onNext()} />
    </StepCard>
  );
};
