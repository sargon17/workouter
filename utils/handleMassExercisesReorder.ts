import { toast } from "sonner";

const handleMassExercisesReorder = async (exercises: any, supabase: any) => {
  const updated = exercises.map((exercise: any, index: number) => {
    return { ...exercise, order: index + 1 };
  });

  const UpdatedToSupabase = updated.map((exercise: any) => {
    return {
      id: exercise.id,
      order: exercise.order,
    };
  });

  const { data, error } = await supabase.from("workout_exercises").upsert(UpdatedToSupabase);

  if (error) {
    console.error(error);
    toast.error("Failed to reorder exercises.");
  }

  toast.success("Exercises reordered successfully");
  return updated;
};

export default handleMassExercisesReorder;
