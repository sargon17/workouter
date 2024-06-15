"use client";

import React from "react";

import { motion } from "framer-motion";

import ExerciseCardBody from "./ExerciseCardBody";
import ExerciseCardHeader from "./ExerciseCardHeader";
import NoExercisesCard from "./NoExercisesCard";

type ExerciseCardProps = {
  children: React.ReactNode | React.ReactNode[];
  layoutId?: string;
};

const ExerciseCard = (props: ExerciseCardProps) => {
  return (
    <motion.div
      className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3"
      layoutId={props.layoutId}
      // key={props.layoutId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ scale: 0.95, filter: "blur(5px)", opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {props.children}
    </motion.div>
  );
};

export { ExerciseCard, ExerciseCardHeader, ExerciseCardBody, NoExercisesCard };
