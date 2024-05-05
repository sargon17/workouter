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
          "border-blue-500/70 bg-blue-500/10 text-blue-200": clr === "blue" && props.isActive,
          "border-red-500/70 bg-red-500/10 text-red-200": clr === "red" && props.isActive,
          "border-yellow-500/70 bg-yellow-500/10 text-yellow-200": clr === "yellow" && props.isActive,
          "border-green-500/70 bg-green-500/10 text-green-200": clr === "green" && props.isActive,
          "border-teal-500/70 bg-teal-500/10 text-teal-200": clr === "teal" && props.isActive,
          "border-cyan-500/70 bg-cyan-500/10 text-cyan-200": clr === "cyan" && props.isActive,
          "border-indigo-500/70 bg-indigo-500/10 text-indigo-200": clr === "indigo" && props.isActive,
          "border-purple-500/70 bg-purple-500/10 text-purple-200": clr === "purple" && props.isActive,
          "border-pink-500/70 bg-pink-500/10 text-pink-200": clr === "pink" && props.isActive,
          "border-rose-500/70 bg-rose-500/10 text-rose-200": clr === "rose" && props.isActive,
          "border-fuchsia-500/70 bg-fuchsia-500/10 text-fuchsia-200": clr === "fuchsia" && props.isActive,
          "border-violet-500/70 bg-violet-500/10 text-violet-200": clr === "violet" && props.isActive,
          "border-orange-500/70 bg-orange-500/10 text-orange-200": clr === "orange" && props.isActive,
          "border-amber-500/70 bg-amber-500/10 text-amber-200": clr === "amber" && props.isActive,
          "border-gray-500/70 bg-gray-500/10 text-gray-200": clr === "gray" && props.isActive,
          "border-zinc-500/70 bg-zinc-500/10 text-zinc-200": clr === "zinc" && props.isActive,
          "border-neutral-500/70 bg-neutral-500/10 text-neutral-200": clr === "neutral" && props.isActive,
          "border-slate-500/70 bg-slate-500/10 text-slate-200": clr === "slate" && props.isActive,
          "border-lime-500/70 bg-lime-500/10 text-lime-200": clr === "lime" && props.isActive,

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
