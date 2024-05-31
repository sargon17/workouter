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
        "border rounded-3xl px-3 py-1  font-bold text-xs bg-stone-950 border-stone-800 text-stone-400 cursor-pointer transition-all duration-300 ease-in-out" +
          (props.isActive ? ` border-${clr}-500/70 bg-${clr}-500/10 text-${clr}-200` : ""),
        {
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
