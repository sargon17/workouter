"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { createClient } from "@/utils/supabase/client";

import { StepCard, StepBody, StepFooter, StepHeader, Stepper } from "@/components/Steps";

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
import { on } from "events";

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

export default function TemplateCreatePage() {
  const [step, setStep] = useState(1);
  const [input, setInput] = useState<Input>({
    workout_type_id: null,
    body_parts_id: [],
    title: "",
    description: "",
  });

  const [workoutTypes, setWorkoutTypes] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);

  const supabase = createClient();

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const getWorkoutTypes = async () => {
    const { data, error } = await supabase.from("workout_types").select("*");
    if (error) return console.error("error", error);
    setWorkoutTypes(data);
  };

  const getBodyParts = async () => {
    const { data, error } = await supabase.from("body_parts").select("*");
    if (error) return console.error("error", error);
    setBodyParts(data);
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
    const wType: any = workoutTypes.find(
      (workoutType: WorkoutType) => workoutType.id === input.workout_type_id
    );

    const bParts: any = bodyParts.filter((bodyPart: BodyPart) => input.body_parts_id.includes(bodyPart.id));

    const title = `${bParts.map((bodyPart: BodyPart) => bodyPart.name).join(" & ")} ${wType.name} workout`;

    setInput((prev) => ({
      ...prev,
      title,
    }));
  };

  useEffect(() => {
    getWorkoutTypes();
    getBodyParts();
  }, []);

  useEffect(() => {
    if (input.workout_type_id && input.body_parts_id.length > 0) {
      createAutoTitle();
    }
  }, [input.body_parts_id || input.workout_type_id]);

  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      <div className="relative w-full">
        <div className=" absolute -top-10 left-1/2 -translate-x-1/2">
          <Stepper
            steps={3}
            activeStep={step - 1}
            onClick={(step) => setStep(step + 1)}
          />
        </div>
        {step === 1 && (
          <Step1
            workoutTypes={workoutTypes}
            value={input.workout_type_id}
            onChange={(value) => setInput({ ...input, workout_type_id: value })}
            onNext={handleNextStep}
          />
        )}
        {step === 2 && (
          <Step2
            bodyParts={bodyParts}
            value={input.body_parts_id}
            onChange={(value) => handleBodyPartChange(value)}
            onNext={handleNextStep}
          />
        )}
        {step === 3 && (
          <Step3
            title={input.title}
            description={input.description}
            onTitleChange={(value) => setInput({ ...input, title: value })}
            onDescriptionChange={(value) => setInput({ ...input, description: value })}
            onNext={handleNextStep}
          />
        )}
      </div>
    </div>
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
              <Chips
                key={bodyPart.id}
                onClick={() => props.onChange(bodyPart.id)}
                active={props.value.includes(bodyPart.id)}
              >
                {bodyPart.name}
              </Chips>
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

type ChipsProps = {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
};
const Chips = (props: ChipsProps) => {
  return (
    <div
      onClick={props.onClick}
      className={cn(
        "border rounded-3xl px-3 py-1  font-bold text-xs bg-stone-950 border-stone-800 text-stone-400 cursor-pointer transition-all duration-300 ease-in-out",
        {
          "border-lime-500/50 bg-lime-500/20 text-lime-300": props.active,
        }
      )}
    >
      {props.children}
    </div>
  );
};
