import { StatusType } from "@/types/workout";

const conditionalStyles = {
  planed: "lime",
  "in progress": "cyan",
  done: "purple",
  canceled: "red",
  skipped: "red",
  "to plan": "orange",
};

export const getStatusColor = (status: StatusType["name"]) => {
  return conditionalStyles[status] as any;
};
