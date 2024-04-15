import { toast } from "sonner";

const handleDelete = async (workout_id: string, supabase: any, router: any) => {
  const { error } = await supabase.from("workouts").delete().eq("id", workout_id);

  if (error) {
    toast("Something went wrong while deleting the workout");
  } else {
    toast("Workout deleted successfully");
    router.refresh();
  }
};

export { handleDelete };
