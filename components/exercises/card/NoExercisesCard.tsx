import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ExerciseCardProps = {
  pulse?: boolean;
};

const NoExerciseCard = (props: ExerciseCardProps) => {
  return (
    <motion.div
      className={cn("w-full bg-stone-900 border border-stone-800 rounded-xl p-3", {
        "animate-pulse": props.pulse,
      })}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    ></motion.div>
  );
};

export default NoExerciseCard;
