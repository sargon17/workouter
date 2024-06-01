"use client";

import React, { FC } from "react";

import { motion } from "framer-motion";

import ExerciseCardBody from "./ExerciseCardBody";
import ExerciseCardHeader from "./ExerciseCardHeader";
import NoExercisesCard from "./NoExercisesCard";

type ExerciseCardProps = {
  children: React.ReactNode | React.ReactNode[];
  layoutId?: string;
};

const ExerciseCard: FC<ExerciseCardProps> = (props: ExerciseCardProps) => {
  return (
    <motion.div
      className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3"
      layoutId={props.layoutId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {props.children}
    </motion.div>
  );
};

export { ExerciseCard, ExerciseCardHeader, ExerciseCardBody, NoExercisesCard };
