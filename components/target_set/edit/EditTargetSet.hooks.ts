import { useEffect, useState } from "react";

import { createClient } from "@/utils/supabase/client";

export const useEditTargetSet = (set_id: string) => {
  const supabase = createClient();
  const [targetSetData, setTargetSetData] = useState<any>();
  useEffect(() => {
    const getTargetSet = async () => {
      const { data, error } = await supabase.from("target_sets").select("*").eq("id", set_id);

      if (error) {
        throw new Error("Error getting target set");
      }

      if (data) {
        setTargetSetData(data[0]);
      }
    };

    getTargetSet();
  }, []);

  return { targetSetData };
};
