"use client";
import { Button } from "./ui/button";

import { cn } from "@/lib/utils";

type StepCardProps = {
  children: React.ReactNode | React.ReactNode[];
};

type StepFooterProps = {
  onNext: () => void;
  disabled?: boolean;
};

const StepCard = (props: StepCardProps) => {
  return (
    <div className="w-full max-w-screen-sm bg-stone-900 border border-stone-800 rounded-xl p-4">
      {props.children}
    </div>
  );
};

const StepHeader = (props: { title: string; subtitle: string }) => {
  return (
    <>
      <h2 className=" font-semibold text-2xl">{props.title}</h2>
      <p className=" text-xs text-stone-500">{props.subtitle}</p>
    </>
  );
};

const StepFooter = (props: StepFooterProps) => {
  return (
    <div>
      <Button
        onClick={props.onNext}
        disabled={props.disabled}
      >
        Next
      </Button>
    </div>
  );
};

const StepBody = (props: { children: React.ReactNode }) => {
  return <div className="my-6">{props.children}</div>;
};

type StepperProps = {
  steps: number;
  activeStep: number;
  onClick: (step: number) => void;
};

const Stepper = (props: StepperProps) => {
  return (
    <div className="flex gap-4">
      {Array.from({ length: props.steps }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center bg-stone-900 border border-stone-800 cursor-pointer transition-all duration-300 ease-in-out",
            {
              "bg-lime-500/20 border-lime-500": props.activeStep === index,
            }
          )}
          onClick={() => props.onClick(index)}
        >
          <span
            className={cn("text-white font-bold", {
              "text-lime-100": props.activeStep === index,
            })}
          >
            {index + 1}
          </span>
        </div>
      ))}
    </div>
  );
};

export { StepCard, StepHeader, StepFooter, StepBody, Stepper };
