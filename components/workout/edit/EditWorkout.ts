import { z } from "zod";
import { SupabaseClient } from "@supabase/supabase-js";

import { format } from "date-fns";

const formSchema = z.object({
  title: z.string().nonempty(),
  date: z.date(),
});

interface Props {
  values: z.infer<typeof formSchema>;
  id: string;
  supabase: SupabaseClient<any, "public", any>;
}

const handleSubmit = async ({ values, id, supabase }: Props) => {
  const { data, error } = await supabase
    .from("workouts")
    .update({ title: values.title, date: format(values.date, "yyyy-MM-dd") })
    .eq("id", id)
    .select();

  if (error) {
    throw new Error("Error updating workout");
  }
};

export { handleSubmit };
