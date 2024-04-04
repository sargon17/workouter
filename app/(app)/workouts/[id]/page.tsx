import React from "react";

import { Plus } from "lucide-react";

import Header from "@/components/Header";

import { Button } from "@/components/ui/button";

import WorkoutDetails from "@/components/workout/WorkoutDetails";
import Body from "@/components/Body";

import NewWorkoutExerciseButton from "@/components/workout_exercises/NewWorkoutExerciseButton";

interface PageProps {
  params: {
    id: string;
  };
}

export default function page({ params }: PageProps) {
  return <WorkoutDetails id={params.id} />;
}
