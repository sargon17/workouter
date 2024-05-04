import { cn } from "@/lib/utils";

type ChipProps = {
  children: React.ReactNode;
  onClick?: () => void;
  //   variant?: "default" | "primary";
  color?:
    | "slate"
    | "gray"
    | "zinc"
    | "neutral"
    | "stone"
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "emerald"
    | "teal"
    | "cyan"
    | "sky"
    | "blue"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose";
  size?: "xs" | "sm";
  isActive?: boolean;
};
const Chip = (props: ChipProps) => {
  const clr = props.color || "stone";

  return (
    <div
      onClick={props.onClick}
      className={cn(
        "border rounded-3xl px-3 py-1  font-bold text-xs bg-stone-950 border-stone-800 text-stone-400 cursor-pointer transition-all duration-300 ease-in-out",
        {
          "border-blue-500/50 bg-blue-500/20 text-blue-300": clr === "blue" && props.isActive,
          "border-red-500/50 bg-red-500/20 text-red-300": clr === "red" && props.isActive,
          "border-yellow-500/50 bg-yellow-500/20 text-yellow-300": clr === "yellow" && props.isActive,
          "border-green-500/50 bg-green-500/20 text-green-300": clr === "green" && props.isActive,
          "border-teal-500/50 bg-teal-500/20 text-teal-300": clr === "teal" && props.isActive,
          "border-cyan-500/50 bg-cyan-500/20 text-cyan-300": clr === "cyan" && props.isActive,
          "border-indigo-500/50 bg-indigo-500/20 text-indigo-300": clr === "indigo" && props.isActive,
          "border-purple-500/50 bg-purple-500/20 text-purple-300": clr === "purple" && props.isActive,
          "border-pink-500/50 bg-pink-500/20 text-pink-300": clr === "pink" && props.isActive,
          "border-rose-500/50 bg-rose-500/20 text-rose-300": clr === "rose" && props.isActive,
          "border-fuchsia-500/50 bg-fuchsia-500/20 text-fuchsia-300": clr === "fuchsia" && props.isActive,
          "border-violet-500/50 bg-violet-500/20 text-violet-300": clr === "violet" && props.isActive,
          "border-orange-500/50 bg-orange-500/20 text-orange-300": clr === "orange" && props.isActive,
          "border-amber-500/50 bg-amber-500/20 text-amber-300": clr === "amber" && props.isActive,
          "border-gray-500/50 bg-gray-500/20 text-gray-300": clr === "gray" && props.isActive,
          "border-zinc-500/50 bg-zinc-500/20 text-zinc-300": clr === "zinc" && props.isActive,
          "border-neutral-500/50 bg-neutral-500/20 text-neutral-300": clr === "neutral" && props.isActive,
          "border-slate-500/50 bg-slate-500/20 text-slate-300": clr === "slate" && props.isActive,
          "border-lime-500/50 bg-lime-500/20 text-lime-300": clr === "lime" && props.isActive,

          "px-2 py-0.5": props.size === "xs",
        }
      )}
    >
      {props.children}
    </div>
  );
};

type HandleColorProps = {
  id: number;
};

const handleColor = (props: HandleColorProps): ChipProps["color"] => {
  const colors = [
    { color: "violet", value: 1 },
    { color: "orange", value: 2 },
    { color: "amber", value: 3 },
    { color: "yellow", value: 4 },
    { color: "green", value: 5 },
    { color: "teal", value: 6 },
    { color: "cyan", value: 7 },
    { color: "indigo", value: 8 },
    { color: "purple", value: 9 },
    { color: "pink", value: 10 },
  ];

  const color = colors.find((c) => c.value === props.id)?.color || "stone";
  return color as any;
};

export { Chip, handleColor };
