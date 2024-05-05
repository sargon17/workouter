import { Chip, handleColor } from "@/components/Chip";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const TemplateList = (props: { children: React.ReactNode | React.ReactNode[] }) => {
  return <div className="flex flex-col gap-2">{props.children}</div>;
};

const TemplateItem = (props: { workout: any }) => {
  console.log(props.workout);
  return (
    <div className="flex justify-between items-start gap-4  p-2 border border-stone-800 bg-stone-900 rounded-xl">
      <div>
        <div className=" mb-4">
          <h2 className=" text-stone-300 font-bold text-lg antialiased capitalize ">{props.workout.title}</h2>
          <p className=" text-stone-500 text-xs antialiased">{props.workout.description}</p>
        </div>
        <div className="flex gap-1">
          {props.workout.workout_body_parts.map((bp: any) => (
            <Chip
              key={bp.body_parts.id}
              color={handleColor({ id: bp.body_parts.id })}
              isActive
              size="xs"
            >
              {bp.body_parts.name}
            </Chip>
          ))}
        </div>
      </div>
      <Link href={`/workouts/templates/${props.workout.id}`}>
        <Button variant={"secondary"}>View</Button>
      </Link>
    </div>
  );
};

export { TemplateList, TemplateItem };
